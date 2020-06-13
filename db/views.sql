USE critterpedia;

DROP VIEW IF EXISTS view_fish;
DROP VIEW IF EXISTS view_bugs;

CREATE VIEW view_fish AS
    SELECT F.id, F.name, F.description, F.time_of_year_north, F.time_of_year_south, T.start AS time_of_day_start, T.end AS time_of_day_end, L.location, S.size AS shadow_size, F.price_nooks_cranny, F.price_cj
    FROM fish F, time_of_days T, locations L, shadow_sizes S
    WHERE F.time_of_day = T.id
    AND F.location = L.id
    AND F.shadow_size = S.id;

CREATE VIEW view_bugs AS
    SELECT B.id, B.name, B.description, B.time_of_year_north, B.time_of_year_south, T.start AS time_of_day_start, T.end AS time_of_day_end, L.location, R.rarity, B.price_nooks_cranny, B.price_flick
    FROM bugs B, time_of_days T, locations L, rarities R
    WHERE B.time_of_day = T.id
    AND B.location = L.id
    AND B.rarity = R.id;