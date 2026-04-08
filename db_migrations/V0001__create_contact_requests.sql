CREATE TABLE IF NOT EXISTS contact_requests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);