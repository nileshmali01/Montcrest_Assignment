#Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  state VARCHAR(255),
  city VARCHAR(255)
);

#states table
CREATE TABLE states (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country VARCHAR(255),
  state VARCHAR(255)
);

#Cities table
CREATE TABLE cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR(255),
  city VARCHAR(255)
);

