const mongoose = require('mongoose')

const setDataSchema = new mongoose.Schema(
  { reps: Number, weight: Number },
  { _id: false }
)

const workoutSchema = new mongoose.Schema(
  {
    name: String,
    sets: Number,
    reps: Number,
    group: String,
    setData: [setDataSchema],
  },
  { _id: false }
)

const daySchema = new mongoose.Schema(
  { day: String, workouts: [workoutSchema] },
  { _id: false }
)

const scheduleSchema = new mongoose.Schema({ days: [daySchema] })

module.exports = mongoose.models.Schedule ?? mongoose.model('Schedule', scheduleSchema)
