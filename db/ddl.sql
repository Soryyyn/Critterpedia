CREATE IF NOT EXISTS DATABASE critterpedia;
USE DATABASE critterpedia;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS fish;
DROP TABLE IF EXISTS bugs;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS shadow_sizes;
DROP TABLE IF EXISTS rarities:

CREATE TABLE shadow_sizes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    size VARCHAR(50)
);

CREATE TABLE locations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(50)
);

CREATE TABLE rarities (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    rarity VARCHAR(50)
);

CREATE TABLE fish (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(256),
    time_of_year_north_start DATE,
    time_of_year_north_end DATE,
    time_of_year_south_start DATE,
    time_of_year_south_end DATE,
    time_of_day_start TIME,
    time_of_day_end TIME,
    FOREIGN KEY (location) REFERENCES locations (id),
    FOREIGN KEY (shadow_size) REFERENCES shadow_sizes (id),
    price_nooks_cranny INT UNSIGNED,
    price_cj INT UNSIGNED
);

CREATE TABLE bugs (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(256),
    time_of_year_north_start DATE,
    time_of_year_north_end DATE,
    time_of_year_south_start DATE,
    time_of_year_south_end DATE,
    time_of_day_start TIME,
    time_of_day_end TIME,
    FOREIGN KEY (location) REFERENCES locations (id),
    FOREIGN KEY (rarity) REFERENCES rarities (id),
    price_nooks_cranny INT UNSIGNED,
    price_flick INT UNSIGNED
);

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50),
    password VARCHAR(256)
);