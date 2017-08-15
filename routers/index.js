/**
 * Created by binshenchen on 2017/8/2.
 */
const router = require('koa-router')()

const session = require('./session')
const project = require('./project')

router.use('/', session.routes(), session.allowedMethods())
router.use('/api/', project.routes(), project.allowedMethods())

module.exports = router