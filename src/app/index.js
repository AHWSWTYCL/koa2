const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const koaParameter = require('koa-parameter')
const errHandler = require('./errHandler')
const router = require("../router")


const app = new Koa()

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true
    }
}))
    .use(koaStatic(path.join(__dirname, '../upload')))
    .use(koaParameter(app))
    .use(router.routes())
    .use(router.allowedMethods())

app.on('error', errHandler)

module.exports = app
