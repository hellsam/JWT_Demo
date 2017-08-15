/**
 * Created by binshenchen on 2017/8/2.
 */

const crypto = require('crypto');
const jwt_header = {
    'typ': 'JWT',
    'alg': 'HS256'
}

const SALT = 'your salt';

module.exports = {
    sign: function (data) {
        let header = new Buffer(JSON.stringify(jwt_header)).toString('base64');
        let payload = new Buffer(JSON.stringify(data)).toString('base64');
        let origin = header + '.' + payload;
        let sha256 = crypto.createHmac('sha256', SALT);
        sha256.update(origin);
        let sign = sha256.digest('hex');
        return origin + '.' + sign;
    },
    verify: function (jwtString) {
        console.log(jwtString);
        if(!jwtString){
            return {'error': "err"}
        }
        if (jwtString.split(' ')[0] != 'Bearer') {
            return {'error': 'auth formatter error.'};
        }
        jwtString = jwtString.split(' ')[1];
        let parts = jwtString.split('.');
        let header;
        try {
            header = JSON.parse(new Buffer(parts[0], 'base64').toString());
        } catch (err) {
            return {'error': 'auth formatter error.'};
        }
        if (header.typ == 'JWT' && header.alg == 'HS256') {
            let sha256 = crypto.createHmac('sha256', SALT);
            sha256.update(parts[0] + '.' + parts[1]);
            if (sha256.digest('hex') != parts[2]) {
                return {'error': 'invalid signature'};
            }
        }
        let data = JSON.parse(new Buffer(parts[1], 'base64').toString());
        return {'data': data};
    }
}