import React, { useState } from "react";
import { Plus, Search, Filter, Briefcase, FilePlus2, Check, Percent, Users, UserPlus2, Pencil, Trash, X } from "lucide-react";
import { Project, Resource } from "../data/systemData";

interface DataCRUDProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export default function DataCRUD({ projects, setProjects, resources, setResources }: DataCRUDProps) {
  // Поиск и Фильтрация проектов
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  // Состояние создания Нового Проекта
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    department: "Разработка",
    status: "Планируется",
    riskLevel: "Низкий",
    budget: 15200000,
    progress: 0,
    completionDate: "01.12.2026",
    leadSpecialist: "Никифоров А.М."
  });

  // Состояние создания / Редактирования Сотрудника
  const [showAddResourceForm, setShowAddResourceForm] = useState(false);
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [resourceForm, setResourceForm] = useState<Partial<Resource>>({
    name: "",
    role: "",
    department: "Разработка",
    efficiency: 1.10,
    salary: 130000,
    load: 80
  });

  // Добавление проекта
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name) return;

    const projectToAdd: Project = {
      id: `PLT-${Math.floor(100 + Math.random() * 900)}`,
      name: newProject.name,
      department: newProject.department as any,
      status: newProject.status as any,
      riskLevel: newProject.riskLevel as any,
      budget: Number(newProject.budget || 5000000),
      progress: Number(newProject.progress || 0),
      completionDate: newProject.completionDate || "31.12.2026",
      leadSpecialist: newProject.leadSpecialist || "Никифоров А.М."
    };

    setProjects(prev => [...prev, projectToAdd]);
    setNewProject({
      name: "",
      department: "Разработка",
      status: "Планируется",
      riskLevel: "Низкий",
      budget: 15200000,
      progress: 0,
      completionDate: "01.12.2026",
      leadSpecialist: "Никифоров А.М."
    });
    setShowAddProjectForm(false);
  };

  // Удаление проекта
  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Изменение инлайн-прогресса проекта (%)
  const handleProgressChange = (id: string, val: number) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const status = val === 100 ? "Завершен" : val > 0 ? "В разработке" : p.status;
        return { ...p, progress: val, status: status as any };
      }
      return p;
    }));
  };

  // Фильтрация списка проектов
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.leadSpecialist.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = deptFilter === "all" || p.department === deptFilter;

    return matchesSearch && matchesDept;
  });

  // Добавление или Редактирование Сотрудника
  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.name || !resourceForm.role) return;

    if (editingResourceId) {
      // Редактируем существующего под тем же ID
      setResources(prev => prev.map(r => r.id === editingResourceId ? {
        ...r,
        name: resourceForm.name!,
        role: resourceForm.role!,
        department: resourceForm.department!,
        efficiency: Number(resourceForm.efficiency || 1.10),
        salary: Number(resourceForm.salary || 130000),
        load: Number(resourceForm.load || 80)
      } : r));
      setEditingResourceId(null);
    } else {
      // Добавляем нового сотрудника
      const newRes: Resource = {
        id: `RES-${Math.floor(10 + Math.random() * 90)}`,
        name: resourceForm.name,
        role: resourceForm.role,
        department: resourceForm.department || "Разработка",
        efficiency: Number(resourceForm.efficiency || 1.10),
        salary: Number(resourceForm.salary || 130000),
        load: Number(resourceForm.load || 80)
      };
      setResources(prev => [...prev, newRes]);
    }

    // Сброс полей
    setResourceForm({
      name: "",
      role: "",
      department: "Разработка",
      efficiency: 1.10,
      salary: 130000,
      load: 80
    });
    setShowAddResourceForm(false);
  };

  const startEditResource = (r: Resource) => {
    setResourceForm(r);
    setEditingResourceId(r.id);
    setShowAddResourceForm(true);
  };

  const handleDeleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div id="data-crud-root" className="space-y-6">
      {/* Шапка раздела */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Ресурсно-коммерческий реестр организации</h2>
        <p className="text-sm text-slate-500 mt-1">
          Базовый интерфейс ведения проектного портфеля и контроля загруженности штатного персонала компании
        </p>
      </div>

      {/* Верхние кнопки управления поиском проектов */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по названию, ID, ЛПР..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-blue-500"
            />
          </div>

          {/* Фильтр департамента */}
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="py-2 px-3 border border-slate-200 text-xs rounded-lg focus:outline-blue-500 bg-white"
            >
              <option value="all">Все направления</option>
              <option value="Разработка">Разработка</option>
              <option value="Маркетинг">Маркетинг</option>
              <option value="Консалтинг">Консалтинг</option>
              <option value="Аналитика">Аналитика</option>
            </select>
          </div>
        </div>

        <button
          id="btn-add-project-model"
          onClick={() => setShowAddProjectForm(!showAddProjectForm)}
          className="w-full sm:w-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
        >
          <Plus className="h-4 w-4" />
          Добавить Проект
        </button>
      </div>

      {/* Форма добавления/изменения проекта */}
      {showAddProjectForm && (
        <form onSubmit={handleAddProject} className="bg-white border border-blue-100 p-5 rounded-xl space-y-4 shadow-sm animate-fade-in">
          <h3 className="text-xs uppercase tracking-wider font-bold text-blue-900 flex items-center gap-1.5 pb-2 border-b border-blue-50/50">
            <FilePlus2 className="h-4 w-4" />
            Регистрация нового контрактного договора в базе данных
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Название проекта / Линейка</label>
              <input
                type="text"
                required
                placeholder="Поставка серверов Blackjack-UHD"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Направление</label>
              <select
                value={newProject.department}
                onChange={(e) => setNewProject({ ...newProject, department: e.target.value as any })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500 bg-white"
              >
                <option value="Разработка">Разработка</option>
                <option value="Маркетинг">Маркетинг</option>
                <option value="Консалтинг">Консалтинг</option>
                <option value="Аналитика">Аналитика</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Бюджет контракта (₽)</label>
              <input
                type="number"
                min="1000000"
                step="500000"
                value={newProject.budget}
                onChange={(e) => setNewProject({ ...newProject, budget: parseInt(e.target.value) })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Ведущий специалист</label>
              <input
                type="text"
                value={newProject.leadSpecialist}
                onChange={(e) => setNewProject({ ...newProject, leadSpecialist: e.target.value })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Тип запуска</label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500 bg-white"
              >
                <option value="Планируется">Планируется</option>
                <option value="В разработке">В разработке</option>
                <option value="Завершен">Завершен</option>
                <option value="Приостановлен">Приостановлен</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Оценка сложности / риска</label>
              <select
                value={newProject.riskLevel}
                onChange={(e) => setNewProject({ ...newProject, riskLevel: e.target.value as any })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500 bg-white"
              >
                <option value="Низкий">Низкий (риск 5-10%)</option>
                <option value="Средний">Средний (риск 20-40%)</option>
                <option value="Высокий">Высокий (риск &gt;50%)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Плановый дедлайн</label>
              <input
                type="text"
                value={newProject.completionDate}
                onChange={(e) => setNewProject({ ...newProject, completionDate: e.target.value })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500"
              />
            </div>

            <div className="flex gap-2 items-end justify-end">
              <button
                type="button"
                onClick={() => setShowAddProjectForm(false)}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-lg cursor-pointer transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg cursor-pointer shadow-xs flex items-center gap-1 transition-colors"
              >
                <Check className="h-4 w-4" /> Создать контракт
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Таблица Проектов и Сделок slomo.tv */}
      <div className="bg-white border border-slate-100 rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Briefcase className="h-4.5 w-4.5 text-blue-600" />
            Портфель активных договоров slomo.tv ({filteredProjects.length})
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Спец-контракты ТВ вещателей/лиг</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/40 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-4">Название и ID</th>
                <th className="p-4">Направление</th>
                <th className="p-4">Бюджет контракта</th>
                <th className="p-4">Выполнение (Прогресс)</th>
                <th className="p-4">Срок отгрузки</th>
                <th className="p-4">Ведущий специалист</th>
                <th className="p-4 text-center">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 font-medium font-sans">
                    Ни один сценарный контракт в базе данных не обнаружен.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/20 transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-bold text-slate-800">{p.name}</div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase mt-0.5 block">{p.id}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">
                        {p.department}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-800">
                      {p.budget.toLocaleString()} ₽
                    </td>
                    <td className="p-4">
                      <div className="space-y-1 max-w-[140px]">
                        <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500">
                          <span>{p.progress}%</span>
                          <span className={`text-[9px] px-1 rounded font-bold ${
                            p.status === "Завершен" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                          }`}>{p.status}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={p.progress}
                          onChange={(e) => handleProgressChange(p.id, parseInt(e.target.value))}
                          className="w-full accent-blue-600 cursor-pointer h-1"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-mono text-slate-500">{p.completionDate}</td>
                    <td className="p-4 text-slate-600 font-medium">{p.leadSpecialist}</td>
                    <td className="p-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-1 px-2 border border-rose-100 text-rose-500 rounded bg-rose-50/50 hover:bg-rose-100/50 transition-colors cursor-pointer flex items-center gap-1 mx-auto text-[10px] font-sans font-semibold"
                        title="Расторгнуть договор"
                      >
                        <Trash className="h-3 w-3" />
                        Расторгнуть
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Список Кадровые ресурсы с полноценным CRUD */}
      <div className="bg-white border border-slate-100 rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Users className="h-4.5 w-4.5 text-blue-600" />
            Инженерно-разработческий штат slomo.tv ({resources.length} сотр.)
          </h3>
          <button
            type="button"
            onClick={() => {
              setEditingResourceId(null);
              setResourceForm({
                name: "",
                role: "",
                department: "Разработка",
                efficiency: 1.10,
                salary: 130000,
                load: 80
              });
              setShowAddResourceForm(!showAddResourceForm);
            }}
            className="py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-md flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
          >
            <UserPlus2 className="h-3.5 w-3.5" />
            Добавить Специалиста
          </button>
        </div>

        {/* Форма добавления/редактирования Сотрудника */}
        {showAddResourceForm && (
          <form onSubmit={handleSaveResource} className="bg-slate-50 border-b border-slate-100 p-5 space-y-4 animate-fade-in text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h4 className="font-bold text-slate-800 flex items-center gap-1">
                <UserPlus2 className="h-4 w-4 text-blue-600" />
                {editingResourceId ? `Редактирование карточки ID: ${editingResourceId}` : "Регистрация нового специалиста в штат"}
              </h4>
              <button 
                type="button" 
                onClick={() => setShowAddResourceForm(false)}
                className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">ФИО Специалиста</label>
                <input
                  type="text"
                  required
                  placeholder="Например, Воронов А.С."
                  value={resourceForm.name || ""}
                  onChange={(e) => setResourceForm({ ...resourceForm, name: e.target.value })}
                  className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Должность / Квалификация</label>
                <input
                  type="text"
                  required
                  placeholder="Например, Инженер тестирования серверов"
                  value={resourceForm.role || ""}
                  onChange={(e) => setResourceForm({ ...resourceForm, role: e.target.value })}
                  className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Производственный отдел</label>
                <select
                  value={resourceForm.department}
                  onChange={(e) => setResourceForm({ ...resourceForm, department: e.target.value })}
                  className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500 bg-white"
                >
                  <option value="Разработка">Разработка (ПО & FPGA)</option>
                  <option value="Сборка">Сборочный цех волноводов</option>
                  <option value="Поддержка">Служба техподдержки</option>
                  <option value="Маркетинг">Маркетинг и продажи</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Коэффициент выработки (КТД)</label>
                <input
                  type="number"
                  min="0.5"
                  max="2.5"
                  step="0.05"
                  value={resourceForm.efficiency || 1.10}
                  onChange={(e) => setResourceForm({ ...resourceForm, efficiency: parseFloat(e.target.value) })}
                  className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500 bg-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Месячный оклад (₽)</label>
                <input
                  type="number"
                  min="50000"
                  max="400000"
                  step="5000"
                  value={resourceForm.salary || 130000}
                  onChange={(e) => setResourceForm({ ...resourceForm, salary: parseInt(e.target.value) })}
                  className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500 bg-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Уровень загрузки (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="5"
                  value={resourceForm.load || 80}
                  onChange={(e) => setResourceForm({ ...resourceForm, load: parseInt(e.target.value) })}
                  className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-blue-500 bg-white font-mono"
                />
              </div>

              <div className="flex gap-2 items-end justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddResourceForm(false)}
                  className="py-2 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer shadow-xs flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  {editingResourceId ? "Сохранить изменения" : "Зачислить в штат"}
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-4">Имя эксперта</th>
                <th className="p-4">Специализация / Роль</th>
                <th className="p-4">Цех / Отдел</th>
                <th className="p-4 text-center">Коэф. выработки</th>
                <th className="p-4">Окладной баланс</th>
                <th className="p-4">Утилитарный Workflow</th>
                <th className="p-4 text-center">Опции управления</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {resources.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {r.name}
                  </td>
                  <td className="p-4 font-medium text-slate-600">{r.role}</td>
                  <td className="p-4">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/50">
                      {r.department}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono font-bold text-blue-600">x{Number(r.efficiency).toFixed(2)}</td>
                  <td className="p-4 font-mono font-semibold text-slate-800">{(r.salary).toLocaleString()} ₽ / мес</td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${r.load >= 90 ? 'bg-rose-500' : r.load >= 70 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                          style={{ width: `${r.load}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 font-semibold">{r.load}% нагрузка</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1.5 justify-center">
                      <button
                        type="button"
                        onClick={() => startEditResource(r)}
                        className="p-1 px-1.5 border border-slate-200 text-slate-600 rounded bg-slate-50 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer flex items-center gap-0.5"
                        title="Редактировать сотрудника"
                      >
                        <Pencil className="h-3 w-3" />
                        Изменить
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteResource(r.id)}
                        className="p-1 px-1.5 border border-rose-100 text-rose-500 rounded bg-rose-50/50 hover:bg-rose-100/50 transition-colors cursor-pointer flex items-center gap-0.5"
                        title="Уволить из штата"
                      >
                        <Trash className="h-3 w-3" />
                        Уволить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
