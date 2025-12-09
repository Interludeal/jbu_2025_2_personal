import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    imgSrc: {
      type: String,
      required: [true, 'Please provide an image source'],
    },
    demoUrl: {
      type: String,
      required: [true, 'Please provide a demo URL'],
    },
    gitUrl: {
      type: String,
      required: [true, 'Please provide a git URL'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Project ||
  mongoose.model('Project', projectSchema)
