COPY products
FROM '$data_path/product.csv'
DELIMITER ','
CSV HEADER;

COPY features
FROM '$data_path/features.csv'
DELIMITER ','
CSV HEADER;

COPY styles
FROM '$data_path/styles.csv'
WITH NULL AS 'null'
DELIMITER ','
CSV HEADER;

COPY related_products
FROM '$data_path/related.csv'
DELIMITER ','
CSV HEADER;

COPY photos
FROM '$data_path/photos.csv'
DELIMITER ','
CSV HEADER;

COPY skus
FROM '$data_path/skus.csv'
DELIMITER ','
CSV HEADER;
