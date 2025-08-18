// Create a buffer from string
const buf = Buffer.from("Hello");

// View raw binary
console.log(buf); // <Buffer 48 65 6c 6c 6f>

// Convert buffer back to string
console.log(buf.toString()); // "Hello"
