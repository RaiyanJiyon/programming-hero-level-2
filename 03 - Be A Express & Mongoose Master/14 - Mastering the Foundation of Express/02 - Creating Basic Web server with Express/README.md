## 🚀 Creating a Basic Web Server with Express.js

### 🧠 What You’ll Learn

In this guide, you’ll learn how to:

* Set up an Express project
* Create a simple web server
* Handle routes and responses

---

### 🧩 Step 1: Set Up Your Project

#### 1. **Create a Project Folder**

Open your terminal and run:

```bash
mkdir express-server
cd express-server
```

#### 2. **Initialize a Node.js Project**

```bash
npm init -y
```

This creates a `package.json` file to store your project’s configuration.

#### 3. **Install Express**

```bash
npm install express
```

---

### ⚙️ Step 2: Create the Express Server

Now, create a file named `server.js` in your project folder and add this code:

```js
// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Define a port number
const PORT = 3000;

// Define a route for the root URL "/"
app.get('/', (req, res) => {
  res.send('Welcome to My Express Web Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

---

### 🧠 How It Works

Let’s break it down:

* `require('express')`: Imports the Express library.
* `express()`: Creates an Express app instance.
* `app.get('/', ...)`: Defines a route for the home page.
* `res.send(...)`: Sends a response to the client.
* `app.listen(...)`: Starts the web server and listens on port `3000`.

---

### ▶️ Step 3: Run the Server

Run the server using:

```bash
node server.js
```

You should see this message in your terminal:

```
Server is running at http://localhost:3000
```

---

### 🌐 Step 4: View in Browser

Open your web browser and visit:

```
http://localhost:3000
```

You’ll see:

> Welcome to My Express Web Server!

---

### 🧩 Step 5: Add More Routes (Optional)

You can add more routes easily:

```js
app.get('/about', (req, res) => {
  res.send('This is the About Page');
});

app.get('/contact', (req, res) => {
  res.send('Contact us at contact@example.com');
});
```

Now visit:

* `http://localhost:3000/about`
* `http://localhost:3000/contact`

---

### 🧱 Step 6: Use Middleware (Optional)

Middleware functions help process requests before sending responses.
For example, to serve static files (like HTML, CSS, images):

```js
app.use(express.static('public'));
```

If you create a folder named `public` and place an `index.html` file inside it,
Express will automatically serve it at the root URL.

---

### ✅ Summary

| Step | Description                        |
| ---- | ---------------------------------- |
| 1    | Initialize a Node.js project       |
| 2    | Install Express                    |
| 3    | Create a server file (`server.js`) |
| 4    | Define routes and responses        |
| 5    | Start and test your server         |
