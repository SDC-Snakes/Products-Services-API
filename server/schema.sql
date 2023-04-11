DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE products (
	id integer NOT NULL PRIMARY KEY,
	name varchar NOT NULL,
	slogan varchar NOT NULL,
	description varchar NOT NULL,
	category varchar NOT NULL,
	default_price integer NOT NULL
);

CREATE TABLE features (
  id integer NOT NULL PRIMARY KEY,
	product_id integer NOT NULL REFERENCES products(id),
	feature varchar NOT NULL,
	value varchar NOT NULL
);

CREATE TABLE styles (
	id integer NOT NULL PRIMARY KEY,
	product_id integer NOT NULL REFERENCES products(id),
	name varchar NOT NULL,
	sale_price integer,
	original_price integer NOT NULL,
	default_style BOOLEAN NOT NULL
);

CREATE TABLE related_products (
	id integer NOT NULL PRIMARY KEY,
	current_product_id integer NOT NULL REFERENCES products(id),
	related_product_id integer NOT NULL
);

CREATE TABLE photos (
	id integer NOT NULL PRIMARY KEY,
	style_id integer NOT NULL REFERENCES styles(id),
  url varchar NOT NULL,
	thumbnail_url varchar NOT NULL
);

CREATE TABLE skus (
	id integer NOT NULL PRIMARY KEY,
	style_id integer NOT NULL REFERENCES styles(id),
  size varchar NOT NULL,
	quantity integer NOT NULL
);

CREATE INDEX product_id_index ON products(id);



