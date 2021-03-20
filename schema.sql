CREATE TABLE categories(
  id integer NOT NULL,
  name varchar(255) NOT NULL
);

CREATE TABLE users(
  id integer NOT NULL,
  email varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  avatar varchar(50) NOT NULL 
);

CREATE TABLE offers(
  id integer NOT NULL,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  sum integer NOT NULL,
  type varchar(5) NOT NULL,
  picture varchar(50) NOT NULL,
  user_id integer NOT NULL,
  created_at timestamp NOT NULL
);

CREATE TABLE comments(
  id integer NOT NULL,
  offer_id integer NOT NULL,
  user_id integer NOT NULL,
  text text NOT NULL,
  created_at timestamp NOT NULL
);
