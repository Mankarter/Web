# 🔌 API Routes Setup - Complete Summary

✅ **All API routes and database integration are ready to use!**

---

## 📁 Generated Files

### API Routes
```
src/app/api/
├── vehicles/
│   ├── route.ts              # GET (list/search) & POST (create)
│   └── [id]/route.ts         # GET, PUT, DELETE
├── inquiries/
│   ├── route.ts              # GET (list) & POST (create)
│   └── [id]/route.ts         # PUT (update status)
├── sellers/
│   ├── route.ts              # POST (register)
│   ├── [id]/route.ts         # GET & PUT (seller info)
│   └── [id]/vehicles/route.ts# GET (seller's vehicles)
└── stats/route.ts            # GET (platform statistics)
```

### Database Layer
```
src/lib/
├── db.ts                     # Database helper functions
├── api.ts                    # Frontend API client
└── supabase.ts              # Supabase client (existing)
```

### Hooks
```
src/hooks/
├── useVehicles.ts            # Vehicle search/filtering
├── useInquiry.ts             # Send inquiries
└── useSeller.ts              # Seller registration
```

### Example Page
```
src/app/vehicles/page.tsx           # Browse page
src/components/vehicles/VehicleGrid.tsx  # Filterable vehicle grid
```

### Documentation
```
API_REFERENCE.md              # Complete API documentation
```

---

## 🚀 API Endpoints Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| **GET** | `/api/vehicles` | List/search vehicles |
| **POST** | `/api/vehicles` | Create vehicle listing |
| **GET** | `/api/vehicles/:id` | Get vehicle details |
| **PUT** | `/api/vehicles/:id` | Update vehicle |
| **DELETE** | `/api/vehicles/:id` | Archive vehicle |
| **GET** | `/api/inquiries` | Get inquiries for vehicle |
| **POST** | `/api/inquiries` | Send inquiry/message |
| **PUT** | `/api/inquiries/:id` | Update inquiry status |
| **POST** | `/api/sellers` | Register seller |
| **GET** | `/api/sellers/:id` | Get seller info |
| **PUT** | `/api/sellers/:id` | Update seller |
| **GET** | `/api/sellers/:id/vehicles` | Get seller's vehicles |
| **GET** | `/api/stats` | Platform statistics |

---

## 💡 How to Use the APIs

### 1. From Frontend Components (Recommended)

Using the API client functions:
```typescript
import { fetchVehicles, createInquiry } from '@/lib/api'

// Search vehicles
const result = await fetchVehicles({
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

### 2. Using React Hooks (Best Practice)

In components:
```typescript
'use client'

import { useVehicles } from '@/hooks/useVehicles'

export default function MyComponent() {
  const { vehicles, loading, error, searchVehicles } = useVehicles()

  useEffect(() => {
    searchVehicles({ make: 'Toyota' })
  }, [])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {vehicles.map(v => <div key={v.id}>{v.make} {v.model}</div>)}
    </div>
  )
}
```

### 3. Direct Fetch Calls

```typescript
const response = await fetch('/api/vehicles?make=Toyota&limit=10')
const { data, count } = await response.json()
```

---

## 🎯 Database Functions (src/lib/db.ts)

Pre-built functions for all operations:

### Vehicle Operations
```typescript
getVehicles(filters, limit, offset)      // List with filters
getVehicleById(id)                        // Single vehicle
createVehicle(vehicle)                    // New listing
updateVehicle(id, updates)                // Edit listing
deleteVehicle(id)                         // Archive listing
getFeaturedVehicles(limit)                // Top viewed
getLatestVehicles(limit)                  // Recent listings
searchVehicles(searchTerm)                // Text search
```

### Inquiry Operations
```typescript
createInquiry(inquiry)                    // Send message
getVehicleInquiries(vehicleId)            // Get messages
updateInquiryStatus(inquiryId, status)    // Mark responded/closed
```

### Seller Operations
```typescript
getSellerById(sellerId)                   // Get seller info
getSellerVehicles(sellerId)               // All their vehicles
upsertSeller(seller)                      // Create/update seller
```

### Analytics
```typescript
getTotalVehiclesCount()                   // Total listings
getVehicleStatistics()                    // By fuel type, body type, etc.
```

---

## 🛡️ Error Handling

All API calls include built-in error handling:

```typescript
import { handleAPIError } from '@/lib/api'

try {
  await fetchVehicles()
} catch (error) {
  const errorMessage = handleAPIError(error)
  console.error(errorMessage)
}
```

---

## 📝 Example: Complete Vehicle Listing Flow

**1. Create seller account:**
```typescript
import { createSeller } from '@/lib/api'

const seller = await createSeller({
  name: 'Premium Auto Sales',
  email: 'seller@autolifegh.com',
  phone: '+233XXXXXXXXX',
})
```

**2. List a vehicle:**
```typescript
import { createVehicle } from '@/lib/api'

const vehicle = await createVehicle({
  make: 'Toyota',
  model: 'Highlander',
  year: 2024,
  price: 95000,
  mileage: 5000,
  engine_size: '3.5L V6',
  transmission: 'Automatic',
  fuel_type: 'Petrol',
  body_type: 'SUV',
  condition: 'new',
  description: 'Premium SUV',
  photos: ['url1', 'url2'],
  seller_id: seller.id,
  status: 'active',
})
```

**3. Get vehicle details (increments views):**
```typescript
import { fetchVehicleById } from '@/lib/api'

const vehicle = await fetchVehicleById(vehicle.id)
console.log(vehicle.sellers) // Includes seller info
```

**4. Send inquiry:**
```typescript
import { createInquiry } from '@/lib/api'

await createInquiry({
  vehicle_id: vehicle.id,
  seller_id: seller.id,
  buyer_name: 'John Doe',
  buyer_email: 'john@example.com',
  buyer_phone: '+233YYYYYY',
  message: 'Is this available?'
})
```

---

## 📊 Query Examples

### Search with Advanced Filters
```typescript
const result = await fetchVehicles({
  make: 'Mercedes-Benz',
  minPrice: 100000,
  maxPrice: 200000,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  bodyType: 'Sedan',
}, 20, 0)
```

### Pagination
```typescript
// Page 1
const page1 = await fetchVehicles(filters, 20, 0)

// Page 2
const page2 = await fetchVehicles(filters, 20, 20)

// Page 3
const page3 = await fetchVehicles(filters, 20, 40)
```

### Free Text Search
```typescript
const result = await searchVehicles('jetour hybrid')
```

---

## ✅ Features Ready for Use

✅ Vehicle CRUD operations
✅ Advanced filtering & search
✅ Seller management
✅ Inquiry/messaging system
✅ View counting
✅ Platform statistics
✅ Error handling
✅ Type safety (TypeScript)
✅ Frontend API client
✅ React hooks
✅ Pagination support

---

## 🔐 Security Considerations (For Production)

Currently all endpoints are open. Before production, add:

1. **Authentication**
   - Supabase Auth for sellers
   - Buyer authentication for inquiries

2. **Authorization**
   - Verify sellers own vehicles they edit/delete
   - Verify buyers can only edit their own inquiries

3. **Validation**
   - Rate limiting on POST endpoints
   - Input validation for all fields
   - File upload security for photos

4. **Database**
   - Enable Row Level Security (RLS) in Supabase
   - Create policies for data access

---

## 🧪 Testing the APIs

### Using Browser Developer Tools
```javascript
// In browser console
fetch('/api/vehicles?make=Toyota&limit=5')
  .then(r => r.json())
  .then(data => console.log(data))
```

### Using cURL
```bash
curl http://localhost:3000/api/vehicles
curl "http://localhost:3000/api/vehicles?make=Toyota"
curl -X POST http://localhost:3000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{"make":"Honda","model":"CR-V","year":2024,...}'
```

### Using Postman
1. Import endpoints from API_REFERENCE.md
2. Set up environment variables for base URL
3. Test with sample data

---

## 📚 Next Integration Steps

- [ ] Connect frontend components to API hooks
- [ ] Add authentication (Supabase Auth)
- [ ] Implement image upload endpoint
- [ ] Add email notifications
- [ ] Set up database backups
- [ ] Add rate limiting
- [ ] Create admin dashboard
- [ ] Implement search analytics
- [ ] Add payment processing
- [ ] Deploy to production

---

## 🎓 Learning Resources

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Supabase JavaScript SDK](https://supabase.com/docs/reference/javascript/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📞 Quick Reference

| Need | Location | Function |
|------|----------|----------|
| API documentation | `API_REFERENCE.md` | Complete endpoint specs |
| Database queries | `src/lib/db.ts` | Pre-built functions |
| Frontend calls | `src/lib/api.ts` | Type-safe API client |
| React hooks | `src/hooks/` | useVehicles, useInquiry, useSeller |
| Example page | `src/app/vehicles/page.tsx` | Full working example |

---

## 🚀 You're Ready!

Your backend is fully set up and ready to use. Start building the frontend components that call these APIs.

**Happy coding!** 🚗✨
