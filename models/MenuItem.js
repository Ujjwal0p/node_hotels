const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price:{
        type: Number
    },
    taste:{
        type:String,
        enum: ['sweet','sour','spicy'],
        require: true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:String,
        enum:['chiken wings', 'souce', 'spices']
    },
    num_sales:{
        type:Number,
        default:0
    }
})

const MenuItem = mongoose.model('MenuItem' , menuItemSchema)

module.exports = MenuItem;