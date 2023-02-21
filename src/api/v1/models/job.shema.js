const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'A job must have company infomation.'],
    },
    logo: String,
    logoBackground: String,
    contract: {
      type: String,
      required: [true, 'A job must have contract'],
      enum: ['full-time', 'part-time'],
    },
    location: {
      type: String,
      required: [true, 'A job must have location'],
    },
    website: {
      type: String,
      required: [true, 'A job must have a website'],
    },
    apply: {
      type: String,
      required: [true, 'A job must have an apply link'],
    },
    description: {
      type: String,
      required: [true, 'A job must have a description'],
    },
    requirements: {
      content: {
        type: String,
        required: [true, 'Job requirements must have content'],
      },
      items: {
        type: [String],
        require: [true, 'Job requirements must have items'],
      },
    },
    role: {
      content: {
        type: String,
        required: [true, 'Role must have content'],
      },
      items: {
        type: [String],
        require: [true, 'Role must have items'],
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
