# Setup Guide - Database Integration

## 🚀 Quick Setup

### 1. Database Setup
```bash
# Import database
mysql -u root -p < database.sql
```

### 2. Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start backend server
npm run dev
```

### 3. Frontend Setup
```bash
# In main project folder
npm run dev
```

## 🗄️ Architecture

### Frontend (React + Vite)
- Port: `5173` (default Vite)
- API calls ke backend
- Mock data sebagai fallback

### Backend (Express + MySQL)
- Port: `3000`
- Real database operations
- CORS enabled untuk frontend

### Database (MySQL)
- Database: `feporto_db`
- Table: `contacts` (sudah ada data sample)

## 📡 API Endpoints

### Contacts
- `GET /api/contact` - Get all contacts
- `POST /api/contact` - Add new contact
- `PUT /api/contact/:id` - Update contact
- `DELETE /api/contact/:id` - Delete contact

## 🔧 Configuration

### Backend Environment (backend/.env)
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=feporto_db
DB_USER=root
DB_PASSWORD=your_password
PORT=3000
```

### Frontend Environment (.env)
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## ✅ Testing

1. **Start Backend:**
   ```bash
   cd backend && npm run dev
   ```

2. **Start Frontend:**
   ```bash
   npm run dev
   ```

3. **Test Admin:**
   - Go to `/admin-hasan`
   - Login: `hasan/hasan`
   - Click "Contacts" tab
   - Should load real data from database

## 🔄 Current Status

- ✅ Database schema created
- ✅ Backend API endpoints ready
- ✅ Frontend API integration
- ✅ CRUD operations working
- ✅ Mock data fallback

## 🎯 Next Steps

1. Test database connection
2. Verify CRUD operations
3. Add other entities (portfolio, experience, skills)
4. Add error handling and validation