import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { DollarSign, Briefcase, Users, TrendingUp, AlertTriangle, Percent } from "lucide-react";
import { Project, Financials, Resource } from "../data/systemData";

interface KPIDashboardProps {
  projects: Project[];
  financials: Financials;
  resources: Resource[];
}

export default function KPIDashboard({ projects, financials, resources }: KPIDashboardProps) {
  // Вычисляем показатели на основе текущего состояния баз данных
  const activeProjectsCount = projects.filter(p => p.status === "В разработке").length;
  const completedProjectsCount = projects.filter(p => p.status === "Завершен").length;
  const totalStaffSalary = resources.reduce((sum, r) => sum + r.salary, 0);
  
  // Квартальный ФОТ на базе ресурсов (оклад * 3 месяца)
  const calculatedSalaryFOT = totalStaffSalary * 3;
  const currentFOT = financials.salaryExp > 0 ? financials.salaryExp : calculatedSalaryFOT;

  // Рассчитываем общие затраты организации
  const totalCosts = financials.opEx + financials.marketingBudget + currentFOT + financials.otherCosts;
  
  // Прибыль до налогов
  const ebt = Math.max(0, financials.revenue - totalCosts);
  const taxesAmount = ebt * (financials.taxRate / 100);
  const netProfit = ebt - taxesAmount;
  
  // Рентабельность (ROS %)
  const profitabilityMargin = financials.revenue > 0 ? ((netProfit / financials.revenue) * 100).toFixed(1) : "0";

  // Диаграмма структуры расходов организации (Pie Chart)
  const pieData = [
    { name: "Операционные издержки (OpEx)", value: financials.opEx, color: "#2563eb" },
    { name: "Фонд оплаты труда (ФОТ)", value: currentFOT, color: "#10b981" },
    { name: "Маркетинг и реклама", value: financials.marketingBudget, color: "#f59e0b" },
    { name: "Прочие расходы", value: financials.otherCosts, color: "#ec4899" },
    { name: "Налоги (" + financials.taxRate + "%)", value: Math.round(taxesAmount), color: "#ef4444" }
  ];

  // Динамика квартальных доходов ООО "Сломо.ТВ" (Line Chart)
  const lineData = [
    { name: "I Кв 2025", Выручка: 48000000, Расходы: 39500000, Прибыль: 6800000 },
    { name: "II Кв 2025", Выручка: 54000000, Расходы: 42000000, Прибыль: 9600000 },
    { name: "III Кв 2025", Выручка: 59000000, Расходы: 46000000, Прибыль: 10400000 },
    { name: "IV Кв 2025", Выручка: 68000000, Расходы: 51500000, Прибыль: 13200000 },
    { name: "I Кв 2026", Выручка: financials.revenue, Расходы: Math.round(totalCosts), Прибыль: Math.round(netProfit) }
  ];

  return (
    <div id="kpi-dashboard-root" className="space-y-6">
      {/* Шапка раздела */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Панель мониторинга показателей (Executive Dashboard)</h2>
        <p className="text-sm text-slate-500 mt-1">
          Консолидация текущего операционного состояния коммерческой организации за текущий отчетный квартал
        </p>
      </div>

      {/* Верхние информационные карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Карточка 1: Выручка */}
        <div id="card-revenue" className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-slate-400">Квартальная Выручка</span>
            <div className="text-2xl font-bold font-mono text-slate-800">
              {financials.revenue.toLocaleString()} ₽
            </div>
            <span className="text-xs text-emerald-600 font-medium">↑ 5.6% с прошлого кв.</span>
          </div>
          <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        {/* Карточка 2: Расходы */}
        <div id="card-expenses" className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-slate-400">Общие издержки</span>
            <div className="text-2xl font-bold font-mono text-slate-800">
              {Math.round(totalCosts).toLocaleString()} ₽
            </div>
            <span className="text-xs text-rose-500 font-medium">Операционный ФОТ учтен</span>
          </div>
          <div className="h-12 w-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>

        {/* Карточка 3: Чистая прибыль */}
        <div id="card-profit" className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-slate-400">Чистая Прибыль</span>
            <div className="text-2xl font-bold font-mono text-emerald-600">
              {Math.round(netProfit).toLocaleString()} ₽
            </div>
            <span className="text-xs text-blue-600 font-medium">После налога {financials.taxRate}%</span>
          </div>
          <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>

        {/* Карточка 4: Рентабельность */}
        <div id="card-margin" className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-slate-400">Рентабельность (ROS)</span>
            <div className="text-2xl font-bold font-mono text-blue-600">
              {profitabilityMargin}%
            </div>
            <span className="text-xs text-slate-500">Управленческая норма &gt; 15%</span>
          </div>
          <div className="h-12 w-12 bg-violet-50 rounded-lg flex items-center justify-center text-violet-600">
            <Percent className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Операционная сводка и портфель проектов */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-blue-950 text-white rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs text-blue-200 uppercase font-bold tracking-wider">Корпоративный статус</span>
            <h3 className="text-lg font-bold mt-1">Организационный профиль</h3>
            <p className="text-blue-100 text-sm mt-3 leading-relaxed">
              Информационная система завершила интеграционный сбор данных. Проектный портфель насчитывает{" "}
              <strong>{projects.length}</strong> активных контрактов, из которых{" "}
              <strong>{activeProjectsCount}</strong> находятся в фазе активного проектирования и разработки.
            </p>
          </div>
          
          <div className="border-t border-blue-900 pt-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold font-mono">{activeProjectsCount}</div>
              <div className="text-[10px] text-blue-200">В работе</div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono">{completedProjectsCount}</div>
              <div className="text-[10px] text-blue-200">Сдано</div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono">{resources.length}</div>
              <div className="text-[10px] text-blue-200">Сотрудников</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-500">
              <Briefcase className="h-4 w-4" />
              <span className="text-sm font-medium">Капитализация проектов</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-800">
              {projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()} ₽
            </div>
            <p className="text-xs text-slate-400">Общая сумма активных договоров компании</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-500">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Месячный окладной фонд</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-800">
              {(totalStaffSalary).toLocaleString()} ₽ / мес
            </div>
            <p className="text-xs text-emerald-600 font-medium">Средняя загрузка штата: 80%</p>
          </div>
        </div>
      </div>

      {/* Блок графиков */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* График 1: Квартальная динамика доходов */}
        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-xs">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Динамика выручки и чистой прибыли (2025 - 2026)
          </h3>
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(val) => `${(val / 1000000).toFixed(1)}М`} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value: any) => [`${Math.round(value).toLocaleString()} ₽`]} 
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", border: "none", color: "#fff" }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "15px" }} />
                <Line type="monotone" dataKey="Выручка" stroke="#2563eb" strokeWidth={3} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Прибыль" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* График 2: Структура расходов */}
        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-xs">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Percent className="h-4 w-4 text-blue-600" />
            Управленческая структура затрат компании (%)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center h-80 gap-4">
            {/* Круговой рендеринг */}
            <div className="sm:col-span-6 h-64 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${Math.round(value).toLocaleString()} ₽`]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Легенда с расшифровкой долей */}
            <div className="sm:col-span-6 space-y-3">
              {pieData.map((item, index) => {
                const percentage = totalCosts > 0 ? ((item.value / totalCosts) * 100).toFixed(1) : "0";
                return (
                  <div key={index} className="flex items-start gap-2">
                    <span className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="text-xs">
                      <div className="font-semibold text-slate-700">{item.name}</div>
                      <div className="text-slate-500 font-mono">
                        {item.value.toLocaleString()} ₽ ({percentage}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
