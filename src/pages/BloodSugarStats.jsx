import React, { useEffect, useState } from 'react';
import { Activity, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AXIS_TEXT_COLOR, BRAND_COLOR, GRID_LINE_COLOR, SEMANTIC_COLORS, TOOLTIP_CURSOR } from '../constants/chartTheme';

// [임시값]
const FALSE_TIME_DATA = {
  '1형': [
    { time: '00-03시', avg: 139, high: 0, low: 0 }, { time: '03-06시', avg: 145, high: 0, low: 0 },
    { time: '06-09시', avg: 151, high: 0, low: 0 }, { time: '09-12시', avg: 152, high: 0, low: 0 },
    { time: '12-15시', avg: 153, high: 0, low: 0 }, { time: '15-18시', avg: 148, high: 0, low: 0 },
    { time: '18-21시', avg: 146, high: 0, low: 0 }, { time: '21-24시', avg: 142, high: 0, low: 0 },
  ],
  '2형': [
    { time: '00-03시', avg: 148, high: 7, low: 0 }, { time: '03-06시', avg: 145, high: 3, low: 0 },
    { time: '06-09시', avg: 156, high: 23, low: 0 }, { time: '09-12시', avg: 160, high: 64, low: 0 },
    { time: '12-15시', avg: 165, high: 102, low: 0 }, { time: '15-18시', avg: 164, high: 74, low: 0 },
    { time: '18-21시', avg: 157, high: 59, low: 0 }, { time: '21-24시', avg: 153, high: 12, low: 0 },
  ],
  '임신성': [
    { time: '00-03시', avg: 155, high: 2, low: 0 }, { time: '03-06시', avg: 153, high: 0, low: 0 },
    { time: '06-09시', avg: 160, high: 2, low: 0 }, { time: '09-12시', avg: 163, high: 6, low: 0 },
    { time: '12-15시', avg: 168, high: 18, low: 0 }, { time: '15-18시', avg: 163, high: 13, low: 0 },
    { time: '18-21시', avg: 161, high: 4, low: 0 }, { time: '21-24시', avg: 157, high: 3, low: 0 },
  ],
  '전단계': [
    { time: '00-03시', avg: 148, high: 4, low: 0 }, { time: '03-06시', avg: 147, high: 1, low: 0 },
    { time: '06-09시', avg: 156, high: 20, low: 0 }, { time: '09-12시', avg: 155, high: 19, low: 0 },
    { time: '12-15시', avg: 160, high: 38, low: 0 }, { time: '15-18시', avg: 157, high: 22, low: 0 },
    { time: '18-21시', avg: 155, high: 19, low: 0 }, { time: '21-24시', avg: 154, high: 12, low: 0 },
  ]
};

export function BloodSugarStats() {
  const [selectedType, setSelectedType] = useState('1형');
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const diabetesTypes = ['1형', '2형', '임신성', '전단계'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // [데모용] 실제 API 대신 mock 데이터 사용 (원본 API 응답 형태와 동일한 구조)
        const MOCK_BLOOD_SUGAR_RAW = [
          { diabetes_type: '1형', mon_bs_Mean: 142, tue_bs_Mean: 138, wen_bs_Mean: 145, thu_bsMean: 140, fri_bsMean: 137, sat_bsMean: 143, sun_bs_Mean: 139, high_bs: 12, low_bs: 4, count_per_month: 210 },
          { diabetes_type: '2형', mon_bs_Mean: 158, tue_bs_Mean: 162, wen_bs_Mean: 155, thu_bsMean: 160, fri_bsMean: 165, sat_bsMean: 159, sun_bs_Mean: 157, high_bs: 64, low_bs: 3, count_per_month: 340 },
          { diabetes_type: '임신성', mon_bs_Mean: 152, tue_bs_Mean: 149, wen_bs_Mean: 156, thu_bsMean: 153, fri_bsMean: 158, sat_bsMean: 151, sun_bs_Mean: 154, high_bs: 8, low_bs: 1, count_per_month: 95 },
          { diabetes_type: '전단계', mon_bs_Mean: 135, tue_bs_Mean: 132, wen_bs_Mean: 138, thu_bsMean: 134, fri_bsMean: 136, sat_bsMean: 133, sun_bs_Mean: 137, high_bs: 5, low_bs: 0, count_per_month: 150 },
        ];
        const response = { data: { success: true, data: MOCK_BLOOD_SUGAR_RAW } };

        if (response.data.success && Array.isArray(response.data.data)) {
          const processedData = {};

          response.data.data.forEach(item => {
            // 백엔드가 보내준 불규칙한 키 이름들을 정확하게 매핑
            const weeklyData = [
              { day: '월', dayName: '월요일', avg: item.mon_bs_Mean },
              { day: '화', dayName: '화요일', avg: item.tue_bs_Mean },
              { day: '수', dayName: '수요일', avg: item.wen_bs_Mean },
              { day: '목', dayName: '목요일', avg: item.thu_bsMean },
              { day: '금', dayName: '금요일', avg: item.fri_bsMean },
              { day: '토', dayName: '토요일', avg: item.sat_bsMean },
              { day: '일', dayName: '일요일', avg: item.sun_bs_Mean },
            ];

            // 평균 계산을 위해 유효한 값만 필터링
            const validMeans = [
              item.mon_bs_Mean, item.tue_bs_Mean, item.wen_bs_Mean,
              item.thu_bsMean, item.fri_bsMean, item.sat_bsMean,
              item.sun_bs_Mean
            ].filter(v => v > 0);

            const totalAvg = validMeans.length > 0
              ? Math.round(validMeans.reduce((a, b) => a + b, 0) / validMeans.length)
              : 0;

            const totalCount = item.count_per_month || 1;
            const highRate = ((item.high_bs / totalCount) * 100).toFixed(1) + '%';
            const lowRate = ((item.low_bs / totalCount) * 100).toFixed(1) + '%';

            // [임시값] 시간 데이터 연결
            const fakeTimeData = FALSE_TIME_DATA[item.diabetes_type] || FALSE_TIME_DATA['1형'];

            processedData[item.diabetes_type] = {
              summary: {
                avg: totalAvg,
                high: item.high_bs,
                low: item.low_bs,
                highRate,
                lowRate,
                total: item.count_per_month
              },
              weekly: weeklyData,
              time: fakeTimeData
            };
          });
          setStatsData(processedData);
        } else {
          const rawData = JSON.stringify(response.data);
          setErrorMsg(`서버 응답 내용이 예상과 다릅니다: ${rawData}`);
        }
      } catch (error) {
        setErrorMsg(`에러 발생: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center">데이터 분석 중...</div>;

  if (!statsData) return (
    <div className="p-10 text-center text-red-500 border border-red-200 bg-red-50 rounded-lg overflow-auto">
      <h3 className="font-bold mb-2">데이터를 불러오지 못했습니다.</h3>
      <p className="font-mono text-sm break-all">{errorMsg}</p>
    </div>
  );

  const currentData = statsData[selectedType] || {
    summary: { avg: 0, high: 0, highRate: '0%', low: 0, lowRate: '0%', total: 0 },
    weekly: [],
    time: []
  };

  return (
    <div className="space-y-5">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="mb-5">
        <h2 className="text-ink-900 mb-2">혈당 관리 통계</h2>
        <p className="text-ink-500">당뇨 유형별 혈당 데이터를 분석합니다</p>
      </div>

      {/* 탭 버튼 */}
      <div className="bg-white rounded-2xl p-2 shadow-card border border-ink-100">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {diabetesTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex-1 min-w-fit md:min-w-[80px] px-4 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap ${selectedType === type ? 'bg-gradient-to-r from-brand-700 to-brand-800 text-white shadow-brand' : 'text-ink-500 hover:bg-ink-100'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-ink-100 hover:shadow-card-hover transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-brand-600" />
            <p className="text-ink-500">평균 혈당</p>
          </div>
          <p className="text-ink-900 text-2xl font-bold">{currentData.summary.avg} mg/dL</p>
          <p className="text-green-600 mt-1 text-sm font-medium">
            {currentData.summary.avg > 0
              ? (currentData.summary.avg < 120 ? '정상 범위' : '주의 필요')
              : '-'}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-ink-100 hover:shadow-card-hover transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <p className="text-ink-500">고혈당 발생</p>
          </div>
          <p className="text-ink-900 text-2xl font-bold">{currentData.summary.high}건</p>
          <p className="text-ink-500 mt-1 text-sm">전체의 {currentData.summary.highRate}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-ink-100 hover:shadow-card-hover transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-5 h-5 text-yellow-500" />
            <p className="text-ink-500">저혈당 발생</p>
          </div>
          <p className="text-ink-900 text-2xl font-bold">{currentData.summary.low}건</p>
          <p className="text-ink-500 mt-1 text-sm">전체의 {currentData.summary.lowRate}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-ink-100 hover:shadow-card-hover transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-sky-500" />
            <p className="text-ink-500">총 측정 횟수</p>
          </div>
          <p className="text-ink-900 text-2xl font-bold">{currentData.summary.total.toLocaleString()}건</p>
          <p className="text-ink-500 mt-1 text-sm">최근 30일</p>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* 요일별 평균 혈당 (API 연동됨) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-ink-100 hover:shadow-card-hover transition-shadow duration-200">
          <h3 className="text-ink-900 mb-4 font-bold text-lg">요일별 평균 혈당 ({selectedType})</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={currentData.weekly} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_LINE_COLOR} />
              <XAxis dataKey="day" stroke={AXIS_TEXT_COLOR} tick={{ fontSize: 12 }} />
              <YAxis width={40} stroke={AXIS_TEXT_COLOR} tick={{ fontSize: 12 }} domain={[50, 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #EEF0F3', borderRadius: '12px', padding: '12px', boxShadow: '0 8px 24px rgba(20,23,28,0.10)' }}
                labelFormatter={(value) => {
                  const day = currentData.weekly.find(d => d.day === value);
                  return day ? day.dayName : value;
                }}
                formatter={(value) => [`${value} mg/dL`, '평균 혈당']}
              />
              <Line type="monotone" dataKey="avg" stroke={BRAND_COLOR} strokeWidth={3} dot={{ fill: BRAND_COLOR, r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 시간대별 혈당 분포 (임시값 사용) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-ink-100 hover:shadow-card-hover transition-shadow duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-ink-900 font-bold text-lg">시간대별 혈당 분포 ({selectedType})</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData.time} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_LINE_COLOR} />
              <XAxis dataKey="time" stroke={AXIS_TEXT_COLOR} tick={{ fontSize: 12 }} />
              <YAxis width={40} stroke={AXIS_TEXT_COLOR} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #EEF0F3', borderRadius: '12px', padding: '12px', boxShadow: '0 8px 24px rgba(20,23,28,0.10)' }}
                cursor={TOOLTIP_CURSOR}
              />
              <Legend />
              <Bar dataKey="high" fill={SEMANTIC_COLORS.danger} name="고혈당 발생 (건)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="low" fill={SEMANTIC_COLORS.warning} name="저혈당 발생 (건)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="avg" fill={BRAND_COLOR} name="평균 혈당 (mg/dL)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}