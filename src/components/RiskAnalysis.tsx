import React, { useState } from "react";
import { AlertCircle, ShieldAlert, Sliders, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { CorporateRisk, initialCorporateRisks } from "../data/systemData";

interface RiskAnalysisProps {
  risksList: CorporateRisk[];
  setRisksList: React.Dispatch<React.SetStateAction<CorporateRisk[]>>;
}

export default function RiskAnalysis({ risksList, setRisksList }: RiskAnalysisProps) {
  const [selectedRiskId, setSelectedRiskId] = useState<string>(risksList[0]?.id || "");

  const selectedRisk = risksList.find(r => r.id === selectedRiskId) || risksList[0];

  // Изменение вероятности риска
  const handlePropabilityChange = (val: number) => {
    setRisksList(prev => prev.map(r => r.id === selectedRisk.id ? { ...r, probability: val } : r));
  };

  // Изменение влияния риска
  const handleImpactChange = (val: number) => {
    setRisksList(prev => prev.map(r => r.id === selectedRisk.id ? { ...r, impact: val } : r));
  };

  // Изменение статуса риска
  const handleStatusChange = (status: "Активен" | "Нейтрализован" | "Под наблюдением") => {
    setRisksList(prev => prev.map(r => r.id === selectedRisk.id ? { ...r, status } : r));
  };

  // Получить цвет ячейки матрицы 5х5 на основе математической формулы риска (V * I)
  // X: Вероятность (1-5), Y: Влияние (1-5)
  const getMatrixCellColor = (prob: number, imp: number) => {
    const score = prob * imp;
    if (score >= 15) return "bg-rose-500/80 text-white"; // Экстремальный
    if (score >= 9) return "bg-orange-400/80 text-white"; // Высокий
    if (score >= 4) return "bg-amber-300/80 text-slate-800"; // Средний
    return "bg-emerald-400/70 text-slate-800"; // Низкий
  };

  const getMatrixCellLabel = (score: number) => {
    if (score >= 15) return "Критический";
    if (score >= 9) return "Высокий";
    if (score >= 4) return "Средний";
    return "Приемлемый";
  };

  // Вспомогательная функция для сопоставления координат y (Влияние от 5 до 1 сверху вниз)
  const yRows = [5, 4, 3, 2, 1];
  const xCols = [1, 2, 3, 4, 5];

  return (
    <div id="risk-analysis-root" className="space-y-6">
      {/* Шапка раздела */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Анализ корпоративных рисков (Risk Matrix 5x5)</h2>
        <p className="text-sm text-slate-500 mt-1">
          Картирование, оценка критичности и выбор сценариев антикризисного управления проектами в соответствии с ГОСТ Р ИСО 31000-2019
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ЛЕВАЯ ЧАСТЬ: Карта рисков 5x5 (Heatmap) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-100 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-2">
              <ShieldAlert className="h-4.5 w-4.5 text-rose-500" />
              Интерактивная карта позиционирования рисков
            </h3>
            <p className="text-[11px] text-slate-400 mb-6">
              Кликните на риск в списке справа, двигайте слайдеры его параметров, и следите за динамической миграцией маркера.
            </p>
          </div>

          {/* Сетка матрицы 5x5 */}
          <div className="space-y-1 my-auto">
            {/* Сама сетка */}
            <div className="grid grid-cols-12 gap-1 bg-slate-50 p-3 rounded-xl">
              {/* Ось Y (Влияние) */}
              <div className="col-span-1 flex flex-col justify-between text-right text-[10px] font-bold text-slate-400 pr-2 font-mono h-[280px]">
                {yRows.map((y) => (
                  <div key={y} className="flex items-center justify-end h-10">{y}</div>
                ))}
              </div>

              {/* Ячейки матрицы */}
              <div className="col-span-11 grid grid-cols-5 gap-1 h-[280px]">
                {yRows.map((y) => {
                  return xCols.map((x) => {
                    const cellColor = getMatrixCellColor(x, y);
                    
                    // Проверяем, лежат ли какие-либо риски в этой ячейке
                    const matchingRisks = risksList.filter(
                      (r) => r.probability === x && r.impact === y
                    );

                    return (
                      <div
                        key={`${x}-${y}`}
                        className={`risk-matrix-quadrant rounded-md relative flex flex-wrap gap-1 items-center justify-center border border-white/40 ${cellColor} transition-all`}
                        title={`Вероятность: ${x}, Влияние: ${y}. Оценка: ${x * y}`}
                      >
                        {matchingRisks.length > 0 ? (
                          <div className="flex flex-wrap gap-0.5 justify-center p-1">
                            {matchingRisks.map((mr) => (
                              <button
                                key={mr.id}
                                onClick={() => setSelectedRiskId(mr.id)}
                                className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border ${
                                  mr.id === selectedRisk.id
                                    ? "bg-slate-950 text-white ring-2 ring-indigo-500 border-indigo-400 animate-pulse"
                                    : "bg-white text-slate-900 shadow-sm border-slate-300"
                                }`}
                                title={mr.title}
                              >
                                {mr.id.slice(4)}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[9px] opacity-20 font-mono">{x * y}</span>
                        )}
                      </div>
                    );
                  });
                })}
              </div>

              {/* Ось X (Вероятность) */}
              <div className="col-span-1"></div>
              <div className="col-span-11 grid grid-cols-5 text-center text-[10px] font-bold text-slate-400 mt-2 font-mono">
                {xCols.map((x) => (
                  <div key={x}>{x}</div>
                ))}
              </div>
            </div>

            {/* Подписи Осей */}
            <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-3 px-3">
              <span>Ось X: Вероятность угрозы (1-5)</span>
              <span>Ось Y: Сила влияния на маржинальность (1-5)</span>
            </div>
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: Выбор и модулирование выбранного риска */}
        <div className="lg:col-span-6 space-y-4">
          {/* Карусель/список рисков */}
          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800">Реестр наблюдаемых опасностей</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {risksList.map((risk) => {
                const isSelected = risk.id === selectedRisk.id;
                const score = risk.probability * risk.impact;
                return (
                  <button
                    key={risk.id}
                    onClick={() => setSelectedRiskId(risk.id)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                        : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div className="space-y-1 flex-1 pr-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono bg-slate-100 text-slate-700 px-1 rounded text-[10px] font-semibold">
                          {risk.id}
                        </span>
                        <span className="font-semibold text-slate-700 truncate block max-w-[240px]">
                          {risk.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">Категория: {risk.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        score >= 12
                          ? "bg-rose-50 text-rose-600 border border-rose-100"
                          : score >= 6
                          ? "bg-amber-50 text-amber-600 border border-amber-100"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}>
                        Оценка: {score}
                      </span>
                      <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Лаборатория параметров конкретного выбранного риска */}
          {selectedRisk && (
            <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-xs space-y-4">
              <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                <div>
                  <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">{selectedRisk.category}</span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1">{selectedRisk.title}</h4>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  selectedRisk.status === "Активен" 
                    ? "bg-rose-100 text-rose-800" 
                    : selectedRisk.status === "Под наблюдением"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}>
                  {selectedRisk.status}
                </span>
              </div>

              {/* Управление параметрами */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Вероятность */}
                <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Вероятность:</span>
                    <span className="font-mono text-indigo-600">{selectedRisk.probability} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={selectedRisk.probability}
                    onChange={(e) => handlePropabilityChange(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">1 - Почти невероятно, 5 - Часто случается</div>
                </div>

                {/* Влияние */}
                <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Влияние на бюджет:</span>
                    <span className="font-mono text-indigo-600">{selectedRisk.impact} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={selectedRisk.impact}
                    onChange={(e) => handleImpactChange(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">1 - Нет ущерба, 5 - Полный паралич проектов</div>
                </div>
              </div>

              {/* Изменение статуса через селекторы */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700 block">Управленческий Статус Угрозы</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Активен", "Под наблюдением", "Нейтрализован"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className={`py-1.5 px-3 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                        selectedRisk.status === st
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Компенсирующие антикризисные меры */}
              <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-lg space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-4 w-4" />
                  Утвержденный план антикризисных мероприятий по ГОСТ ИСО
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {selectedRisk.mitigation}
                </p>
                <div className="text-[9px] text-slate-400 mt-2 font-semibold">
                  * Повышение бюджета на минимизацию на 15% снизит индекс вероятности на 2 пункта.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
