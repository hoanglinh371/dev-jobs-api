const Job = require('../models/job.model');
const APIFeature = require('../utils/APIFeature');
const AppError = require('../utils/AppError');

exports.getJobs = async (queryString) => {
  const features = new APIFeature(Job.find(), queryString)
    .filter()
    .sort()
    .paginate();
  const jobs = await features.query;

  return jobs;
};

exports.getJobById = async (_id) => {
  const job = Job.findById(_id);
  if (!job) {
    throw new AppError(404, 'No job found with ID');
  }

  return job;
};

exports.createJob = async (job) => {
  const newJob = await Job.create(job);
  return newJob;
};

exports.updateJob = async (_id, updateData) => {
  const job = await Job.findByIdAndUpdate(_id, updateData, {
    new: true,
    runValidators: false,
  });
  if (!job) {
    throw new AppError(404, 'No job found with ID');
  }

  return job;
};

exports.deleteJob = async (_id) => {
  const job = await Job.findByIdAndDelete(_id);
  if (!job) {
    throw new AppError(404, 'No job found with ID');
  }

  return null;
};
