// Script to clean up old Numerasi module
import { supabase } from './services/supabase.js';

async function cleanupOldNumerasi() {
    console.log('=== Cleaning up old Numerasi module ===\n');

    try {
        // 1. Check for old module
        const { data: oldModule } = await supabase
            .from('modules')
            .select('id, title')
            .eq('id', 'mod-numerasi-1')
            .single();

        if (oldModule) {
            console.log('Found old module:', oldModule.title);

            // 2. Delete old quiz first
            console.log('Deleting old quiz...');
            await supabase
                .from('quizzes')
                .delete()
                .eq('lesson_id', 'lesson-numerasi-1');
            console.log('✓ Old quiz deleted');

            // 3. Delete old lesson
            console.log('Deleting old lesson...');
            await supabase
                .from('lessons')
                .delete()
                .eq('id', 'lesson-numerasi-1');
            console.log('✓ Old lesson deleted');

            // 4. Delete old module
            console.log('Deleting old module...');
            await supabase
                .from('modules')
                .delete()
                .eq('id', 'mod-numerasi-1');
            console.log('✓ Old module deleted');
        } else {
            console.log('No old module found (already cleaned)');
        }

        // 5. Verify current modules
        console.log('\n=== Current TKA Numerasi modules ===');
        const { data: currentModules } = await supabase
            .from('modules')
            .select('id, title, order_index')
            .eq('course_id', 'tka-numerasi')
            .order('order_index');

        currentModules.forEach(mod => {
            console.log(`${mod.order_index}. ${mod.title} (${mod.id})`);
        });

        console.log('\n✅ Cleanup complete!');
        console.log(`Total modules: ${currentModules.length}`);

    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        throw error;
    }
}

cleanupOldNumerasi()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Cleanup failed:', error);
        process.exit(1);
    });
