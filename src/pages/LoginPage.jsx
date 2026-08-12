import { useState } from 'react';
import { Lock, Mail, Brain, Users, TrendingUp, Shield, ChevronRight } from 'lucide-react';
import logoImage from '/logo.png';

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사 로직 추가
    if (email !== 'admin@gachon.ac.kr' || password !== '1234') {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      return; // 정보가 틀리면 여기서 함수 종료 (로딩/로그인 진행 안 함)
    }

    // 정보가 일치할 경우에만 아래 로직 실행
    setIsLoading(true);

    // 로딩 애니메이션을 위한 딜레이
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 1000);
  };

  const features = [
    {
      icon: Brain,
      title: 'AI 기반 분석',
      description: '머신러닝으로 식단을 정확하게 분석',
    },
    {
      icon: Users,
      title: '사용자 관리',
      description: '모든 사용자 데이터를 한눈에 관리',
    },
    {
      icon: TrendingUp,
      title: '실시간 통계',
      description: '서비스 전반의 인사이트 제공',
    },
  ];

  const stats = [
    { label: '총 사용자', value: '143' },
    { label: 'AI 정확도', value: '93.3%' },
    { label: '일일 기록', value: '259' },
  ];

  return (
    <div className="h-screen flex bg-ink-50 overflow-hidden">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        {/* Background — 단일 브랜드 톤 그라데이션(깊이감만) */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-800"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative z-10 flex flex-col justify-center gap-6 p-8 xl:p-12 text-white w-full overflow-y-auto">
          {/* Logo & Title */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={logoImage} alt="쏙식 로고" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-white">쏙식 Admin</h1>
                <p className="text-white/75 text-sm">AI 식단 추천 관리 시스템</p>
              </div>
            </div>

            {/* Main Message */}
            <div className="mb-5">
              <h2 className="text-white mb-2">
                스마트한 건강 관리의 시작점
              </h2>
              <p className="text-white/85">
                AI 기반 식단 추천 서비스를 효율적으로 관리하고 사용자 경험을 지속적으로 개선하세요.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 border border-white/15 hover:bg-white/[0.14] transition-colors duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white text-sm">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-white">{stat.value}</div>
                <div className="text-white/65 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-5 lg:p-6 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logoImage} alt="쏙식 로고" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-ink-900">
              쏙식 Admin
            </h1>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-card border border-ink-100 p-5 lg:p-6">
            <div className="mb-4">
              <h2 className="text-ink-900 mb-1">관리자 로그인</h2>
              <p className="text-ink-500 text-sm">
                관리자 계정으로 로그인하여 대시보드에 접속하세요
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-ink-700 text-sm mb-1.5">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-ink-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 border border-ink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors duration-200 bg-ink-50/60"
                    placeholder="admin@gachon.ac.kr"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-ink-700 text-sm mb-1.5">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-ink-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 border border-ink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors duration-200 bg-ink-50/60"
                    placeholder="••••"
                    required
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500/30"
                  />
                  <span className="text-ink-600 text-sm group-hover:text-ink-900 transition-colors">
                    로그인 상태 유지
                  </span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-brand-700 to-brand-800 text-white rounded-xl shadow-brand hover:shadow-brand-hover active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>로그인 중...</span>
                  </>
                ) : (
                  <>
                    <span>로그인</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-4 flex items-start gap-2.5 p-3 bg-brand-50 rounded-xl border border-brand-100">
              <Shield className="w-4.5 h-4.5 text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-brand-900 text-sm mb-0.5">보안 안내</p>
                <p className="text-brand-700 text-sm">
                  이 페이지는 관리자 전용입니다. 승인된 관리자만 접근할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center text-ink-400 text-sm">
            <p>© 2026 쏙식 Admin. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}