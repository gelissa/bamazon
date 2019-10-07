DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    dept_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products(product_name, dept_name, price, stock_quantity)

-- insert 8 more, end with a semicolon
VALUES  ("Corvette", "vehicle", 50000.89, 5), ("Honda", "vehicle", 2000.14, 12), 
("WaterPik Shower Head", "Home", 20.50, 200),
("iPhone 11", "Electronics", 1200.14, 300),
("Smart TV", "Electronics", 4000, 500),
("Coffee Table", "Home", 200.12, 1000),
("Frigidaire", "Home", 2500, 10000),
("Frigidaire", "Home", 2500, 10000),
("Frigidaire", "Home", 2500, 10000),
("Frigidaire", "Home", 2500, 10000)