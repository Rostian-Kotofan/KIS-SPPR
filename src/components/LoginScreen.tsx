import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Tv, AlertCircle, CheckCircle2 } from "lucide-react";

export interface UserSession {
  email: string;
  role: "Администратор" | "Руководитель" | "Ведущий аналитик";
  name: string;
  permissions: string[];
}

interface LoginScreenProps {
  onLoginSuccess: (user: UserSession) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Демо-аккаунты для тестирования комиссии или преподавателя
  const credentialsList = [
    {
      email: "admin@slomo.tv",
      password: "admin",
      role: "Администратор" as const,
      name: "Никитин О.Д. (Системный администратор)",
      permissions: ["dashboard", "simulation", "risks", "data"]
    },
    {
      email: "director@slomo.tv",
      password: "director",
      role: "Руководитель" as const,
      name: "Яковлев К.С. (Руководитель производства)",
      permissions: ["dashboard", "simulation", "data"]
    },
    {
      email: "analyst@slomo.tv",
      password: "analyst",
      role: "Ведущий аналитик" as const,
      name: "Трофимова А.И. (Ведущий аналитик)",
      permissions: ["dashboard", "simulation", "risks"]
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Имитация задержки сетевого запроса для реалистичности системы
    setTimeout(() => {
      const foundUser = credentialsList.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (foundUser) {
        setSuccess(`Авторизация успешна! Добро пожаловать, ${foundUser.name}`);
        setTimeout(() => {
          onLoginSuccess({
            email: foundUser.email,
            role: foundUser.role,
            name: foundUser.name,
            permissions: foundUser.permissions
          });
        }, 850);
      } else {
        setError("Неверный адрес почты или пароль. Пожалуйста, используйте демонстрационные учетные записи.");
        setIsLoading(false);
      }
    }, 600);
  };

  const handleDemoSelect = (demo: typeof credentialsList[0]) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setError(null);
  };

  return (
    <div id="login-screen-root" className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Декоративные фоновые элементы для эфирной атмосферы slomo.tv */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md p-6 sm:p-8 relative z-10 transition-all">
        
        {/* Логотип slomo.tv */}
        <div id="login-brand-header" className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 font-sans mb-3 scale-110">
            <div className="h-9 w-9 bg-blue-600 rounded-sm flex items-center justify-center font-bold text-white text-sm tracking-tight shadow-md shadow-blue-500/30">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="leading-none">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-black tracking-tighter text-white uppercase font-sans">slomo</span>
                <span className="text-sm font-bold text-red-500 font-mono">.tv</span>
              </div>
              <span className="text-[9px] text-blue-400 font-mono font-bold uppercase tracking-widest block leading-none mt-1">КИС СППР v3.0</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center mt-1">
            Корпоративная информационная система поддержки принятия управленческих решений
          </p>
        </div>

        {/* Уведомление об успехе или ошибке */}
        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-900/60 rounded-xl flex items-start gap-2 text-rose-300 text-xs animate-fade-in">
            <AlertCircle className="h-4.5 w-4.5 flex-shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl flex items-start gap-2 text-emerald-300 text-xs animate-fade-in">
            <CheckCircle2 className="h-4.5 w-4.5 flex-shrink-0 text-emerald-500 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Форма авторизации */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Рабочий Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-500" />
              <input
                type="email"
                required
                placeholder="director@slomo.tv"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Локальный пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-10 py-2 text-sm text-white placeholder-slate-600 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 hover:text-white text-slate-500 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl cursor-pointer shadow-md shadow-blue-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <ShieldCheck className="h-4.5 w-4.5" />
                Вход в систему
              </>
            )}
          </button>
        </form>

        {/* Панель демонстрационных профилей */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Демонстрационный пульт</span>
            <span className="text-[9px] text-blue-400 font-semibold">(для защиты диплома)</span>
          </div>
          
          <div className="grid grid-cols-1 gap-2.5">
            {credentialsList.map((demo) => (
              <button
                key={demo.role}
                type="button"
                onClick={() => handleDemoSelect(demo)}
                className={`p-2.5 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                  email.toLowerCase() === demo.email.toLowerCase()
                    ? "bg-blue-950/50 border-blue-500/50 text-white"
                    : "bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{demo.role}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{demo.name}</div>
                </div>
                <div className="text-[10px] font-mono bg-slate-800/60 px-2 py-0.5 rounded text-slate-300 border border-slate-700/50">
                  {demo.password}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="text-[10px] text-slate-600 text-center font-mono mt-4 relative z-10 select-none">
        Разработано для защиты ВКР • ООО "СЛОМО.ТВ" • 2026
      </div>
    </div>
  );
}
