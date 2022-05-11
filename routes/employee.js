const express = require('express');
const User = require('../controllers/employee');
const Validator = require('../middlewares/validation');
const app = express()


///Routes


app.post('/employee/register',Validator.registrationRules(), Validator.validate, User.createUser);
app.get('/employee/profile/:userId', User.getUserProfile);
app.put('/employee/editProfile/:userId',Validator.registrationRules(), Validator.validate, User.updateUser);
app.get('/allEmployees', User.getAllUser);
app.delete('/deleteEmployee/:userId', User.deleteUser);

module.exports = app;