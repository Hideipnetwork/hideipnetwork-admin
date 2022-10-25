import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from "./src/router.js"

const fastify = Fastify({
  logger: false
})

const runEnv = {
  port: 3001 || process.env.PORT,
  host: '0.0.0.0' || process.env.HOST
}

fastify.register(routes)

fastify.register(cors, (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})

const start = async () => {
  try {
    await fastify.listen({ ...runEnv })
    console.log(`运行中，${runEnv.host}:${runEnv.port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()