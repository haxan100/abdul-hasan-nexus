-- Fix status column in portfolios table
USE feporto_db;

-- Check current status column
DESCRIBE portfolios;

-- Modify status column to accept the values we're sending
ALTER TABLE portfolios MODIFY COLUMN status ENUM('active', 'inactive', 'draft', 'published') DEFAULT 'active';

-- Or if you prefer VARCHAR
-- ALTER TABLE portfolios MODIFY COLUMN status VARCHAR(20) DEFAULT 'active';