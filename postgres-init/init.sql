-- -- Create databases
-- CREATE DATABASE "ecommerce-users";
-- CREATE DATABASE "ecommerce-products";
-- CREATE DATABASE "ecommerce-orders";

-- -- Create users for each service (optional, can just use 'postgres')
-- CREATE USER users_user WITH ENCRYPTED PASSWORD 1234;
-- CREATE USER products_user WITH ENCRYPTED PASSWORD 1234;
-- CREATE USER orders_user WITH ENCRYPTED PASSWORD 1234;

-- -- Grant privileges
-- GRANT ALL PRIVILEGES ON DATABASE "ecommerce-users" TO users_user;
-- GRANT ALL PRIVILEGES ON DATABASE "ecommerce-products" TO products_user;
-- GRANT ALL PRIVILEGES ON DATABASE "ecommerce-orders" TO orders_user;
-- ecommerce-orders

-- Create databases owned by the default user
CREATE DATABASE "ecommerce-users" OWNER postgres;
CREATE DATABASE "ecommerce-products" OWNER postgres;
CREATE DATABASE "ecommerce-orders" OWNER postgres;

