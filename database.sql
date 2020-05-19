-- CREATE DATABASE nearapogee_auth;

-- Create table for login/logout users
CREATE TABLE nearapogee_users(
  user_id uuid PRIMARY KEY DEFAULT
  uuid_generate_v4(),
  nearapogee_user_name VARCHAR(255) NOT NULL,
  nearapogee_user_email VARCHAR(255) NOT NULL,
  nearapogee_user_password VARCHAR(255) NOT NULL
);

-- Create table for consumer's database
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  address VARCHAR(255)
);

-- insert fake users

INSERT INTO nearapogee_users (nearapogee_user_name, nearapogee_user_email, nearapogee_user_password) VALUES ('jonny', 'jon.a.graybill@gmail.com', 'cat123');

INSERT INTO users (name, email, address) VALUES ('friday', 'friday@gmail.com', '106th St');