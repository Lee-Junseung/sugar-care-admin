# Sugar Care Admin — 데모 버전

> [`sugar-care-admin`](https://github.com/Lee-Junseung/sugar-care-admin)의 데모 브랜치.
> 실제 서비스(main 브랜치)는 팀 프로젝트 종료 후 백엔드 서버가 종료되어 더 이상 API 연동 화면을 확인할 수 없음.
> 이 브랜치는 동일한 화면 구성과 로직을 mock(가상) 데이터로 재현해, 백엔드 서버 없이도 로컬에서 바로 실행하고 클릭해볼 수 있도록 만듦.

> 실제 프로젝트 개요, 기술 스택, 담당 역할 등 상세 설명은 [`main` 브랜치 README](https://github.com/Lee-Junseung/sugar-care-admin/blob/main/README.md)를 참고. 이 문서는 데모 버전 사용법 위주로 정리함.

---

## 이 브랜치가 원본과 다른 점

원본 코드의 UI, 레이아웃, 데이터 가공 로직은 수정하지 않았음.
오직 각 컴포넌트에서 `axios`로 실제 백엔드 API를 호출하던 부분만, 같은 응답 형태를 가진 mock 데이터로 교체.

| 파일 | 교체 내용 |
|---|---|
| `UserList.jsx` | 사용자 8명 mock 데이터 (알레르기·음식 선호도·당뇨 유형 등 다양하게 구성) |
| `ServiceStats.jsx` | 당뇨 유형별 사용자 수 mock 값 |
| `AllergyStats.jsx` | 알레르기 보유 사용자 12명 mock 데이터 |
| `BloodSugarStats.jsx` | 당뇨 유형별 요일/시간대 혈당 mock 데이터 |
| `PopularFoodStats.jsx` | 유형별 인기/즐겨찾기 음식 mock 데이터 |
| `ReportManagement.jsx` | 신고 8건 mock 데이터 — 필터·정렬·처리완료 버튼까지 클라이언트 로직으로 동일하게 동작 |
| `MealPatternStats.jsx`, `GoalStats.jsx` | 원본부터 API 호출이 없어 변경 없음 |

즉, 화면에서 보이는 동작과 사용자 경험은 실제 서비스와 동일하며, 데이터만 고정된 mock 값으로 채워져 있음.

---

## 실행 방법

백엔드 서버 없이 바로 실행 가능.

```bash
git clone -b demo https://github.com/Lee-Junseung/sugar-care-admin.git
cd sugar-care-admin
npm install
npm run dev
```

브라우저에서 안내된 주소(예: `http://localhost`)로 접속하면 로그인 화면이 나타남.

데모 로그인 정보
- 이메일: `admin@gachon.ac.kr`
- 비밀번호: `1234`

로그인 후 좌측 사이드바에서 대시보드(서비스 통계 / 알레르기 / 혈당 관리 / 인기 음식 / 식사 패턴)와 사용자 관리(사용자 리스트 / 신고 관리) 메뉴를 모두 확인하실 수 있음.

---

## 참고 사항

- 이 브랜치는 데모 열람 목적으로만 사용됨. 실제 운영에는 사용되지 않음.
- 표시되는 모든 수치(사용자 수, 혈당 데이터, 신고 내역 등)는 실제 데이터가 아닌 임의로 구성한 mock 값.
- 신고 관리의 '처리완료' 버튼 등 액션은 로컬 상태에서만 반영되며, 새로고침 시 초기화됨.
