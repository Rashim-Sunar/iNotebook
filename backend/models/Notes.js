const mongoose = require('mongoose')
const {Schema} = mongoose

const noteSchema = new Schema({
    user : {type : mongoose.Schema.Types.ObjectId , ref : "user"}, //Links user with notes, ref:"collection-name"
    title : {type:String , required:true},
    description : {type:String},
    tag : {type:String,default:'General'},
    date : {type:Date , default:Date.now()}
})

module.exports = mongoose.model('note',noteSchema);