export interface Project {
  id: string;
  name: string;
  department: "Разработка" | "Маркетинг" | "Консалтинг" | "Аналитика";
  status: "В разработке" | "Завершен" | "Приостановлен" | "Планируется";
  riskLevel: "Высокий" | "Средний" | "Низкий";
  budget: number; // в рублях
  progress: number; // 0 to 100
  completionDate: string;
  leadSpecialist: string;
}

export interface Financials {
  revenue: number; // базовая квартальная выручка
  opEx: number; // базовые операционные затраты (офис, ПО, лицензии)
  marketingBudget: number; // рекламный бюджет
  salaryExp: number; // затраты на ФОТ
  taxRate: number; // процент налогов (например, 20%)
  otherCosts: number; // прочие расходы
}

export interface Resource {
  id: string;
  name: string;
  role: string;
  efficiency: number; // коэффициент продуктивности
  salary: number; // месячный оклад в рублях
  load: number; // текущая загрузка в %
  department: string;
}

export interface CorporateRisk {
  id: string;
  title: string;
  category: "Финансовый" | "Операционный" | "Рыночный" | "Правовой";
  probability: number; // 1-5
  impact: number; // 1-5
  status: "Активен" | "Нейтрализован" | "Под наблюдением";
  mitigation: string;
}

export interface WhatIfScenario {
  marketingMultiplier: number; // от 0.5 до 3.0
  hiredSpecialists: number; // от 0 до 20 человек
  specialistSalary: number; // оклад нанимаемых специалистов в рублях (ср. 150 000)
  operationalSavingsFactor: number; // процент экономии от 0 до 40%
  priceAdjustment: number; // процент изменения цен от -20% до +40%
}

// Реалистичные проекты slomo.tv
export const initialProjects: Project[] = [
  {
    id: "PLT-101",
    name: "Поставка 12 серверов Arrow-II для трансляций КХЛ",
    department: "Разработка",
    status: "В разработке",
    riskLevel: "Средний",
    budget: 24500000,
    progress: 70,
    completionDate: "15.08.2026",
    leadSpecialist: "Никифоров А.М."
  },
  {
    id: "PLT-102",
    name: "Разработка ПО многоканальной записи Blackjack-4K",
    department: "Разработка",
    status: "В разработке",
    riskLevel: "Низкий",
    budget: 18500000,
    progress: 45,
    completionDate: "10.11.2026",
    leadSpecialist: "Дмитриева С.А."
  },
  {
    id: "PLT-103",
    name: "Интеграция судейской системы повторов (VAR) РФС",
    department: "Аналитика",
    status: "Завершен",
    riskLevel: "Низкий",
    budget: 15200000,
    progress: 100,
    completionDate: "30.04.2026",
    leadSpecialist: "Климов И.Я."
  },
  {
    id: "PLT-104",
    name: "Мобильная видеостудия замедленного повтора Dominator-12G",
    department: "Консалтинг",
    status: "Приостановлен",
    riskLevel: "Высокий",
    budget: 31000000,
    progress: 15,
    completionDate: "20.12.2026",
    leadSpecialist: "Краснов С.В."
  },
  {
    id: "PLT-105",
    name: "Поставка компактных replay-систем Rip для мини-стадионов",
    department: "Маркетинг",
    status: "Планируется",
    riskLevel: "Средний",
    budget: 12800000,
    progress: 0,
    completionDate: "25.02.2027",
    leadSpecialist: "Карпов А.Б."
  }
];

// Реалистичные финансовые показатели slomo.tv (квартальные, ~250 млн руб в год)
export const initialFinancials: Financials = {
  revenue: 62500000, // 62.5 млн руб за квартал (250 млн в год)
  opEx: 14500000, // 14.5 млн руб (комплектующие, производство, платы, чипы)
  marketingBudget: 5500000, // 5.5 млн руб (международные выставки IBC, NAB)
  salaryExp: 16800000, // 16.8 млн руб фонд оплаты труда
  taxRate: 20, // 20% налоги
  otherCosts: 2200000 // 2.2 млн руб общепроизводственные и транспортные расходы
};

// Более развернутый список сотрудников slomo.tv
export const initialResources: Resource[] = [
  { id: "RES-01", name: "Никифоров А.М.", role: "Ведущий разработчик FPGA/ПЛИС", efficiency: 1.30, salary: 220000, load: 90, department: "Разработка" },
  { id: "RES-02", name: "Краснов С.В.", role: "Инженер трассировки плат", efficiency: 1.15, salary: 170000, load: 85, department: "Разработка" },
  { id: "RES-03", name: "Дмитриева С.А.", role: "Старший программист C++/Qt", efficiency: 1.25, salary: 190000, load: 80, department: "Разработка" },
  { id: "RES-04", name: "Климов И.Я.", role: "Инженер выходного контроля сборки", efficiency: 1.10, salary: 130000, load: 100, department: "Сборка" },
  { id: "RES-05", name: "Зайцев П.Ю.", role: "Техник прецизионного монтажа", efficiency: 1.05, salary: 120000, load: 95, department: "Сборка" },
  { id: "RES-06", name: "Лебедев Д.В.", role: "Специалист техподдержки трансляций", efficiency: 1.20, salary: 110000, load: 75, department: "Разработка" },
  { id: "RES-07", name: "Федорова Е.Н.", role: "Директор по выставкам", efficiency: 1.10, salary: 140000, load: 60, department: "Маркетинг" },
  { id: "RES-08", name: "Карпов А.Б.", role: "Менеджер по продажам", efficiency: 1.15, salary: 150000, load: 70, department: "Маркетинг" }
];

export const initialCorporateRisks: CorporateRisk[] = [
  { id: "RSK-01", title: "Задержка поставок импортных ПЛИС (FPGA) и скоростных SSD", category: "Операционный", probability: 4, impact: 5, status: "Активен", mitigation: "Поиск альтернативных дистрибьюторов в Азии, увеличение складских запасов до 6 месяцев" },
  { id: "RSK-02", title: "Дефицит инженеров-разработчиков высокочастотных видеоплат", category: "Операционный", probability: 3, impact: 4, status: "Под наблюдением", mitigation: "Сотрудничество с кафедрами ТОР МТУСИ и МИРЭА, организация оплачиваемых стажировок" },
  { id: "RSK-03", title: "Падение спроса на спортивные видеосерверы из-за санкций на вещание", category: "Рыночный", probability: 2, impact: 4, status: "Под наблюдением", mitigation: "Адаптация серверов под рынки СНГ, Ближнего Востока, Индии и Китая" },
  { id: "RSK-04", title: "Валютные колебания стоимости комплектующих", category: "Финансовый", probability: 4, impact: 3, status: "Активен", mitigation: "Валютное хеджирование контрактов, переход на расчеты в национальных валютах" },
  { id: "RSK-05", title: "Риск отказа оборудования во время прямых эфиров крупных матчей", category: "Технологический", category_custom: "Технологический", probability: 1, impact: 5, status: "Под наблюдением", mitigation: "Внедрение избыточного резервирования систем (Hot Swap), двойной контроль качества на стендах" } as any
];

export interface SimulationResult {
  revenueForecast: number;
  profitForecast: number;
  roi: number;
  growthRate: number;
  summary: string;
  actionPlan: string[];
  capacityUtilization: number; // процент загрузки мощностей
  demandStatus: string; // текстовый статус баланса Спрос / Возможности
}

/**
 * Исправленная и глубоко проработанная имитационная модель для компании slomo.tv
 * Устраняет простой линейный рост прибыли от маркетинга и людей.
 * Внедряет баланс Рыночного Спроса и Производственной Мощности.
 */
export function calculateLocalSimulation(
  systemData: { financials: Financials; projects: Project[]; resources?: Resource[] },
  scenario: WhatIfScenario
): SimulationResult {
  const { financials } = systemData;
  
  // 1. Моделирование Рыночного Спроса (Demand)
  // Спрос растет от маркетинга по логарифмической кривой (убывающая доходность)
  // База маркетинга = 1.0 (задается scenario.marketingMultiplier)
  // Предел насыщения рынка: маркетинг не может поднять спрос бесконечно.
  const marketingEffect = 1 + 0.38 * Math.log(scenario.marketingMultiplier + 0.01);
  
  // Эластичность спроса по цене:
  // При снижении цены спрос растет незначительно (специфичный дорогой B2B сектор),
  // а при увеличении цены выше +10%, спрос начинает резко падать (клиенты уходят к западным аналогам или б/у рынку)
  const pricePercent = scenario.priceAdjustment; // в процентах
  let priceElasticity = 1.0;
  if (pricePercent > 10) {
    // Высокая эластичность при повышении цены
    priceElasticity = 1 - 1.8 * ((pricePercent - 10) / 100);
  } else if (pricePercent > 0) {
    // Небольшая эластичность
    priceElasticity = 1 - 0.8 * (pricePercent / 100);
  } else if (pricePercent < 0) {
    // При падении цены спрос растет слабо (B2B не эластично на дешевизну)
    priceElasticity = 1 + 0.3 * (Math.abs(pricePercent) / 100);
  }
  priceElasticity = Math.max(0.3, priceElasticity); // Дно спроса

  // Итоговый объем потенциального Спроса в рублях по базовым ценам
  const baseDemand = financials.revenue * marketingEffect * priceElasticity;
  
  // 2. Моделирование Производственной Мощности (Assembly & Dev Capacity)
  // Базовый штат специалистов slomo.tv. Базовая численность = 8 человек.
  // Новые нанятые специалисты расширяют доступные мощности сборки и тестирования ПЛИС/серверов.
  // Однако, производительность труда падает при слишком быстром бесконтрольном найме (проблема адаптации)
  const baseStaffCount = 8;
  const currentStaffCount = systemData.resources ? systemData.resources.length : baseStaffCount;
  const totalStaffCount = currentStaffCount + scenario.hiredSpecialists;
  
  // Номинальный рост мощности сборки:
  const staffRatio = totalStaffCount / currentStaffCount;
  // Снижающийся КПД от расширения команды (закон Брукса / адаптационное падение):
  const efficiencyAdjustment = 1.0 - Math.min(0.25, (scenario.hiredSpecialists * 0.015));
  const capacityEffect = staffRatio * efficiencyAdjustment;
  
  // Итоговая производственная емкость компании (базовый потенциал производства)
  // Обычно компания сбалансирована, имеет ~15% резерва по мощности над базовой выручкой
  const baseCapacity = financials.revenue * 1.15;
  const totalProductionCapacity = baseCapacity * capacityEffect;

  // 3. Распределенный результат продаж (Фактическая Выручка)
  // Выручка ограничена как рыночным Спросом, так и физической возможностью компании собрать, протестировать и отгрузить видеосерверы.
  // Фактическая выручка при базовой стоимости = min(Demand, Capacity)
  const actualShippedVolumeAtBasePrices = Math.min(baseDemand, totalProductionCapacity);
  
  // Корректируем выручку на ценовой коэффициент (сколько заработали с учетом новых цен)
  const priceMultiplier = 1 + (pricePercent / 100);
  const simulatedRevenue = actualShippedVolumeAtBasePrices * priceMultiplier;

  // 4. Финансовый расчет Затрат (Expenses)
  // OpEx зависит от объема производства (себестоимость комплектующих: корпуса, платы, SSD, видеокарты)
  // Но при этом можно оптимизировать OpEx за счет бережливого производства (operationalSavingsFactor)
  const baseComponentCostRatio = 0.232; // ~23% себестоимость железа
  const variableCompCost = actualShippedVolumeAtBasePrices * baseComponentCostRatio;
  const fixedOpEx = (financials.opEx - (financials.revenue * baseComponentCostRatio)) * (1 - scenario.operationalSavingsFactor / 100);
  const simulatedOpEx = Math.max(0, fixedOpEx + variableCompCost);

  // Новый рекламный бюджет
  const simulatedMarketingBudget = financials.marketingBudget * scenario.marketingMultiplier;

  // Рост ФОТ: Текущий ФОТ + добавленные специалисты (оклад * 3 месяца)
  const simulatedSalaryExp = financials.salaryExp + (scenario.hiredSpecialists * (scenario.specialistSalary * 3));

  // Прочие издержки
  const simulatedOtherCosts = financials.otherCosts;

  // ИТОГО Расходы
  const totalExpensesBeforeTaxes = simulatedOpEx + simulatedMarketingBudget + simulatedSalaryExp + simulatedOtherCosts;

  // Прибыль до налогов
  const profitBeforeTaxes = Math.max(0, simulatedRevenue - totalExpensesBeforeTaxes);

  // Расчет налогов
  const simulatedTaxes = profitBeforeTaxes * (financials.taxRate / 100);

  // Чистая прибыль
  const simulatedProfit = profitBeforeTaxes - simulatedTaxes;

  // Базовая чистая прибыль (для сравнения)
  const baseExpenses = financials.opEx + financials.marketingBudget + financials.salaryExp + financials.otherCosts;
  const baseProfitBeforeTaxes = financials.revenue - baseExpenses;
  const baseProfit = baseProfitBeforeTaxes * (1 - financials.taxRate / 100);

  // Маркетинговый ROI
  const rawRoi = ((simulatedRevenue - financials.revenue) / (simulatedMarketingBudget || 1)) * 100;
  const simulatedRoi = Number(Math.max(-100, Math.min(480, rawRoi)).toFixed(1));

  // Темп роста прибыли %
  const simulatedGrowthRate = baseProfit > 0
    ? Number((((simulatedProfit - baseProfit) / baseProfit) * 100).toFixed(1))
    : 0;

  // Загрузка производственных мощностей
  const capacityUtilization = Math.round(Math.min(100, (actualShippedVolumeAtBasePrices / totalProductionCapacity) * 100));

  // Анализ соотношения Спрос / Мощность
  let demandStatus = "Оптимальный баланс";
  let summary = "";
  
  const excessDemandRatio = baseDemand / totalProductionCapacity;
  if (excessDemandRatio > 1.12) {
    demandStatus = "Перегрузка мощностей (Дефицит кадров)";
    summary = `Анализ выявил критическую проблему: рыночный спрос на серверы slomo.tv превышает производственные возможности компании на ${Math.round((excessDemandRatio - 1) * 100)}%. Слишком высокий рекламный бюджет не приносит пропорциональной выручки, так как инженеры не успевают физически собирать платформы. Рекомендуется нанять дополнительных специалистов по сборке и тестированию или снизить темпы рекламы. `;
  } else if (excessDemandRatio < 0.85) {
    demandStatus = "Дефицит спроса (Простой мощностей)";
    summary = `Внимание: Производственные цеха slomo.tv простаивают. Потенциальная мощность превышает реальный рыночный спрос на ${Math.round((1 - excessDemandRatio) * 100)}%. Штат сотрудников избыточен для текущего портфеля заказов, а маркетинг не создает достаточного потока лидов. Необходимо увеличить рекламную активность на выставках (IBC/NAB) или оптимизировать цены. `;
  } else {
    demandStatus = "Оптимальная сбалансированность";
    summary = `Стабилизация графиков выполнена успешно. Текущие мощности сборки slomo.tv идеально соответствуют входящему рыночному спросу (загрузка цехов: ${capacityUtilization}%). Это обеспечивает максимальную рентабельность операционного цикла без переработок и простоев. `;
  }

  const profitDelta = simulatedProfit - baseProfit;
  if (profitDelta > 0) {
    summary += `Предлагаемые действия приведут к успешному увеличению чистой прибыли на ${Math.round(profitDelta).toLocaleString()} ₽. Стратегия рекомендуется к немедленному внедрению Советом директоров.`;
  } else {
    summary += `Внимание: Финансовый итог сценария отрицательный (снижение прибыли на ${Math.round(Math.abs(profitDelta)).toLocaleString()} ₽). Рост расходной части на ФОТ и маркетинг опережает реальный приток выручки в этой конфигурации цен и спроса. Скорректируйте параметры!`;
  }

  // Сгенерируем пошаговый план
  const actionPlan: string[] = [];
  if (excessDemandRatio > 1.12) {
    actionPlan.push(`Развернуть программу ускоренного рекрутинга инженеров сборки ИКТ-оборудования и схемотехников (+${scenario.hiredSpecialists} сотрудников).`);
    actionPlan.push("Снизить интенсивность точечной рекламы во избежание срыва сроков по контрактам КХЛ/РФС.");
  } else if (excessDemandRatio < 0.85) {
    actionPlan.push(`Увеличить вложения в участие в отраслевых ТВ-выставках (мультипликатор рекламы: ${scenario.marketingMultiplier}x) для стимуляции внешнего спроса на Blackjack.`);
    actionPlan.push("Временно оптимизировать избыточное рабочее время инженеров сборки, перенаправив усилия на R&D-разработку систем нового поколения Blackjack-8K.");
  } else {
    actionPlan.push("Удерживать темп производства и параметры ФОТ на текущих оптимальных уровнях.");
    actionPlan.push("Концентрироваться на завершении текущих стадий сборки серверов без перерасхода бюджета.");
  }

  if (pricePercent !== 0) {
    actionPlan.push(`Внедрить новую гибкую тарифную политику (изменение: ${pricePercent > 0 ? "+" : ""}${pricePercent}%) с учетом порога эластичности B2B-клиентов.`);
  }
  if (scenario.operationalSavingsFactor > 5) {
    actionPlan.push(`Осуществить аудит OPEX расходов по линии закупки видеомонтажных шасси, сэкономив до ${scenario.operationalSavingsFactor}% бюджета.`);
  }
  actionPlan.push("Провести проверку дебиторского баланса по графику поставки платформы Arrow-II.");

  return {
    revenueForecast: Math.round(simulatedRevenue),
    profitForecast: Math.round(simulatedProfit),
    roi: simulatedRoi,
    growthRate: simulatedGrowthRate,
    summary,
    actionPlan,
    capacityUtilization,
    demandStatus
  };
}
