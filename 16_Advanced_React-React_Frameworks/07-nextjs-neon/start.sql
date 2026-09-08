-- CREATE RECIPES TABLE 

CREATE TABLE IF NOT EXISTS recipes (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  category   TEXT NOT NULL,
  duration   INT  NOT NULL,
  servings   INT  NOT NULL,
  image      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEED DATA

INSERT INTO recipes (title, category, duration, servings, image) VALUES
  ('Spaghetti Carbonara', 'pasta', 25, 2, 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=400'),
  ('Chicken Tikka Masala', 'curry', 45, 4, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'),
  ('Caesar Salad', 'salad', 15, 2, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400'),
  ('Beef Tacos', 'mexican', 30, 4, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'),
  ('Margherita Pizza', 'pizza', 40, 2, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'),
  ('Greek Salad', 'salad', 10, 2, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400'),
  ('Butter Chicken', 'curry', 50, 4, 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400'),
  ('Chocolate Lava Cake', 'dessert', 20, 2, 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400');