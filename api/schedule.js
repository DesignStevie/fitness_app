import { connectToDatabase } from './lib/mongodb.js'
import Schedule from './lib/Schedule.js'
import { defaultPlans } from './lib/defaultPlans.js'

export default async function handler(req, res) {
  try {
    await connectToDatabase()

    if (req.method === 'GET') {
      let schedule = await Schedule.findOne()
      if (!schedule) {
        schedule = await Schedule.create({ days: defaultPlans })
      }
      return res.json(schedule.days)
    }

    if (req.method === 'PATCH') {
      const { dayIndex, workoutName, setData } = req.body

      const schedule = await Schedule.findOne()
      if (!schedule) return res.status(404).json({ error: 'Schedule not found' })

      const workout = schedule.days[dayIndex]?.workouts.find(w => w.name === workoutName)
      if (workout) {
        workout.setData = setData
        await schedule.save()
      }

      return res.json({ ok: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('[/api/schedule]', err)
    res.status(500).json({ error: err.message })
  }
}
