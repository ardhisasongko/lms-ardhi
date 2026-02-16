import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} dirty - Potentially unsafe HTML string
 * @returns {string} - Sanitized HTML string
 */
export const sanitizeHtml = (dirty) => {
    if (typeof dirty !== 'string') return dirty;
    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'blockquote'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
};

/**
 * Sanitize plain text (remove all HTML)
 * @param {string} dirty - Potentially unsafe string
 * @returns {string} - Plain text string
 */
export const sanitizeText = (dirty) => {
    if (typeof dirty !== 'string') return dirty;
    return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
};

/**
 * Middleware to sanitize request body
 * Automatically sanitizes all string fields in req.body
 */
export const sanitizeBody = (fieldsToSanitize = []) => {
    return (req, res, next) => {
        if (!req.body) return next();

        // If specific fields are provided, only sanitize those
        if (fieldsToSanitize.length > 0) {
            fieldsToSanitize.forEach((field) => {
                if (req.body[field] && typeof req.body[field] === 'string') {
                    req.body[field] = sanitizeHtml(req.body[field]);
                }
            });
        } else {
            // Otherwise, sanitize all string fields
            Object.keys(req.body).forEach((key) => {
                if (typeof req.body[key] === 'string') {
                    // Don't sanitize password fields
                    if (!key.toLowerCase().includes('password')) {
                        req.body[key] = sanitizeText(req.body[key]);
                    }
                }
            });
        }

        next();
    };
};
