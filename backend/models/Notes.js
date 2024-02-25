const mongoose = require('mongoose')
const {Schema} = mongoose

const noteSchema = new Schema({
    user : {type : mongoose.Schema.Types.ObjectId , ref : "user"}, //Links user with notes
    title : {type:String , required:true},
    description : {type:String},
    tag : {type:String,default:'General'}
})

module.exports = mongoose.model('note',noteSchema);