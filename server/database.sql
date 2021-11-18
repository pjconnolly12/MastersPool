-- Entries Table

CREATE TABLE entries(
  entry_id SERIAL PRIMARY KEY,
  fullname VARCHAR(255),
  email VARCHAR(255),
  teamname VARCHAR(255),
  golfer1 INTEGER,
  golfer2 INTEGER,
  golfer3 INTEGER,
  golfer4 INTEGER,
  golfer5 INTEGER,
  paid BOOLEAN,
  tiebreaker SMALLINT,
  payment VARCHAR(255)
  );


CREATE TABLE golfers( 
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  player_id INTEGER
  );

CREATE TABLE leaderboard(
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  player_id INTEGER,
  score SMALLINT,
  currentround SMALLINT,
  bonus SMALLINT, 
  holes_played SMALLINT, 
  player_status VARCHAR(255)
);

CREATE TABLE topten(
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  player_id INTEGER
);

CREATE TABLE admin(
  setting VARCHAR(255),
  status BOOLEAN
);

ALTER TABLE leaderboard
ALTER COLUMN player_id TYPE INTEGER;

INSERT INTO entries (fullname, email, teamname, golfer1, golfer2, golfer3, golfer4, golfer5) VALUES($1, $2, $3, $4, $5, $6, $7, $8)

SELECT
	entries.fullname,
	entries.teamname,
	CONCAT(golfer1.firstname, ' ', golfer1.lastname) AS "golfer1",
  golfer1score.score AS "golfer1score",
  golfer1bonus.bonus AS "golfer1bonus",
  CONCAT(golfer2.firstname, ' ', golfer2.lastname) AS "golfer2",
  golfer2score.score AS "golfer2score",
  golfer2bonus.bonus AS "golfer2bonus",
  CONCAT(golfer3.firstname, ' ', golfer3.lastname) AS "golfer3",
  golfer3score.score AS "golfer3score",
  golfer3bonus.bonus AS "golfer3bonus",
  CONCAT(golfer4.firstname, ' ', golfer4.lastname) AS "golfer4",
  golfer4score.score AS "golfer4score",
  golfer4bonus.bonus AS "golfer4bonus",
  CONCAT(golfer5.firstname, ' ', golfer5.lastname) AS "golfer5",
  golfer5score.score AS "golfer5score",
  golfer5bonus.bonus AS "golfer5bonus",
  entries.tiebreaker 
FROM
	entries
 JOIN golfers golfer1 ON golfer1.player_id = entries.golfer1
 JOIN golfers golfer2 ON golfer2.player_id = entries.golfer2
 JOIN golfers golfer3 ON golfer3.player_id = entries.golfer3
 JOIN golfers golfer4 ON golfer4.player_id = entries.golfer4
 JOIN golfers golfer5 ON golfer5.player_id = entries.golfer5
 JOIN leaderboard golfer1score ON golfer1score.player_id = entries.golfer1
 JOIN leaderboard golfer2score ON golfer2score.player_id = entries.golfer2
 JOIN leaderboard golfer3score ON golfer3score.player_id = entries.golfer3
 JOIN leaderboard golfer4score ON golfer4score.player_id = entries.golfer4
 JOIN leaderboard golfer5score ON golfer5score.player_id = entries.golfer5
 JOIN leaderboard golfer1bonus ON golfer1bonus.player_id = entries.golfer1
 JOIN leaderboard golfer2bonus ON golfer2bonus.player_id = entries.golfer2
 JOIN leaderboard golfer3bonus ON golfer3bonus.player_id = entries.golfer3
 JOIN leaderboard golfer4bonus ON golfer4bonus.player_id = entries.golfer4
 JOIN leaderboard golfer5bonus ON golfer5bonus.player_id = entries.golfer5;

 SELECT
  entries.teamname,


SELECT
	entries.teamname,
  entries.entry_id,
  golfer1score.score AS "golfer1score",
  golfer2score.score AS "golfer2score",
  golfer3score.score AS "golfer3score",
  golfer4score.score AS "golfer4score",
  golfer5score.score AS "golfer5score",
  golfer1bonus.bonus AS "golfer1bonus",
  golfer2bonus.bonus AS "golfer2bonus",
  golfer3bonus.bonus AS "golfer3bonus",
  golfer4bonus.bonus AS "golfer4bonus",
  golfer5bonus.bonus AS "golfer5bonus", 
  SUM(COALESCE(golfer1score.score,0) + COALESCE(golfer2score.score,0) + COALESCE(golfer3score.score,0) + COALESCE(golfer4score.score,0) + COALESCE(golfer5score.score,0) - GREATEST(golfer1score.score, golfer2score.score, golfer3score.score, golfer4score.score, golfer5score.score)) AS "rawtotal",
  SUM(COALESCE(golfer1score.score,0) + COALESCE(golfer2score.score,0) + COALESCE(golfer3score.score,0) + COALESCE(golfer4score.score,0) + COALESCE(golfer5score.score,0) + COALESCE(golfer1bonus.bonus,0) + COALESCE(golfer2bonus.bonus,0) + COALESCE(golfer3bonus.bonus,0) + COALESCE(golfer4bonus.bonus,0) + COALESCE(golfer5bonus.bonus,0) - GREATEST(golfer1score.score, golfer2score.score, golfer3score.score, golfer4score.score, golfer5score.score)) AS "total"
FROM
	entries
JOIN leaderboard golfer1score ON golfer1score.player_id = entries.golfer1
JOIN leaderboard golfer2score ON golfer2score.player_id = entries.golfer2
JOIN leaderboard golfer3score ON golfer3score.player_id = entries.golfer3
JOIN leaderboard golfer4score ON golfer4score.player_id = entries.golfer4
JOIN leaderboard golfer5score ON golfer5score.player_id = entries.golfer5
JOIN leaderboard golfer1bonus ON golfer1bonus.player_id = entries.golfer1
JOIN leaderboard golfer2bonus ON golfer2bonus.player_id = entries.golfer2
JOIN leaderboard golfer3bonus ON golfer3bonus.player_id = entries.golfer3
JOIN leaderboard golfer4bonus ON golfer4bonus.player_id = entries.golfer4
JOIN leaderboard golfer5bonus ON golfer5bonus.player_id = entries.golfer5
GROUP BY entries.teamname,entries.entry_id,golfer1score.score, golfer2score.score, golfer3score.score, golfer4score.score, golfer5score.score,
golfer1bonus.bonus, golfer2bonus.bonus, golfer3bonus, golfer4bonus.bonus, golfer5bonus.bonus
ORDER BY SUM(COALESCE(golfer1score.score,0) + COALESCE(golfer2score.score,0) + COALESCE(golfer3score.score,0) + COALESCE(golfer4score.score,0) + COALESCE(golfer5score.score,0) + COALESCE(golfer1bonus.bonus,0) + COALESCE(golfer2bonus.bonus,0) + COALESCE(golfer3bonus.bonus,0) + COALESCE(golfer4bonus.bonus,0) + COALESCE(golfer5bonus.bonus,0) - GREATEST(golfer1score.score, golfer2score.score, golfer3score.score, golfer4score.score, golfer5score.score)) ASC;

-- Search Function Query
SELECT DISTINCT
	entries.fullname,
	entries.teamname,
	CONCAT(golfer1.firstname, ' ', golfer1.lastname) AS "golfer1",
  golfer1score.score AS "golfer1score",
  golfer1bonus.bonus AS "golfer1bonus",
  CONCAT(golfer2.firstname, ' ', golfer2.lastname) AS "golfer2",
  golfer2score.score AS "golfer2score",
  golfer2bonus.bonus AS "golfer2bonus",
  CONCAT(golfer3.firstname, ' ', golfer3.lastname) AS "golfer3",
  golfer3score.score AS "golfer3score",
  golfer3bonus.bonus AS "golfer3bonus",
  CONCAT(golfer4.firstname, ' ', golfer4.lastname) AS "golfer4",
  golfer4score.score AS "golfer4score",
  golfer4bonus.bonus AS "golfer4bonus",
  CONCAT(golfer5.firstname, ' ', golfer5.lastname) AS "golfer5",
  golfer5score.score AS "golfer5score",
  golfer5bonus.bonus AS "golfer5bonus",
  entries.tiebreaker 
FROM
	entries
JOIN golfers golfer1 ON golfer1.player_id = entries.golfer1
JOIN golfers golfer2 ON golfer2.player_id = entries.golfer2
JOIN golfers golfer3 ON golfer3.player_id = entries.golfer3
JOIN golfers golfer4 ON golfer4.player_id = entries.golfer4
JOIN golfers golfer5 ON golfer5.player_id = entries.golfer5
JOIN leaderboard golfer1score ON golfer1score.player_id = entries.golfer1
JOIN leaderboard golfer2score ON golfer2score.player_id = entries.golfer2
JOIN leaderboard golfer3score ON golfer3score.player_id = entries.golfer3
JOIN leaderboard golfer4score ON golfer4score.player_id = entries.golfer4
JOIN leaderboard golfer5score ON golfer5score.player_id = entries.golfer5
JOIN leaderboard golfer1bonus ON golfer1bonus.player_id = entries.golfer1
JOIN leaderboard golfer2bonus ON golfer2bonus.player_id = entries.golfer2
JOIN leaderboard golfer3bonus ON golfer3bonus.player_id = entries.golfer3
JOIN leaderboard golfer4bonus ON golfer4bonus.player_id = entries.golfer4
JOIN leaderboard golfer5bonus ON golfer5bonus.player_id = entries.golfer5
WHERE entries.fullname LIKE $1 OR entries.teamname LIKE $1 OR golfer1.firstname LIKE $1 OR golfer1.lastname LIKE $1
OR golfer2.firstname LIKE $1 OR golfer2.lastname LIKE $1
OR golfer3.firstname LIKE $1 OR golfer3.lastname LIKE $1
OR golfer4.firstname LIKE $1 OR golfer4.lastname LIKE $1
OR golfer5.firstname LIKE $1 OR golfer5.lastname LIKE $1;


DELETE FROM golfers
WHERE player_id IN
    (SELECT player_id
    FROM 
        (SELECT player_id,
         ROW_NUMBER() OVER( PARTITION BY firstname
        ORDER BY  player_id ) AS row_num
        FROM golfers ) t
        WHERE t.row_num > 1 );

-- DO $$
-- DECLARE golfer1 SMALLINT;
-- DECLARE golfer2 SMALLINT;
-- DECLARE golfer3 SMALLINT;
-- DECLARE golfer4 SMALLINT;
-- DECLARE golfer5 SMALLINT;
-- BEGIN
SELECT
	entries.teamname,
  entries.entry_id,
  golfer1score.score AS "golfer1score",
  golfer2score.score AS "golfer2score",
  golfer3score.score AS "golfer3score",
  golfer4score.score AS "golfer4score",
  golfer5score.score AS "golfer5score",
  golfer1bonus.bonus AS "golfer1bonus",
  golfer2bonus.bonus AS "golfer2bonus",
  golfer3bonus.bonus AS "golfer3bonus",
  golfer4bonus.bonus AS "golfer4bonus",
  golfer5bonus.bonus AS "golfer5bonus",
  SUM(COALESCE(golfer1score.score,0) + COALESCE(golfer2score.score,0) + COALESCE(golfer3score.score,0) + COALESCE(golfer4score.score,0) + COALESCE(golfer5score.score,0) - GREATEST(golfer1score.score, golfer2score.score, golfer3score.score, golfer4score.score, golfer5score.score)) AS "rawtotal",
  SUM(COALESCE(golfer1score.score + golfer1bonus.bonus,0) + COALESCE(golfer2score.score + golfer2bonus.bonus,0) + COALESCE(golfer3score.score + golfer3bonus.bonus,0) + COALESCE(golfer4score.score + golfer4bonus.bonus,0) + COALESCE(golfer5score.score + golfer5bonus.bonus,0) - GREATEST(golfer1score.score + golfer1bonus.bonus, golfer2score.score + golfer2bonus.bonus, golfer3score.score + golfer3bonus.bonus, golfer4score.score + golfer4bonus.bonus, golfer5score.score + golfer5bonus.bonus)) AS "total"
FROM
	entries
JOIN leaderboard golfer1score ON golfer1score.player_id = entries.golfer1
JOIN leaderboard golfer2score ON golfer2score.player_id = entries.golfer2
JOIN leaderboard golfer3score ON golfer3score.player_id = entries.golfer3
JOIN leaderboard golfer4score ON golfer4score.player_id = entries.golfer4
JOIN leaderboard golfer5score ON golfer5score.player_id = entries.golfer5
JOIN leaderboard golfer1bonus ON golfer1bonus.player_id = entries.golfer1
JOIN leaderboard golfer2bonus ON golfer2bonus.player_id = entries.golfer2
JOIN leaderboard golfer3bonus ON golfer3bonus.player_id = entries.golfer3
JOIN leaderboard golfer4bonus ON golfer4bonus.player_id = entries.golfer4
JOIN leaderboard golfer5bonus ON golfer5bonus.player_id = entries.golfer5
GROUP BY entries.teamname,entries.entry_id,golfer1score.score, golfer2score.score, golfer3score.score, golfer4score.score, golfer5score.score,
golfer1bonus.bonus, golfer2bonus.bonus, golfer3bonus, golfer4bonus.bonus, golfer5bonus.bonus
ORDER BY SUM(COALESCE(golfer1score.score,0) + COALESCE(golfer2score.score,0) + COALESCE(golfer3score.score,0) + COALESCE(golfer4score.score,0) + COALESCE(golfer5score.score,0) + COALESCE(golfer1bonus.bonus,0) + COALESCE(golfer2bonus.bonus,0) + COALESCE(golfer3bonus.bonus,0) + COALESCE(golfer4bonus.bonus,0) + COALESCE(golfer5bonus.bonus,0) - GREATEST(golfer1score.score, golfer2score.score, golfer3score.score, golfer4score.score, golfer5score.score)) ASC;
