const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    age: String
})

const user = mongoose.model('users', userSchema)

export default user