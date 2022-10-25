const { Base64 } = require('js-base64');
const f = require("./drainageData.js");
const config = require("./config.js")
/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options 
 */
async function routes(fastify, options) {

    // 如果要对接数据库，请优化router代码，自行封装，除系统有严格代码审核外，个人项目随意了

    fastify.get('/', async (request, reply) => {
        return { hello: 'world' }
    })

    fastify.post('/', async (request, reply) => {
        const { body } = request;
        const response = (e) => reply.code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(e)
        if (body.passwd == config.pwd) {
            response({
                status: 200,
                data: {
                    password: Base64.encode(config.pwd),
                    url: Base64.encode(config.url),
                    time: config.time
                }
            })
        } else if (body.init) {
            response({
                data: {
                    initPwdShow: config.initPwdShow,
                    initPwd: Base64.encode(config.pwd),
                    initPlb: config.initPlb,
                }
            })
        } else if (body.reqFImg) {
            response({
                status: 200,
                data: f
            })
        } else {
            reply.send({
                status: 5101,
                data: {
                    msg: 'Wrong ,Please try again!'
                }
            })
        }
    })
}

module.exports = routes