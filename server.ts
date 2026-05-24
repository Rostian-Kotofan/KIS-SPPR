import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for AI-enabled decision support and scenario forecasting
  app.post("/api/gemini/analyze", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(200).json({
          error: "API_KEY_MISSING",
          message: "Ключ API Gemini не настроен. Система запустила симуляцию в локальном аналитическом режиме. Пожалуйста, вставьте ваш ключ в 'Settings > Secrets' в AI Studio для активации ИИ-поддержки на базе Gemini."
        });
      }

      const { systemData, whatIfScenario } = req.body;

      const prompt = `
Вы — экспертная система поддержки управленческих решений (СППР) корпоративного уровня. Проанализируйте предоставленные корпоративные данные и параметры управленческого сценария "Что-Если", спрогнозируйте последствия и предложите научно обоснованные решения.

Корпоративные данные:
- Текущие проекты: ${JSON.stringify(systemData.projects)}
- Текущие финансовые KPI: ${JSON.stringify(systemData.financials)}
- Распределение ресурсов: ${JSON.stringify(systemData.resources)}

Параметры симуляции "Что-Если" (вносимые управленческие изменения):
- Мультипликатор бюджета маркетинга: ${whatIfScenario.marketingMultiplier}x (текущий: ${systemData.financials.marketingBudget} ₽)
- Наем ключевых специалистов: ${whatIfScenario.hiredSpecialists} чел. (ср. оклад: ${whatIfScenario.specialistSalary} ₽)
- Оптимизация операционных издержек: ${whatIfScenario.operationalSavingsFactor}% экономии
- Коррекция отпускных цен услуг: ${whatIfScenario.priceAdjustment}% от базовой

Составьте подробное аналитическое обоснование для генерального директора. Ответ предоставьте СТРОГО в формате JSON со следующей структурой:
{
  "summary": "Краткое профессиональное резюме (3-4 содержательных предложения) о совокупном влиянии этого сценария на финансовую стабильность, рентабельность бизнеса и операционную нагрузку.",
  "swotAnalysis": {
    "strengths": ["Сильная сторона 1", "Сильная сторона 2", "Сильная сторона 3"],
    "weaknesses": ["Слабая сторона 1", "Слабая сторона 2", "Слабая сторона 3"],
    "opportunities": ["Возможность развития 1", "Возможность развития 2", "Возможность развития 3"],
    "threats": ["Потенциальная угроза 1", "Потенциальная угроза 2", "Потенциальная угроза 3"]
  },
  "risks": [
    {
      "title": "Наименование риска (например, риск кассового разрыва, перегрузка штата, падение спроса из-за цен)",
      "impact": "Высокое / Среднее / Низкое",
      "mitigation": "Конкретная превентивная мера по нейтрализации данного риска"
    }
  ],
  "actionPlan": [
    "Шаг 1. Конкретная организационная мера",
    "Шаг 2. Конкретная финансовая или маркетинговая мера",
    "Шаг 3. Мера из области управления ресурсами/штатом",
    "Шаг 4. Контроль качества или правовой аспект",
    "Шаг 5. Оценка и мониторинг результатов"
  ],
  "estimatedFinancials": {
    "revenueForecast": 12500000, // Симулированная выручка в рублях (число)
    "profitForecast": 3200000,    // Симулированная чистая прибыль в рублях (число)
    "roi": 25.4,                  // Ожидаемый индекс рентабельности маркетинговых инвестиций в процентах (число)
    "growthRate": 12.5             // Ожидаемый темп прироста чистой прибыли по сравнению с текущей ситуацией в процентах (число)
  }
}

Важные правила:
- Финансовые прогнозы должны логически соотноситься со входящими коэффициентами управленческого воздействия (повышение рекламы должно растить выручку, найм персонала повышает фонд оплаты труда и снижает краткосрочную прибыль, но повышает мощности, завышенные цены могут снизить спрос).
- Имя полей должно строго соответствовать структуре.
- Возвращайте только валидный JSON, никакого маркдауна (не используйте синтаксис \`\`\`json ... \`\`\`), никаких побочных текстов.
      `;

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text ? response.text.trim() : "{}";
      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error("Gemini API Error in Server:", error);
      res.status(500).json({ error: error?.message || "Internal server error" });
    }
  });

  // Serve static UI / Vite Dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
