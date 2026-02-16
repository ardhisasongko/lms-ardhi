// Test script to verify quiz submission endpoint
import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000';

async function testQuizSubmission() {
    console.log('=== Testing Quiz Submission ===\n');

    // Step 1: Get lesson data
    console.log('1. Fetching lesson data for les-num-3...');
    const lessonResponse = await fetch(`${API_URL}/api/lessons/les-num-3`);
    const lessonData = await lessonResponse.json();

    if (!lessonData.success) {
        console.error('❌ Failed to fetch lesson:', lessonData.message);
        return;
    }

    const quizzes = lessonData.data.quizzes;
    console.log(`✓ Found ${quizzes.length} questions`);
    console.log('Quiz IDs:', quizzes.map(q => q.id).join(', '));
    console.log('');

    // Step 2: Prepare answers (simulate user answering all questions)
    console.log('2. Preparing test answers...');
    const answers = quizzes.map((quiz, index) => ({
        quiz_id: quiz.id,
        selected_answer: index % 4  // Just cycle through 0,1,2,3
    }));

    console.log('Answers to submit:');
    answers.forEach(a => console.log(`  - ${a.quiz_id}: answer index ${a.selected_answer}`));
    console.log('');

    // Step 3: Submit quiz (without authentication for now)
    console.log('3. Submitting quiz...');
    try {
        const submitResponse = await fetch(`${API_URL}/api/quiz/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lesson_id: 'les-num-3',
                answers: answers
            })
        });

        const submitData = await submitResponse.json();

        if (submitResponse.ok) {
            console.log('✅ Submission successful!');
            console.log('Score:', submitData.data.score);
            console.log('Correct answers:', submitData.data.correctAnswers, '/', submitData.data.totalQuestions);
            console.log('Passed:', submitData.data.passed);
        } else {
            console.log('❌ Submission failed!');
            console.log('Status:', submitResponse.status);
            console.log('Error:', submitData.message);
            console.log('Full response:', JSON.stringify(submitData, null, 2));
        }
    } catch (error) {
        console.error('❌ Error during submission:', error.message);
    }
}

testQuizSubmission().catch(console.error);
