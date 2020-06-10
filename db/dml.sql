USE DATABASE critterpedia;

INSERT INTO shadow_sizes (size) VALUES
    ("Narrow"),
    ("X-Small"),
    ("Small"),
    ("Medium"),
    ("Large"),
    ("X-Large"),
    ("Largest"),
    ("Largest (Fin)");

INSERT INTO locations (location) VALUES
    ("Pond"),
    ("River"),
    ("Rivermouth"),
    ("Clifftop river"),
    ("Sea"),
    ("Flying"),
    ("Flying near black, blue, or purple flowers"),
    ("Flying near purple flowers"),
    ("Near lights"),
    ("On trees"),
    ("On the ground"),
    ("On flowers"),
    ("On white flowers"),
    ("Near flowers"),
    ("In trees"),
    ("Underground"),
    ("On ponds and rivers"),
    ("On tree stumps"),
    ("On the ground (rolling snowballs)"),
    ("On palm trees"),
    ("Under trees"),
    ("On Spoiled turnips"),
    ("On the beach"),
    ("On beach rocks"),
    ("Near trash"),
    ("On villagers"),
    ("On rocks and bushes (when raining or snowing)"),
    ("Under rocks");

INSERT INTO rarities (rarity) VALUES
    ("Extremely Common (200%)"),
    ("Very Common (80%)"),
    ("Very Common (70%)"),
    ("Very Common (60%)"),
    ("Common (50%)"),
    ("Common (40%)"),
    ("Common (35%)"),
    ("Common (-)"),
    ("Uncommon (30%)"),
    ("Uncommon (25%)"),
    ("Uncommon (20%)"),
    ("Very Uncommon (15%)"),
    ("Very Uncommon (10%)"),
    ("Rare/Very Uncommon (5% Jun-Aug North, 10% Dec-Feb South)"),
    ("Rare (7%)"),
    ("Rare (5%)"),
    ("Very Rare (3%)"),
    ("Very Rare (2%)"),
    ("Ultra Rare (1%)"),
    ("5 per day (-)");

INSERT INTO time_of_days (start, end) VALUES
    ("04:00:00", "19:00:00"),
    ("08:00:00", "17:00:00"),
    ("08:00:00", "19:00:00"),
    ("09:00:00", "16:00:00"),
    ("16:00:00", "09:00:00"),
    ("17:00:00", "04:00:00"),
    ("17:00:00", "08:00:00"),
    ("19:00:00", "04:00:00"),
    ("19:00:00", "08:00:00"),
    ("21:00:00", "04:00:00"),
    ("22:00:00", "04:00:00"),
    ("22:00:00", "08:00:00"),
    ("00:00:00", "24:00:00");

INSERT INTO fish (name, description, time_of_year_north, time_of_year_south, time_of_day, location, shadow_size, price_nooks_cranny, price_cj)
    (
        "Bitterling",
        "I caught a bitterling! It's mad at me, but only a little.",
        "Nov - Mar",
        "May - Sep",
        12,
        2,
        2,
        900,
        1350
    ), (
        "Pale Chub",
        "I caught a pale chub! That name seems a bit judgy...",
        "All Year",
        "All Year",
        4,
        2,
        2,
        200,
        300
    ), (
        "Crucian Carp",
        "I caught a crucian carp! My skills are sharp!",
        "All Year",
        "All Year",
        12,
        2,
        3,
        160,
        240
    ), (
        "Dace",
        "I caught a dace! Hope I have some space!",
        "All Year",
        "All Year",
        5,
        2,
        4,
        240,
        360
    ), (
        "Carp",
        "I caught a carp! If I catch another, they can carpool!",
        "All Year",
        "All Year",
        12,
        1,
        5,
        300,
        450
    ), (
        "Koi",
        "I caught a koi! I don't know why it's so shy... or such a bad speller...",
        "All Year",
        "All Year",
        5,
        1,
        5,
        4000,
        6000
    ), (
        "Goldfish",
        "I caught a goldfish! It's worth its weight in fish!",
        "All Year",
        "All Year",
        12,
        1,
        2,
        1300,
        1950
    ), (
        "Pop-Eyed Goldfish",
        "I caught a pop-eyed goldfish! It looks so...surprised!",
        "All Year",
        "All Year",
        4
        1,
        2,
        1300,
        1950
    ),(
        "Ranchu Goldfish",
        "I caught a Ranchu Goldfish! But I prefer balsamicu goldfish!",
        "All Year",
        "All Year",
        4
        1,
        3,
        4500,
        6750
    ), (
        "Killifish",
        "I caught a killifish! The streams are safe again",
        "Apr - Aug",
        "Oct - Feb",
        12,
        1,
        2,
        300,
        450
    ), (
        "Crawfish",
        "I caught a crawfish! Or else it's a lobster and I'm a giant!",
        "Aug - Sep",
        "Oct - Mar",
        12,
        1,
        3,
        200,
        300
    ), (
        "Soft-Shelled Turtle",
        "I caught a soft-shelled turtle! It's more sensitive than other turtles.",
        "Aug - Sep",
        "Feb - Mar",
        5,
        2,
        5,
        3750,
        5625
    ), (
        "Snapping Turtle",
        "I caught a snapping turtle! How can it snap without fingers?",
        "Apr - Oct",
        "Oct - Apr",
        9,
        2,
        5,
        5000,
        7500
    ), (
        "Tadpole",
        "I caught a tadpole... It's just a tad small.",
        "Mar - Apr",
        "Nov - Feb",
        12,
        1,
        2,
        100,
        150
    ), (
        "Frog",
        "I caught a frog! Or it's a new neighbor... and I have some apologizing to do",
        "May - Aug",
        "Nov - Feb",
        12,
        1,
        3,
        120,
        180
    ), (
        "Freshwater Goby",
        "I caught a freshwater goby! Time to go bye-bye!",
        "All Year",
        "All Year",
        5,
        2,
        3,
        400,
        600
    ), (
        "Loach",
        "I caught a loach! It's...looking at me with reproach.",
        "Mar - May",
        "Sep - Nov",
        12,
        2,
        3,
        400,
        600
    ), (
        "Catfish",
        "I caught a catfish! I'm more of a dogfish person...",
        "Mar - Oct",
        "Nov - Apr",
        5,
        1,
        5,
        800,
        1200
    ), (
        "Giant Snakehead",
        "I caugh a giant snakehead! Um...but I asked for a medium?",
        "Jun - Aug",
        "Dec - Feb",
        4,
        1,
        5,
        5500,
        8250
    ), (
        "Bluegill",
        "I caught a bluegill! Do you think it calls me 'pinklung'?",
        "All Year",
        "All Year",
        4,
        2,
        3,
        180,
        270
    ), (
        "Yellow Perch",
        "I caught a yellow perch! Those yellow birds have to sit somewhere!",
        "Oct - Mar",
        "Apr - Sep",
        12,
        2,
        4,
        300,
        450
    ), (
        "Black Bass",
        "I caught a black bass! The most metal of all fish!",
        "All Year",
        "All Year",
        12,
        2,
        5,
        400,
        600
    ), (
        "Tilapia",
        "I caught a tilapia! It makes me happy-a!",
        "Jun - Oct",
        "Dec - Apr",
        12,
        2,
        4,
        800,
        1200
    ), (
        "Pike",
        "I caught a pike! Think a swordfish would be up for a duel?",
        "Apr - Dec",
        "Mar - Jun",
        12,
        2,
        6,
        1800,
        2700
    ), (
        "Pond Smelt",
        "I caught a pond smelt! Whoever smelt it, dealt it!",
        "Dec - Feb",
        "Jun - Aug",
        12,
        2,
        3,
        400,
        600
    ), (
        "Sweetfish",
        "I caught a sweetfish! Hope it's not artificially sweet!",
        "Jul - Aug",
        "Jan - Mar",
        12,
        2,
        4,
        900,
        1350
    ), (
        "Cherry Salmon",
        "I caught a cherry salmon! It's the perfect topper for a marlin sundae!",
        "Mar - Jun & Sep - Nov",
        "Mar - May & Sep - Dec",
        5,
        4,
        4,
        1000,
        1500
    ), (
        "Char",
        "I caught a char! Now I'm gonna sit on it!",
        "Mar - Jun & Sep - Nov",
        "Mar - May & Sep - Dec",
        5,
        4,
        4,
        3800,
        5700
    ), (
        "Golden Trout",
        "I caught a golden trout! But the real treasure? Friendship.",
        "Mar – May & Sep – Nov",
        "Mar – May & Sep – Nov",
        5,
        4,
        4,
        3800,
        5700
    ), (
        "Stringfish",
        "OH MY GOSH! I caught a stringfish! Five more and I'll have a guitarfish!",
        "Dec – Mar",
        "Jun – Sep",
        5,
        4,
        6,
        15000,
        22500
    ), (
        "Salmon",
        "I caught a salmon! It's all upstream from here!",
        "Sep",
        "Mar",
        12,
        3,
        5,
        700,
        1050
    ), (
        "King Salmon",
        "I caught a King salmon! Checkmate!",
        "Sep",
        "Mar",
        12,
        3,
        6,
        1800,
        2700
    ), (
        "Mitten Crab",
        "I caught a mitten crab! One more and I'm ready for winter!",
        "Sep - Nov",
        "Mar - May",
        5,
        2,
        3,
        2000,
        3000
    ), (
        "Guppy",
        "I caught a guppy! Welcome to the team, newbie!",
        "Apr - Nov",
        "Oct - May",
        4,
        2,
        2,
        1300,
        1950
    ), (
        "Nibble Fish",
        "I caught a nibble fish! Come to think of it, I could use a bite!",
        "May – Sep",
        "Nov – Mar",
        4,
        2,
        2,
        1500,
        2250
    ), (
        "Angelfish",
        "I caught an angelfish! That other fish told me to do it!",
        "May – Oct",
        "Nov – Apr",
        5,
        2,
        3,
        3000,
        4500
    ), (
        "Betta",
        "I caught a betta! I betta not drop it!",
        "May – Oct",
        "Nov – Apr",
        4,
        2,
        3,
        2500,
        3750
    ), (
        "Neon Tetra",
        "I caught a neon tetra! Wasn't hard to track.",
        "Apr – Nov",
        "Oct – May",
        4,
        2,
        2,
        500,
        750
    ), (
        "Rainbowfish",
        "I caught a rainbowfish! Where's my pot of goldfish?",
        "May – Oct",
        "Nov – Apr",
        4,
        2,
        2,
        800,
        1200
    ), (
        "Piranha",
        "I caught a piranha! Sure hope it was the only one!",
        "Jun – Sep",
        "Dec – Mar",
        4,
        2,
        2,
        2500,
        3750
    ),