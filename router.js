const { Base64 } = require('js-base64');
const f = require('./footer.js')
/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options 
 */
async function routes(fastify, options) {

    const pwd = 'hideip';
    const url = 'https://www.google.com/search?q=';
    const time = 1;
    const initPlb = "密码请关注公众号“xxx”发送【xxx】"; //initPlb 用户自定义可以用来引流
    //如果要通过 initPlb引流，此处的initPwdSHow须为 false,你不要不信邪~
    const initPwdShow = true;

    // 如果要对接数据库，请优化router代码，自行封装，除系统有严格代码审核外，个人项目随意了

    fastify.get('/', async (request, reply) => {
        return { hello: 'world' }
    })

    fastify.post('/', async (request, reply) => {
        const { body } = request;
        const response = (e) => reply.code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(e)
        if (body.passwd == pwd) {
            response({
                status: 200,
                data: {
                    password: Base64.encode(pwd),
                    url: Base64.encode(url),
                    time
                }
            })
        } else if (body.init) {
            response({
                data: {
                    initPwdShow,
                    initPwd: Base64.encode(pwd),
                    initPlb: initPlb,
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