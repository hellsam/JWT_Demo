/**
 * Created by binshenchen on 2017/8/2.
 */

const Router = require('koa-router');
const crypto = require('crypto');
const jwt = require('../jwt');

let router = new Router();


const users = [{
    "id": 1,
    "username": "admin",
    "password": "123"
}, {
    "id": 2,
    "username": "user1",
    "password": "123"
}, {
    "id": 3,
    "username": "user2",
    "password": "123"
}]

function findUserFromDB(username, password) {
    for(let index in users){
        if(users[index].username == username && users[index].password == password){
            return users[index];
        }
    }
}

router.post('session', async(ctx)=>{
    ctx.response.type = 'application/json';
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    // console.log(username + ',' + password);
    //模拟DB验证账号密码
    let user = findUserFromDB(username, password)
    let data = {
        "id": user.id,
        "username": user.username
    }
    if (user) {
        ctx.response.body = {
            "code": 0,
            "msg": 'ok',
            "data": jwt.sign(data)
        }
    } else {
        ctx.response.body = {
            "code": -1101,
            "msg": 'username or password error.'
        }
    }
})

module.exports = router;