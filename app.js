const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const jwt = require('./jwt');

const app = new Koa();

app.use(bodyParser());

app.use(async(ctx, next)=> {
    if (/^\/session/.exec(ctx.url)) {
        // /session不做校验
        await next();
    } else {
        var auth = ctx.header.authorization;
        let result = jwt.verify(auth);
        if (!result.error) {
            ctx.state['user'] = result.data;
            await next();
        } else {
            ctx.throw(401, result.error);
        }
    }
})


const router = require('./routers/index');
app.use(router.routes()).use(router.allowedMethods());


app.listen(3000);
