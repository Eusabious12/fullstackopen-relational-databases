const router = require('express').Router()
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, as: 'blogs', attributes: { exclude: ['userId'] } },
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const { username, name } = req.body
  const user = await User.create({ username, name })
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const where = {}
  if (req.query.read !== undefined) {
    where.read = req.query.read === 'true'
  }
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId'] },
      through: { attributes: ['read', 'id'], where },
    },
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    user.name = req.body.name
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
