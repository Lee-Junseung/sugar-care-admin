import { Menu, LogOut, User } from 'lucide-react';
import logoImage from '/logo.png';

export function Header({ onLogoutClick, onMenuClick }) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-ink-100 px-4 sm:px-5 md:px-6 lg:px-8 py-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 hover:bg-ink-50 rounded-xl transition-colors shrink-0"
            aria-label="메뉴 열기"
          >
            <Menu className="w-5 h-5 text-ink-700" />
          </button>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <img src={logoImage} alt="쏙식 로고" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-ink-900 truncate">쏙식 Admin</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 pl-2 pr-4 py-1.5 bg-ink-50 rounded-full border border-ink-100">
            <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-ink-700 text-sm">관리자</span>
          </div>
          <button
            onClick={onLogoutClick}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-ink-900 text-white rounded-xl hover:bg-ink-800 active:scale-[0.98] transition-all duration-150"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">로그아웃</span>
          </button>
        </div>
      </div>
    </header>
  );
}