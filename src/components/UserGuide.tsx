import React, { useState } from "react";
import { 
  BookOpen, 
  HelpCircle, 
  ShieldCheck, 
  LayoutDashboard, 
  Sliders, 
  ShieldAlert, 
  Database, 
  X, 
  ArrowRight,
  Info,
  CheckCircle,
  AlertTriangle,
  Play,
  Users,
  Lock,
  Eye,
  Check,
  Minus
} from "lucide-react";

interface UserGuideProps {
  onClose: () => void;
}

export default function UserGuide({ onClose }: UserGuideProps) {
  const [activeSection, setActiveSection] = useState<"intro" | "auth" | "roles" | "kpi" | "whatif" | "risks" | "data">("intro");

  const [selectedRoleMatrix, setSelectedRoleMatrix] = useState<"admin" | "director" | "analyst">("admin");

  const sections = [
    {
      id: "intro" as const,
      title: "Аналитическое введение",
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      id: "auth" as const,
      title: "1. Вход в систему (приложение)",
      icon: ShieldCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      id: "roles" as const,
      title: "2. Роли в системе",
      icon: Users,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10"
    },
    {
      id: "kpi" as const,
      title: "3. Мониторинг KPI",
      icon: LayoutDashboard,
      color: "text-violet-500",
      bg: "bg-violet-500/10"
    },
    {
      id: "whatif" as const,
      title: "4. Сценарный анализ «What-If»",
      icon: Sliders,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      id: "risks" as const,
      title: "5. Оценка и симуляция рисков",
      icon: ShieldAlert,
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    {
      id: "data" as const,
      title: "6. Ведение реестров (CRUD)",
      icon: Database,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10"
    }
  ];

  return (
    <div id="user-guide-overlay" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all animate-fade-in font-sans">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Шапка справочной панели */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white tracking-tight shadow-md shadow-blue-500/30">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight uppercase">Интерактивное руководство пользователя</h2>
              <p className="text-[10px] text-slate-400 font-mono">
                КИС СППР slomo.tv • РАЗДЕЛ: ОБЩИЕ ПРИЕМЫ РАБОТЫ С СИСТЕМОЙ
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Основной двухколоночный контейнер */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-slate-50 dark:bg-slate-950">
          
          {/* Боковая колонка разделов */}
          <div className="w-full md:w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-1.5 flex-shrink-0 overflow-y-auto">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-2">
              Оглавление руководства
            </div>
            {sections.map((sect) => {
              const Icon = sect.icon;
              return (
                <button
                  key={sect.id}
                  onClick={() => setActiveSection(sect.id)}
                  className={`w-full text-left p-3 rounded-xl flex items-center gap-3 text-xs font-semibold transition-all cursor-pointer ${
                    activeSection === sect.id
                      ? "bg-blue-600 text-white shadow-md font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${activeSection === sect.id ? "bg-white/10 text-white" : `${sect.bg} ${sect.color}`}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="truncate">{sect.title}</span>
                </button>
              );
            })}
            
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/60 text-center">
              <div className="text-[10px] bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 font-mono">
                Материал подготовлен для защиты ВКР
              </div>
            </div>
          </div>

          {/* Правая колонка содержимого */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 dark:border-l dark:border-slate-800 text-xs sm:text-sm leading-relaxed">
            
            {/* Раздел: Введение */}
            {activeSection === "intro" && (
              <div className="space-y-4 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-wide">
                  <Info className="h-3.5 w-3.5" /> Назначение КИС СППР
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Концептуальное описание системы slomo.tv
                </h3>
                <p>
                  Разработанная <strong>Корпоративная Информационная Система Поддержки Принятия Решений (КИС СППР v3.0)</strong> предназначена для автоматизации процессов стратегического планирования на предприятии <strong>ООО "СЛОМО.ТВ"</strong>. Система решает ключевой парадокс планирования: балансировку портфеля перспективных НИОКР-проектов спортивного телевещания с ограничениями собственных производственных ресурсов (инженеров, схемотехников, программистов ПЛИС) и жестким контролем финансовых рисков.
                </p>
                
                <h4 className="font-bold text-slate-900 dark:text-white mt-6 mb-2">Общая идеология интерфейса:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                    <div className="font-bold text-slate-900 dark:text-white mb-1.5">Реактивное связывание</div>
                    <p className="text-xs text-slate-500">
                      Все модули (KPI, Симулятор, Риски, CRUD) объединены в единое информационное ядро. Изменения в одном узле реактивно каскадируются по всей системе.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                    <div className="font-bold text-slate-900 dark:text-white mb-1.5">Простота и Наглядность</div>
                    <p className="text-xs text-slate-500">
                      Сложные математические модели оптимизации (распределение ресурсов, расчет критичности рисков, симуляция Монте-Карло) превращены в наглядные интерактивные графики и дашборды.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50 flex gap-3 text-xs text-blue-800 dark:text-blue-200">
                  <BookOpen className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold block mb-1">Как использовать эту инструкцию при защите диплома:</span>
                    Данный материал содержит готовые формулировки, методологию и алгоритмы работы системы. Вы можете использовать скриншоты разделов КИС СППР совместно с текстовыми пояснениями для успешного доклада перед государственной экзаменационной комиссией.
                  </div>
                </div>
              </div>
            )}

            {/* Раздел: Авторизация и роли */}
            {activeSection === "auth" && (
              <div className="space-y-4 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-wide">
                  <ShieldCheck className="h-3.5 w-3.5" /> Безопасность и Доступ
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Вход в систему и ролевая политика доступа (RBAC)
                </h3>
                <p>
                  Для обеспечения информационной безопасности и разделения зон ответственности в организации внедрена ролевая модель управления доступом (Role-Based Access Control). Авторизоваться в системе можно с помощью предустановленных аналитических ролей:
                </p>

                <div className="space-y-3 mt-4">
                  <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4">
                    <div className="px-2 py-1 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs font-bold font-mono rounded select-none">ADMIN</div>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white">Администратор (admin@slomo.tv / пароль: admin)</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Обладает максимальными привилегиями. Имеет доступ к Мониторингу KPI, Симулятору «Что-Если», Оценке рисков и прямому редактированию НСИ (Нормативно-справочной информации) через CRUD-реестры проектов и кадров.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4">
                    <div className="px-2 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-bold font-mono rounded select-none">DIRECTOR</div>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white">Руководитель производства (director@slomo.tv / пароль: director)</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Фокусируется на общей картине. Доступны: Мониторинг KPI, моделирование сценариев Симулятора, реестры данных. Раздел детального технического анализа и добавления рисков скрыт в целях минимизации избыточности рабочего пространства.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4">
                    <div className="px-2 py-1 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400 text-xs font-bold font-mono rounded select-none">ANALYST</div>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white">Ведущий аналитик (analyst@slomo.tv / пароль: analyst)</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Проводит глубокие расчеты. Доступны: Мониторинг KPI, Аналитический симулятор, детальная Карта рисков с симуляцией Монте-Карло. Прямой доступ к редактированию первичной базы данных проектов (CRUD реестров) закрыт для предотвращения случайного искажения статистики.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-200 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-1">Прием работы:</span>
                    Для тестирования ролей нажмите кнопку «Выйти из системы» в нижнем левом углу, выберите нужного демо-пользователя на пульте и авторизуйтесь повторно. Боковая навигационная панель мгновенно перестроится, заблокировав запрещенные экраны.
                  </div>
                </div>
              </div>
            )}

            {/* Раздел: Роли в системе */}
            {activeSection === "roles" && (
              <div className="space-y-5 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase tracking-wide">
                  <Users className="h-3.5 w-3.5" /> Ролевое разграничение прав
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Матрица прав доступа и должностные обязанности участников
                </h3>
                <p>
                  Корпоративная СППР компании <strong>ООО "СЛОМО.ТВ"</strong> реализует архитектуру ролевого управления (<strong>RBAC — Role-Based Access Control</strong>). Это исключает риски несанкционированного изменения справочников стоимости и параметров рисков, а также оптимизирует интерфейс под конкретные задачи каждого специалиста на производстве систем многоканальной записи и повторов.
                </p>

                {/* Таблица-матрица прав для диплома */}
                <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/40">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold uppercase tracking-wider text-[10px]">
                        <th className="p-3">Функциональный модуль КИС</th>
                        <th className="p-3 text-red-600 dark:text-red-400">Сист. Администратор</th>
                        <th className="p-3 text-blue-600 dark:text-blue-400">Руководитель производит.</th>
                        <th className="p-3 text-violet-600 dark:text-violet-400">Ведущий аналитик</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-700 dark:text-slate-350">
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Панель показателей (KPI Dashboard)</td>
                        <td className="p-3"><span className="inline-flex items-center gap-1 font-bold text-emerald-500"><Check className="h-4 w-4" /> Полный доступ</span></td>
                        <td className="p-3"><span className="inline-flex items-center gap-1 font-bold text-emerald-500"><Check className="h-4 w-4" /> Полный доступ</span></td>
                        <td className="p-3"><span className="inline-flex items-center gap-1 font-bold text-emerald-500"><Check className="h-4 w-4" /> Полный доступ</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Сценарный симулятор «What-If»</td>
                        <td className="p-3"><span className="inline-flex items-center gap-1 font-bold text-emerald-500"><Check className="h-4 w-4" /> Полный доступ</span></td>
                        <td className="p-3"><span className="inline-flex items-center gap-1 font-bold text-emerald-500"><Check className="h-4 w-4" /> Полный доступ</span></td>
                        <td className="p-3"><span className="inline-flex items-center gap-1 font-bold text-emerald-500"><Check className="h-4 w-4" /> Полный доступ</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Карта рисков и Монте-Карло</td>
                        <td className="p-3"><span className="inline-flex items-center gap-1 font-bold text-emerald-500"><Check className="h-4 w-4" /> Полный доступ</span></td>
                        <td className="p-3 text-slate-400 dark:text-slate-600"><span className="inline-flex items-center gap-1"><Minus className="h-3.5 w-3.5" /> Скрыто</span></td>
                        <td className="p-3"><span className="inline-flex items-center gap-1 font-bold text-emerald-500"><Check className="h-4 w-4" /> Полный доступ</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Регулирование баз НСИ (CRUD Реестры)</td>
                        <td className="p-3"><span className="inline-flex items-center gap-1 font-bold text-emerald-500"><Check className="h-4 w-4" /> Чтение + Запись</span></td>
                        <td className="p-3"><span className="inline-flex items-center gap-1 font-bold text-indigo-500"><Check className="h-4 w-4" /> Только Чтение</span></td>
                        <td className="p-3 text-slate-400 dark:text-slate-600"><span className="inline-flex items-center gap-1"><Minus className="h-3.5 w-3.5" /> Скрыто</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Интерактивный интерактор ролей для более крутой оценки комиссии */}
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide">Должностной функционал:</span>
                    <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-lg gap-1">
                      <button 
                        onClick={() => setSelectedRoleMatrix("admin")}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all cursor-pointer ${selectedRoleMatrix === "admin" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-white"}`}
                      >
                        Администратор
                      </button>
                      <button 
                        onClick={() => setSelectedRoleMatrix("director")}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all cursor-pointer ${selectedRoleMatrix === "director" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-white"}`}
                      >
                        Руководитель
                      </button>
                      <button 
                        onClick={() => setSelectedRoleMatrix("analyst")}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all cursor-pointer ${selectedRoleMatrix === "analyst" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-white"}`}
                      >
                        Ведущий аналитик
                      </button>
                    </div>
                  </div>

                  {selectedRoleMatrix === "admin" && (
                    <div className="space-y-3 prose dark:prose-invert text-xs">
                      <div>
                        <strong className="text-slate-900 dark:text-white block mb-0.5">Ключевая задача в бизнес-архитектуре:</strong>
                        Обеспечение целостности нормативно-справочной базы данных (НСИ) КИС, внесение утвержденной стоимости контрактов, добавление новых инженеров в системный реестр, аудит безопасности.
                      </div>
                      <div>
                        <strong className="text-slate-900 dark:text-white block mb-0.5">Режим работы с реестрами:</strong>
                        Обладает правами внесения (Create), редактирования (Update) и каскадного удаления (Delete) записей в базе данных проектов и кадров. Любое его изменение немедленно влияет на финансовые балансы дашборда КИС.
                      </div>
                    </div>
                  )}

                  {selectedRoleMatrix === "director" && (
                    <div className="space-y-3 prose dark:prose-invert text-xs">
                      <div>
                        <strong className="text-slate-900 dark:text-white block mb-0.5">Ключевая задача в бизнес-архитектуре:</strong>
                        Глобальное отслеживание рентабельности портфеля проектов slomo.tv, принятие решений об открытии вакансий дефицитных специалистов на конвейере с целью снятия перегрузки штата.
                      </div>
                      <div>
                        <strong className="text-slate-900 dark:text-white block mb-0.5">Режим работы с реестрами:</strong>
                        Обладает правами только чтения справочников для исключения случайной порчи финансовых отчётов. Для него закрыта детальная карта математических рисков с целью скрытия лишней научно-исследовательской информации и разгрузки рабочего места.
                      </div>
                    </div>
                  )}

                  {selectedRoleMatrix === "analyst" && (
                    <div className="space-y-3 prose dark:prose-invert text-xs">
                      <div>
                        <strong className="text-slate-900 dark:text-white block mb-0.5">Ключевая задача в бизнес-архитектуре:</strong>
                        Глубокий анализ рисков производства и поставок ПЛИС процессоров, математическое симулирование непредвиденных издержек методом случайных испытаний Монте-Карло, стресс-тестирование маржинальности.
                      </div>
                      <div>
                        <strong className="text-slate-900 dark:text-white block mb-0.5">Режим работы с реестрами:</strong>
                        Освобожден от работы со справочниками кадров и проектов. Все его усилия сфокусированы на тонкой калибровке вероятностных характеристик рисков в специальной аналитической матрице.
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-xs">
                  <span className="font-bold block mb-1">Ценность для диплома:</span>
                  Внедрение модели ролей доказывает надежность ИС и защищенность коммерческих данных предприятия в соответствии с требованиями стандартов информационной безопасности.
                </div>
              </div>
            )}

            {/* Раздел: Мониторинг KPI */}
            {activeSection === "kpi" && (
              <div className="space-y-4 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 font-bold text-[10px] uppercase tracking-wide">
                  <LayoutDashboard className="h-3.5 w-3.5" /> Рабочий стол
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Мониторинг KPI и оперативная оценка состояния
                </h3>
                <p>
                  Главный экран является стратегической панелью руководства ООО "СЛОМО.ТВ". На нем агрегируется текущая информация о состоянии проектов и распределении бюджета в реальном времени.
                </p>

                <h4 className="font-bold text-slate-900 dark:text-white mt-6 mb-2">Объекты визуализации:</h4>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Карты ключевых метрик:</strong> Выводят маржинальность (в %), совокупную выручку, количество текущих проектов и штатную укомплектованность.
                  </li>
                  <li>
                    <strong>Интерактивный график выручки и бюджетов (Recharts):</strong> Отражает баланс доходов и плановых расходов по кварталам текущего года. При наведении курсора мыши на столбцы высвечивается всплывающая подсказка с точной суммой.
                  </li>
                  <li>
                    <strong>Радарная диаграмма укомплектованности :</strong> Наглядно отображает диспропорцию в штате инженеров. Позволяет оперативно выявить критический дефицит разработчиков (например, схемотехников или FPGA-программистов).
                  </li>
                  <li>
                    <strong>Портфельный статус проектов:</strong> Индикатор прогресса в реальном времени (в процентах с цветовым кодированием готовности).
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-violet-50 dark:bg-violet-950/30 rounded-xl border border-violet-100 dark:border-violet-900/50 text-violet-800 dark:text-violet-200 flex items-start gap-3">
                  <Info className="h-5 w-5 text-violet-500 flex-shrink-0" />
                  <div>
                    <span className="font-bold block mb-1">Прием работы:</span>
                    При добавлении нового проекта во вкладке "Ресурсы и Проекты" плановые финансовые показатели на дашборде KPI автоматически масштабируются и пересчитываются за счет механизма реактивных хуков React.
                  </div>
                </div>
              </div>
            )}

            {/* Раздел: Сценарный анализ */}
            {activeSection === "whatif" && (
              <div className="space-y-4 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold text-[10px] uppercase tracking-wide">
                  <Sliders className="h-3.5 w-3.5" /> Симулятор решений
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Проведение сценарного моделирования «What-If»
                </h3>
                <p>
                  Симулятор решений — это интеллектуальное ядро нашей СППР. Он использует математическую модель прогнозирования, чтобы предсказать успешность портфеля проектов на основе изменения ключевых параметров внешней и внутренней среды организации.
                </p>

                <h4 className="font-bold text-slate-900 dark:text-white mt-6 mb-2">Группы переключателей (параметров):</h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                    <strong>Внешние факторы:</strong> Изменение спроса на спортивные видеоповторы в СНГ и мире (от -30% до +50%), инфляция стоимости редких электронных компонентов и микросхем ПЛИС.
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                    <strong>Внутреннее распределение:</strong> Выделение дополнительных бюджетов на НИОКР (R&D), наем узкопрофильных инженеров-разработчиков плат, расширение сборочного цеха.
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 dark:text-white mt-6 mb-2">Аналитический выход симулятора:</h4>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>KPI Радар (Сравнение «План vs Симуляция»):</strong> Многоугольник на радарной диаграмме позволяет увидеть, насколько симулированный сценарий превышает или уступает текущему плану по прибыли, скорости выхода на рынок (Time-to-Market) и надежности.
                  </li>
                  <li>
                    <strong>Автоматически генерируемый SWOT-Анализ:</strong> Система оценивает выставленные ползунки и мгновенно перестраивает SWOT-матрицу (Сильные/Слабые стороны, Возможности/Угрозы компании) с учетом выбранного сценария.
                  </li>
                  <li>
                    <strong>Динамическая рекомендация СППР:</strong> Встроенный экспертный алгоритм формирует текстовый вердикт (например, <em>"Сценарий высокодоходный, но несет кадровые риски. Рекомендуется перевести часть разработчиков на контрактную основу"</em>).
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-100 dark:border-amber-900/50 text-amber-800 dark:text-amber-200 flex items-start gap-3">
                  <Play className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <span className="font-bold block mb-1">Прием работы:</span>
                    Повысьте ползунок "Спрос на сервера повторов" до 45% и "Доп. бюджет на НИОКР" до 30%. Обратите внимание, как радарная матрица зафиксирует рост маржинальности, но SWOT-анализ в блоке "Угрозы" немедленно выдаст предупреждение о перегруженности конвейера.
                  </div>
                </div>
              </div>
            )}

            {/* Раздел: Управление рисками */}
            {activeSection === "risks" && (
              <div className="space-y-4 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-[10px] uppercase tracking-wide">
                  <ShieldAlert className="h-3.5 w-3.5" /> Управление рисками
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Анализ неопределенности и симуляция Монте-Карло
                </h3>
                <p>
                  Модуль предназначен для превентивного выявления, оценки и управления технологическими и коммерческими угрозами проекта.
                </p>

                <h4 className="font-bold text-slate-900 dark:text-white mt-6 mb-2">Как работает оценка критичности риска:</h4>
                <p className="text-xs text-slate-500 mb-3">
                  Математическая критичность рассчитывается по классической формуле: <strong>Критичность (R) = Вероятность (P) × Влияние (I)</strong>.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-red-50 dark:bg-red-950/25 border border-red-100 dark:border-red-900/40 rounded-xl text-center">
                    <div className="font-bold text-red-600 dark:text-red-400">КРАСНАЯ ЗОНА</div>
                    <div className="text-[10px] text-slate-500 mt-1">Индекс R &ge; 42. Риск сверхкритичен. Требуется немедленный план миграции или резерв бюджета.</div>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/25 border border-amber-100 dark:border-amber-900/40 rounded-xl text-center">
                    <div className="font-bold text-amber-600 dark:text-amber-400">ЖЕЛТАЯ ЗОНА</div>
                    <div className="text-[10px] text-slate-500 mt-1">Индекс 15 &le; R &lt; 42. Риск средней степени. Необходимо превентивное наблюдение.</div>
                  </div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-900/40 rounded-xl text-center">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">ЗЕЛЕНАЯ ЗОНА</div>
                    <div className="text-[10px] text-slate-500 mt-1">Индекс R &lt; 15. Допустимая погрешность. План минимизации не требуется.</div>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 dark:text-white mt-6 mb-2">Генератор симуляции методом Монте-Карло:</h4>
                <p>
                  При нажатии кнопки <strong>«Запустить симуляцию Монте-Карло (10,000 итераций)»</strong>, система моделирует случайное распределение наступления учтенных рисков. Выходные гистограммы показывают доверительный интервал незапланированных издержек при худшем, среднем и лучшем исходах.
                </p>

                <div className="mt-6 p-4 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/50 text-rose-800 dark:text-rose-200 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-1">Прием работы:</span>
                    Используйте встроенную форму добавления рисков, чтобы зафиксировать новую угрозу, например, "Санкции на поставку микроконтроллеров" (Вероятность - 80%, Влияние - 90%). Нажмите "Добавить". Новый риск моментально нанесется на матрицу плотности, а гистограмма Монте-Карло расширит границу пиковых издержек.
                  </div>
                </div>
              </div>
            )}

            {/* Раздел: Ведение реестров данных */}
            {activeSection === "data" && (
              <div className="space-y-4 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 font-bold text-[10px] uppercase tracking-wide">
                  <Database className="h-3.5 w-3.5" /> нормативно-справочная информация
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Ведение реестров НСИ и операций CRUD
                </h3>
                <p>
                  Раздел представляет собой полноценную систему управления базой данных (СУБД) для административного персонала slomo.tv. Для всех сущностей (Проекты, Штатные кадры) реализован полноценный цикл операций CRUD (Create, Read, Update, Delete).
                </p>

                <h4 className="font-bold text-slate-900 dark:text-white mt-6 mb-2">Функциональные возможности CRUD-терминала:</h4>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Табличный просмотр:</strong> Отображение всех проектов (разработка серверов Blackjack, интеграция ПЛИС, софт повторов) и кадров с возможностью мгновенной текстовой фильтрации по поисковому запросу.
                  </li>
                  <li>
                    <strong>Инструмент добавления:</strong> Модальная форма с жесткой валидацией полей (негативные бюджеты, пустые ФИО или незаполненные специализации пресекаются системой).
                  </li>
                  <li>
                    <strong>Редактирование записей:</strong> Позволяет обновлять прогресс выполнения НИОКР-проекта или изменять текущий оклад инженера.
                  </li>
                  <li>
                    <strong>Каскадное удаление:</strong> Изъятие проекта из базы мгновенно высвобождает занятых специалистов и перераспределяет финансовый объем на дашборде.
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl border border-cyan-100 dark:border-cyan-900/50 text-cyan-800 dark:text-cyan-200 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-1">Прием работы:</span>
                    Перейдите в реестр проектов, найдите через окно поиска проект разработки "Blackjack Elite" и нажмите "Редактировать". Измените его бюджет на 8,5 млн. рублей. Закройте вкладку и перейдите на "Рабочий стол" — общая выручка организации среагирует на новое значение бюджета.
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
