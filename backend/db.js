const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/iNotebook'  //here inotebook is a database_name

connectTomongo = () => {
    mongoose.connect(mongoURI);
}

module.exports = connectTomongo