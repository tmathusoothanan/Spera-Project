const mongoos = require('mongoose');

const productSchema = new mongoos.Schema({
    name: {type:'string', required: true},
    description: {type:'string', required: true},
    quantity: {type:'number', required: true},
    user_id: {type:'string', required: true}
});

module.exports = Products = mongoos.model('product', productSchema);