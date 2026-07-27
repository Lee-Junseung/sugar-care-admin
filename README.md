# Sugar Care Admin — 혈당 관리 서비스 관리자 대시보드

> 가천대학교 팀 프로젝트로 진행한 혈당(당뇨) 관리 서비스 '쏙식'의 관리자용 웹 대시보드.
> 사용자의 혈당·식단·알레르기·목표 데이터를 관리자가 한눈에 모니터링하고, 신고 내역을 관리할 수 있는 화면을 구현.
> React 기반 프론트엔드 개발 담당.

> 이 브랜치(`main`)는 실제 백엔드 서버와 연동되는 원본 코드이며, 팀 프로젝트 종료 후 백엔드 서버가 종료되어 현재는 로컬에서 API 연동 화면을 확인할 수 없음.
> `demo` 브랜치는 동일한 화면을 mock 데이터로 재현해 백엔드 없이도 바로 실행해볼 수 있도록 만든 버전.

---

## 프로젝트 소개

Android 및 iOS 모바일 환경에서 당뇨 환자 및 고위험군을 위한 AI 기반 식단·혈당 통합 관리 솔루션 '쏙식'의 관리자 대시보드.

주 사용자는 당뇨병 전단계 인구부터 지속적인 식사 요법과 혈당 관리가 필수적인 1·2형 당뇨 및 임신성 당뇨 환자이며, 모바일을 통해 접속·사용하기 편리하도록 설계됨. 환자의 라이프로그(식단, 혈당)를 체계적으로 관리하기 위해 별도의 관리자 기능을 구성했으며, 사용 편의성과 의학적 정보의 신뢰성, 관리의 지속성을 추구할 수 있도록 개발함.

- 팀 구성: 프론트엔드 2명, 백엔드 2명
- 배포 환경: 별도 백엔드 API 서버 연동 (`VITE_API_URL` 환경변수로 지정, 현재 서버 미운영)

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| Frontend | React 19, Vite |
| Styling | Tailwind CSS, PostCSS |
| 데이터 통신 | Axios |
| 데이터 시각화 | Recharts (Line, Bar, Pie Chart) |
| 아이콘 | Lucide React |
| Lint | ESLint |

---

## 담당 역할

이 프로젝트에서 프론트엔드 개발을 담당.

- 관리자 대시보드 전체 레이아웃 및 사이드바 내비게이션 구현 (`Sidebar.jsx`, `Header.jsx`)
- 로그인 화면 UI 및 인증 흐름 구현 (`LoginPage.jsx`)
- Recharts를 활용한 혈당/알레르기/인기 음식/식사 패턴 통계 차트 개발
- Axios로 백엔드 API 연동 및 사용자 리스트/신고 데이터 fetching 처리
- 반응형 레이아웃 구성 (모바일 사이드바 토글 등)

---

## 주요 화면 / 기능

`App.jsx`의 메뉴 구조 기준으로 구현된 화면.

대시보드
- 서비스 통계 (`ServiceStats`) — 일별 식사 기록 수, 이용자 수 등 종합 통계
- 알레르기 통계 (`AllergyStats`)
- 혈당 관리 통계 (`BloodSugarStats`) — 당뇨 유형별 시간대별 혈당 추이
- 인기 음식 통계 (`PopularFoodStats`)
- 식사 패턴 통계 (`MealPatternStats`)

사용자 관리
- 사용자 리스트 (`UserList`) — 검색, 페이지네이션, 상세정보(알레르기/선호음식/목표혈당 등) 조회
- 신고 관리 (`ReportManagement`) — 유형별(체중/혈당/식단) 필터링, 정렬, 처리 상태 관리

---

## 실행 방법

```bash
git clone https://github.com/Lee-Junseung/sugar-care-admin.git
cd sugar-care-admin
npm install
cp .env.example .env   # VITE_API_URL에 API 서버 주소 입력
npm run dev
```

> 현재 백엔드 서버가 종료되어 위 방법으로는 데이터가 표시되지 않음. 화면 동작을 확인하려면 [`demo` 브랜치](https://github.com/Lee-Junseung/sugar-care-admin/tree/demo)를 이용.
