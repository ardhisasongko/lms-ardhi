// Demo data for TKA Master (shown when backend is not available)
// This allows users to see the full functionality without setting up backend

export const DEMO_COURSES = [
  {
    id: 'demo-1',
    title: 'Penalaran Verbal',
    description:
      'Pelajari teknik menjawab soal penalaran verbal TKA. Meliputi analogi, silogisme, dan pemahaman bacaan. Materi ini penting untuk meningkatkan skor TKA Anda.',
    category: 'Penalaran',
    moduleCount: 2,
    thumbnail: '',
    instructor_id: 'instructor-1',
    created_at: '2024-01-15T00:00:00.000Z',
  },
  {
    id: 'demo-2',
    title: 'Penalaran Numerik',
    description:
      'Kuasai soal penalaran numerik dengan strategi yang tepat. Termasuk pola bilangan, deret, dan logika matematika. Tingkatkan kemampuan analisis angka Anda.',
    category: 'Penalaran',
    moduleCount: 2,
    thumbnail: '',
    instructor_id: 'instructor-1',
    created_at: '2024-02-01T00:00:00.000Z',
  },
  {
    id: 'demo-3',
    title: 'Penalaran Figural',
    description:
      'Pelajari cara menganalisis pola gambar dan bentuk dalam soal TKA. Termasuk rotasi, refleksi, dan transformasi visual.',
    category: 'Penalaran',
    moduleCount: 2,
    thumbnail: '',
    instructor_id: 'instructor-2',
    created_at: '2024-02-15T00:00:00.000Z',
  },
  {
    id: 'demo-4',
    title: 'Pengetahuan Kuantitatif',
    description:
      'Pelajari konsep matematika dasar yang sering muncul di TKA, termasuk aritmatika, aljabar, dan statistika dasar.',
    category: 'Kuantitatif',
    moduleCount: 1,
    thumbnail: '',
    instructor_id: 'instructor-3',
    created_at: '2024-03-01T00:00:00.000Z',
  },
  {
    id: 'demo-5',
    title: 'Pengetahuan & Pemahaman Umum',
    description:
      'Tingkatkan wawasan umum Anda dengan materi PPU. Meliputi topik-topik terkini, pengetahuan sosial, dan kemampuan memahami teks.',
    category: 'PPU',
    moduleCount: 1,
    thumbnail: '',
    instructor_id: 'instructor-2',
    created_at: '2024-03-15T00:00:00.000Z',
  },
  {
    id: 'demo-6',
    title: 'Literasi Bahasa Indonesia',
    description:
      'Kuasai kemampuan memahami dan menganalisis teks berbahasa Indonesia. Latih kemampuan membaca kritis dan inferensi.',
    category: 'Literasi',
    moduleCount: 1,
    thumbnail: '',
    instructor_id: 'instructor-1',
    created_at: '2024-04-01T00:00:00.000Z',
  },
];

export const DEMO_MODULES = [
  // Penalaran Verbal
  {
    id: 'mod-1',
    course_id: 'demo-1',
    title: 'Analogi dan Silogisme',
    order: 1,
  },
  { id: 'mod-2', course_id: 'demo-1', title: 'Pemahaman Bacaan', order: 2 },

  // Penalaran Numerik
  {
    id: 'mod-3',
    course_id: 'demo-2',
    title: 'Pola Bilangan dan Deret',
    order: 1,
  },
  { id: 'mod-4', course_id: 'demo-2', title: 'Logika Matematika', order: 2 },

  // Penalaran Figural
  {
    id: 'mod-5',
    course_id: 'demo-3',
    title: 'Pola dan Transformasi Gambar',
    order: 1,
  },
  { id: 'mod-6', course_id: 'demo-3', title: 'Rotasi dan Refleksi', order: 2 },

  // Pengetahuan Kuantitatif
  {
    id: 'mod-7',
    course_id: 'demo-4',
    title: 'Aritmatika dan Aljabar',
    order: 1,
  },

  // PPU
  {
    id: 'mod-8',
    course_id: 'demo-5',
    title: 'Wawasan Umum dan Sosial',
    order: 1,
  },

  // Literasi Bahasa Indonesia
  {
    id: 'mod-9',
    course_id: 'demo-6',
    title: 'Analisis Teks dan Inferensi',
    order: 1,
  },
];

export const DEMO_LESSONS = [
  // Penalaran Verbal Module 1 Lessons
  {
    id: 'lesson-1',
    module_id: 'mod-1',
    title: 'Pengenalan Soal Analogi',
    youtube_url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
    summary:
      'Pengenalan konsep analogi dalam TKA. Pelajari cara mengenali hubungan antar kata dan menemukan pasangan yang tepat.',
    order: 1,
  },
  {
    id: 'lesson-2',
    module_id: 'mod-1',
    title: 'Teknik Menjawab Silogisme',
    youtube_url: 'https://www.youtube.com/watch?v=9emXNzqCKyg',
    summary:
      'Pelajari silogisme kategoris dan cara menarik kesimpulan logis dari premis-premis yang diberikan.',
    order: 2,
  },
  {
    id: 'lesson-3',
    module_id: 'mod-1',
    title: 'Latihan Soal Analogi dan Silogisme',
    youtube_url: 'https://www.youtube.com/watch?v=FZzyij43A54',
    summary:
      'Pembahasan soal-soal analogi dan silogisme dengan tingkat kesulitan bervariasi.',
    order: 3,
  },

  // Penalaran Verbal Module 2 Lessons
  {
    id: 'lesson-4',
    module_id: 'mod-2',
    title: 'Strategi Memahami Bacaan',
    youtube_url: 'https://www.youtube.com/watch?v=gigtS_5KOqo',
    summary:
      'Teknik membaca cepat dan efektif untuk memahami isi teks dan menjawab pertanyaan pemahaman bacaan.',
    order: 1,
  },
  {
    id: 'lesson-5',
    module_id: 'mod-2',
    title: 'Mencari Ide Pokok dan Kesimpulan',
    youtube_url: 'https://www.youtube.com/watch?v=oigfaZ5ApsM',
    summary:
      'Cara menemukan ide pokok dalam paragraf dan menarik kesimpulan dari teks yang diberikan.',
    order: 2,
  },

  // Penalaran Numerik Module 1 Lessons
  {
    id: 'lesson-6',
    module_id: 'mod-3',
    title: 'Pola Bilangan Dasar',
    youtube_url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
    summary:
      'Pengenalan berbagai jenis pola bilangan: aritmatika, geometri, dan pola campuran.',
    order: 1,
  },
  {
    id: 'lesson-7',
    module_id: 'mod-3',
    title: 'Deret dan Barisan Bilangan',
    youtube_url: 'https://www.youtube.com/watch?v=9YkUCxvaLEk',
    summary:
      'Memahami konsep deret aritmatika dan geometri serta aplikasinya dalam soal TKA.',
    order: 2,
  },

  // Penalaran Numerik Module 2 Lessons
  {
    id: 'lesson-8',
    module_id: 'mod-4',
    title: 'Logika Proposisi',
    youtube_url: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
    summary:
      'Pengenalan logika proposisi: konjungsi, disjungsi, implikasi, dan biimplikasi.',
    order: 1,
  },
  {
    id: 'lesson-9',
    module_id: 'mod-4',
    title: 'Penalaran Deduktif dan Induktif',
    youtube_url: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U',
    summary:
      'Memahami perbedaan penalaran deduktif dan induktif serta penerapannya dalam soal.',
    order: 2,
  },

  // Penalaran Figural Lessons
  {
    id: 'lesson-10',
    module_id: 'mod-5',
    title: 'Pengenalan Pola Gambar',
    youtube_url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
    summary:
      'Pengenalan berbagai jenis pola gambar dalam TKA: pola urutan, matriks, dan transformasi.',
    order: 1,
  },
  {
    id: 'lesson-11',
    module_id: 'mod-6',
    title: 'Rotasi dan Refleksi Gambar',
    youtube_url: 'https://www.youtube.com/watch?v=pKd0Rpw7O48',
    summary:
      'Memahami konsep rotasi 90°, 180°, 270° dan refleksi horizontal/vertikal dalam soal figural.',
    order: 1,
  },

  // Pengetahuan Kuantitatif Lesson
  {
    id: 'lesson-12',
    module_id: 'mod-7',
    title: 'Aritmatika dan Aljabar Dasar',
    youtube_url: 'https://www.youtube.com/watch?v=KwJ_HMedAFQ', // contoh video numerasi
    summary:
      'Review konsep aritmatika dan aljabar yang sering muncul di soal TKA.',
    order: 1,
  },

  // PPU Lesson
  {
    id: 'lesson-13',
    module_id: 'mod-8',
    title: 'Wawasan Kebangsaan dan Sosial',
    youtube_url: 'https://www.youtube.com/watch?v=qw--VYLpxG4',
    summary:
      'Materi wawasan kebangsaan, sosial, dan isu-isu terkini yang sering muncul di TKA.',
    order: 1,
  },

  // Literasi Bahasa Indonesia Lesson
  {
    id: 'lesson-14',
    module_id: 'mod-9',
    title: 'Teknik Membaca Kritis',
    youtube_url: 'https://www.youtube.com/watch?v=KwJ_HMedAFQ', // sama dengan video demo literasi
    summary:
      'Strategi membaca kritis untuk menganalisis teks dan menjawab soal literasi bahasa Indonesia.',
    order: 1,
  },
];

export const DEMO_QUIZZES = [
  // Penalaran Verbal Lesson 1 Quiz
  {
    id: 'quiz-1',
    lesson_id: 'lesson-1',
    question: 'PANAS : DINGIN = TINGGI : ?',
    option_a: 'Besar',
    option_b: 'Rendah',
    option_c: 'Kecil',
    option_d: 'Pendek',
    correct_answer: 'b',
  },
  {
    id: 'quiz-2',
    lesson_id: 'lesson-1',
    question: 'DOKTER : PASIEN = GURU : ?',
    option_a: 'Sekolah',
    option_b: 'Buku',
    option_c: 'Murid',
    option_d: 'Kelas',
    correct_answer: 'c',
  },
  {
    id: 'quiz-3',
    lesson_id: 'lesson-1',
    question: 'BURUNG : SANGKAR = IKAN : ?',
    option_a: 'Air',
    option_b: 'Kolam',
    option_c: 'Akuarium',
    option_d: 'Laut',
    correct_answer: 'c',
  },

  // Penalaran Verbal Lesson 2 Quiz
  {
    id: 'quiz-4',
    lesson_id: 'lesson-2',
    question:
      'Semua mamalia berdarah panas. Paus adalah mamalia. Kesimpulannya?',
    option_a: 'Paus hidup di air',
    option_b: 'Paus berdarah panas',
    option_c: 'Paus adalah ikan',
    option_d: 'Semua yang berdarah panas adalah paus',
    correct_answer: 'b',
  },
  {
    id: 'quiz-5',
    lesson_id: 'lesson-2',
    question:
      'Tidak ada politisi yang jujur. Budi adalah politisi. Kesimpulannya?',
    option_a: 'Budi jujur',
    option_b: 'Budi tidak jujur',
    option_c: 'Semua orang jujur adalah politisi',
    option_d: 'Budi bukan politisi',
    correct_answer: 'b',
  },

  // Penalaran Numerik Quiz
  {
    id: 'quiz-6',
    lesson_id: 'lesson-6',
    question: 'Pola: 2, 6, 18, 54, ... Bilangan selanjutnya adalah?',
    option_a: '108',
    option_b: '162',
    option_c: '216',
    option_d: '180',
    correct_answer: 'b',
  },
  {
    id: 'quiz-7',
    lesson_id: 'lesson-6',
    question: 'Pola: 1, 4, 9, 16, 25, ... Bilangan selanjutnya adalah?',
    option_a: '30',
    option_b: '36',
    option_c: '42',
    option_d: '49',
    correct_answer: 'b',
  },

  // Logika Quiz
  {
    id: 'quiz-8',
    lesson_id: 'lesson-8',
    question: 'Jika p benar dan q salah, maka p ∧ q bernilai?',
    option_a: 'Benar',
    option_b: 'Salah',
    option_c: 'Tidak dapat ditentukan',
    option_d: 'Tergantung konteks',
    correct_answer: 'b',
  },
  {
    id: 'quiz-9',
    lesson_id: 'lesson-8',
    question: 'Negasi dari "Semua siswa rajin belajar" adalah?',
    option_a: 'Semua siswa tidak rajin belajar',
    option_b: 'Ada siswa yang tidak rajin belajar',
    option_c: 'Tidak ada siswa yang rajin belajar',
    option_d: 'Beberapa siswa rajin belajar',
    correct_answer: 'b',
  },
];

export const DEMO_CATEGORIES = ['Penalaran', 'Kuantitatif', 'PPU', 'Literasi'];

// Helper function to get course with modules and lessons
export const getDemoCourseWithDetails = (courseId) => {
  const course = DEMO_COURSES.find((c) => c.id === courseId);
  if (!course) return null;

  const modules = DEMO_MODULES.filter((m) => m.course_id === courseId)
    .sort((a, b) => a.order - b.order)
    .map((module) => ({
      ...module,
      lessons: DEMO_LESSONS.filter((l) => l.module_id === module.id).sort(
        (a, b) => a.order - b.order,
      ),
    }));

  return { ...course, modules };
};

// Helper function to get lesson with details
export const getDemoLessonWithDetails = (lessonId) => {
  const lesson = DEMO_LESSONS.find((l) => l.id === lessonId);
  if (!lesson) return null;

  const module = DEMO_MODULES.find((m) => m.id === lesson.module_id);
  const course = module
    ? DEMO_COURSES.find((c) => c.id === module.course_id)
    : null;

  // Get quizzes for this lesson
  const quizzes = DEMO_QUIZZES.filter((q) => q.lesson_id === lessonId).map(
    (q) => ({
      id: q.id,
      question: q.question,
      options: {
        a: q.option_a,
        b: q.option_b,
        c: q.option_c,
        d: q.option_d,
      },
    }),
  );

  // Get navigation (prev/next lessons)
  const moduleLessons = DEMO_LESSONS.filter(
    (l) => l.module_id === lesson.module_id,
  ).sort((a, b) => a.order - b.order);

  const currentIndex = moduleLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < moduleLessons.length - 1
      ? moduleLessons[currentIndex + 1]
      : null;

  return {
    lesson: {
      ...lesson,
      module: module ? { id: module.id, title: module.title } : null,
      course: course ? { id: course.id, title: course.title } : null,
    },
    quizzes,
    navigation: {
      prevLesson: prevLesson
        ? { id: prevLesson.id, title: prevLesson.title }
        : null,
      nextLesson: nextLesson
        ? { id: nextLesson.id, title: nextLesson.title }
        : null,
    },
  };
};

// Helper to validate quiz answers (for demo mode)
export const validateDemoQuizAnswers = (lessonId, answers) => {
  const quizzes = DEMO_QUIZZES.filter((q) => q.lesson_id === lessonId);

  let correctCount = 0;
  const results = answers
    .map((answer) => {
      const quiz = quizzes.find((q) => q.id === answer.quiz_id);
      if (!quiz) return null;

      const isCorrect =
        quiz.correct_answer.toLowerCase() ===
        answer.selected_answer.toLowerCase();
      if (isCorrect) correctCount++;

      return {
        quiz_id: answer.quiz_id,
        question: quiz.question,
        selected_answer: answer.selected_answer,
        correct_answer: quiz.correct_answer,
        is_correct: isCorrect,
      };
    })
    .filter(Boolean);

  const score = Math.round((correctCount / quizzes.length) * 100);

  return {
    score,
    totalQuestions: quizzes.length,
    correctAnswers: correctCount,
    status: score >= 70 ? 'completed' : 'ongoing',
    passed: score >= 70,
    results,
  };
};
