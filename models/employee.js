const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    phoneNumber: {type: Number, required:true},
    DOB: {type: Date, required: true}
})

module.exports = mongoose.model('Employee', employeeSchema);