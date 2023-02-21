const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

const jobRouter = require('./routes/job.routes');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/jobs', jobRouter);

module.exports = app;
