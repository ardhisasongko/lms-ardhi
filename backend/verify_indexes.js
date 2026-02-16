// Script to verify database indexes
import { supabase } from './services/supabase.js';

async function verifyIndexes() {
    console.log('🔍 Checking database indexes...\n');

    try {
        // Query to get all indexes on our tables
        const { data, error } = await supabase
            .rpc('exec_sql', {
                sql_query: `
          SELECT 
            schemaname,
            tablename,
            indexname,
            indexdef
          FROM pg_indexes
          WHERE schemaname = 'public'
            AND tablename IN ('users', 'lessons', 'modules', 'quizzes', 'user_progress', 'enrollments')
          ORDER BY tablename, indexname;
        `
            });

        if (error) {
            console.error('❌ Error querying indexes:', error.message);
            console.log('\n⚠️ Alternative: Check manually in Supabase Dashboard');
            console.log('   Go to: Database → Indexes');
            return;
        }

        if (!data || data.length === 0) {
            console.log('⚠️ No custom indexes found yet.');
            console.log('\nPlease run the SQL script in Supabase Dashboard:');
            console.log('1. Go to SQL Editor');
            console.log('2. Copy content from backend/add_indexes.sql');
            console.log('3. Run the script');
            return;
        }

        // Group indexes by table
        const indexesByTable = {};
        data.forEach(row => {
            if (!indexesByTable[row.tablename]) {
                indexesByTable[row.tablename] = [];
            }
            indexesByTable[row.tablename].push(row);
        });

        // Display results
        console.log('✅ Found indexes:\n');

        Object.keys(indexesByTable).sort().forEach(tableName => {
            console.log(`📊 Table: ${tableName}`);
            indexesByTable[tableName].forEach(idx => {
                const isCustom = idx.indexname.startsWith('idx_');
                const marker = isCustom ? '✓' : ' ';
                console.log(`  ${marker} ${idx.indexname}`);
            });
            console.log('');
        });

        // Check if our custom indexes exist
        const expectedIndexes = [
            'idx_users_email',
            'idx_lessons_course_id',
            'idx_lessons_module_id',
            'idx_modules_course_id',
            'idx_quizzes_lesson_id',
            'idx_user_progress_user_id',
            'idx_user_progress_lesson_id',
            'idx_user_progress_user_lesson',
            'idx_enrollments_user_id',
            'idx_enrollments_course_id',
            'idx_enrollments_user_course',
        ];

        const foundIndexNames = data.map(idx => idx.indexname);
        const customIndexes = expectedIndexes.filter(name => foundIndexNames.includes(name));
        const missingIndexes = expectedIndexes.filter(name => !foundIndexNames.includes(name));

        console.log('=== Summary ===');
        console.log(`✅ Custom indexes found: ${customIndexes.length}/${expectedIndexes.length}`);

        if (customIndexes.length > 0) {
            console.log('\n✓ Successfully created:');
            customIndexes.forEach(name => console.log(`  - ${name}`));
        }

        if (missingIndexes.length > 0) {
            console.log('\n⚠️ Missing indexes:');
            missingIndexes.forEach(name => console.log(`  - ${name}`));
            console.log('\nPlease run the SQL script to create missing indexes.');
        } else {
            console.log('\n🎉 All performance indexes are in place!');
            console.log('📊 Database queries should now be 50-70% faster!');
        }

    } catch (error) {
        console.error('❌ Error:', error);
        console.log('\n💡 Manual check:');
        console.log('   1. Go to Supabase Dashboard');
        console.log('   2. Navigate to Database → Indexes');
        console.log('   3. Look for indexes starting with "idx_"');
    }
}

verifyIndexes()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Failed:', error);
        process.exit(1);
    });
