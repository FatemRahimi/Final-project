CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE stars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(60) NOT NULL,
  name VARCHAR(60) NOT NULL,
  area VARCHAR(60),
  class VARCHAR(60),
  role VARCHAR(20) NOT NULL CHECK (role IN ('TA', 'student', 'mentor'))
);


CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  star_id UUID NOT NULL,
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (star_id) REFERENCES stars(id) ON DELETE CASCADE
);


CREATE TABLE "session" (  "sid" varchar NOT NULL COLLATE "default",  "sess" json NOT NULL,  "expire" timestamp(6) NOT NULL)WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "session" ("expire");


