
-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user'))
);

-- PATIENTS
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    dob DATE,
    contact TEXT,
    address TEXT
);

-- SUPPLIERS
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    contact TEXT,
    location TEXT
);

-- INVENTORY
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(10,2),
    supplier TEXT
);

-- PRESCRIPTIONS
CREATE TABLE prescriptions (
    id SERIAL PRIMARY KEY,
    patient_name TEXT NOT NULL,
    doctor_name TEXT NOT NULL,
    date_issued DATE NOT NULL,
    status TEXT
);

-- NOTIFICATIONS
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    recipient TEXT NOT NULL,
    date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ORDER SUPPLY
CREATE TABLE order_supply (
    id SERIAL PRIMARY KEY,
    supplier TEXT NOT NULL,
    item TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
