const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./api/v1/app');

dotenv.config();
mongoose.set('strictQuery', true);

const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(`Database connection successful.`);

  server.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
  });
});
