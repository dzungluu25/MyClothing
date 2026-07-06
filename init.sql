CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(255) PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
  id VARCHAR(255) PRIMARY KEY,
  reference TEXT NOT NULL,
  ts TIMESTAMP NOT NULL,
  type TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(255) PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

INSERT INTO users (username, password) VALUES
('admin', 'admin123'),
('alice', 'password123'),
('bob', 'password123')
ON CONFLICT (username) DO NOTHING;

INSERT INTO products (id, name, price, image, category) VALUES
('1', 'iPhone 15', 799.00, 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop', 'Electronics'),
('8', 'Vitamix E310 Blender', 349.99, 'https://m.media-amazon.com/images/I/71C65ab7clL._AC_UF894,1000_QL80_.jpg', 'Home & Kitchen'),
('57', 'Kindle Paperwhite', 149.99, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 'Electronics'),
('83', 'Cuisinart 4-Slice Toaster', 89.99, 'https://placehold.co/400x400?text=toaster', 'Home & Kitchen'),
('30', 'TrailMaster Hiking Boots', 175.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOBIZuzBFTHFxx1EodZjzTidFocfzFJm1zYA&s', 'Sports & Outdoors'),
('121', 'Pro V1 Golf Balls', 52.00, 'https://placehold.co/400x400?text=golf+balls', 'Sports & Outdoors'),
('45', 'Urban Fleece Hoodie', 39.99, 'https://placehold.co/400x400?text=hoodie', 'Clothing'),
('12', 'Apple Watch Series 9', 399.99, 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop', 'Accessories')
ON CONFLICT (id) DO NOTHING;

INSERT INTO transactions (id, reference, ts, type, amount, currency, status) VALUES
('tx_1', 'ref-001', '2023-10-01 10:00:00', 'purchase', 150.50, 'USD', 'completed'),
('tx_2', 'ref-002', '2023-10-02 14:30:00', 'refund', -25.00, 'USD', 'completed'),
('tx_3', 'ref-003', '2023-10-05 09:15:00', 'transfer', 500.00, 'EUR', 'pending')
ON CONFLICT (id) DO NOTHING;

INSERT INTO orders (id, customer_name, customer_email, total, status, created_at) VALUES
('10001', 'Alice Nguyen', 'alice@example.com', 799.00, 'Delivered', '2023-10-01 10:00:00'),
('10002', 'Bob Tran', 'bob@example.com', 39.99, 'Shipped', '2023-10-15 14:30:00'),
('10003', 'Carol Pham', 'carol@example.com', 349.99, 'Processing', '2023-11-05 09:15:00')
ON CONFLICT (id) DO NOTHING;
