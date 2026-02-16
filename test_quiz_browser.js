// Simple test to check if quiz submission works
// Run this in browser console while on quiz page

async function testQuizSubmission() {
    console.log('=== Testing Quiz Submission ===');

    // Get token from localStorage
    const token = localStorage.getItem('token');
    console.log('Token exists:', !!token);

    if (!token) {
        console.error('❌ No authentication token found! Please login first.');
        return;
    }

    // Test data for les-lit-1 (8 questions)
    const testAnswers = [
        { quiz_id: 'quiz-lit-1-q0', selected_answer: 1 },
        { quiz_id: 'quiz-lit-1-q1', selected_answer: 1 },
        { quiz_id: 'quiz-lit-1-q2', selected_answer: 1 },
        { quiz_id: 'quiz-lit-1-q3', selected_answer: 1 },
        { quiz_id: 'quiz-lit-1-q4', selected_answer: 1 },
        { quiz_id: 'quiz-lit-1-q5', selected_answer: 1 },
        { quiz_id: 'quiz-lit-1-q6', selected_answer: 1 },
        { quiz_id: 'quiz-lit-1-q7', selected_answer: 1 },
    ];

    try {
        const response = await fetch('http://localhost:5000/api/quiz/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                lesson_id: 'les-lit-1',
                answers: testAnswers
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ SUCCESS!');
            console.log('Score:', data.data.score);
            console.log('Passed:', data.data.passed);
            console.log('Full response:', data);
        } else {
            console.error('❌ FAILED!');
            console.error('Status:', response.status);
            console.error('Message:', data.message);
            console.error('Full response:', data);
        }
    } catch (error) {
        console.error('❌ ERROR:', error);
    }
}

// Run the test
testQuizSubmission();
