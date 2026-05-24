import { useState } from "react";
import { LayoutDashboard, Sliders, ShieldAlert, Database, HelpCircle, GraduationCap, Award, Building2 } from "lucide-react";

// Импорт субкомпонентов
import KPIDashboard from "./components/KPIDashboard";
import SimulationCore from "./components/SimulationCore";
import RiskAnalysis from "./components/RiskAnalysis";
import DataCRUD from "./components/DataCRUD";
import ThesisPortal from "./components/ThesisPortal";

// Импорт начальных данных и интерфейсов
import { 
  initialProjects, 
  initialFinancials, 
  initialResources, 
  initialCorporateRisks,
  Project,
  Financials,
  Resource,
  CorporateRisk
} from "./data/systemData";

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "simulation" | "risks" | "data" | "thesis">("thesis");

  // Объединенное реактивно синхронизируемое состояние баз данных
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [financials, setFinancials] = useState<Financials>(initialFinancials);
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [risksList, setRisksList] = useState<CorporateRisk[]>(initialCorporateRisks);

  // Динамические расчеты для шапки (синхронизация с базой проектов)
  const totalFinancialRevenue = projects.reduce((sum, p) => sum + (p.status === "Завершен" || p.status === "В разработке" ? p.budget : 0), 0);
  const syncFinancials = {
    ...financials,
    // Выручка динамически пересчитывается на базе бюджета запущенных проектов
    revenue: totalFinancialRevenue > 0 ? totalFinancialRevenue : financials.revenue
  };

  return (
    <div id="app-viewport" className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* 1. БОКОВАЯ НАВИГАЦИОННАЯ ПАНЕЛЬ (Sidebar) */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col justify-between p-5 border-r border-slate-800 flex-shrink-0">
        <div className="space-y-6">
          
          {/* Бренд шапки */}
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white uppercase">КИС СППР</h1>
              <span className="text-[10px] text-indigo-400 font-mono">Система Колледжа №35</span>
            </div>
          </div>

          {/* Информационный карточка студента */}
          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200 uppercase tracking-wide text-[10px]">
              <GraduationCap className="h-4 w-4 text-indigo-400" />
              Автор проекта
            </div>
            <div>
              <div className="font-bold text-slate-100">Пузаков Р. А.</div>
              <div className="text-[10px] text-slate-400 mt-0.5">ВКР • Специальность 09.02.07</div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-300 font-mono bg-slate-900 px-2 py-1 rounded">
              <span>Группа: ИСИП-46</span>
              <span className="text-indigo-300 font-bold">2026 г.</span>
            </div>
          </div>

          {/* Меню вкладок */}
          <nav className="space-y-1">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block px-2 mb-2">Навигационный пульт</span>
            
            {/* Вкладка 0: Портал ВКР */}
            <button
              onClick={() => setActiveTab("thesis")}
              className={`w-full text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                activeTab === "thesis"
                  ? "bg-indigo-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <Award className="h-4 w-4 flex-shrink-0" />
              <span>Дипломный Портал</span>
            </button>

            {/* Вкладка 1: Рабочий стол */}
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-indigo-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
              <span>Мониторинг KPI</span>
            </button>

            {/* Вкладка 2: Симулятор */}
            <button
              onClick={() => setActiveTab("simulation")}
              className={`w-full text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                activeTab === "simulation"
                  ? "bg-indigo-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <Sliders className="h-4 w-4 flex-shrink-0" />
              <span>Симулятор «Что-Если»</span>
            </button>

            {/* Вкладка 3: Анализ рисков */}
            <button
              onClick={() => setActiveTab("risks")}
              className={`w-full text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                activeTab === "risks"
                  ? "bg-indigo-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <ShieldAlert className="h-4 w-4 flex-shrink-0" />
              <span>Управление рисками</span>
            </button>

            {/* Вкладка 4: Реестры БД */}
            <button
              onClick={() => setActiveTab("data")}
              className={`w-full text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                activeTab === "data"
                  ? "bg-indigo-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <Database className="h-4 w-4 flex-shrink-0" />
              <span>Ресурсы и Проекты</span>
            </button>
          </nav>
        </div>

        {/* Копирайт низа */}
        <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
          ГБПОУ ФК №35 • СППР v2.6
        </div>
      </aside>

      {/* 2. ОСНОВНОЙ КОНТЕНТНЫЙ БЛОК (Main Panel) */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Фиксированная шапка проекта */}
        <header className="bg-white border-b border-slate-100 py-3.5 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Тематика Дипломной работы</span>
            <h2 className="text-xs sm:text-sm font-bold text-slate-700 leading-tight">
              «Создание корпоративной информационной системы для поддержки управленческих решений в организации»
            </h2>
          </div>
          
          {/* Быстрые статусы баз данных */}
          <div className="flex gap-2.5 text-[10px] font-mono self-start sm:self-center">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded font-bold">
              БД Проектов: {projects.length}
            </span>
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded font-bold">
              Штат: {resources.length}
            </span>
          </div>
        </header>

        {/* Скроллируемая область контента */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <KPIDashboard 
              projects={projects} 
              financials={syncFinancials} 
              resources={resources} 
            />
          )}

          {activeTab === "simulation" && (
            <SimulationCore 
              projects={projects} 
              financials={syncFinancials} 
            />
          )}

          {activeTab === "risks" && (
            <RiskAnalysis 
              risksList={risksList} 
              setRisksList={setRisksList} 
            />
          )}

          {activeTab === "data" && (
            <DataCRUD 
              projects={projects} 
              setProjects={setProjects} 
              resources={resources} 
              setResources={setResources} 
            />
          )}

          {activeTab === "thesis" && (
            <ThesisPortal />
          )}
        </div>
      </main>
    </div>
  );
}
