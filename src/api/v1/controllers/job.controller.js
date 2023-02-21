const catchAsync = require('../utils/catchAsync');

const {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
  updateJob,
} = require('../services/job.service');

exports.httpGetJobs = catchAsync(async (req, res, next) => {
  const jobs = await getJobs(req.query);

  return res.status(200).json({
    status: 'success',
    results: jobs.length,
    data: {
      jobs,
    },
  });
});

exports.httpGetJobById = catchAsync(async (req, res, next) => {
  const job = await getJobById(req.params._id);

  return res.status(200).json({
    status: 'success',
    data: {
      job,
    },
  });
});

exports.httpCreateJob = catchAsync(async (req, res, next) => {
  const newJob = await createJob(req.body);

  return res.status(201).json({
    status: 'success',
    data: {
      job: newJob,
    },
  });
});

exports.httpUpdateJob = catchAsync(async (req, res, next) => {
  const job = await updateJob(req.params._id, req.body);

  return res.status(200).json({
    status: 'success',
    data: {
      job,
    },
  });
});

exports.httpDeleteJob = catchAsync(async (req, res, next) => {
  await deleteJob(req.params._id);

  return res.status(204).json({
    status: 'success',
    data: null,
  });
});
