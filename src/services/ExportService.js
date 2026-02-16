import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * ExportQuizResultsToPDF
 * Generates a PDF report for a specific quiz attempt.
 */
export const exportQuizResultToPDF = (results, lessonTitle, userName) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text('LMS Ardhi - Laporan Hasil Quiz', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Nama Siswa: ${userName}`, 20, 40);
    doc.text(`Materi: ${lessonTitle}`, 20, 50);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 20, 60);

    // Score Summary
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 65, 190, 65);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Skor Akhir: ${results.score}`, 20, 80);

    doc.setFontSize(12);
    doc.text(`Status: ${results.passed ? 'LULUS' : 'TIDAK LULUS'}`, 120, 80);
    doc.text(`Benar: ${results.correctAnswers} / ${results.totalQuestions}`, 20, 90);

    // Detailed Table
    const tableColumn = ["No", "Pertanyaan", "Jawaban Kamu", "Status"];
    const tableRows = [];

    results.results.forEach((item, index) => {
        const status = item.is_correct ? "Benar" : "Salah";
        // Truncate long questions
        const question = item.question.length > 50 ? item.question.substring(0, 50) + '...' : item.question;
        const answer = "Option " + (item.selected_answer + 1); // Mapping 0->A usually handled in UI, simplified here

        tableRows.push([index + 1, question, answer, status]);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 100,
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] }, // Blue header
    });

    doc.save(`Quiz_Result_${lessonTitle.replace(/\s+/g, '_')}.pdf`);
};

/**
 * ExportStudentProgressToPDF
 * Generates a summary report of student progress.
 */
export const exportStudentProgressToPDF = (studentName, progressData) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Laporan Kemajuan Belajar', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Nama: ${studentName}`, 20, 40);
    doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`, 20, 50);

    const tableColumn = ["Mata Pelajaran", "Skor Rata-rata", "Target"];
    const tableRows = [];

    progressData.forEach(subject => {
        tableRows.push([
            subject.subject,
            subject.score.toString(),
            subject.avg.toString()
        ]);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 70,
    });

    doc.save(`Laporan_Belajar_${studentName}.pdf`);
};

/**
 * ExportAdminStatsToExcel
 * Exports dashboard statistics to Excel.
 */
export const exportAdminStatsToExcel = (stats, trendData) => {
    const wb = XLSX.utils.book_new();

    // Sheet 1: Summary
    const summaryData = [
        ["Metric", "Value"],
        ["Total Students", stats.totalStudents],
        ["Active Students", stats.activeStudents],
        ["Total Courses", stats.totalCourses],
        ["Average Score", stats.averageScore],
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

    // Sheet 2: Trends
    const wsTrend = XLSX.utils.json_to_sheet(trendData);
    XLSX.utils.book_append_sheet(wb, wsTrend, "Registration Trends");

    XLSX.writeFile(wb, "LMS_Admin_Report.xlsx");
};
