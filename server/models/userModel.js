const mongoos = require('mongoose');

const userSchema = new mongoos.Schema({
    firstName: {type:'string', required: true},
    lastName: {type:'string', required: true},
    email: {type:'string', required: true},
    phone: {type:'string', required: true},
    address: {type:'string', required: true},
    password: {type:'string', required: true, minlength: 8}
});

module.exports = User = mongoos.model('user', userSchema);