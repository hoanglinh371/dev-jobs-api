const express = require('express');

const { protect, restrictTo } = require('../middlewares/auth.middleware');
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
  .delete(protect, restrictTo('admin', 'hr'), httpDeleteJob);

module.exports = jobRouter;
