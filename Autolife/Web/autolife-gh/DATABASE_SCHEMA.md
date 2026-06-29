# AutoLifeGh Database Schema

Run these SQL commands in your Supabase SQL editor to set up the database:

## 1. Users/Sellers Table
```sql
CREATE TABLE sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  location VARCHAR(255),
  verification_status VARCHAR(50) DEFAULT 'unverified',
  rating DECIMAL(3, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 2. Vehicles Table
```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  mileage INTEGER,
  engine_size VARCHAR(50),
  transmission VARCHAR(50),
  fuel_type VARCHAR(50),
  body_type VARCHAR(50),
  condition VARCHAR(50) DEFAULT 'used',
  description TEXT,
  photos TEXT[] DEFAULT '{}',
  seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 3. Inquiries/Messages Table
```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  buyer_name VARCHAR(255) NOT NULL,
  buyer_email VARCHAR(255) NOT NULL,
  buyer_phone VARCHAR(20),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 4. Testimonials Table
```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  rating INTEGER DEFAULT 5,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 5. Create Indexes for Performance
```sql
CREATE INDEX idx_vehicles_seller_id ON vehicles(seller_id);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_inquiries_vehicle_id ON inquiries(vehicle_id);
CREATE INDEX idx_vehicles_created_at ON vehicles(created_at DESC);
```

## 6. Enable Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to active vehicles
CREATE POLICY "Allow public read access to active vehicles" 
  ON vehicles FOR SELECT 
  TO anon 
  USING (status = 'active');

-- Allow sellers to read their own data
CREATE POLICY "Allow sellers to read own data"
  ON sellers FOR SELECT
  USING (auth.uid()::text = id::text);
```

---

## Sample Data (Optional)

```sql
-- Insert sample seller
INSERT INTO sellers (name, email, phone, location, verification_status)
VALUES ('AutoLifeGh Dealer', 'dealer@autolifegh.com', '+233XXXXXXXXX', 'Accra', 'verified');

-- Insert sample vehicle
INSERT INTO vehicles (make, model, year, price, mileage, engine_size, transmission, fuel_type, body_type, condition, description, seller_id, status)
SELECT 
  'Jetour',
  'T2 Hybrid',
  2024,
  89999.00,
  5000,
  '1.5L Turbo Hybrid',
  'Automatic',
  'Hybrid',
  'SUV',
  'new',
  'Premium hybrid SUV with excellent fuel efficiency',
  id,
  'active'
FROM sellers WHERE name = 'AutoLifeGh Dealer'
LIMIT 1;
```

---

## Next Steps

1. Go to [Supabase Dashboard](https://supabase.com)
2. Open SQL Editor
3. Copy and run the commands above
4. Configure RLS policies as needed
5. Get your `URL` and `ANON_KEY` from Project Settings
6. Add them to `.env.local`
