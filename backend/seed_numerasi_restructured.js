import { supabase } from './services/supabase.js';
import fs from 'fs';

// Read the generated questions
const questions = JSON.parse(fs.readFileSync('../complete_30_questions.json', 'utf-8'));

async function seedNumerasiRestructured() {
    console.log('Starting TKA Numerasi restructuring...');

    try {
        // 0. Delete existing data in correct order
        console.log('\n0. Checking for existing course and related data...');

        const { data: existingCourse } = await supabase
            .from('courses')
            .select('id')
            .eq('id', 'tka-numerasi')
            .single();

        if (existingCourse) {
            console.log('Found existing course, deleting old structure...');

            // Delete old quizzes, lessons, modules
            await supabase.from('quizzes').delete().eq('lesson_id', 'lesson-numerasi-1');
            await supabase.from('lessons').delete().eq('id', 'lesson-numerasi-1');
            await supabase.from('modules').delete().eq('id', 'mod-numerasi-1');

            console.log('✓ Old structure deleted');
        }

        // 1. Update Course (keep existing, just ensure it's there)
        console.log('\n1. Ensuring course exists...');
        const { data: course, error: courseError } = await supabase
            .from('courses')
            .upsert({
                id: 'tka-numerasi',
                title: 'TKA Numerasi',
                description: 'Persiapan Tes Kemampuan Akademik - Numerasi Matematika tingkat SMP. Materi lengkap mencakup Bilangan, Aljabar, Geometri, dan Data & Peluang.',
                instructor: 'Tim Pengajar LMS Ardhi',
                duration: '8 jam',
                level: 'Menengah',
                image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (courseError) throw courseError;
        console.log('✓ Course ready:', course.id);

        // 2. Create 4 Modules
        console.log('\n2. Creating 4 modules...');

        const modules = [
            {
                id: 'mod-num-1',
                course_id: course.id,
                title: 'Bilangan',
                description: 'Perbandingan, operasi aritmetika, bilangan berpangkat, pecahan, dan FPB-KPK',
                order_index: 1
            },
            {
                id: 'mod-num-2',
                course_id: course.id,
                title: 'Aljabar',
                description: 'Persamaan linear, sistem persamaan, barisan, deret, dan fungsi',
                order_index: 2
            },
            {
                id: 'mod-num-3',
                course_id: course.id,
                title: 'Geometri & Pengukuran',
                description: 'Sudut, transformasi, luas, volume, dan teorema Pythagoras',
                order_index: 3
            },
            {
                id: 'mod-num-4',
                course_id: course.id,
                title: 'Data & Peluang',
                description: 'Statistika, interpretasi data, diagram, dan peluang',
                order_index: 4
            }
        ];

        const { error: modulesError } = await supabase
            .from('modules')
            .insert(modules);

        if (modulesError) throw modulesError;
        console.log('✓ 4 modules created');

        // 3. Create 9 Lessons with distributed questions
        console.log('\n3. Creating 9 lessons...');

        const lessons = [
            // Module 1: Bilangan (Q1-7)
            {
                id: 'les-num-1',
                module_id: 'mod-num-1',
                course_id: course.id,
                title: 'Perbandingan & Operasi Aritmetika',
                content: 'Materi tentang perbandingan, operasi hitung, bilangan berpangkat, dan pecahan. Latihan soal 1-4.',
                video_url: null,
                order_index: 1,
                questions: questions.slice(0, 4) // Q1-4
            },
            {
                id: 'les-num-2',
                module_id: 'mod-num-1',
                course_id: course.id,
                title: 'Akar, Bilangan Bulat & FPB-KPK',
                content: 'Materi tentang akar dan pangkat, operasi bilangan bulat, FPB dan KPK. Latihan soal 5-7.',
                video_url: null,
                order_index: 2,
                questions: questions.slice(4, 7) // Q5-7
            },

            // Module 2: Aljabar (Q8-14)
            {
                id: 'les-num-3',
                module_id: 'mod-num-2',
                course_id: course.id,
                title: 'Persamaan & Pertidaksamaan Linear',
                content: 'Materi tentang persamaan linear, sistem persamaan linear, pertidaksamaan, dan bentuk aljabar. Latihan soal 8-11.',
                video_url: null,
                order_index: 1,
                questions: questions.slice(7, 11) // Q8-11
            },
            {
                id: 'les-num-4',
                module_id: 'mod-num-2',
                course_id: course.id,
                title: 'Barisan, Deret & Fungsi',
                content: 'Materi tentang barisan aritmatika, deret aritmatika, dan fungsi. Latihan soal 12-14.',
                video_url: null,
                order_index: 2,
                questions: questions.slice(11, 14) // Q12-14
            },

            // Module 3: Geometri (Q15-23)
            {
                id: 'les-num-5',
                module_id: 'mod-num-3',
                course_id: course.id,
                title: 'Sudut & Transformasi',
                content: 'Materi tentang sudut, transformasi geometri, dan luas permukaan. Latihan soal 15-17.',
                video_url: null,
                order_index: 1,
                questions: questions.slice(14, 17) // Q15-17
            },
            {
                id: 'les-num-6',
                module_id: 'mod-num-3',
                course_id: course.id,
                title: 'Keliling, Luas & Pythagoras',
                content: 'Materi tentang keliling, luas, teorema Pythagoras, dan volume bangun ruang. Latihan soal 18-20.',
                video_url: null,
                order_index: 2,
                questions: questions.slice(17, 20) // Q18-20
            },
            {
                id: 'les-num-7',
                module_id: 'mod-num-3',
                course_id: course.id,
                title: 'Bangun Ruang Lanjutan',
                content: 'Materi tentang prisma, trapesium, dan volume gabungan bangun ruang. Latihan soal 21-23.',
                video_url: null,
                order_index: 3,
                questions: questions.slice(20, 23) // Q21-23
            },

            // Module 4: Data & Peluang (Q24-30)
            {
                id: 'les-num-8',
                module_id: 'mod-num-4',
                course_id: course.id,
                title: 'Statistika & Interpretasi Data',
                content: 'Materi tentang distribusi frekuensi, interpretasi data, diagram batang, dan ukuran pemusatan. Latihan soal 24-27.',
                video_url: null,
                order_index: 1,
                questions: questions.slice(23, 27) // Q24-27
            },
            {
                id: 'les-num-9',
                module_id: 'mod-num-4',
                course_id: course.id,
                title: 'Peluang & Kombinatorik',
                content: 'Materi tentang peluang kejadian, peluang rute, dan kombinasi peluang. Latihan soal 28-30.',
                video_url: null,
                order_index: 2,
                questions: questions.slice(27, 30) // Q28-30
            }
        ];

        // Insert lessons (without questions field for now)
        const lessonsToInsert = lessons.map(({ questions, ...lesson }) => lesson);
        const { error: lessonsError } = await supabase
            .from('lessons')
            .insert(lessonsToInsert);

        if (lessonsError) throw lessonsError;
        console.log('✓ 9 lessons created');

        // 4. Create Quizzes for each lesson
        console.log('\n4. Creating quizzes for each lesson...');

        let totalQuestions = 0;
        for (const lesson of lessons) {
            const quizQuestions = lesson.questions.map(q => ({
                question: q.question,
                options: [q.options.a, q.options.b, q.options.c, q.options.d],
                correctIndex: q.correct_answer === 'a' ? 0 : q.correct_answer === 'b' ? 1 : q.correct_answer === 'c' ? 2 : 3
            }));

            const { error: quizError } = await supabase
                .from('quizzes')
                .insert({
                    id: `quiz-${lesson.id}`,
                    lesson_id: lesson.id,
                    questions: quizQuestions
                });

            if (quizError) throw quizError;

            totalQuestions += quizQuestions.length;
            console.log(`  ✓ Quiz for ${lesson.title}: ${quizQuestions.length} questions`);
        }

        console.log('\n✅ TKA Numerasi restructuring completed successfully!');
        console.log('\nSummary:');
        console.log(`- Course: ${course.title} (${course.id})`);
        console.log(`- Modules: 4 (Bilangan, Aljabar, Geometri, Data & Peluang)`);
        console.log(`- Lessons: 9`);
        console.log(`- Total Questions: ${totalQuestions}`);
        console.log('\nModule Breakdown:');
        console.log('  1. Bilangan: 2 lessons, 7 questions');
        console.log('  2. Aljabar: 2 lessons, 7 questions');
        console.log('  3. Geometri & Pengukuran: 3 lessons, 9 questions');
        console.log('  4. Data & Peluang: 2 lessons, 7 questions');

    } catch (error) {
        console.error('\n❌ Error restructuring TKA Numerasi:', error);
        throw error;
    }
}

// Run the restructuring
seedNumerasiRestructured()
    .then(() => {
        console.log('\nRestructuring process finished!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Restructuring failed:', error);
        process.exit(1);
    });
