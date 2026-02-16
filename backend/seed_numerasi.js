import { supabase } from './services/supabase.js';
import fs from 'fs';

// Read the generated questions
const questions = JSON.parse(fs.readFileSync('../complete_30_questions.json', 'utf-8'));

async function seedNumerasiModule() {
    console.log('Starting Numerasi module seeding...');

    try {
        // 0. Delete existing data in correct order (to handle foreign key constraints)
        console.log('\n0. Checking for existing course and related data...');

        // First, get the course to check if it exists
        const { data: existingCourse } = await supabase
            .from('courses')
            .select('id')
            .eq('id', 'tka-numerasi')
            .single();

        if (existingCourse) {
            console.log('Found existing course, deleting related data...');

            // Delete in order: quizzes -> lessons -> modules -> course
            await supabase.from('quizzes').delete().eq('lesson_id', 'lesson-numerasi-1');
            await supabase.from('lessons').delete().eq('id', 'lesson-numerasi-1');
            await supabase.from('modules').delete().eq('id', 'mod-numerasi-1');
            await supabase.from('courses').delete().eq('id', 'tka-numerasi');

            console.log('✓ Existing data deleted');
        } else {
            console.log('✓ No existing course found');
        }

        // 1. Insert Course
        console.log('\n1. Creating course...');
        const { data: course, error: courseError } = await supabase
            .from('courses')
            .insert({
                id: 'tka-numerasi',
                title: 'TKA Numerasi',
                description: 'Latihan soal Tes Kemampuan Akademik (TKA) Matematika tingkat SMP. Berisi 30 soal pilihan ganda yang mencakup Bilangan, Aljabar, Geometri, dan Data & Peluang.',
                instructor: 'Tim Pengajar LMS Ardhi',
                duration: '2 jam',
                level: 'Menengah',
                image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (courseError) throw courseError;
        console.log('✓ Course created:', course.id);

        // 2. Insert Module
        console.log('\\n2. Creating module...');
        const { data: module, error: moduleError } = await supabase
            .from('modules')
            .insert({
                id: 'mod-numerasi-1',
                course_id: course.id,
                title: 'Latihan Soal Numerasi',
                description: '30 soal latihan TKA Matematika',
                order_index: 1
            })
            .select()
            .single();

        if (moduleError) throw moduleError;
        console.log('✓ Module created:', module.id);

        // 3. Insert Lesson
        console.log('\\n3. Creating lesson...');
        const { data: lesson, error: lessonError } = await supabase
            .from('lessons')
            .insert({
                id: 'lesson-numerasi-1',
                module_id: module.id,
                course_id: course.id,
                title: 'Soal Latihan TKA Matematika',
                content: 'Kumpulan 30 soal latihan TKA Matematika yang mencakup berbagai topik: Bilangan (soal 1-7), Aljabar (soal 8-14), Geometri & Pengukuran (soal 15-23), serta Data & Peluang (soal 24-30). Selesaikan semua soal untuk menguji pemahaman Anda!',
                video_url: null,
                order_index: 1
            })
            .select()
            .single();

        if (lessonError) throw lessonError;
        console.log('✓ Lesson created:', lesson.id);

        // 4. Insert Quiz with all questions
        console.log('\n4. Creating quiz with all questions...');

        // Convert questions to the format expected by the database
        const quizQuestions = questions.map(q => ({
            question: q.question,
            options: [q.options.a, q.options.b, q.options.c, q.options.d],
            correctIndex: q.correct_answer === 'a' ? 0 : q.correct_answer === 'b' ? 1 : q.correct_answer === 'c' ? 2 : 3
        }));

        const { data: insertedQuiz, error: quizError } = await supabase
            .from('quizzes')
            .insert({
                id: 'quiz-numerasi-1',
                lesson_id: lesson.id,
                questions: quizQuestions
            })
            .select();

        if (quizError) throw quizError;
        console.log(`✓ Quiz created with ${quizQuestions.length} questions`);

        console.log('\n✅ Numerasi module seeding completed successfully!');
        console.log('\nSummary:');
        console.log(`- Course: ${course.title} (${course.id})`);
        console.log(`- Module: ${module.title} (${module.id})`);
        console.log(`- Lesson: ${lesson.title} (${lesson.id})`);
        console.log(`- Quiz: ${quizQuestions.length} questions`);

    } catch (error) {
        console.error('\\n❌ Error seeding Numerasi module:', error);
        throw error;
    }
}

// Run the seeding
seedNumerasiModule()
    .then(() => {
        console.log('\\nSeeding process finished!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });
