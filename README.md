#  Pharmacy Management System — Fullstack App (React + Node.js + PostgreSQL)

This is a fullstack pharmacy management application built using **React (Vite)** for the frontend, **Node.js + Express** for the backend, and **PostgreSQL** as the database.

---

##  Backend (Node.js + Express + PostgreSQL)

###  Tech Stack
- Node.js + Express
- PostgreSQL (via `pg`)
- dotenv, cors, morgan

---

###  Getting Started

```bash
# 1. Navigate to the backend directory
cd pharmacy-backend

# 2. Install backend dependencies
npm install

# 3. Create a PostgreSQL database (e.g., pharmacydb)
# Then run schema manually or through DBeaver

# 4. Start the backend server
node server.js
```

### Project Structure
```
pharmacy-backend/
├── routes/
│   ├── auth.js           # login, register
│   ├── patients.js       # CRUD for patients
│   ├── inventory.js      # medicine stock management
│   ├── suppliers.js      # supplier management
│   ├── prescriptions.js  # prescription records
│   ├── reports.js        # reporting
│   ├── orders.js         # order supply requests
│   ├── notifications.js  # alerts & system messages
├── db.js                 # PostgreSQL connection
├── server.js             # Entry point
└── .env                  # Configuration (PORT, DB creds)
```

# API Endpoints
 Auth Routes

Base URL: /api/auth
```
| Method | Endpoint | Description                |
| ------ | -------- | -------------------------- |
| POST   | /signup  | Register user (admin/user) |
| POST   | /login   | Log in user                |
```
Example payload:
```
{ "email": "admin@example.com", "password": "123456", "role": "admin" }
```

 # Entity Routes Overview

 | Entity        | Base URL             | Operations             |
| ------------- | -------------------- | ---------------------- |
| Patients      | `/api/patients`      | GET, POST, PUT, DELETE |
| Inventory     | `/api/inventory`     | GET, POST, PUT, DELETE |
| Prescriptions | `/api/prescriptions` | GET, POST, PUT, DELETE |
| Suppliers     | `/api/suppliers`     | GET, POST, PUT, DELETE |
| Reports       | `/api/reports`       | GET (generate reports) |
| Orders        | `/api/orders`        | GET, POST              |
| Notifications | `/api/notifications` | GET, POST, DELETE      |
