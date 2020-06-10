-- Create the database
CREATE DATABASE nearapogee_auth;

-- Connect to database
  -- \c nearapogee_auth

-- Create extention 
CREATE EXTENSION "uuid-ossp";

-- Create table for login/logout users
CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

-- Create table for consumer's database
CREATE TABLE customers(
  customer_id SERIAL,
  user_id UUID,
  customer_name VARCHAR(30),
  customer_email VARCHAR(30),
  customer_address VARCHAR(255),
  PRIMARY KEY (customer_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert fake users (optional)

INSERT INTO users (user_name, user_email, user_password) VALUES ('jonny', 'jonny@example.com', '123');

INSERT INTO customers (user_id, customer_name, customer_email, customer_address) VALUES ('896224d0-c0fc-4166-8973-66c6b709d1b1', 'friday', 'friday@example.com', '106th St');