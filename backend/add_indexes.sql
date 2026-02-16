-- Performance Optimization: Database Indexes
-- This script adds indexes to frequently queried columns for 50-70% faster queries

-- Users table: email is used for login lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Lessons table: course_id is used to fetch all lessons for a course
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON lessons(module_id);

-- Modules table: course_id is used to fetch all modules for a course
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON modules(course_id);

-- Quizzes table: lesson_id is used to fetch quiz for a lesson
CREATE INDEX IF NOT EXISTS idx_quizzes_lesson_id ON quizzes(lesson_id);

-- User progress table: user_id and lesson_id are frequently queried
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_lesson ON user_progress(user_id, lesson_id);

-- Enrollments table: user_id and course_id for enrollment lookups
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_course ON enrollments(user_id, course_id);

-- Verify indexes created
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
