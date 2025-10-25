const express = require('express');
const app = express();
const port = 3000;

// Middleware function for parse the incoming JSON requests
app.use(express.json());

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to Error Handling Demo!');
});

// Example route to get users
app.get('/users', asyncHandler(async (req, res) => {
    if (users.length === 0) {
        const error = new Error('No users found');
        error.status = 404;
        throw error;
    }
    res.json(users);
}))

// Get user by ID
app.get('/users/:id', asyncHandler(async (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    res.json(user);
}));

// Example route that throws error
app.get('/cause-error', (req, res, next) => {
    const error = new Error('This is a forced error!');
    error.status = 400;
    next(error);
});

// 404 Not Found middleware
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    const errorResponse = {
        success: false,
        message: err.message || 'Internal Server Error',
        status: err.status || 500
    };

    // Add stack trace in development mode
    if (isDevelopment) {
        errorResponse.stack = err.stack;
        errorResponse.path = req.path;
        errorResponse.method = req.method;
    }

    res.status(errorResponse.status).json(errorResponse);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});