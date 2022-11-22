CREATE TABLE bootcampers (
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR(50),
is_coach BOOLEAN
);

INSERT INTO bootcampers (username, is_coach) 
VALUES ('flavia', true), ('rhona', true), ('remi', true), ('isaac', true), ('keira', false), ('nathan', false);

CREATE TABLE posts (
post_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
bootcamper_id INT REFERENCES bootcampers(id),
contents VARCHAR(800),
date_posted DATE,
morning BOOLEAN  
);

INSERT INTO posts (bootcamper_id, contents, date_posted, morning)
VALUES (1, 'CSS is the best', '2022-11-22', true), (2, 'I loooove SQL', '2022-11-22', false);

CREATE TABLE user_comments (
comment_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
bootcamper_id INT REFERENCES bootcampers(id),
post_id INT REFERENCES posts(post_id),
contents VARCHAR(800),
date_posted DATE
);

INSERT INTO user_comments (bootcamper_id, post_id, contents, date_posted)
VALUES (5, 1, 'Yeah i love CSS too', '2022-11-22'), (6, 2, 'Disagree, I hate CQL', '2022-11-22')

