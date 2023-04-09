const express = require('express');
const mongoose = require('mongoose');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const gymRoutes = require('./routes/gymRoutes');
const classRoutes = require('./routes/classRoutes');

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/users', userRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/classes', classRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
