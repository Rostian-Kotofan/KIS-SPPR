import React, { useState } from "react";
import { Plus, Trash, Search, Filter, Briefcase, FilePlus2, Check, Percent, Users } from "lucide-react";
import { Project, Resource } from "../data/systemData";

interface DataCRUDProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export default function DataCRUD({ projects, setProjects, resources, setResources }: DataCRUDProps) {
  // Поиск и Фильтрация
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  // Состояние создания Нового Проекта
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    department: "Разработка",
    status: "Планируется",
    riskLevel: "Низкий",
    budget: 1500000,
    progress: 0,
    completionDate: "01.12.2026",
    leadSpecialist: "Пузаков Р.А."
  });

  // Добавление проекта
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name) return;

    const projectToAdd: Project = {
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      name: newProject.name,
      department: newProject.department as any,
      status: newProject.status as any,
      riskLevel: newProject.riskLevel as any,
      budget: Number(newProject.budget || 1000000),
      progress: Number(newProject.progress || 0),
      completionDate: newProject.completionDate || "31.12.2026",
      leadSpecialist: newProject.leadSpecialist || "Пузаков Р.А."
    };

    setProjects(prev => [...prev, projectToAdd]);
    setNewProject({
      name: "",
      department: "Разработка",
      status: "Планируется",
      riskLevel: "Низкий",
      budget: 1500000,
      progress: 0,
      completionDate: "01.12.2026",
      leadSpecialist: "Пузаков Р.А."
    });
    setShowAddForm(false);
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

  return (
    <div id="data-crud-root" className="space-y-6">
      {/* Шапка раздела */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Ресурсно-коммерческий реестр организации</h2>
        <p className="text-sm text-slate-500 mt-1">
          Базовый CRUD-интерфейс ведения проектного портфеля и контроля загруженности штатного персонала компании
        </p>
      </div>

      {/* Верхние кнопки управления поиском */}
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
              className="pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-indigo-500"
            />
          </div>

          {/* Фильтр департамента */}
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="py-2 px-3 border border-slate-200 text-xs rounded-lg focus:outline-indigo-500"
            >
              <option value="all">Все департаменты</option>
              <option value="Разработка">Разработка</option>
              <option value="Маркетинг">Маркетинг</option>
              <option value="Консалтинг">Консалтинг</option>
              <option value="Аналитика">Аналитика</option>
            </select>
          </div>
        </div>

        <button
          id="btn-add-project-model"
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full sm:w-auto py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
        >
          <Plus className="h-4 w-4" />
          Добавить Проект
        </button>
      </div>

      {/* Выдвижная форма добавления проекта */}
      {showAddForm && (
        <form onSubmit={handleAddProject} className="bg-white border border-indigo-100 p-5 rounded-xl space-y-4 shadow-sm animate-fade-in">
          <h3 className="text-xs uppercase tracking-wider font-bold text-indigo-900 flex items-center gap-1.5">
            <FilePlus2 className="h-4 w-4" />
            Регистрация нового проектного договора в базе данных
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Имя */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Название проекта</label>
              <input
                type="text"
                required
                placeholder="Например, Оптимизация ERP Роснефти"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-indigo-500"
              />
            </div>

            {/* Департамент */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Направление</label>
              <select
                value={newProject.department}
                onChange={(e) => setNewProject({ ...newProject, department: e.target.value as any })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-indigo-500"
              >
                <option value="Разработка">Разработка</option>
                <option value="Маркетинг">Маркетинг</option>
                <option value="Консалтинг">Консалтинг</option>
                <option value="Аналитика">Аналитика</option>
              </select>
            </div>

            {/* Бюджет */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Бюджет проекта (₽)</label>
              <input
                type="number"
                min="100000"
                step="50000"
                value={newProject.budget}
                onChange={(e) => setNewProject({ ...newProject, budget: parseInt(e.target.value) })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-indigo-500"
              />
            </div>

            {/* Ответственный */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">ЛПР / Ведущий специалист</label>
              <input
                type="text"
                value={newProject.leadSpecialist}
                onChange={(e) => setNewProject({ ...newProject, leadSpecialist: e.target.value })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Статус */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Начальный статус</label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-indigo-500"
              >
                <option value="Планируется">Планируется</option>
                <option value="В разработке">В разработке</option>
                <option value="Завершен">Завершен</option>
                <option value="Приостановлен">Приостановлен</option>
              </select>
            </div>

            {/* Степень риска */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Оценка риска</label>
              <select
                value={newProject.riskLevel}
                onChange={(e) => setNewProject({ ...newProject, riskLevel: e.target.value as any })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-indigo-500"
              >
                <option value="Низкий">Низкий (риск 5-10%)</option>
                <option value="Средний">Средний (риск 20-40%)</option>
                <option value="Высокий">Высокий (риск &gt;50%)</option>
              </select>
            </div>

            {/* Дедлайн */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Дата сдачи</label>
              <input
                type="text"
                value={newProject.completionDate}
                onChange={(e) => setNewProject({ ...newProject, completionDate: e.target.value })}
                className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-indigo-500"
              />
            </div>

            {/* Кнопки формы */}
            <div className="flex gap-2 items-end justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-lg cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg cursor-pointer shadow-xs flex items-center gap-1"
              >
                <Check className="h-4 w-4" /> Сохранить в БД
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Таблица Проектов */}
      <div className="bg-white border border-slate-100 rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Briefcase className="h-4.5 w-4.5 text-indigo-600" />
            Портфель активных договоров компании ({filteredProjects.length})
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Таблица содержит реактивные формулы</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-4">Название и ID</th>
                <th className="p-4">Линейка</th>
                <th className="p-4">Бюджет</th>
                <th className="p-4">Прогресс выполнения</th>
                <th className="p-4">Дата сдачи</th>
                <th className="p-4">Ответственный</th>
                <th className="p-4 text-center">Опции</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 font-medium">
                    Ни один контракт под заданные фильтры поиска не обнаружен.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-bold text-slate-800">{p.name}</div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase mt-0.5 block">{p.id}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700">
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
                          <span className={`text-[9px] px-1 rounded ${
                            p.status === "Завершен" ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                          }`}>{p.status}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={p.progress}
                          onChange={(e) => handleProgressChange(p.id, parseInt(e.target.value))}
                          className="w-full accent-indigo-600 cursor-pointer h-1"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-mono text-slate-500">{p.completionDate}</td>
                    <td className="p-4 text-slate-600 font-medium">{p.leadSpecialist}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-1 px-2 border border-rose-100 text-rose-500 rounded bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer flex items-center gap-1 mx-auto text-[10px]"
                        title="Расторгнуть договор"
                      >
                        <Trash className="h-3 w-3" />
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Список Кадровые ресурсы */}
      <div className="bg-white border border-slate-100 rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Users className="h-4.5 w-4.5 text-indigo-600" />
            Базовое штатное расписание и утилитарная загрузка экспертов
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-4">Имя эксперта</th>
                <th className="p-4">Специализация / Роль</th>
                <th className="p-4">Отдел</th>
                <th className="p-4 text-center">Коэф. КТД</th>
                <th className="p-4">Оклад / Месяц</th>
                <th className="p-4">Текущий ворклоад (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {resources.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="p-4 font-semibold text-slate-800">{r.name}</td>
                  <td className="p-4 font-medium text-slate-600">{r.role}</td>
                  <td className="p-4 text-slate-500">{r.department}</td>
                  <td className="p-4 text-center font-mono font-bold text-indigo-600">x{r.efficiency.toFixed(2)}</td>
                  <td className="p-4 font-mono font-semibold text-slate-800">{r.salary.toLocaleString()} ₽</td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${r.load >= 90 ? 'bg-rose-500' : r.load >= 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${r.load}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 font-semibold">{r.load}% нагрузка</span>
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
