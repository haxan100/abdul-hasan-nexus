-- Create portfolio_gallery table if it doesn't exist
USE feporto_db;

CREATE TABLE IF NOT EXISTS portfolio_gallery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    portfolio_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    image_caption TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
);

-- Insert sample gallery images
INSERT IGNORE INTO portfolio_gallery (portfolio_id, image_url, image_caption, sort_order) VALUES
(1, '/uploads/portfolio/gallery/ecommerce-1.jpg', 'Product catalog with advanced filtering and search functionality', 1),
(1, '/uploads/portfolio/gallery/ecommerce-2.jpg', 'Shopping cart and checkout process with Stripe integration', 2),
(1, '/uploads/portfolio/gallery/ecommerce-3.jpg', 'Admin dashboard for inventory and order management', 3),
(1, '/uploads/portfolio/gallery/ecommerce-4.jpg', 'User profile and order history interface', 4),
(2, '/uploads/portfolio/gallery/banking-1.jpg', 'Biometric authentication and secure login process', 1),
(2, '/uploads/portfolio/gallery/banking-2.jpg', 'Account overview and transaction history', 2),
(2, '/uploads/portfolio/gallery/banking-3.jpg', 'Fund transfer and bill payment features', 3);