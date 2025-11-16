# Import Database - Step by Step

## 🗄️ Method 1: Using phpMyAdmin (MAMP/XAMPP)

### 1. Open phpMyAdmin
- MAMP: http://localhost:8888/phpMyAdmin/
- XAMPP: http://localhost/phpmyadmin/

### 2. Import Database
1. Click "Import" tab
2. Click "Choose File" 
3. Select `database.sql` from project root
4. Click "Go" button
5. Wait for success message

## 🗄️ Method 2: Using MySQL Command Line

### 1. Open Terminal/Command Prompt

### 2. Navigate to project folder
```bash
cd /Applications/MAMP/htdocs/feporto
```

### 3. Import database
```bash
# For MAMP (port 8889)
/Applications/MAMP/Library/bin/mysql -u root -p -P 8889 < database.sql

# For XAMPP (port 3306)
mysql -u root -p < database.sql
```

### 4. Enter password when prompted
- MAMP default: `root`
- XAMPP default: (empty, just press Enter)

## ✅ Verify Import

### Check if database exists:
```sql
SHOW DATABASES;
USE feporto_db;
SHOW TABLES;
```

### Should show these tables:
- `contacts` (11 records)
- `portfolios` (4 records)
- `experiences` (3 records)
- `skills` (8 records)
- `technologies` (10 records)

### Check data:
```sql
SELECT COUNT(*) FROM contacts;
SELECT * FROM contacts LIMIT 3;
```

## 🔧 Update Backend Config

### Update `backend/.env` with your settings:
```env
DB_HOST=localhost
DB_PORT=8889    # MAMP port or 3306 for XAMPP
DB_NAME=feporto_db
DB_USER=root
DB_PASSWORD=root    # MAMP or empty for XAMPP
PORT=3000
```

## 🚀 Test Connection

### 1. Start backend:
```bash
cd backend
npm install
npm run dev
```

### 2. Should see:
```
Server running on port 3000
```

### 3. Test API:
```bash
curl http://localhost:3000/api/contact
```

## 🐛 Troubleshooting

### Error: "Access denied"
- Check username/password in `backend/.env`
- Make sure MySQL server is running

### Error: "Connection refused"
- Check port number (8889 for MAMP, 3306 for XAMPP)
- Make sure MySQL service is started

### Error: "Database doesn't exist"
- Re-import `database.sql`
- Check if import was successful in phpMyAdmin