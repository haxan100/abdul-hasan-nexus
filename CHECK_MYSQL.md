# Fix MySQL Connection Error

## 🔍 Check MySQL Status

### 1. **MAMP Users:**
```bash
# Check if MAMP MySQL is running
ps aux | grep mysql

# Should show MySQL process running on port 8889
```

### 2. **XAMPP Users:**
```bash
# Check if XAMPP MySQL is running
ps aux | grep mysql

# Should show MySQL process running on port 3306
```

## ⚙️ Fix Connection Settings

### **Update `backend/.env`:**

**For MAMP:**
```env
DB_HOST=127.0.0.1
DB_PORT=8889
DB_NAME=feporto_db
DB_USER=root
DB_PASSWORD=root
PORT=3000
```

**For XAMPP:**
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=feporto_db
DB_USER=root
DB_PASSWORD=
PORT=3000
```

## 🗄️ Verify Database Exists

### **Check in phpMyAdmin:**
1. Open http://localhost:8888/phpMyAdmin/ (MAMP) or http://localhost/phpmyadmin/ (XAMPP)
2. Look for `feporto_db` database
3. If not exists, import `database.sql` again

### **Check via Command Line:**
```bash
# For MAMP
/Applications/MAMP/Library/bin/mysql -u root -p -P 8889 -e "SHOW DATABASES;"

# For XAMPP
mysql -u root -p -e "SHOW DATABASES;"
```

## 🚀 Restart Services

### **MAMP:**
1. Stop MAMP servers
2. Start MAMP servers
3. Verify MySQL is running on port 8889

### **XAMPP:**
1. Stop XAMPP
2. Start XAMPP
3. Verify MySQL is running on port 3306

## 🧪 Test Connection

### **1. Restart Backend:**
```bash
cd backend
npm run dev
```

### **2. Should see:**
```
✅ Database connected successfully
🚀 Server running on port 3000
```

### **3. Test API:**
```bash
curl http://localhost:3000/api/contact
```

## 🐛 Common Issues

### **Error: ECONNREFUSED**
- MySQL server not running
- Wrong port number
- Wrong host (try `127.0.0.1` instead of `localhost`)

### **Error: Access denied**
- Wrong username/password
- Check credentials in phpMyAdmin

### **Error: Database doesn't exist**
- Import `database.sql` file
- Check database name spelling

## 📋 Quick Fix Checklist

- [ ] MySQL server is running
- [ ] Correct port in `.env` (8889 for MAMP, 3306 for XAMPP)
- [ ] Database `feporto_db` exists
- [ ] Correct username/password
- [ ] Use `127.0.0.1` instead of `localhost`
- [ ] Restart backend server