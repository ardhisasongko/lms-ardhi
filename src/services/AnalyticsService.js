/**
 * AnalyticsService.js
 * Service to aggregate data for dashboard charts.
 * Currently uses mock data for visualization purposes.
 */

// Mock data generators
const generateDateRange = (days) => {
    const dates = [];
    for (let i = days; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }));
    }
    return dates;
};

// Admin Analytics
export const getAdminStats = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
        totalStudents: 1250,
        activeStudents: 843,
        totalCourses: 12,
        totalQuizzesTaken: 5430,
        averageScore: 76.5,
        revenue: 15400000 // If applicable
    };
};

export const getRegistrationTrend = async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const dates = generateDateRange(6);
    return dates.map(date => ({
        name: date,
        students: Math.floor(Math.random() * 50) + 10,
    }));
};

export const getCoursePopularity = async () => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return [
        { name: 'TKA Saintek', students: 450, color: '#3B82F6' }, // blue
        { name: 'TKA Soshum', students: 380, color: '#10B981' }, // green
        { name: 'TPS', students: 320, color: '#F59E0B' }, // yellow
        { name: 'Bahasa Inggris', students: 210, color: '#EF4444' }, // red
    ];
};

// Student Analytics
export const getStudentProgress = async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        { subject: 'Matematika', score: 85, avg: 70, fullMark: 100 },
        { subject: 'Fisika', score: 65, avg: 68, fullMark: 100 },
        { subject: 'Kimia', score: 78, avg: 72, fullMark: 100 },
        { subject: 'Biologi', score: 90, avg: 75, fullMark: 100 },
        { subject: 'B. Ind', score: 88, avg: 80, fullMark: 100 },
        { subject: 'B. Ing', score: 72, avg: 74, fullMark: 100 },
    ];
};

export const getQuizHistory = async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const dates = generateDateRange(4);
    return dates.map(date => ({
        date: date,
        score: Math.floor(Math.random() * 40) + 60, // 60-100
    }));
};
