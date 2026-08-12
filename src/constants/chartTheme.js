// Recharts는 SVG 속성(fill, stroke)에 직접 색상 값을 넣어야 해서 Tailwind 클래스를 쓸 수 없습니다.
// tailwind.config.js의 brand/ink 팔레트와 반드시 동일한 값으로 유지해주세요.

// 브랜드 시그니처 컬러 (tailwind.config.js brand.700과 동일)
export const BRAND_COLOR = '#158477';
export const BRAND_COLOR_LIGHT = '#21CAB6'; // brand.500
export const BRAND_COLOR_DARK = '#116B61'; // brand.800

// 차트 축/그리드에 공통으로 쓰는 중립 톤 (tailwind.config.js ink 팔레트와 동일)
export const AXIS_TEXT_COLOR = '#6C7684'; // ink.500
export const AXIS_TEXT_COLOR_LIGHT = '#9AA2AE'; // ink.400
export const GRID_LINE_COLOR = '#EEF0F3'; // ink.100

// 상태/의미 기반 색상 (경고, 위험 등 문맥상 고정되어야 하는 색)
export const SEMANTIC_COLORS = {
  danger: '#ef4444', // 고혈당, 위험 등
  warning: '#f59e0b', // 저혈당, 대기중 등
  info: '#0EA5E9', // 정보성 보조 지표
  purple: '#8B5CF6', // 카테고리 구분용 보조색
};

// Recharts <Tooltip contentStyle={...}> 에 공통으로 쓰는 스타일
export const TOOLTIP_STYLE = {
  backgroundColor: 'rgba(255, 255, 255, 0.97)',
  border: '1px solid #EEF0F3',
  borderRadius: '12px',
  padding: '12px',
  boxShadow: '0 8px 24px rgba(20,23,28,0.10)',
};

// 막대그래프 호버 시 브랜드 톤으로 은은하게 하이라이트
export const TOOLTIP_CURSOR = { fill: 'rgba(21,132,119,0.06)' };
