const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/iNotebook'

connectTomongo = () => {
    mongoose.connect(mongoURI);
}

module.exports = connectTomongo