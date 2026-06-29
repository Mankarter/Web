# 🧪 API Routes Testing Guide

## Prerequisites
- Development server running: `npm run dev`
- Supabase configured with DATABASE_SCHEMA.md SQL run
- Sample data in your database (optional)

---

## 📊 Test Vehicles API

### 1. List All Vehicles
```bash
curl http://localhost:3000/api/vehicles
```

Expected response:
```json
{
  "success": true,
  "data": [],
  "count": 0,
  "limit": 20,
  "offset": 0,
  "hasMore": false
}
```

### 2. Search by Make
```bash
curl "http://localhost:3000/api/vehicles?make=Toyota"
```

### 3. Filter by Price Range
```bash
curl "http://localhost:3000/api/vehicles?minPrice=50000&maxPrice=100000"
```

### 4. Search by Text
```bash
curl "http://localhost:3000/api/vehicles?q=jetour"
```

### 5. Pagination
```bash
curl "http://localhost:3000/api/vehicles?limit=10&offset=0"
```

### 6. Create Vehicle (POST)
```bash
curl -X POST http://localhost:3000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
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
    "description": "Premium SUV",
    "photos": ["url1", "url2"],
    "seller_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "active"
  }'
```

Expected response (201 Created):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "make": "Toyota",
    ...
  },
  "message": "Vehicle listing created successfully"
}
```

### 7. Get Single Vehicle
```bash
curl http://localhost:3000/api/vehicles/[VEHICLE_ID]
```

### 8. Update Vehicle (PUT)
```bash
curl -X PUT http://localhost:3000/api/vehicles/[VEHICLE_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "price": 92000,
    "mileage": 5500
  }'
```

### 9. Delete Vehicle (Soft Delete)
```bash
curl -X DELETE http://localhost:3000/api/vehicles/[VEHICLE_ID]
```

---

## 💬 Test Inquiries API

### 1. Create Inquiry (Send Message)
```bash
curl -X POST http://localhost:3000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": "[VEHICLE_ID]",
    "seller_id": "[SELLER_ID]",
    "buyer_name": "John Doe",
    "buyer_email": "john@example.com",
    "buyer_phone": "+233XXXXXXXXX",
    "message": "Is this vehicle available?"
  }'
```

### 2. Get Inquiries for Vehicle
```bash
curl "http://localhost:3000/api/inquiries?vehicleId=[VEHICLE_ID]"
```

### 3. Update Inquiry Status
```bash
curl -X PUT http://localhost:3000/api/inquiries/[INQUIRY_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "status": "responded"
  }'
```

Valid statuses: `new`, `responded`, `closed`

---

## 👤 Test Sellers API

### 1. Register Seller (Create Account)
```bash
curl -X POST http://localhost:3000/api/sellers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Auto Sales",
    "email": "seller@autolifegh.com",
    "phone": "+233XXXXXXXXX",
    "whatsapp": "+233XXXXXXXXX",
    "location": "Accra, Ghana"
  }'
```

Save the returned `id` for later tests.

### 2. Get Seller Info
```bash
curl http://localhost:3000/api/sellers/[SELLER_ID]
```

### 3. Update Seller
```bash
curl -X PUT http://localhost:3000/api/sellers/[SELLER_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+233YYYYYYYYY",
    "verification_status": "verified"
  }'
```

### 4. Get Seller's Vehicles
```bash
curl http://localhost:3000/api/sellers/[SELLER_ID]/vehicles
```

---

## 📊 Test Statistics API

### Get Platform Stats
```bash
curl http://localhost:3000/api/stats
```

Expected response:
```json
{
  "success": true,
  "data": {
    "totalVehicles": 5,
    "statistics": {
      "byFuelType": {
        "Petrol": 3,
        "Hybrid": 2
      },
      "byBodyType": {
        "SUV": 4,
        "Sedan": 1
      },
      "byTransmission": {
        "Automatic": 5
      }
    },
    "timestamp": "2024-06-28T..."
  }
}
```

---

## 🧬 Complete Test Workflow

Follow this to test the entire system:

### Step 1: Create a Seller
```bash
curl -X POST http://localhost:3000/api/sellers \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Seller","email":"test@example.com","phone":"+233XXXXXXXXX"}'
```
Save the returned `seller_id`.

### Step 2: Create a Vehicle
```bash
curl -X POST http://localhost:3000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "make":"Honda","model":"CR-V","year":2023,"price":75000,
    "mileage":10000,"engine_size":"1.5L","transmission":"Automatic",
    "fuel_type":"Petrol","body_type":"SUV","condition":"used",
    "description":"Great condition",
    "seller_id":"[YOUR_SELLER_ID]","status":"active","photos":[]
  }'
```
Save the returned `vehicle_id`.

### Step 3: View Vehicle (Increments Views)
```bash
curl http://localhost:3000/api/vehicles/[YOUR_VEHICLE_ID]
```
Run this twice and check `views` increases from 1 to 2.

### Step 4: Send Inquiry
```bash
curl -X POST http://localhost:3000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id":"[YOUR_VEHICLE_ID]",
    "seller_id":"[YOUR_SELLER_ID]",
    "buyer_name":"Jane Buyer",
    "buyer_email":"buyer@example.com",
    "message":"Interested in this car"
  }'
```

### Step 5: Get Inquiries
```bash
curl "http://localhost:3000/api/inquiries?vehicleId=[YOUR_VEHICLE_ID]"
```

### Step 6: Update Inquiry
```bash
curl -X PUT http://localhost:3000/api/inquiries/[YOUR_INQUIRY_ID] \
  -H "Content-Type: application/json" \
  -d '{"status":"responded"}'
```

### Step 7: Search Vehicles
```bash
curl "http://localhost:3000/api/vehicles?make=Honda&minPrice=70000"
```

### Step 8: Check Stats
```bash
curl http://localhost:3000/api/stats
```

---

## 🖥️ Browser Testing

Open browser console and run:

```javascript
// Test API with JavaScript
async function testAPI() {
  // Fetch vehicles
  const res = await fetch('/api/vehicles?limit=5')
  const data = await res.json()
  console.log('Vehicles:', data)
  
  // Search
  const search = await fetch('/api/vehicles?q=toyota')
  const searchData = await search.json()
  console.log('Search results:', searchData)
  
  // Stats
  const stats = await fetch('/api/stats')
  const statsData = await stats.json()
  console.log('Platform stats:', statsData)
}

testAPI()
```

---

## 🧪 Postman Collection

Import into Postman for easier testing:

```json
{
  "info": {
    "name": "AutoLifeGh API",
    "version": "1.0"
  },
  "item": [
    {
      "name": "Get Vehicles",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/vehicles"
      }
    },
    {
      "name": "Create Vehicle",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/vehicles",
        "body": {
          "mode": "raw",
          "raw": "{...}"
        }
      }
    }
  ]
}
```

Set `baseUrl` to `http://localhost:3000` in Postman environment.

---

## ⚠️ Common Issues & Solutions

### Issue: "Missing Supabase environment variables"
**Solution:** Make sure `.env.local` is set up correctly
```bash
cat .env.local  # Check if variables are present
```

### Issue: 500 Error on POST
**Solution:** Check that all required fields are present
```bash
# This will fail - missing seller_id
curl -X POST http://localhost:3000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{"make":"Honda","model":"CR-V"}'
```

### Issue: "Vehicle not found"
**Solution:** Make sure vehicle is in 'active' status
- Check Supabase dashboard: vehicles table
- Verify `status = 'active'`

### Issue: Empty results
**Solution:** Add sample data first
```bash
# Run DATABASE_SCHEMA.md sample data section
# Or create a vehicle via API
```

---

## ✅ Success Checklist

After testing, verify:

- [ ] GET /api/vehicles returns empty array or vehicles
- [ ] POST /api/vehicles creates new vehicle
- [ ] GET /api/vehicles/:id returns vehicle with seller info
- [ ] PUT /api/vehicles/:id updates vehicle
- [ ] DELETE /api/vehicles/:id archives vehicle
- [ ] POST /api/inquiries creates inquiry
- [ ] GET /api/inquiries?vehicleId=xxx returns inquiries
- [ ] PUT /api/inquiries/:id updates inquiry status
- [ ] POST /api/sellers creates seller account
- [ ] GET /api/sellers/:id returns seller info
- [ ] GET /api/sellers/:id/vehicles returns seller's vehicles
- [ ] GET /api/stats returns statistics

---

## 🚀 Next: Integration with Frontend

Once API tests pass, connect components:

1. Use `useVehicles()` hook in browse page
2. Call `createInquiry()` in vehicle details
3. Display `useVehicles` loading state
4. Handle errors gracefully

See `ARCHITECTURE.md` for data flow diagrams.

---

## 📞 Debugging Tips

Enable more logging:
```typescript
// In src/lib/db.ts
console.log('Query:', supabase query details)
console.log('Result:', data)
```

Check Supabase logs:
1. Go to Supabase Dashboard
2. Project → Logs
3. View API calls and database queries

Use Chrome DevTools:
1. Network tab - see API requests/responses
2. Console - log data and errors
3. Application - check stored data

---

**All APIs ready for testing! 🎉**

Start with the workflows above to verify everything works before building UI components.
