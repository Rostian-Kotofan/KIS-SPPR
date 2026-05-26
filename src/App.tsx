import { useState, useEffect } from "react";
import { LayoutDashboard, Sliders, ShieldAlert, Database, HelpCircle, Building2, Tv, Server, LogOut, UserCheck, ShieldAlert as UserIcon } from "lucide-react";

// Импорт субкомпонентов
import KPIDashboard from "./components/KPIDashboard";
import SimulationCore from "./components/SimulationCore";
import RiskAnalysis from "./components/RiskAnalysis";
import DataCRUD from "./components/DataCRUD";
import LoginScreen, { UserSession } from "./components/LoginScreen";
import UserGuide from "./components/UserGuide";

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
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem("slomo_dss_session");
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState<"dashboard" | "simulation" | "risks" | "data">("dashboard");
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Объединенное реактивно синхронизируемое состояние баз данных с поддержкой localStorage
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("slomo_dss_projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });
  const [financials, setFinancials] = useState<Financials>(() => {
    const saved = localStorage.getItem("slomo_dss_financials");
    return saved ? JSON.parse(saved) : initialFinancials;
  });
  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem("slomo_dss_resources");
    return saved ? JSON.parse(saved) : initialResources;
  });
  const [risksList, setRisksList] = useState<CorporateRisk[]>(() => {
    const saved = localStorage.getItem("slomo_dss_risks");
    return saved ? JSON.parse(saved) : initialCorporateRisks;
  });

  // Эффекты автосохранения при любых изменениях данных
  useEffect(() => {
    localStorage.setItem("slomo_dss_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("slomo_dss_financials", JSON.stringify(financials));
  }, [financials]);

  useEffect(() => {
    localStorage.setItem("slomo_dss_resources", JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem("slomo_dss_risks", JSON.stringify(risksList));
  }, [risksList]);

  // Динамические расчеты для шапки (синхронизация с базой проектов)
  const totalFinancialRevenue = projects.reduce(
    (sum, p) => sum + (p.status === "В разработке" ? p.budget * (p.progress / 100) : p.status === "Завершен" ? p.budget : 0),
    0
  );
  const syncFinancials = {
    ...financials,
    // Выручка компании складывается из крупных ИТ-проектов (весом ~65%) и регулярных сервисных контрактов / лицензий (весом ~35%)
    // Поэтому общий объем признанного проектного дохода масштабируется коэффициентом 1.536 для достижения базового уровня в 62.5 млн руб.
    revenue: totalFinancialRevenue > 0 ? Math.round(totalFinancialRevenue * 1.536) : financials.revenue
  };

  const handleLoginSuccess = (user: UserSession) => {
    setCurrentUser(user);
    localStorage.setItem("slomo_dss_session", JSON.stringify(user));
    // Сбросить активную вкладку, если нет доступа в эту вкладку
    if (!user.permissions.includes(activeTab)) {
      setActiveTab(user.permissions[0] as any);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("slomo_dss_session");
  };

  // Если пользователь не авторизован — показываем экран входа
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div id="app-viewport" className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* 1. БОКОВАЯ НАВИГАЦИОННАЯ ПАНЕЛЬ (Sidebar) */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col justify-between p-5 border-r border-slate-800 flex-shrink-0">
        <div className="space-y-6">
          
          {/* Бренд шапки (логотип slomo.tv) */}
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 font-sans">
              <div className="h-7.5 w-7.5 bg-blue-600 rounded-sm flex items-center justify-center font-bold text-white text-xs tracking-tight shadow-sm shadow-blue-500/25">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="leading-none">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xl font-black tracking-tighter text-white uppercase font-sans">slomo</span>
                  <span className="text-xs font-bold text-red-500 font-mono">.tv</span>
                </div>
                <span className="text-[8px] text-blue-400 font-mono font-bold uppercase tracking-widest block leading-none mt-1">КИС СППР v3.0</span>
              </div>
            </div>
          </div>

          {/* Информационный карточка компании */}
          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200 uppercase tracking-wide text-[10px]">
              <Server className="h-4 w-4 text-blue-400" />
              Статус систем slomo.tv
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-300">
                <span>Линейка систем:</span>
                <span className="text-emerald-400 font-bold font-mono">Arrow / Blackjack</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-300">
                <span>СППР Ядро:</span>
                <span className="text-blue-400 font-bold font-mono">What-If Модель</span>
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-300 font-mono bg-slate-900 px-2 py-1 rounded">
              <span>Производство:</span>
              <span className="text-blue-300 font-bold">ОПТИМАЛЬНО</span>
            </div>
            <button
              id="sidebar-guide-btn"
              onClick={() => setIsGuideOpen(true)}
              className="w-full mt-1.5 py-1.5 px-3 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 font-bold text-[9px] tracking-wide uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Общие приемы работы
            </button>
          </div>

          {/* Меню вкладок (с ограничением прав доступа согласно роли) */}
          <nav id="sidebar-tabs-nav" className="space-y-1">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block px-2 mb-2">Навигационный пульт</span>
            
            {/* Вкладка 1: Рабочий стол */}
            {currentUser.permissions.includes("dashboard") && (
              <button
                id="tab-kpi-btn"
                onClick={() => setActiveTab("dashboard")}
                className={`w-full text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-blue-600 text-white shadow-md font-bold"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
                <span>Мониторинг KPI</span>
              </button>
            )}

            {/* Вкладка 2: Симулятор */}
            {currentUser.permissions.includes("simulation") && (
              <button
                id="tab-simulation-btn"
                onClick={() => setActiveTab("simulation")}
                className={`w-full text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                  activeTab === "simulation"
                    ? "bg-blue-600 text-white shadow-md font-bold"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <Sliders className="h-4 w-4 flex-shrink-0" />
                <span>Симулятор «Что-Если»</span>
              </button>
            )}

            {/* Вкладка 3: Анализ рисков */}
            {currentUser.permissions.includes("risks") && (
              <button
                id="tab-risks-btn"
                onClick={() => setActiveTab("risks")}
                className={`w-full text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                  activeTab === "risks"
                    ? "bg-blue-600 text-white shadow-md font-bold"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <ShieldAlert className="h-4 w-4 flex-shrink-0" />
                <span>Управление рисками</span>
              </button>
            )}

            {/* Вкладка 4: Реестры БД */}
            {currentUser.permissions.includes("data") && (
              <button
                id="tab-data-btn"
                onClick={() => setActiveTab("data")}
                className={`w-full text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                  activeTab === "data"
                    ? "bg-blue-600 text-white shadow-md font-bold"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <Database className="h-4 w-4 flex-shrink-0" />
                <span>Ресурсы и Проекты</span>
              </button>
            )}
          </nav>
        </div>

        {/* Панель активного пользователя и логаут */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="p-2.5 bg-slate-950/50 rounded-lg border border-slate-800 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-300 truncate max-w-[170px]">{currentUser.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] px-1.5 py-0.2 select-none font-bold bg-blue-900 text-blue-300 rounded uppercase tracking-wider font-mono">
                {currentUser.role}
              </span>
              <span className="text-[8px] text-slate-500 font-mono">ID: {currentUser.role === "Администратор" ? "ADM-01" : currentUser.role === "Руководитель" ? "DIR-03" : "ANL-02"}</span>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full py-1.5 px-3 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80 hover:border-slate-700/80 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Выйти из системы
          </button>

          <div className="text-[9px] text-slate-600 text-center font-mono pt-1">
            slomo.tv © 2026 • СППР v3.0
          </div>
        </div>
      </aside>

      {/* 2. ОСНОВНОЙ КОНТЕНТНЫЙ БЛОК (Main Panel) */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Фиксированная шапка проекта */}
        <header className="bg-white border-b border-slate-100 py-3.5 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Корпоративная КИС СППР</span>
            <h2 className="text-xs sm:text-sm font-bold text-slate-700 leading-tight border-l-2 border-blue-600 pl-2">
              Система поддержки принятия управленческих решений компании slomo.tv
            </h2>
          </div>
          
          <div className="flex items-center gap-3 self-start sm:self-center">
            {/* Быстрые статусы баз данных */}
            <div className="flex gap-2.5 text-[10px] font-mono">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded font-bold col-span-1">
                БД Проектов: {projects.length}
              </span>
              <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded font-bold col-span-1">
                Штат: {resources.length}
              </span>
            </div>

            {/* Кнопка "Руководство" */}
            <button
              id="header-guide-btn"
              onClick={() => setIsGuideOpen(true)}
              className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-[9px] tracking-wide uppercase rounded flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-blue-500/20"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Инструкция КИС
            </button>
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
        </div>
      </main>

      {/* Интерактивное руководство пользователя при активации */}
      {isGuideOpen && <UserGuide onClose={() => setIsGuideOpen(false)} />}
    </div>
  );
}
