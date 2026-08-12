import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Mail, Heart, Apple, Activity } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

// [데모용 Mock 데이터] 실제 API 원본 응답 형태와 동일한 구조로 작성
const MOCK_USERS_RAW = [
  { name: '김민준', age: 34, gender: '남', height: 175, weight: 78, health_goal: '체중 감량', email: 'minjun.kim@example.com', birth: '1990-04-12', allergy_name: ['우유', '땅콩'], preferred_food: '현미밥, 닭가슴살, 샐러드', disprefferd_food: '튀김', diabetes_type: '2형', activity: '주 3회 이상 운동', bs_goal: 130 },
  { name: '이서연', age: 28, gender: '여', height: 162, weight: 55, health_goal: '혈당 관리', email: 'seoyeon.lee@example.com', birth: '1996-09-02', allergy_name: ['갑각류'], preferred_food: '두부, 나물', disprefferd_food: '', diabetes_type: '1형', activity: '거의 활동하지 않음', bs_goal: 110 },
  { name: '박도윤', age: 45, gender: '남', height: 170, weight: 82, health_goal: '식단 관리', email: 'dowoon.park@example.com', birth: '1979-01-20', allergy_name: [], preferred_food: '잡곡밥, 된장국', disprefferd_food: '단 음식', diabetes_type: '2형', activity: '가벼운 산책', bs_goal: 125 },
  { name: '최지우', age: 31, gender: '여', height: 165, weight: 58, health_goal: '임신 중 혈당 관리', email: 'jiwoo.choi@example.com', birth: '1993-11-05', allergy_name: ['계란'], preferred_food: '고구마, 그릭요거트', disprefferd_food: '카페인 음료', diabetes_type: '임신성', activity: '가벼운 산책', bs_goal: 120 },
  { name: '정하은', age: 52, gender: '여', height: 158, weight: 63, health_goal: '전단계 관리', email: 'haeun.jung@example.com', birth: '1972-06-18', allergy_name: [], preferred_food: '채소볶음', disprefferd_food: '가공식품', diabetes_type: '전단계', activity: '주 1-2회 운동', bs_goal: 100 },
  { name: '한지호', age: 39, gender: '남', height: 178, weight: 88, health_goal: '체중 감량', email: 'jiho.han@example.com', birth: '1985-03-30', allergy_name: ['밀', '콩'], preferred_food: '닭가슴살, 브로콜리', disprefferd_food: '밀가루 음식', diabetes_type: '2형', activity: '주 3회 이상 운동', bs_goal: 128 },
  { name: '오수빈', age: 24, gender: '여', height: 160, weight: 50, health_goal: '혈당 관리', email: 'subin.oh@example.com', birth: '2000-12-08', allergy_name: [], preferred_food: '연어, 아보카도', disprefferd_food: '', diabetes_type: '1형', activity: '매일 운동', bs_goal: 108 },
  { name: '강태윤', age: 60, gender: '남', height: 168, weight: 75, health_goal: '전단계 관리', email: 'taeyoon.kang@example.com', birth: '1964-07-14', allergy_name: ['생선'], preferred_food: '나물, 두부', disprefferd_food: '해산물', diabetes_type: '전단계', activity: '가벼운 산책', bs_goal: 105 },
];

export function UserList() {
  // 상태 관리 (데이터, 로딩, 검색, 페이지네이션)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedUserId, setExpandedUserId] = useState(null);

  // API 호출 및 데이터 변환
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // [데모용] 실제 API 대신 mock 데이터 사용
        const response = { data: { success: true, data: MOCK_USERS_RAW } };

        if (response.data.success) {
          // API 데이터를 화면에 맞는 형태로 변환(Mapping)
          const mappedUsers = response.data.data.map((user, index) => ({
            id: index, // API에 고유 ID가 없으므로 index 사용
            name: user.name,
            age: user.age,
            gender: user.gender,
            height: user.height,
            weight: user.weight,
            goal: user.health_goal,
            email: user.email,
            birthday: user.birth,
            // 알레르기는 배열로 옴
            allergies: user.allergy_name || [],
            // 음식은 "피자, 햄버거" 문자열로 오므로 콤마로 잘라서 배열로 만듦
            favoriteFood: user.preferred_food ? user.preferred_food.split(',').map(s => s.trim()).filter(Boolean) : [],
            dislikedFood: user.disprefferd_food ? user.disprefferd_food.split(',').map(s => s.trim()).filter(Boolean) : [],
            diabetesType: user.diabetes_type || '없음',
            activityLevel: user.activity, // 문자열 그대로 사용 ("거의 활동하지 않음")
            targetBloodSugar: user.bs_goal,
          }));

          setUsers(mappedUsers);
        }
      } catch (error) {
        console.error("사용자 목록 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 검색 및 페이지네이션 로직
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const toggleExpand = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  // 활동량 텍스트가 너무 길 경우를 대비한 포맷팅 함수 추가
  const formatActivity = (text) => {
    if (!text) return '-';
    return text.length > 10 ? text.substring(0, 10) + '...' : text;
  };

  if (loading) return <div className="p-10 text-center">사용자 목록을 불러오는 중...</div>;

  return (
    <div className="space-y-5">
      <div className="mb-5">
        <h2 className="text-ink-900 mb-2">사용자 리스트</h2>
        <p className="text-ink-500">등록된 사용자의 프로필 정보를 확인할 수 있습니다</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-card border border-ink-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ink-400" />
          <input
            type="text"
            placeholder="이름 또는 이메일로 검색..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-ink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors duration-200"
          />
        </div>
      </div>

      {/* User Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {currentUsers.map((user) => {
          const isExpanded = expandedUserId === user.id;
          return (
            <div key={user.id} className="bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden hover:shadow-card-hover transition-shadow duration-200">
              <div
                className="p-5 cursor-pointer"
                onClick={() => toggleExpand(user.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-ink-900 mb-1 font-semibold">{user.name}</h3>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-brand-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-ink-400" />
                      )}
                    </div>
                    <p className="text-ink-500">{user.age}세 · {user.gender} · {user.diabetesType}</p>
                  </div>
                  {/* 우측 상단에 '건강 목표(goal)' 뱃지 표시 */}
                  <span className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full border border-brand-100 text-xs font-medium">
                    {user.goal}
                  </span>
                </div>
                {/* 모바일 카드 하단에 키와 몸무게 정보 표시 추가 */}
                <div className="grid grid-cols-2 gap-3 text-ink-700 text-sm mt-2 pt-2 border-t border-ink-100">
                  <div><span className="text-ink-400">키:</span> {user.height}cm</div>
                  <div><span className="text-ink-400">체중:</span> {user.weight}kg</div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-ink-100 bg-ink-50/60">
                  <div className="space-y-4">
                    {/* 계정 정보 */}
                    <div>
                      <h4 className="text-ink-900 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-brand-600" />
                        계정 정보
                      </h4>
                      <div className="space-y-2 ml-6">
                        <div className="flex items-center gap-2 text-ink-700">
                          <span className="text-ink-400">이메일:</span>
                          <span>{user.email}</span>
                        </div>
                        {/* 생일 정보 표시 위치 확인 */}
                        <div className="flex items-center gap-2 text-ink-700">
                          <span className="text-ink-400">생일:</span>
                          <span>{user.birthday}</span>
                        </div>
                      </div>
                    </div>

                    {/* 알레르기 */}
                    <div>
                      <h4 className="text-ink-900 mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-600" />
                        알레르기
                      </h4>
                      <div className="ml-6">
                        {user.allergies.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {user.allergies.map((allergy, idx) => (
                              <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 rounded-lg border border-red-200">
                                {allergy}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-ink-400">없음</span>
                        )}
                      </div>
                    </div>

                    {/* 선호/불호 음식 */}
                    <div>
                      <h4 className="text-ink-900 mb-2 flex items-center gap-2">
                        <Apple className="w-4 h-4 text-green-600" />
                        음식 취향
                      </h4>
                      <div className="ml-6 space-y-2">
                        <div>
                          <span className="text-ink-400 text-sm">선호:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {user.favoriteFood.length > 0 ? user.favoriteFood.map((food, idx) => (
                              <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 rounded-lg border border-green-200">
                                {food}
                              </span>
                            )) : <span className="text-ink-400 text-sm">-</span>}
                          </div>
                        </div>
                        <div>
                          <span className="text-ink-400 text-sm">불호:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {user.dislikedFood.length > 0 ? user.dislikedFood.map((food, idx) => (
                              <span key={idx} className="px-2 py-1 bg-ink-100 text-ink-700 rounded-lg border border-ink-200">
                                {food}
                              </span>
                            )) : <span className="text-ink-400 text-sm">-</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 건강 정보 */}
                    <div>
                      <h4 className="text-ink-900 mb-2 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-pink-600" />
                        활동 정보
                      </h4>
                      <div className="ml-7 text-ink-700 text-sm space-y-1">
                        {/* 활동량 표시 */}
                        <div>
                          <span className="text-ink-400 mr-2">활동 수준:</span>
                          {user.activityLevel}
                        </div>
                        {/* 목표 혈당 표시 */}
                        {user.targetBloodSugar && (
                          <div>
                            <span className="text-ink-400 mr-2">목표 혈당:</span>
                            <span className="font-semibold text-pink-600">{user.targetBloodSugar} mg/dL</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User Table - Desktop */}
      <div className="hidden lg:block space-y-4">
        {currentUsers.map((user) => {
          const isExpanded = expandedUserId === user.id;
          return (
            <div key={user.id} className="bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden hover:shadow-card-hover transition-shadow duration-200">
              <div
                className="cursor-pointer"
                onClick={() => toggleExpand(user.id)}
              >
                {/* 데스크탑 그리드를 5칸으로 확장하여 더 많은 정보를 표시 (이름 | 나이/성별 | 키/몸무게 | 당뇨유형 | 목표) */}
                <div className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-ink-50 transition-colors text-sm">
                  <div className="flex items-center gap-2 col-span-1">
                    <span className="text-ink-900 font-medium truncate">{user.name}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-brand-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-ink-400" />
                    )}
                  </div>
                  {/* 나이와 성별을 한 컬럼에 표시 */}
                  <div className="text-ink-700 text-center">{user.age}세 / {user.gender}</div>
                  {/* 키와 몸무게를 한 컬럼에 표시 */}
                  <div className="text-ink-700 text-center">{user.height}cm / {user.weight}kg</div>
                  <div className="text-ink-700 text-center truncate">{user.diabetesType}</div>
                  {/* 활동량 텍스트가 길 경우를 대비해 줄임 처리 함수 적용 */}
                  {/* <div className="text-ink-700 text-center truncate" title={user.activityLevel}>{formatActivity(user.activityLevel)}</div> */}
                  <div className="text-right">
                    {/* 건강 목표를 뱃지로 표시 */}
                    <span className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full border border-brand-100 text-xs whitespace-nowrap">
                      {user.goal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Details - Desktop */}
              {isExpanded && (
                <div className="px-8 pb-6 pt-4 border-t border-ink-100 bg-ink-50/60">
                  <div className="grid grid-cols-2 gap-4">
                    {/* 왼쪽 컬럼 */}
                    <div className="space-y-5">
                      {/* 계정 정보 */}
                      <div>
                        <h4 className="text-ink-900 mb-3 flex items-center gap-2">
                          <Mail className="w-5 h-5 text-brand-600" />
                          계정 정보
                        </h4>
                        <div className="space-y-2 ml-7">
                          <div className="flex items-start gap-2 text-ink-700">
                            <span className="text-ink-400 min-w-20">이메일:</span>
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-start gap-2 text-ink-700">
                            <span className="text-ink-400 min-w-20">생일:</span>
                            <span>{user.birthday}</span>
                          </div>
                        </div>
                      </div>

                      {/* 알레르기 */}
                      <div>
                        <h4 className="text-ink-900 mb-3 flex items-center gap-2">
                          <Heart className="w-5 h-5 text-red-600" />
                          알레르기
                        </h4>
                        <div className="ml-7">
                          {user.allergies.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {user.allergies.map((allergy, idx) => (
                                <span key={idx} className="px-3 py-1 bg-red-50 text-red-700 rounded-lg border border-red-200">
                                  {allergy}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-ink-400">없음</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 오른쪽 컬럼 */}
                    <div className="space-y-5">
                      {/* 음식 선호도 */}
                      <div>
                        <h4 className="text-ink-900 mb-3 flex items-center gap-2">
                          <Apple className="w-5 h-5 text-green-600" />
                          음식 선호도
                        </h4>
                        <div className="ml-7 space-y-3">
                          <div>
                            <span className="text-ink-400 block mb-2 text-sm">선호하는 음식:</span>
                            <div className="flex flex-wrap gap-2">
                              {user.favoriteFood.length > 0 ? user.favoriteFood.map((food, idx) => (
                                <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-lg border border-green-200">
                                  {food}
                                </span>
                              )) : <span className="text-ink-400">-</span>}
                            </div>
                          </div>
                          <div>
                            <span className="text-ink-400 block mb-2 text-sm">싫어하는 음식:</span>
                            <div className="flex flex-wrap gap-2">
                              {user.dislikedFood.length > 0 ? user.dislikedFood.map((food, idx) => (
                                <span key={idx} className="px-3 py-1 bg-ink-100 text-ink-700 rounded-lg border border-ink-200">
                                  {food}
                                </span>
                              )) : <span className="text-ink-400">-</span>}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 건강 정보 */}
                      <div>
                        <h4 className="text-ink-900 mb-3 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-pink-600" />
                          활동 정보
                        </h4>
                        <div className="ml-7 text-ink-700">
                          {/* 활동량 표시 */}
                          <div>
                            <span className="text-ink-400 mr-2">활동 수준:</span>
                            {user.activityLevel}
                          </div>
                          {/* 목표 혈당 표시 */}
                          {user.targetBloodSugar && (
                            <div>
                              <span className="text-ink-400 mr-2">목표 혈당:</span>
                              <span className="font-semibold text-pink-600">{user.targetBloodSugar} mg/dL</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-card border border-ink-100">
          <div className="text-ink-500">
            {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} / {filteredUsers.length}명
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-ink-50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-ink-700 px-4 py-2 bg-ink-50 rounded-xl">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-ink-50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}