const express = require('express');
const app = express();
const port = 3004;

app.use(express.json());

// Route to handle query parameters
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const filter = req.query.filter || 'none';
    res.send(`User ID: ${userId}, Filter: ${filter}`);
})

app.get('/users/:userId/books/:bookId', (req, res) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    console.log(userId, bookId);
    
    const sort = req.query.sort || 'asc';
    res.send(`User ID: ${userId}, Book ID: ${bookId}, Sort: ${sort}`);
})


app.get('/search', (req, res) => {
    const {name, age} = req.query;
    res.send(`Search Results for Name: ${name}, Age: ${age}`);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})