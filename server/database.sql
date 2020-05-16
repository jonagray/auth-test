CREATE DATABASE nearapogee_auth;

--set extension
CREATE TABLE nearapogee_users(
  user_id uuid PRIMARY KEY DEFAULT
  uuid_generate_v4(),
  nearapogee_user_name VARCHAR(255) NOT NULL,
  nearapogee_user_email VARCHAR(255) NOT NULL,
  nearapogee_user_password VARCHAR(255) NOT NULL
);

-- insert fake users

INSERT INTO nearapogee_users (nearapogee_user_name, nearapogee_user_email, nearapogee_user_password) VALUES ('jonny', 'jon.a.graybill@gmail.com', 'cat123');