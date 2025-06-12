const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());


const patientsRouter = require('./routes/patients');
const inventoryRouter = require('./routes/inventory');
const suppliersRouter = require('./routes/suppliers');
const prescriptionsRouter = require('./routes/prescriptions');
const notificationsRouter = require('./routes/notifications');

const orderSupplyRouter = require('./routes/orderSupply');
const reportsRouter = require('./routes/reports');
const authRouter = require("./routes/auth");




app.use('/api/patients', patientsRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/suppliers', suppliersRouter);
app.use('/api/prescriptions', prescriptionsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/ordersupply', orderSupplyRouter);
app.use('/api/reports', reportsRouter);
app.use("/api/auth", authRouter);


app.get('/', (req, res) => {
  res.send('Pharmacy API is running...');
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
