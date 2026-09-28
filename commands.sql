CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Dan Abramov', 'https://overreacted.io/on-let-vs-const/', 'On let vs const');
INSERT INTO blogs (author, url, title) VALUES ('Matti Luukkainen', 'https://helda.helsinki.fi', 'Kun MOOCit Helsingin yliopistoon tulivat');
