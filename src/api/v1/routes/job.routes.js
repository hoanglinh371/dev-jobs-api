const express = require('express');

const {
  httpGetJobs,
  httpCreateJob,
  httpGetJobById,
  httpUpdateJob,
  httpDeleteJob,
} = require('../controllers/job.controller');

const jobRouter = express.Router();

jobRouter.route('/').get(httpGetJobs).post(httpCreateJob);
jobRouter
  .route('/:_id')
  .get(httpGetJobById)
  .patch(httpUpdateJob)
  .delete(httpDeleteJob);

module.exports = jobRouter;
