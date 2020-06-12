CREATE DATABASE IF NOT EXISTS critterpedia;
USE critterpedia;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_fish;
DROP TABLE IF EXISTS fish;
DROP TABLE IF EXISTS user_bugs;
DROP TABLE IF EXISTS bugs;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS shadow_sizes;
DROP TABLE IF EXISTS rarities;
DROP TABLE IF EXISTS time_of_days;

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

CREATE TABLE time_of_days (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    start TIME,
    end TIME
);

CREATE TABLE fish (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(256),
    time_of_year_north VARCHAR(50),
    time_of_year_south VARCHAR(50),
    time_of_day INT UNSIGNED,
    location INT UNSIGNED,
    shadow_size INT UNSIGNED,
    FOREIGN KEY (time_of_day) REFERENCES time_of_days(id),
    FOREIGN KEY (location) REFERENCES locations(id),
    FOREIGN KEY (shadow_size) REFERENCES shadow_sizes(id),
    price_nooks_cranny INT UNSIGNED,
    price_cj INT UNSIGNED
);

CREATE TABLE bugs (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(256),
    time_of_year_north VARCHAR(50),
    time_of_year_south VARCHAR(50),
    time_of_day INT UNSIGNED,
    location INT UNSIGNED,
    rarity INT UNSIGNED,
    FOREIGN KEY (time_of_day) REFERENCES time_of_days(id),
    FOREIGN KEY (location) REFERENCES locations(id),
    FOREIGN KEY (rarity) REFERENCES rarities(id),
    price_nooks_cranny INT UNSIGNED,
    price_flick INT UNSIGNED
);

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50),
    password VARCHAR(256)
);

CREATE TABLE user_fish (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user INT UNSIGNED,
    fish INT UNSIGNED,
	FOREIGN KEY (user) REFERENCES users(id),
	FOREIGN KEY (fish) REFERENCES fish(id),
	favorited BOOLEAN DEFAULT 0,
	catched BOOLEAN DEFAULT 0
);

CREATE TABLE user_bugs (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user INT UNSIGNED,
    bug INT UNSIGNED,
	FOREIGN KEY (user) REFERENCES users(id),
	FOREIGN KEY (bug) REFERENCES bugs(id),
	favorited BOOLEAN DEFAULT 0,
	catched BOOLEAN DEFAULT 0
);