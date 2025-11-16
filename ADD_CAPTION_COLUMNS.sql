-- Add missing caption columns to portfolios table
USE feporto_db;

ALTER TABLE portfolios 
ADD COLUMN cover_caption VARCHAR(255) AFTER cover_image,
ADD COLUMN background_caption VARCHAR(255) AFTER background_image;