/**
 * Created by binshenchen on 2017/8/2.
 */
const router = require('koa-router')();

const projects = [
    {
        "id": 1,
        "name": "project one",
        "price": 10.99
    },
    {
        "id": 2,
        "name": "project two",
        "price": 99.99
    }
]

function findProjectDB(id) {
    for (var index in projects) {
        if (id == projects[index].id) {
            return projects[index];
        }
    }
}

router.get('projects/:id', async(ctx)=>{
    let projectId = ctx.params.id;
    let project = findProjectDB(projectId);
    let user = ctx.state['user'];
    console.log('user info:' + JSON.stringify(user));
    ctx.response.body = {
        "code": 0,
        "msg": 'ok',
        "user": user,
        "data": project
    }
})

module.exports = router;