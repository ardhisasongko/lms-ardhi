const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// OPTIMIZATION: In-memory cache for API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * API helper functions for the LMS
 */
class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Get authorization headers
   */
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        console.warn('⚠️ Token expired or invalid. Redirecting to login...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Show alert before redirect
        alert('Sesi Anda telah berakhir. Silakan login kembali.');

        window.location.href = '/login';
      }
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  }

  /**
   * Make GET request with caching
   */
  async get(endpoint, useCache = true) {
    // Check cache first
    if (useCache && cache.has(endpoint)) {
      const { data, timestamp } = cache.get(endpoint);
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log(`📦 Cache hit: ${endpoint}`);
        return data;
      }
      // Cache expired, remove it
      cache.delete(endpoint);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    const data = await this.handleResponse(response);

    // Store in cache
    if (useCache) {
      cache.set(endpoint, { data, timestamp: Date.now() });
    }

    return data;
  }

  /**
   * Make POST request
   */
  async post(endpoint, body) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  /**
   * Make PUT request
   */
  async put(endpoint, body) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  /**
   * Make DELETE request
   */
  async delete(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // =====================
  // Auth Endpoints
  // =====================

  async register(name, email, password, role = 'student') {
    return this.post('/auth/register', { name, email, password, role });
  }

  async login(email, password) {
    return this.post('/auth/login', { email, password });
  }

  async getProfile() {
    return this.get('/auth/me');
  }

  async refreshToken() {
    return this.post('/auth/refresh', {});
  }

  // =====================
  // Course Endpoints
  // =====================

  async getCourses(page = 1, limit = 10, category = '') {
    let url = `/courses?page=${page}&limit=${limit}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    return this.get(url);
  }

  async getCourse(id) {
    return this.get(`/courses/${id}`);
  }

  async getCategories() {
    return this.get('/courses/categories');
  }

  async createCourse(courseData) {
    return this.post('/courses', courseData);
  }

  async addModule(courseId, title, order) {
    return this.post(`/courses/${courseId}/modules`, { title, order });
  }

  // =====================
  // Lesson Endpoints
  // =====================

  async getLesson(id) {
    return this.get(`/lessons/${id}`);
  }

  async createLesson(lessonData) {
    return this.post('/lessons', lessonData);
  }

  async addQuizQuestions(lessonId, questions) {
    return this.post(`/lessons/${lessonId}/quizzes`, { questions });
  }

  // =====================
  // Quiz Endpoints
  // =====================

  async getQuiz(lessonId) {
    return this.get(`/quiz/lesson/${lessonId}`);
  }

  async submitQuiz(lessonId, answers) {
    return this.post('/quiz/submit', { lesson_id: lessonId, answers });
  }

  // =====================
  // Progress Endpoints
  // =====================

  async getProgress(userId) {
    return this.get(`/progress/${userId}`);
  }

  async getCourseProgress(courseId) {
    return this.get(`/progress/course/${courseId}`);
  }
}

// Export singleton instance
const api = new ApiService();
export default api;
