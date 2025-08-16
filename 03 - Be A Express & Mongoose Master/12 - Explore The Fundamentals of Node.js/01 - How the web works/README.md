## 🌐 1. The Web vs. The Internet

* **Internet** = the global network of computers connected together.
* **World Wide Web (WWW)** = system of websites and resources accessed via the internet, using **HTTP/HTTPS** protocols.

Think of the **internet** as roads and cables, and the **web** as the cars, shops, and deliveries that move along those roads.

---

## 🖥️ 2. What Happens When You Enter a Website (e.g., `www.google.com`)

1. **Browser Request**

   * You type the URL into your browser.
   * The browser needs to find the server (computer) where that website lives.

2. **DNS Lookup (Domain Name System)**

   * `www.google.com` is converted into an **IP address** (e.g., `142.250.190.4`) by DNS servers.
   * IP addresses are like street addresses for servers.

3. **Establishing a Connection**

   * Your browser uses **TCP/IP** to connect to that server.
   * If the site uses HTTPS, a **TLS/SSL handshake** happens → encrypts the data for security.

---

## 📡 3. Request & Response

* Your browser sends an **HTTP request** (like: *“Please send me the homepage of google.com”*).
* The server (Google’s computer) processes it and sends back an **HTTP response** with files (HTML, CSS, JavaScript, images, etc.).

---

## 🎨 4. Rendering the Page

Your browser takes those files and:

1. Reads the **HTML** (structure of the page).
2. Loads **CSS** (styles, colors, layouts).
3. Executes **JavaScript** (dynamic behavior, animations, API calls).
4. Builds the **DOM (Document Object Model)**, which becomes the web page you see.

---

## 🔄 5. Continuous Interaction

* When you click, type, or scroll, the browser may send **new requests** to the server (or fetch data from APIs).
* Websites can also use **cookies, sessions, and local storage** to remember you.

---

## ⚡ In Short

1. You → Browser → DNS → Server.
2. Server → sends files → Browser.
3. Browser → renders files into the page.
4. You → interact → repeat requests as needed.

---

📌 Example Analogy:
Imagine you want pizza 🍕:

* You look up the restaurant’s phone number (DNS).
* You call and place an order (HTTP request).
* The restaurant makes and sends the pizza (HTTP response).
* You eat it and may order more (interaction).
