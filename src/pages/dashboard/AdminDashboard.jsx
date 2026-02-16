import { useState, useEffect, memo } from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { getAdminStats, getRegistrationTrend, getCoursePopularity } from '../../services/AnalyticsService';
import { exportAdminStatsToExcel } from '../../services/ExportService';
import { Users, BookOpen, Activity, TrendingUp, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = memo(() => {
    const [stats, setStats] = useState(null);
    const [trendData, setTrendData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, trend, courses] = await Promise.all([
                    getAdminStats(),
                    getRegistrationTrend(),
                    getCoursePopularity()
                ]);
                setStats(statsData);
                setTrendData(trend);
                setCourseData(courses);
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Memuat data analitik...</div>;

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <div className="card p-6 flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
                {trend && (
                    <p className={`text-xs mt-2 font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend > 0 ? '+' : ''}{trend}% dari bulan lalu
                    </p>
                )}
            </div>
            <div className={`p-3 rounded-lg bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400`}>
                <Icon size={24} />
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Admin</h1>
                <button
                    onClick={() => {
                        exportAdminStatsToExcel(stats, trendData);
                        toast.success('Laporan Excel berhasil diunduh');
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    <Download size={18} />
                    <span>Export Excel</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Siswa"
                    value={stats.totalStudents}
                    icon={Users}
                    color="blue"
                    trend={12}
                />
                <StatCard
                    title="Siswa Aktif"
                    value={stats.activeStudents}
                    icon={Activity}
                    color="green"
                    trend={5}
                />
                <StatCard
                    title="Total Materi"
                    value={stats.totalCourses}
                    icon={BookOpen}
                    color="purple"
                />
                <StatCard
                    title="Rata-rata Skor"
                    value={stats.averageScore}
                    icon={TrendingUp}
                    color="orange"
                    trend={2.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Registration Trend Chart */}
                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tren Pendaftaran Siswa (7 Hari)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="students"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorStudents)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Course Popularity Chart */}
                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popularitas Materi</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={courseData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="students"
                                >
                                    {courseData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
});

AdminDashboard.displayName = 'AdminDashboard';

export default AdminDashboard;
