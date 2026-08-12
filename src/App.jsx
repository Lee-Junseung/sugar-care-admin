import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { UserList } from './pages/UserList';
import { ServiceStats } from './pages/ServiceStats';
import { AllergyStats } from './pages/AllergyStats';
import { BloodSugarStats } from './pages/BloodSugarStats';
import { PopularFoodStats } from './pages/PopularFoodStats';
import { GoalStats } from './pages/GoalStats';
import { MealPatternStats } from './pages/MealPatternStats';
import { ReportManagement } from './pages/ReportManagement';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  const [currentSection, setCurrentSection] = useState('stats-service');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (email, password) => {
    console.log('Login attempt:', { email, password });
    setIsLoggedIn(true);
    setCurrentSection('stats-service'); // 로그인 시 항상 '서비스 통계'로 초기화 (사이드바 활성 표시와 id 일치시킴)
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'stats-service':
        return <ServiceStats />;
      case 'stats-allergy':
        return <AllergyStats />;
      case 'stats-bloodsugar':
        return <BloodSugarStats />;
      case 'stats-popularfood':
        return <PopularFoodStats />;
      case 'stats-goals':
        return <GoalStats />;
      case 'stats-mealpattern':
        return <MealPatternStats />;
      case 'users-list':
        return <UserList />;
      case 'users-reports':
        return <ReportManagement />;
      default:
        return <ServiceStats />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-ink-50">
      <Sidebar
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={() => { }}
          onLogoutClick={handleLogout}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 lg:p-7">
          <div className="max-w-[1400px] mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}