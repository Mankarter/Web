# 🔌 AutoLifeGh API Documentation

## Base URL
```
/api
```

---

## 📚 Endpoints Reference

### Vehicles

#### GET /api/vehicles
Fetch vehicles with optional filters

**Query Parameters:**
```
- make: string (e.g., "Toyota")
- model: string
- minYear: number
- maxYear: number
- minPrice: number
- maxPrice: number
- fuelType: string ("Petrol", "Diesel", "Hybrid", "Electric")
- transmission: string ("Manual", "Automatic")
- bodyType: string ("SUV", "Sedan", etc.)
- mileage: number (max mileage)
- q: string (search term for make/model/description)
- limit: number (default: 20, max: 100)
- offset: number (for pagination)
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "make": "Toyota",
      "model": "Highlander",
      "year": 2024,
      "price": 95000,
      "mileage": 5000,
      "engine_size": "3.5L V6",
      "transmission": "Automatic",
      "fuel_type": "Petrol",
      "body_type": "SUV",
      "condition": "new",
      "description": "...",
      "photos": ["url1", "url2"],
      "seller_id": "uuid",
      "status": "active",
      "views": 42,
      "created_at": "2024-06-28T...",
      "updated_at": "2024-06-28T..."
    }
  ],
  "count": 150,
  "limit": 20,
  "offset": 0,
  "hasMore": true
}
```

**Example Requests:**
```bash
# Get all vehicles
curl /api/vehicles

# Search by make
curl "/api/vehicles?make=Toyota"

# Filter by price range and fuel type
curl "/api/vehicles?minPrice=50000&maxPrice=100000&fuelType=Hybrid"

# Search by term
curl "/api/vehicles?q=jetour"

# With pagination
curl "/api/vehicles?limit=10&offset=20"
```

---

#### GET /api/vehicles/:id
Fetch a single vehicle with seller details

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "make": "Mercedes-Benz",
    "model": "E300L",
    "year": 2023,
    "price": 125000,
    "mileage": 15000,
    "engine_size": "2.0L Turbo",
    "transmission": "Automatic",
    "fuel_type": "Petrol",
    "body_type": "Sedan",
    "condition": "used",
    "description": "Luxury sedan with all features",
    "photos": ["url1", "url2", "url3"],
    "seller_id": "uuid",
    "status": "active",
    "views": 124,
    "sellers": {
      "id": "uuid",
      "name": "Premium Auto Sales",
      "phone": "+233XXXXXXXXX",
      "whatsapp": "+233XXXXXXXXX",
      "location": "Accra",
      "verification_status": "verified",
      "rating": 4.8
    },
    "created_at": "2024-06-28T...",
    "updated_at": "2024-06-28T..."
  }
}
```

**Note:** Viewing a vehicle increments the view count

---

#### POST /api/vehicles
Create a new vehicle listing

**Request Body:**
```json
{
  "make": "Jetour",
  "model": "T2 Hybrid",
  "year": 2024,
  "price": 89999,
  "mileage": 5000,
  "engine_size": "1.5L Turbo Hybrid",
  "transmission": "Automatic",
  "fuel_type": "Hybrid",
  "body_type": "SUV",
  "condition": "new",
  "description": "Premium hybrid SUV with excellent fuel efficiency",
  "photos": ["url1", "url2"],
  "seller_id": "uuid"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "data": { ...vehicle data... },
  "message": "Vehicle listing created successfully"
}
```

**Required Fields:**
- make, model, year, price, seller_id

---

#### PUT /api/vehicles/:id
Update a vehicle listing

**Request Body:** (partial update)
```json
{
  "price": 87999,
  "mileage": 5200,
  "photos": ["new_url1", "new_url2"]
}
```

**Response:**
```json
{
  "success": true,
  "data": { ...updated vehicle data... },
  "message": "Vehicle updated successfully"
}
```

---

#### DELETE /api/vehicles/:id
Archive (soft delete) a vehicle listing

**Response:**
```json
{
  "success": true,
  "message": "Vehicle listing archived successfully"
}
```

---

### Inquiries (Messages)

#### POST /api/inquiries
Create a new inquiry/message about a vehicle

**Request Body:**
```json
{
  "vehicle_id": "uuid",
  "seller_id": "uuid",
  "buyer_name": "John Doe",
  "buyer_email": "john@example.com",
  "buyer_phone": "+233XXXXXXXXX",
  "message": "Is this car still available? Can we arrange a viewing?"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "vehicle_id": "uuid",
    "buyer_name": "John Doe",
    "buyer_email": "john@example.com",
    "buyer_phone": "+233XXXXXXXXX",
    "seller_id": "uuid",
    "message": "Is this car still available?",
    "status": "new",
    "created_at": "2024-06-28T...",
    "updated_at": "2024-06-28T..."
  },
  "message": "Inquiry sent successfully"
}
```

**Required Fields:**
- vehicle_id, seller_id, buyer_name, buyer_email

---

#### GET /api/inquiries
Fetch inquiries for a vehicle (seller only)

**Query Parameters:**
- vehicleId: string (required)

**Response:**
```json
{
  "success": true,
  "data": [
    { ...inquiry 1... },
    { ...inquiry 2... }
  ],
  "count": 5
}
```

---

#### PUT /api/inquiries/:id
Update inquiry status

**Request Body:**
```json
{
  "status": "responded"
}
```

**Valid Status Values:**
- "new" (initial state)
- "responded" (seller responded)
- "closed" (inquiry resolved)

**Response:**
```json
{
  "success": true,
  "data": { ...updated inquiry... },
  "message": "Inquiry status updated"
}
```

---

### Sellers

#### POST /api/sellers
Register/create a new seller account

**Request Body:**
```json
{
  "name": "Premium Auto Sales",
  "email": "seller@autolifegh.com",
  "phone": "+233XXXXXXXXX",
  "whatsapp": "+233XXXXXXXXX",
  "location": "Accra, Ghana"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Premium Auto Sales",
    "email": "seller@autolifegh.com",
    "phone": "+233XXXXXXXXX",
    "whatsapp": "+233XXXXXXXXX",
    "location": "Accra, Ghana",
    "verification_status": "unverified",
    "rating": 0,
    "created_at": "2024-06-28T..."
  },
  "message": "Seller account created successfully"
}
```

**Required Fields:**
- name, email, phone

---

#### GET /api/sellers/:id
Fetch seller information

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Premium Auto Sales",
    "email": "seller@autolifegh.com",
    "phone": "+233XXXXXXXXX",
    "whatsapp": "+233XXXXXXXXX",
    "location": "Accra, Ghana",
    "verification_status": "verified",
    "rating": 4.8,
    "created_at": "2024-06-28T..."
  }
}
```

---

#### PUT /api/sellers/:id
Update seller information

**Request Body:**
```json
{
  "phone": "+233YYYYYYYYY",
  "location": "Kumasi, Ghana",
  "verification_status": "verified",
  "rating": 4.9
}
```

**Response:**
```json
{
  "success": true,
  "data": { ...updated seller data... },
  "message": "Seller profile updated"
}
```

---

#### GET /api/sellers/:id/vehicles
Fetch all vehicles listed by a seller

**Response:**
```json
{
  "success": true,
  "data": [
    { ...vehicle 1... },
    { ...vehicle 2... }
  ],
  "count": 12
}
```

---

### Statistics

#### GET /api/stats
Get platform statistics

**Response:**
```json
{
  "success": true,
  "data": {
    "totalVehicles": 1250,
    "statistics": {
      "byFuelType": {
        "Petrol": 650,
        "Diesel": 350,
        "Hybrid": 200,
        "Electric": 50
      },
      "byBodyType": {
        "SUV": 400,
        "Sedan": 500,
        "Coupe": 150,
        "Truck": 200
      },
      "byTransmission": {
        "Automatic": 900,
        "Manual": 350
      }
    },
    "timestamp": "2024-06-28T..."
  }
}
```

---

## 🛡️ Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Description of what went wrong"
}
```

**Common Status Codes:**
- `200` - Success (GET, PUT)
- `201` - Created (POST)
- `400` - Bad Request (missing/invalid fields)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

---

## 🔐 Authentication Notes

Currently, all endpoints are open. In production, implement:
- Seller authentication for POST/PUT/DELETE on vehicles
- Buyer authentication for creating inquiries
- Admin authentication for statistics

---

## 💡 Frontend Usage Example

```typescript
import { fetchVehicles, createInquiry } from '@/lib/api'

// Fetch filtered vehicles
const { data, count } = await fetchVehicles({
  make: 'Toyota',
  minPrice: 50000,
  maxPrice: 100000,
}, 20, 0)

// Send inquiry
await createInquiry({
  vehicle_id: 'xxx',
  seller_id: 'yyy',
  buyer_name: 'John',
  buyer_email: 'john@example.com',
  message: 'Is this available?'
})
```

---

## 📝 Testing with cURL

```bash
# List vehicles
curl http://localhost:3000/api/vehicles

# Search by make
curl "http://localhost:3000/api/vehicles?make=Toyota"

# Get single vehicle
curl http://localhost:3000/api/vehicles/[vehicle-id]

# Create inquiry
curl -X POST http://localhost:3000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": "xxx",
    "seller_id": "yyy",
    "buyer_name": "John",
    "buyer_email": "john@example.com",
    "message": "Available?"
  }'
```

---

## 🚀 Next Steps

- [ ] Add authentication endpoints
- [ ] Add image upload endpoints
- [ ] Add notification endpoints
- [ ] Add review/rating endpoints
- [ ] Add wishlist endpoints
- [ ] Add financing application endpoints
