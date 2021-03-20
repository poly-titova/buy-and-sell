CREATE TABLE categories(
  name varchar(255) NOT NULL
);

CREATE TABLE users(
  email varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  avatar varchar(50) NOT NULL 
);

CREATE TABLE offers(
  title varchar(255) NOT NULL,
  description text NOT NULL,
  sum integer NOT NULL,
  type varchar(5) NOT NULL,
  picture varchar(50) NOT NULL,
  created_at timestamp NOT NULL
);

CREATE TABLE comments(
  text text NOT NULL,
  created_at timestamp NOT NULL
);
