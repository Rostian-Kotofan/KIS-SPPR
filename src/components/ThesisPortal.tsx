import { useState } from "react";
import { BookOpen, Copy, Download, Check, GraduationCap, Award, HelpCircle, FileText, ChevronRight } from "lucide-react";
import { thesisChapters, thesisMetadata, ThesisChapter } from "../data/thesis";

export default function ThesisPortal() {
  const [selectedChapterId, setSelectedChapterId] = useState<string>("cover");
  const [copied, setCopied] = useState(false);

  const selectedChapter = thesisChapters.find(c => c.id === selectedChapterId) || thesisChapters[0];

  // Копирование текущей главы в буфер обмена
  const handleCopyChapter = () => {
    navigator.clipboard.writeText(selectedChapter.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Скачивание полной дипломной работы в виде .MD документа
  const handleDownloadFullThesis = () => {
    let fullText = "";
    
    // Формируем общую шапку
    fullText += `========================================================================\n`;
    fullText += `ВЫПУСКНАЯ КВАЛИФИКАЦИОННАЯ РАБОТА\n`;
    fullText += `ТЕМА: ${thesisMetadata.topic.toUpperCase()}\n`;
    fullText += `ВЫПОЛНИЛ: Студент группы ${thesisMetadata.group} ${thesisMetadata.student}\n`;
    fullText += `КОЛЛЕДЖ: ${thesisMetadata.schoolName}\n`;
    fullText += `РУКОВОДИТЕЛЬ: ${thesisMetadata.advisor}\n`;
    fullText += `ГОД: ${thesisMetadata.year}\n`;
    fullText += `========================================================================\n\n`;

    // Объединяем все главы
    thesisChapters.forEach((ch) => {
      fullText += `\n\n# ${ch.title}\n`;
      fullText += `## ${ch.subtitle}\n`;
      fullText += `------------------------------------------------------------------------\n`;
      fullText += `${ch.content}\n`;
    });

    const blob = new Blob([fullText], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `дипломная_работа_пузаков_${thesisMetadata.group.toLowerCase().replace(/\s/g, "")}.md`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="thesis-portal-root" className="space-y-6">
      {/* Шапка Портала */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-wide text-xs">
            <GraduationCap className="h-5 w-5" />
            Портал государственной квалификационной аттестации
          </div>
          <h2 className="text-xl font-bold tracking-tight mt-1">Оцифрованный дипломный проект выпускника ГБПОУ ФК № 35</h2>
          <p className="text-slate-300 text-xs mt-1">
            Студент: <strong>{thesisMetadata.student}</strong> | Группа: <strong>{thesisMetadata.group}</strong>
          </p>
        </div>

        <button
          id="btn-download-thesis-file"
          onClick={handleDownloadFullThesis}
          className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Скачать полную работу (.md)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ЛЕВАЯ КОЛОНКА: Оглавление и академические данные */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-100 p-5 shadow-xs space-y-6">
          <div className="space-y-1 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <BookOpen className="h-4.5 w-4.5 text-indigo-600" />
              Оглавление (Содержание)
            </h3>
            <p className="text-[10px] text-slate-400">Переключайте вкладки для просмотра текста работы</p>
          </div>

          {/* Кнопки оглавления */}
          <div className="space-y-1">
            {thesisChapters.map((ch) => {
              const isActive = ch.id === selectedChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`w-full text-left p-3 rounded-lg text-xs transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-slate-900 text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span className="truncate">{ch.title}</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 opacity-60 flex-shrink-0 ml-2" />
                </button>
              );
            })}
          </div>

          {/* Данные государственного аттестационного задания */}
          <div className="p-4 bg-indigo-50/40 rounded-lg space-y-3">
            <h4 className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="h-4 w-4" /> Паспортная карта работы
            </h4>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between border-b border-indigo-100/50 pb-1.5">
                <span className="text-slate-400 font-medium">Специальность:</span>
                <span className="text-right font-semibold text-slate-800">{thesisMetadata.specialtyCode}</span>
              </div>
              <div className="flex flex-col border-b border-indigo-100/50 pb-1.5">
                <span className="text-slate-400 font-medium">Квалификация:</span>
                <span className="font-semibold text-slate-800 mt-0.5">{thesisMetadata.specialtyName}</span>
              </div>
              <div className="flex justify-between border-b border-indigo-100/50 pb-1.5">
                <span className="text-slate-400 font-medium">Руководитель:</span>
                <span className="text-right font-semibold text-emerald-800">{thesisMetadata.advisor}</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span className="text-slate-400 font-medium">Зам. директора:</span>
                <span className="text-right font-semibold text-slate-800">{thesisMetadata.reviewer}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: Визуализатор листа А4 с текстом */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          {/* Информационная панель страницы листа */}
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-xs flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-400 font-medium">Текущий раздел:</span>{" "}
              <strong className="text-slate-800">{selectedChapter.title}</strong>
            </div>

            <button
              onClick={handleCopyChapter}
              className={`py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Скопировано!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Копировать главу
                </>
              )}
            </button>
          </div>

          {/* Бумажный Лист А4 */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 shadow-md flex flex-col justify-between min-h-[750px] relative overflow-hidden text-slate-800 font-sans tracking-wide leading-relaxed text-sm">
            {/* Водяной знак или верхний колонтитул */}
            <div className="flex justify-between border-b border-slate-100 pb-3 text-[10px] text-slate-400 uppercase font-semibold">
              <span>{thesisMetadata.shortSchool}</span>
              <span>Выпускная Квалификационная Работа | Пузаков Р.А.</span>
            </div>

            {/* Содержимое в Markdown-подобной разметке */}
            <div className="my-8 flex-1 space-y-4">
              {/* Рендеринг текста без сторонних зависимостей для гарантированной реактивности */}
              <div className="prose prose-sm font-sans max-w-none prose-slate text-justify">
                {selectedChapter.content.split("\n").map((line, index) => {
                  const cleaned = line.trim();
                  if (!cleaned) return <div key={index} className="h-2" />;

                  // Заголовки h1
                  if (cleaned.startsWith("# ")) {
                    return (
                      <h1 key={index} className="text-lg sm:text-2xl font-bold text-slate-900 font-serif pt-4 pb-2 text-center">
                        {cleaned.slice(2)}
                      </h1>
                    );
                  }

                  // Заголовки h2
                  if (cleaned.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-base sm:text-lg font-bold text-slate-800 pt-3 pb-1 border-b border-slate-100">
                        {cleaned.slice(3)}
                      </h2>
                    );
                  }

                  // Заголовки h3
                  if (cleaned.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-sm sm:text-base font-semibold text-slate-800 pt-2 pb-1">
                        {cleaned.slice(4)}
                      </h3>
                    );
                  }

                  // Разделительные линии ----
                  if (cleaned === "---") {
                    return <hr key={index} className="my-6 border-slate-200" />;
                  }

                  // Маркированные списки
                  if (cleaned.startsWith("* ") || cleaned.startsWith("- ")) {
                    return (
                      <li key={index} className="list-disc pl-5 text-xs text-slate-600 py-0.5">
                        {cleaned.slice(2)}
                      </li>
                    );
                  }

                  // Простой симулированный рендер ASCII таблиц в тексте
                  if (cleaned.startsWith("|") || cleaned.startsWith("┌")) {
                    return (
                      <pre key={index} className="bg-slate-50 p-2 rounded text-[10px] font-mono whitespace-pre overflow-x-auto text-slate-500 my-4 text-center">
                        {line}
                      </pre>
                    );
                  }

                  // Простые выделения жирным **Текст**
                  // Сделаем простую замену для жирности, если не пустой
                  if (cleaned.includes("**")) {
                    const parts = cleaned.split("**");
                    return (
                      <p key={index} className="text-xs sm:text-sm text-slate-600 text-justify text-indent my-1 leading-relaxed">
                        {parts.map((p, i) => (i % 2 === 1 ? <strong key={i} className="font-bold text-slate-800">{p}</strong> : p))}
                      </p>
                    );
                  }

                  return (
                    <p key={index} className="text-xs sm:text-sm text-slate-600 text-justify text-indent my-2 leading-relaxed">
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Нижний колонтитул и нумерация листов */}
            <div className="flex justify-between items-center border-t border-slate-100 pt-4 text-[10px] text-zinc-400 font-semibold font-mono">
              <span>Специальность 09.02.07</span>
              <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">Лист: {selectedChapter.pageCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
