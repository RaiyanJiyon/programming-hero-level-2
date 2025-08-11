-- Creating the customers table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(50),
    city VARCHAR(50),
    membership_level VARCHAR(20)
);

-- Creating the products table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50),
    category VARCHAR(50),
    unit_price DECIMAL(10, 2)
);

-- Creating the orders table
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Creating the order_items table (junction table)
CREATE TABLE order_items (
    item_id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Inserting sample data into customers
INSERT INTO customers (customer_name, city, membership_level) VALUES
    ('Alice Green', 'New York', 'Gold'),
    ('Ben Carter', 'Los Angeles', 'Silver'),
    ('Cathy Lee', 'Chicago', 'Gold'),
    ('David Kim', 'Houston', 'Basic'),
    ('Emma Hall', 'Phoenix', 'Silver'),
    ('Frank Wright', 'Philadelphia', 'Gold'),
    ('Grace Young', 'San Antonio', 'Basic'),
    ('Henry Scott', 'San Diego', 'Silver'),
    ('Ivy Adams', 'Dallas', 'Gold'),
    ('Jack Reed', 'San Jose', 'Basic');

-- Inserting sample data into products
INSERT INTO products (product_name, category, unit_price) VALUES
    ('Laptop Pro', 'Electronics', 1200.00),
    ('Wireless Mouse', 'Electronics', 45.99),
    ('Office Chair', 'Furniture', 250.50),
    ('Desk Lamp', 'Furniture', 65.00),
    ('Coffee Maker', 'Appliances', 89.99),
    ('Blender', 'Appliances', 55.75),
    ('Backpack', 'Accessories', 40.00),
    ('Smartphone', 'Electronics', 800.00),
    ('Tablet', 'Electronics', 450.00),
    ('Gaming Headset', 'Accessories', 75.50);

-- Inserting sample data into orders
INSERT INTO orders (customer_id, order_date) VALUES
    (1, '2023-03-10'),
    (2, '2023-03-11'),
    (1, '2023-03-15'),
    (3, '2023-03-16'),
    (2, '2023-03-18'),
    (4, '2023-03-20'),
    (1, '2023-03-22'),
    (5, '2023-03-24'),
    (3, '2023-04-01'),
    (2, '2023-04-02'),
    (6, '2023-04-05'),
    (4, '2023-04-07'),
    (7, '2023-04-08'),
    (5, '2023-04-10'),
    (8, '2023-04-12'),
    (1, '2023-04-14'),
    (9, '2023-04-15'),
    (10, '2023-04-16'),
    (6, '2023-04-18'),
    (3, '2023-04-20');

-- Inserting sample data into order_items
INSERT INTO order_items (order_id, product_id, quantity) VALUES
    (1, 1, 1),       -- Laptop Pro
    (1, 6, 1),       -- Blender
    (2, 2, 2),       -- 2x Wireless Mouse
    (3, 8, 1),       -- Smartphone
    (4, 3, 1),       -- Office Chair
    (5, 4, 2),       -- 2x Desk Lamp
    (6, 5, 1),       -- Coffee Maker
    (7, 1, 1),       -- Another Laptop Pro
    (8, 7, 1),       -- Backpack
    (9, 9, 1),       -- Tablet
    (10, 2, 1),      -- Wireless Mouse
    (11, 10, 1),     -- Gaming Headset
    (12, 3, 1),      -- Office Chair
    (13, 4, 1),      -- Desk Lamp
    (14, 6, 2),      -- 2x Blender
    (15, 5, 1),      -- Coffee Maker
    (16, 8, 1),      -- Smartphone
    (17, 1, 1),      -- Laptop Pro
    (18, 7, 2),      -- 2x Backpack
    (19, 10, 1),     -- Gaming Headset
    (20, 2, 1);      -- Wireless Mouse


/* 
Inner Join to Retrieve Customer and Order Information
Write a query to display the customer_name, order_id, and order_date for all orders, joining the customers and orders tables.
*/
SELECT customers.customer_name, orders.order_id, orders.order_date 
FROM orders
INNER JOIN customers
ON customers.customer_id = orders.customer_id


/*
Group By Category with Average Product Price
Find the average unit_price of products in each category. Display the category and average price, rounded to 2 decimal places.
*/
SELECT product_name, category, AVG(unit_price) as average_price
FROM products
GROUP BY product_name, category;

-- List each customer_name and the total number of orders they have placed. Include only customers who have placed at least one order.

SELECT customers.customer_name, COUNT(orders.customer_id) AS order_count
FROM orders
JOIN customers ON customers.customer_id = orders.order_id
GROUP BY customers.customer_name, customers.customer_id
ORDER BY order_count DESC;


SELECT c.customer_name, COUNT(o.order_id) AS order_count
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY order_count DESC;


/*
Find the Product Category with the Highest Average Unit Price
Determine which product category has the highest average unit_price. Return only the category name.
*/
SELECT category
FROM products
GROUP BY category
ORDER BY AVG(products.unit_price) DESC
LIMIT 1;


-- Extract the month from order_date and count the number of orders placed in each month of 2023. Display results by month number.
SELECT EXTRACT(MONTH FROM order_date) AS month, COUNT(order_id) AS order_count  
FROM orders
WHERE EXTRACT(YEAR FROM order_date) = 2023
GROUP BY EXTRACT(MONTH FROM order_date)
ORDER BY month;


/*
Find the Total Revenue Generated Per Month in 2023
Calculate the total revenue (sum of quantity * unit_price) for all orders, grouped by month in 2023. Display the month and total revenue.
*/

SELECT 
    EXTRACT(MONTH FROM o.order_date) AS MONTH,
    SUM(oi.quantity * p.unit_price) AS total_revenue
FROM order_items as oi
JOIN products as p ON p.product_id = oi.product_id
JOIN orders as o ON o.order_id = oi.order_id
WHERE EXTRACT(YEAR FROM o.order_date) = 2023
GROUP BY EXTRACT(MONTH FROM o.order_date)
ORDER BY month
