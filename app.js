const express = require('express');
const mongoose = require('mongoose');
const YAML = require('yamljs');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const gymRoutes = require('./routes/gymRoutes');
const classRoutes = require('./routes/classRoutes');
const optionModel = require('./models/optionModel');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

console.log('Starting app.js');
const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/users', userRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/classes', classRoutes);
console.log('Registering /api/subscriptions route');
app.use('/api/subscriptions', subscriptionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
