const { connectToDatabase } = require('./lib/mongodb.js')
const Schedule = require('./lib/Schedule.js')
const { defaultPlans } = require('./lib/defaultPlans.js')

module.exports = async function handler(req, res) {
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
      const cleanSetData = setData.map(({ reps, weight }) => ({ reps, weight }))

      await Schedule.updateOne(
        {},
        { $set: { [`days.${dayIndex}.workouts.$[w].setData`]: cleanSetData } },
        { arrayFilters: [{ 'w.name': workoutName }] }
      )

      return res.json({ ok: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('[/api/schedule]', err)
    res.status(500).json({ error: err.message })
  }
}
