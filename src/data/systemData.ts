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
  hiredSpecialists: number; // от 0 до 10 человек
  specialistSalary: number; // оклад нанимаемых специалистов в рублях (ср. 120 000)
  operationalSavingsFactor: number; // процент экономии от 0 до 40%
  priceAdjustment: number; // процент изменения цен от -20% до +40%
}

// Начальные демонстрационные данные для симуляции бизнеса
export const initialProjects: Project[] = [
  {
    id: "PRJ-101",
    name: "Внедрение CRM для Альфа-Банка",
    department: "Разработка",
    status: "В разработке",
    riskLevel: "Средний",
    budget: 4500000,
    progress: 65,
    completionDate: "15.08.2026",
    leadSpecialist: "Смирнов А.В."
  },
  {
    id: "PRJ-102",
    name: "Продвижение экосистемы ГБПОУ-35",
    department: "Маркетинг",
    status: "В разработке",
    riskLevel: "Низкий",
    budget: 1800000,
    progress: 40,
    completionDate: "10.09.2026",
    leadSpecialist: "Козлова Е.В."
  },
  {
    id: "PRJ-103",
    name: "Анализ бизнес-процессов холдинга Русал",
    department: "Аналитика",
    status: "Завершен",
    riskLevel: "Низкий",
    budget: 3200000,
    progress: 100,
    completionDate: "05.05.2026",
    leadSpecialist: "Петров И.С."
  },
  {
    id: "PRJ-104",
    name: "Реструктуризация кадрового учета Мосэнерго",
    department: "Консалтинг",
    status: "Приостановлен",
    riskLevel: "Высокий",
    budget: 5100000,
    progress: 20,
    completionDate: "20.12.2026",
    leadSpecialist: "Дмитриев С.К."
  },
  {
    id: "PRJ-105",
    name: "Разработка СППР для агрохолдинга Черкизово",
    department: "Разработка",
    status: "Планируется",
    riskLevel: "Средний",
    budget: 6200000,
    progress: 0,
    completionDate: "18.02.2027",
    leadSpecialist: "Иванов Д.М."
  }
];

export const initialFinancials: Financials = {
  revenue: 15000000, // 15 млн руб за квартал
  opEx: 2800000, // 2.8 млн операционки
  marketingBudget: 1500000, // 1.5 млн маркетинг
  salaryExp: 4200000, // 4.2 млн базовый фонд оплаты труда
  taxRate: 20, // 20% НДС и налоги
  otherCosts: 900000 // 900 тыс прочих затрат
};

export const initialResources: Resource[] = [
  { id: "RES-01", name: "Алексеев В.П.", role: "Ведущий архитектор", efficiency: 1.25, salary: 180000, load: 95, department: "Разработка" },
  { id: "RES-02", name: "Сергеева А.Н.", role: "Senior Frontend React", efficiency: 1.15, salary: 140000, load: 85, department: "Разработка" },
  { id: "RES-03", name: "Романов К.Д.", role: "Data Scientist (AI)", efficiency: 1.30, salary: 160000, load: 70, department: "Аналитика" },
  { id: "RES-04", name: "Волков М.А.", role: "Специалист по SEO и таргету", efficiency: 1.05, salary: 90000, load: 100, department: "Маркетинг" },
  { id: "RES-05", name: "Николаева С.Т.", role: "Финансовый консультант", efficiency: 1.10, salary: 110000, load: 50, department: "Консалтинг" }
];

export const initialCorporateRisks: CorporateRisk[] = [
  { id: "RSK-01", title: "Кассовый разрыв из-за задержки дебиторской задолженности", category: "Финансовый", probability: 3, impact: 4, status: "Под наблюдением", mitigation: "Формирование резервного фонда, введение предоплаты 50%" },
  { id: "RSK-02", title: "Дефицит высококвалифицированных разработчиков React/TS", category: "Операционный", probability: 4, impact: 3, status: "Активен", mitigation: "Сотрудничество с ФК №35 по стажировкам, повышение окладов на 10%" },
  { id: "RSK-03", title: "Падение спроса на консалтинг из-за макроэкономики", category: "Рыночный", probability: 2, impact: 3, status: "Под наблюдением", mitigation: "Диверсификация портфеля услуг, упор на IT-разработку" },
  { id: "RSK-04", title: "Изменение налогового законодательства РФ в 2026 г.", category: "Правовой", probability: 3, impact: 2, status: "Под наблюдением", mitigation: "Привлечение внешних аудиторов, налоговое планирование" },
  { id: "RSK-05", title: "Резкое удорожание лицензий зарубежного ПО для серверов", category: "Технологический", category_custom: "Технологический", probability: 4, impact: 4, status: "Активен", mitigation: "Переход на отечественное ПО на базе PostgreSQL, Linux и Node.js" } as any
];

// Локальный алгоритм симуляции (используется как резервный вариант, если Gemini API отсутствует)
export interface SimulationResult {
  revenueForecast: number;
  profitForecast: number;
  roi: number;
  growthRate: number;
  summary: string;
  actionPlan: string[];
}

export function calculateLocalSimulation(systemData: { financials: Financials; projects: Project[] }, scenario: WhatIfScenario): SimulationResult {
  const { financials } = systemData;
  
  // Коэффициенты влияния управленческих параметров на финансовые показатели:
  
  // 1. Изменение маркетинга: рекламный бюджет растет, это повышает выручку по затухающей кривой (закон убывающей доходности)
  const additionalMarketing = financials.marketingBudget * (scenario.marketingMultiplier - 1);
  const marketingEffect = 2.2 * Math.log2(scenario.marketingMultiplier + 0.5) + 0.5; // коэффициент роста выручки
  
  // 2. Влияние цен: умеренное повышение цен растит выручку, но избыточное (выше +25%) снижает клиентскую базу
  let priceEffect = 1 + (scenario.priceAdjustment / 100);
  if (scenario.priceAdjustment > 15) {
    // падение спроса компенсирует рост цены
    const demandDrop = (scenario.priceAdjustment - 15) * 0.012;
    priceEffect = priceEffect * (1 - demandDrop);
  }

  // Рост базы выручки
  let simulatedRevenue = financials.revenue * marketingEffect * priceEffect;
  
  // 3. Наем новых специалистов: увеличивает возможности компании брать проекты. Растит выручку дополнительно
  const capacityEffect = 1 + (scenario.hiredSpecialists * 0.04);
  simulatedRevenue = simulatedRevenue * capacityEffect;

  // РАСХОДНАЯ ЧАСТЬ
  // Базовые операционные косты снижаются на коэффициент оптимизации
  const simulatedOpEx = financials.opEx * (1 - scenario.operationalSavingsFactor / 100);
  
  // Новый рекламный бюджет
  const simulatedMarketingBudget = financials.marketingBudget * scenario.marketingMultiplier;
  
  // Рост зарплатного фонда: базовый ФОТ + новые сотрудники
  const simulatedSalaryExp = financials.salaryExp + (scenario.hiredSpecialists * (scenario.specialistSalary * 3)); // умножаем на 3 месяца (квартал)
  
  const simulatedOtherCosts = financials.otherCosts;
  
  // ИТОГОВЫЕ ЗАТРАТЫ ДО НАЛОГОВ
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

  // Возврат инвестиций маркетинга (ROI)
  const rawRoi = ((simulatedRevenue - financials.revenue) / (simulatedMarketingBudget || 1)) * 100;
  const simulatedRoi = Number(Math.max(-100, Math.min(600, rawRoi)).toFixed(1));
  
  // Темп роста чистой прибыли %
  const simulatedGrowthRate = baseProfit > 0 
    ? Number((((simulatedProfit - baseProfit) / baseProfit) * 100).toFixed(1))
    : 0;

  // Обобщение результатов
  let summary = "";
  const revenueDelta = simulatedRevenue - financials.revenue;
  const profitDelta = simulatedProfit - baseProfit;

  if (profitDelta > 0) {
    summary = `Данный сценарий является экономически эффективным. За счет сбалансированного увеличения маркетинговой активности в ${scenario.marketingMultiplier} раз и корректировки цен на ${scenario.priceAdjustment}% прогнозируется чистый прирост квартальной прибыли на ${Math.round(profitDelta).toLocaleString()} ₽. `;
  } else {
    summary = `Внимание: Сценарий ведет к снижению чистой прибыли на ${Math.round(Math.abs(profitDelta)).toLocaleString()} ₽. Рост операционного ФОТ из-за найма ${scenario.hiredSpecialists} специалистов превышает краткосрочную выгоду от дополнительных продаж. Необходима оптимизация затрат. `;
  }

  if (scenario.operationalSavingsFactor > 10) {
    summary += `Внедрение программы оптимизации издержек позволяет сэкономить ${scenario.operationalSavingsFactor}% затрат, снижая точку безубыточности. `;
  }

  // Пошаговый план
  const actionPlan = [
    `Провести мониторинг эффективности рекламы с текущим кратным мультипликатором (${scenario.marketingMultiplier}x).`,
    scenario.hiredSpecialists > 0 
      ? `Организовать найм ${scenario.hiredSpecialists} специалистов с окладом ${scenario.specialistSalary.toLocaleString()} ₽, распределив их на высокобюджетные проекты.`
      : `Приостановить найм нового персонала во избежание избыточного давления ФОТ на оборотный капитал.`,
    scenario.priceAdjustment !== 0
      ? `Уведомить ключевых заказчиков об изменении тарифной сетки услуг на ${scenario.priceAdjustment}% до конца отчетного периода.`
      : `Сохранить текущие цены стабильными для лояльного удержания долгосрочных заказчиков.`,
    `Реализовать комплекс мер по оптимизации операционных затрат на уровне ${scenario.operationalSavingsFactor}% с помощью автоматизации в КИС.`,
    `Проверить квартальный баланс на кассовые разрывы в связи со смещением ФОТ.`
  ];

  return {
    revenueForecast: Math.round(simulatedRevenue),
    profitForecast: Math.round(simulatedProfit),
    roi: simulatedRoi,
    growthRate: simulatedGrowthRate,
    summary,
    actionPlan
  };
}
