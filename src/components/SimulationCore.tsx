import { useState, useEffect } from "react";
import { Sliders, Sparkles, ArrowRight, Activity, TrendingUp, CheckCircle, AlertTriangle, AlertCircle, Info, RefreshCw } from "lucide-react";
import { Project, Financials, WhatIfScenario, calculateLocalSimulation, SimulationResult } from "../data/systemData";

interface SimulationCoreProps {
  projects: Project[];
  financials: Financials;
}

export default function SimulationCore({ projects, financials }: SimulationCoreProps) {
  // Базовые параметры сценария симуляции
  const [scenario, setScenario] = useState<WhatIfScenario>({
    marketingMultiplier: 1.0,
    hiredSpecialists: 0,
    specialistSalary: 120000,
    operationalSavingsFactor: 0,
    priceAdjustment: 0
  });

  // Локальная симуляция в реальном времени
  const [localResult, setLocalResult] = useState<SimulationResult | null>(null);

  // Состояния для ИИ-интеграции (Gemini)
  const [loading, setLoading] = useState(false);
  const [aiReport, setAiReport] = useState<any | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  // Выполнять локальный пересчет при каждом сдвиге ползунков
  useEffect(() => {
    const res = calculateLocalSimulation({ financials, projects }, scenario);
    setLocalResult(res);
  }, [scenario, financials, projects]);

  // Запуск ИИ-анализа через Gemini API
  const runAiSimulation = async () => {
    setLoading(true);
    setAiReport(null);
    setApiKeyMissing(false);
    
    // Текстовая анимация загрузки
    const statuses = [
      "Загрузка проектных реестров организации...",
      "Построение математической матрицы сценария «Что-Если»...",
      "Обращение к прогностической модели Google Gemini...",
      "Генерация SWOT-анализа и дорожной карты управленческих решений..."
    ];
    let step = 0;
    setStatusMessage(statuses[0]);
    const timer = setInterval(() => {
      step = (step + 1) % statuses.length;
      setStatusMessage(statuses[step]);
    }, 1200);

    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemData: { financials, projects },
          whatIfScenario: scenario
        })
      });

      const data = await response.json();
      clearInterval(timer);

      if (data.error === "API_KEY_MISSING") {
        setApiKeyMissing(true);
        // Заполняем отчет из локальной симуляции
        setAiReport({
          summary: localResult?.summary,
          swotAnalysis: {
            strengths: [
              "Оптимизация операционных расходов по сценарию на " + scenario.operationalSavingsFactor + "%",
              "Масштабируемость проектных мощностей",
              "Оперативный запуск маркетинговых каналов"
            ],
            weaknesses: [
              scenario.hiredSpecialists > 0 ? "Квартальный рост расходов на ФОТ специалистов" : "Загруженность текущего штата на 95%",
              "Амортизация издержек в краткосрочном периоде",
              "Чувствительность клиентов к изменениям тарифной сетки"
            ],
            opportunities: [
              "Завоевание дополнительной доли рынка благодаря рекламе (" + scenario.marketingMultiplier + "x)",
              "Стабилизация оборотного капитала компании",
              "Внедрение новых решений КИС СППР"
            ],
            threats: [
              "Увеличение рисков кассового разрыва при резком найме",
              "Возможное падение спроса при увеличении отпускных цен",
              "Зависимость от подрядчиков"
            ]
          },
          risks: [
            {
              title: "Увеличение постоянных издержек (ФОТ)",
              impact: scenario.hiredSpecialists > 3 ? "Высокое" : "Среднее",
              mitigation: "Использование гибких схем мотивации и почасовой формы оклада для временных экспертов."
            },
            {
              title: "Ценовое сопротивление постоянных клиентов",
              impact: scenario.priceAdjustment > 15 ? "Высокое" : "Низкое",
              mitigation: "Предоставление скидок за долгосрочную подписку или поэтапный ввод новых тарифов."
            }
          ],
          actionPlan: localResult?.actionPlan,
          estimatedFinancials: {
            revenueForecast: localResult?.revenueForecast,
            profitForecast: localResult?.profitForecast,
            roi: localResult?.roi,
            growthRate: localResult?.growthRate
          }
        });
      } else {
        setAiReport(data);
      }
    } catch (e: any) {
      console.error(e);
      clearInterval(timer);
      // При сетевой ошибке выкатываем локальный отказоустойчивый отчет
      setApiKeyMissing(true);
      setAiReport({
        summary: localResult?.summary,
        swotAnalysis: {
          strengths: ["Локально просчитанная устойчивость издержек", "Оптимизация корпоративных процессов"],
          weaknesses: ["Ограничение точности при ручном расчете"],
          opportunities: ["Симуляция альтернативных исходов"],
          threats: ["Флуктуации внешней рыночной конъюнктуры"]
        },
        risks: [
          { title: "Ошибка локального кэширования", impact: "Низкое", mitigation: "Активировать соединение со шлюзом ИИ." }
        ],
        actionPlan: localResult?.actionPlan,
        estimatedFinancials: {
          revenueForecast: localResult?.revenueForecast,
          profitForecast: localResult?.profitForecast,
          roi: localResult?.roi,
          growthRate: localResult?.growthRate
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Расчет базовых показателей (ДО изменений) для сравнения
  const baseExpenses = financials.opEx + financials.marketingBudget + financials.salaryExp + financials.otherCosts;
  const baseProfitBeforeTaxes = financials.revenue - baseExpenses;
  const baseProfit = baseProfitBeforeTaxes * (1 - financials.taxRate / 100);

  // Сравнение прибыли БЫЛО vs СТАЛО
  const profitDifference = localResult ? localResult.profitForecast - baseProfit : 0;
  const isProfitGrowing = profitDifference >= 0;

  return (
    <div id="simulation-core-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* ЛЕВАЯ ПАНЕЛЬ: Ползунки рычагов управления */}
      <div className="lg:col-span-4 bg-white rounded-xl border border-slate-100 p-5 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sliders className="h-5 w-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-800">Управленческие рычаги</h3>
        </div>

        {/* Рычаг 1: Маркетинг */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Бюджет маркетинга</span>
            <span className="font-mono text-indigo-600 font-bold">
              {scenario.marketingMultiplier}x ({(financials.marketingBudget * scenario.marketingMultiplier).toLocaleString()} ₽)
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={scenario.marketingMultiplier}
            onChange={(e) => setScenario({ ...scenario, marketingMultiplier: parseFloat(e.target.value) })}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">Рост рекламы масштабирует выручку, но увеличивает затраты</p>
        </div>

        {/* Рычаг 2: Кадры */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Наем специалистов</span>
            <span className="font-mono text-indigo-600 font-bold">
              +{scenario.hiredSpecialists} чел.
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={scenario.hiredSpecialists}
            onChange={(e) => setScenario({ ...scenario, hiredSpecialists: parseInt(e.target.value) })}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-slate-400">Оклад специалиста</span>
            <span className="text-[10px] font-mono font-bold text-slate-600">{scenario.specialistSalary.toLocaleString()} ₽ / мес</span>
          </div>
          <input
            type="range"
            min="70000"
            max="250000"
            step="10000"
            value={scenario.specialistSalary}
            onChange={(e) => setScenario({ ...scenario, specialistSalary: parseInt(e.target.value) })}
            className="w-full accent-slate-500 cursor-pointer"
            disabled={scenario.hiredSpecialists === 0}
          />
          <p className="text-[10px] text-slate-400">Наем увеличивает пропускную способность, повышая постоянный ФОТ</p>
        </div>

        {/* Рычаг 3: Оптимизация издержек */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Оптимизация OpEx</span>
            <span className="font-mono text-indigo-600 font-bold">
              {scenario.operationalSavingsFactor}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            step="5"
            value={scenario.operationalSavingsFactor}
            onChange={(e) => setScenario({ ...scenario, operationalSavingsFactor: parseInt(e.target.value) })}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">Экономия на аренде, административных расходах и облачных сервисах</p>
        </div>

        {/* Рычаг 4: Цены услуг */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Изменение тарифов</span>
            <span className="font-mono text-indigo-600 font-bold">
              {scenario.priceAdjustment > 0 ? "+" : ""}{scenario.priceAdjustment}%
            </span>
          </div>
          <input
            type="range"
            min="-20"
            max="40"
            step="5"
            value={scenario.priceAdjustment}
            onChange={(e) => setScenario({ ...scenario, priceAdjustment: parseInt(e.target.value) })}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">Высокие цены могут снизить клиентский трафик (эластичность спроса)</p>
        </div>

        {/* Кнопка запуска ИИ */}
        <button
          id="btn-run-ai-forecast"
          onClick={runAiSimulation}
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Запустить ИИ-экспертизу решений
        </button>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Экраны симуляции */}
      <div className="lg:col-span-8 space-y-6">
        {/* Раздел быстрого сравнения (Было / Стало) */}
        <div className="bg-slate-900 text-white p-5 rounded-xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5 mb-4">
            <Activity className="h-4 w-4" /> Имитационная экспресс-симуляция (What-If Core)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Было */}
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-xs text-slate-400">БАЗОВЫЕ ПОКАЗАТЕЛИ (Без изменений)</span>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Выручка:</span>
                  <span className="font-mono font-bold">{financials.revenue.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Расходы:</span>
                  <span className="font-mono">{baseExpenses.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-700 mt-2">
                  <span className="font-semibold">Чистая прибыль:</span>
                  <span className="font-mono text-emerald-400 font-bold">{Math.round(baseProfit).toLocaleString()} ₽</span>
                </div>
              </div>
            </div>

            {/* Стало */}
            <div className="p-4 bg-slate-800 rounded-lg border border-indigo-500/30">
              <span className="text-xs text-indigo-300 font-semibold">ПРОГНОЗНЫЙ СЦЕНАРИЙ (Модель)</span>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Выручка:</span>
                  <span className="font-mono font-bold text-slate-200">
                    {localResult ? localResult.revenueForecast.toLocaleString() : "..."} ₽
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Расходы:</span>
                  <span className="font-mono text-slate-300">
                    {localResult ? (localResult.revenueForecast - localResult.profitForecast / (1 - financials.taxRate/100)).toLocaleString() : "..."} ₽
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-700 mt-2">
                  <span className="font-semibold flex items-center gap-1">
                    Плановая чистая: 
                    {localResult && (
                      <span className={`text-[10px] px-1 rounded ${isProfitGrowing ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                        {isProfitGrowing ? "+" : ""}{Math.round(profitDifference).toLocaleString()}
                      </span>
                    )}
                  </span>
                  <span className={`font-mono font-bold ${isProfitGrowing ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {localResult ? localResult.profitForecast.toLocaleString() : "..."} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* БЛОК С ОБРАБОТКОЙ КЛЮЧА API И ВЫВОДОМ ОТЧЕТА */}
        {loading ? (
          <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-xs flex flex-col items-center justify-center space-y-4 min-h-[400px]">
            <RefreshCw className="h-10 w-10 text-indigo-600 animate-spin" />
            <div className="text-center">
              <h4 className="font-bold text-slate-800">Интеллектуальный расчет</h4>
              <p className="text-sm text-slate-500 max-w-sm mt-1 animate-pulse">
                {statusMessage}
              </p>
            </div>
          </div>
        ) : aiReport ? (
          <div className="space-y-6">
            {/* Оповещалка о локальном режиме работы */}
            {apiKeyMissing && (
              <div id="ai-missing-banner" className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-bold">Локальный отказоустойчивый режим аналитики</div>
                  <p className="mt-1">
                    Ключ API Gemini не обнаружен на сервере в <strong>Settings &gt; Secrets</strong>. 
                    Система задействовала встроенный прецизионный калькулятор корпоративного прогноза и заполнила SWOT-каркас. 
                    Все расчеты верны, но при подключении ключа <strong>GEMINI_API_KEY</strong> вы получите глубокие аналитические тексты, адаптированные индивидуально под каждый шаг.
                  </p>
                </div>
              </div>
            )}

            {/* ИИ Аналитический отчет */}
            <div id="ai-full-report-section" className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-800">Экспертное заключение ИИ поддержки управленческих решений</h3>
              </div>

              {/* Аннотация */}
              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-600">
                <h4 className="text-xs uppercase font-bold text-indigo-900 tracking-wider">Резюме для генерального директора</h4>
                <p className="text-sm text-slate-700 leading-relaxed mt-1">{aiReport.summary}</p>
              </div>

              {/* Метрики отчета */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Прогноз Выручки</span>
                  <div className="text-sm font-bold font-mono text-slate-800 mt-1">
                    {Math.round(aiReport.estimatedFinancials?.revenueForecast || 0).toLocaleString()} ₽
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Прогноз ЧП</span>
                  <div className="text-sm font-bold font-mono text-slate-800 mt-1">
                    {Math.round(aiReport.estimatedFinancials?.profitForecast || 0).toLocaleString()} ₽
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Индекс ROI</span>
                  <div className="text-sm font-bold font-mono text-slate-800 mt-1">
                    {aiReport.estimatedFinancials?.roi || 0}%
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Прирост Прибыли</span>
                  <div className={`text-sm font-bold font-mono mt-1 ${aiReport.estimatedFinancials?.growthRate >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {aiReport.estimatedFinancials?.growthRate >= 0 ? "+" : ""}{aiReport.estimatedFinancials?.growthRate}%
                  </div>
                </div>
              </div>

              {/* SWOT-анализ внедрения решения */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-violet-600" /> SWOT-матрица управленческого сценария
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">S - Сильные стороны</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                      {aiReport.swotAnalysis?.strengths?.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">W - Слабые стороны</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                      {aiReport.swotAnalysis?.weaknesses?.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">O - Возможности</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                      {aiReport.swotAnalysis?.opportunities?.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Threats */}
                  <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">T - Угрозы</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                      {aiReport.swotAnalysis?.threats?.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Оценка дополнительных Рисков */}
              {aiReport.risks && aiReport.risks.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-amber-500" /> Выявленные риски и меры компенсации
                  </h4>
                  <div className="overflow-x-auto border border-slate-100 rounded-lg">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-500 uppercase">
                        <tr>
                          <th className="p-3">Название угрозы</th>
                          <th className="p-3 text-center">Критичность</th>
                          <th className="p-3">Рекомендация по минимизации</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600">
                        {aiReport.risks.map((risk: any, i: number) => (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="p-3 font-semibold text-slate-700">{risk.title}</td>
                            <td className="p-3 text-center">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                risk.impact === "Высокое" 
                                  ? "bg-rose-50 text-rose-600 border border-rose-100" 
                                  : "bg-amber-50 text-amber-600 border border-amber-100"
                              }`}>
                                {risk.impact}
                              </span>
                            </td>
                            <td className="p-3 text-slate-500 leading-relaxed">{risk.mitigation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Дорожная карта */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-500" /> Рекомендуемый план действий ( дорожная карта )
                </h4>
                <div className="space-y-2">
                  {aiReport.actionPlan?.map((step: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-100 p-10 text-center flex flex-col items-center justify-center space-y-4 shadow-xs min-h-[400px]">
            <Sparkles className="h-12 w-12 text-slate-300 animate-pulse" />
            <div>
              <h4 className="text-base font-bold text-slate-800">Маделирование бизнес-сценариев ЛПР</h4>
              <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                Настройте рычаги бюджетных воздействий в крайнем левом меню и кликните на синюю кнопку запуска, чтобы сгенерировать ИИ-отчет оценки сценария.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
