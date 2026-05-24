import { useState, useEffect } from "react";
import { Sliders, Activity, TrendingUp, CheckCircle, AlertTriangle, Info, ShieldAlert, Cpu, BarChart3, Users2 } from "lucide-react";
import { Project, Financials, WhatIfScenario, calculateLocalSimulation, SimulationResult } from "../data/systemData";

interface SimulationCoreProps {
  projects: Project[];
  financials: Financials;
}

export default function SimulationCore({ projects, financials }: SimulationCoreProps) {
  // Базовые параметры сценария симуляции slomo.tv
  const [scenario, setScenario] = useState<WhatIfScenario>({
    marketingMultiplier: 1.0,
    hiredSpecialists: 0,
    specialistSalary: 150000,
    operationalSavingsFactor: 0,
    priceAdjustment: 0
  });

  // Локальная симуляция в реальном времени
  const [localResult, setLocalResult] = useState<SimulationResult | null>(null);

  // Выполнять автоматический сценарный пересчет при каждом сдвиге ползунков
  useEffect(() => {
    const res = calculateLocalSimulation({ financials, projects }, scenario);
    setLocalResult(res);
  }, [scenario, financials, projects]);

  // Расчет базовых показателей (ДО изменений) для сравнения
  const baseExpenses = financials.opEx + financials.marketingBudget + financials.salaryExp + financials.otherCosts;
  const baseProfitBeforeTaxes = financials.revenue - baseExpenses;
  const baseProfit = baseProfitBeforeTaxes * (1 - financials.taxRate / 100);

  // Сравнение прибыли БЫЛО vs СТАЛО
  const profitDifference = localResult ? localResult.profitForecast - baseProfit : 0;
  const isProfitGrowing = profitDifference >= 0;

  // Динамическая SWOT-матрица управленческого сценария
  const getDynamicSwot = () => {
    const strengths = [
      `Гибкий контроль операционных издержек (снижение OpEx на ${scenario.operationalSavingsFactor}%)`,
      scenario.marketingMultiplier > 1.2 
        ? "Повышенное присутствие бренда slomo.tv на отраслевых выставках (IBC / NAB)" 
        : "Высокая точечная эффективность рекламных бюджетов",
      scenario.hiredSpecialists > 2
        ? `Наем +${scenario.hiredSpecialists} инженеров гарантирует своевременное выполнение контрактов`
        : "Использование высокопроизводительного опытного состава без адаптационной нагрузки на ФОТ"
    ];

    const weaknesses = [
      scenario.priceAdjustment > 15
        ? "Высокая цена увеличивает риск проигрыша тендеров зарубежным аналогам"
        : "Текущая ценовая сетка оставляет малый запас маржинальности оборудования",
      scenario.hiredSpecialists > 5
        ? `Быстрый наем специалистов (+${scenario.hiredSpecialists} чел.) временно снижает средний КПД сборки серверов`
        : "Повышенная производственная нагрузка на текущий инженерный состав сборки"
    ];

    const opportunities = [
      "Развитие линейки компактных replay-систем Rip для массового спорта",
      "Экспорт судейских комплексов VAR на новые развивающиеся рынки СНГ и Азии",
      "Оптимизация себестоимости за счет прямых контрактов с азиатскими фабриками ПЛИС"
    ];

    const threats = [
      "Флуктуации обменного курса валют при импорте высокоскоростных SSD и FPGA чипов",
      localResult && localResult.capacityUtilization >= 98
        ? "Красная зона: Срыв дедлайнов сборки Arrow-II из-за физического перегруза мощностей"
        : "Риск простоя дорогостоящего сборочного оборудования при падении спроса",
      "Ужесточение стандартов судейского ПО со стороны футбольных и хоккейных вещательных лиг"
    ];

    return { strengths, weaknesses, opportunities, threats };
  };

  // Выявление динамических рисков при текущих параметрах
  const getDynamicRisks = () => {
    const list = [
      {
        title: "Сбои в поставках FPGA и сигнальных плат",
        impact: "Высокое",
        mitigation: "Поддержание страхового буфера электронных компонентов на складе КИС на 6-9 месяцев вперед."
      }
    ];

    if (scenario.priceAdjustment > 12) {
      list.push({
        title: "Отказ крупных спортивных вещателей от закупки Blackjack",
        impact: "Высокое",
        mitigation: "Применение селективных долгосрочных скидок для ключевых лояльных медиа-холдингов."
      });
    }

    if (scenario.hiredSpecialists > 4 && scenario.marketingMultiplier < 0.9) {
      list.push({
        title: "Разбалансировка бюджета (ФОТ обгоняет Выручку)",
        impact: "Высокое",
        mitigation: "Запуск стимулирующих рекламных акций для загрузки новых сотрудников новыми заказами."
      });
    } else if (scenario.hiredSpecialists > 5) {
      list.push({
        title: "Снижение эффективности труда новичков",
        impact: "Среднее",
        mitigation: "Внедрение автоматизированных тест-стендов для быстрой предпродажной проверки серверов slomo.tv."
      });
    }

    if (scenario.marketingMultiplier > 2.2 && scenario.hiredSpecialists < 2) {
      list.push({
        title: "Физический срыв поставок серверов (Нехватка рук)",
        impact: "Очень высокое",
        mitigation: "Срочный наем контрактных монтажников или аутсорсинг сборки стандартных шасси."
      });
    }

    return list;
  };

  const swot = getDynamicSwot();
  const activeRisks = getDynamicRisks();

  // Рассчитаем условные физические объемы спроса и мощностей
  const baseDemandValue = Math.round(financials.revenue * (1 + 0.38 * Math.log(scenario.marketingMultiplier + 0.01)));
  const baseCapacityValue = Math.round(financials.revenue * 1.15 * ((8 + scenario.hiredSpecialists) / 8));

  return (
    <div id="simulation-core-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* ЛЕВАЯ ПАНЕЛЬ: Ползунки рычагов управления */}
      <div className="lg:col-span-4 bg-white rounded-xl border border-slate-100 p-5 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sliders className="h-5 w-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-800">Управленческие рычаги slomo.tv</h3>
        </div>

        {/* Рычаг 1: Маркетинг (Выставки & Демонстрации) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              Бюджет продвижения (выставки)
            </span>
            <span className="font-mono text-blue-600 font-bold">
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
            className="w-full accent-blue-600 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">Стимулирует клиентский спрос. Имеет эффект затухания при перегрузке рекламы.</p>
        </div>

        {/* Рычаг 2: Наем инженеров сборки */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Наем специалистов сборки</span>
            <span className="font-mono text-blue-600 font-bold">
              +{scenario.hiredSpecialists} чел.
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="1"
            value={scenario.hiredSpecialists}
            onChange={(e) => setScenario({ ...scenario, hiredSpecialists: parseInt(e.target.value) })}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-slate-400">Предлагаемый оклад инженера</span>
            <span className="text-[10px] font-mono font-bold text-slate-600">{scenario.specialistSalary.toLocaleString()} ₽ / мес</span>
          </div>
          <input
            type="range"
            min="90000"
            max="250000"
            step="10000"
            value={scenario.specialistSalary}
            onChange={(e) => setScenario({ ...scenario, specialistSalary: parseInt(e.target.value) })}
            className="w-full accent-slate-500 cursor-pointer"
            disabled={scenario.hiredSpecialists === 0}
          />
          <p className="text-[10px] text-slate-400">Повышает лимит сборки серверов Blackjack/Arrow, увеличивая квартальный ФОТ.</p>
        </div>

        {/* Рычаг 3: Оптимизация производственных расходов */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Оптимизация OpEx (процессы)</span>
            <span className="font-mono text-blue-600 font-bold">
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
            className="w-full accent-blue-600 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">Экономия на админ-расходах, лицензиях САПР систем проектирования плат.</p>
        </div>

        {/* Рычаг 4: Изменение цен на оборудование */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Изменение отпускных цен</span>
            <span className="font-mono text-blue-600 font-bold">
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
            className="w-full accent-blue-600 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">Влияет на рентабельность сервера. Рост цены свыше +10% резко сбивает спрос.</p>
        </div>

        <div className="p-4.5 bg-slate-50 border border-slate-100 rounded-xl space-y-3.5">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="h-4 w-4 text-blue-600" />
            Механика симулятора
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            В отличие от упрощенных линейных моделей, данный процессор СППР slomo.tv задействует 
            <strong className="text-blue-600 font-semibold"> закон рыночной эластичности цен</strong> и 
            <strong className="text-blue-600 font-semibold"> барьер производственных ограничений (Capacity-Constraint)</strong>.
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Вы не можете бесконечно повышать выручку только маркетингом без расширения штата сборщиков, равно как и раздувать штат при отсутствии лидов.
          </p>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Сценарный процессор и прогнозы */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Панель быстрого финансового сравнения (Было / Стало) */}
        <div className="bg-slate-900 text-white p-5 rounded-xl shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5 mb-4">
            <Activity className="h-4 w-4" /> ИНТЕЛЛЕКТУАЛЬНЫЙ СЦЕНАРНЫЙ АНАЛИЗАТОР «ЧТО-ЕСЛИ»
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* БАЗА БЫЛО */}
            <div className="p-4 bg-slate-800/60 rounded-lg border border-slate-700/50">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">БАЗОВЫЙ ОПЕРАЦИОННЫЙ КВАРТАЛ</span>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Валовая Выручка:</span>
                  <span className="font-mono font-bold text-slate-200">{financials.revenue.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Операционные Затраты:</span>
                  <span className="font-mono text-slate-300">{baseExpenses.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-700/60 mt-1.5">
                  <span className="font-semibold text-slate-200">Чистая Прибыль:</span>
                  <span className="font-mono text-emerald-400 font-bold">{Math.round(baseProfit).toLocaleString()} ₽</span>
                </div>
              </div>
            </div>

            {/* ПРОГНОЗ СТАЛО */}
            <div className="p-4 bg-blue-950/40 rounded-lg border border-blue-500/30">
              <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">ПРОГНОЗ ПОСЛЕ ВНЕДРЕНИЯ МЕР</span>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Прогнозная Выручка:</span>
                  <span className="font-mono font-bold text-white">
                    {localResult ? localResult.revenueForecast.toLocaleString() : "..."} ₽
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Прогнозные Издержки:</span>
                  <span className="font-mono text-slate-200">
                    {localResult ? (localResult.revenueForecast - localResult.profitForecast / (1 - financials.taxRate/100)).toLocaleString() : "..."} ₽
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-blue-900 mt-1.5">
                  <span className="font-semibold text-white flex items-center gap-1">
                    Ожидаемая прибыль:
                    {localResult && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${isProfitGrowing ? 'bg-emerald-900/60 text-emerald-400' : 'bg-rose-900/60 text-rose-400'}`}>
                        {isProfitGrowing ? "+" : ""}{Math.round(profitDifference).toLocaleString()}
                      </span>
                    )}
                  </span>
                  <span className={`font-mono font-bold text-base ${isProfitGrowing ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {localResult ? localResult.profitForecast.toLocaleString() : "..."} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* БАЛАНСИРОВКА СПРОСА И МОЩНОСТЕЙ */}
        {localResult && (
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Баланс Рыночного Спроса и Выпуска</span>
              <div className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 mt-1.5">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                {localResult.demandStatus}
              </div>
              <p className="text-[11px] text-slate-400">Соотношение заказов к темпу сборки цехов</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                <span>Утилизация мощностей:</span>
                <span className="font-mono font-bold text-blue-600">{localResult.capacityUtilization}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-1">
                <div 
                  className={`h-full transition-all duration-500 ${localResult.capacityUtilization > 95 ? 'bg-rose-500 animate-pulse' : 'bg-blue-600'}`}
                  style={{ width: `${localResult.capacityUtilization}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>0% - Простой</span>
                <span>100% - Полная нагрузка</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100/80 space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Рын. спрос:</span>
                <span className="font-bold text-slate-700">~{baseDemandValue.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Макс. выпуск:</span>
                <span className="font-bold text-slate-700">~{baseCapacityValue.toLocaleString()} ₽</span>
              </div>
              <p className="text-[9px] text-center text-slate-400">Фактическая выручка = минимум из двух параметров</p>
            </div>

          </div>
        )}

        {/* ЭКСПЕРТНЫЙ МАТЕМАТИЧЕСКИЙ ОТЧЕТ СППР */}
        {localResult && (
          <div className="space-y-6">
            
            {/* Карточка экспертного разбора */}
            <div id="expert-report-section" className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Cpu className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-800">Математическое резюме сценарного планирования slomo.tv</h3>
              </div>

              {/* Аннотация */}
              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-600 space-y-1">
                <h4 className="text-xs uppercase font-bold text-blue-900 tracking-wider">Резюме для Административного Аппарата и Кафедры</h4>
                <p className="text-sm text-slate-700 leading-relaxed mt-1 font-medium">{localResult.summary}</p>
              </div>

              {/* Расчётные финансовые индикаторы */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Прогноз Выручки</span>
                  <div className="text-sm font-bold font-mono text-slate-800 mt-1">
                    {localResult.revenueForecast.toLocaleString()} ₽
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Рентабельность (ROS)</span>
                  <div className="text-sm font-bold font-mono text-slate-800 mt-1">
                    {localResult.revenueForecast > 0 ? ((localResult.profitForecast / localResult.revenueForecast) * 100).toFixed(1) : "0"}%
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Маркетинговый ROI</span>
                  <div className="text-sm font-bold font-mono text-blue-600 mt-1">
                    {localResult.roi}%
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Динамика чистой прибыли</span>
                  <div className={`text-sm font-bold font-mono mt-1 ${localResult.growthRate >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {localResult.growthRate >= 0 ? "+" : ""}{localResult.growthRate}%
                  </div>
                </div>
              </div>

              {/* SWOT-анализ внедрения решения */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-indigo-600" /> Систематизированная SWOT-матрица прогноза
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">S - Сильные стороны</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1 leading-relaxed">
                      {swot.strengths.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="p-4 bg-amber-50/40 border border-amber-100 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">W - Слабые стороны</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1 leading-relaxed">
                      {swot.weaknesses.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">O - Возможности развития</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1 leading-relaxed">
                      {swot.opportunities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Threats */}
                  <div className="p-4 bg-rose-50/40 border border-rose-100 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">T - Потенциальные Угрозы</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1 leading-relaxed">
                      {swot.threats.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Оценка дополнительных Рисков */}
              {activeRisks.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-amber-500" /> Выявленные операционные риски сценария
                  </h4>
                  <div className="overflow-x-auto border border-slate-100 rounded-lg">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-500 uppercase">
                        <tr>
                          <th className="p-3">Финансовый / производственный риск</th>
                          <th className="p-3 text-center">Степень влияния</th>
                          <th className="p-3">Компенсирующее корпоративное мероприятие</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600">
                        {activeRisks.map((risk, i) => (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="p-3 font-semibold text-slate-700">{risk.title}</td>
                            <td className="p-3 text-center">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                risk.impact.includes("Очень") || risk.impact === "Высокое" 
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
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-500" /> План реализации экспертных рекомендаций СППР
                </h4>
                <div className="space-y-2">
                  {localResult.actionPlan.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
