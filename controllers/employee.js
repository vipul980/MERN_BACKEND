const User = require('../models/employee');
const { responder, erroResponder } = require('../utils/responseHandler');



async function userExists(email) {
    let userFound = await User.findOne({ email: email })
    userFound = userFound ? 1 : 0
    return userFound
}

async function phoneAvailability(phoneNumber) {
    let userFound = await User.findOne({ phoneNumber: phoneNumber })
    userFound = userFound ? 1 : 0
    return userFound
}

module.exports = {
    createUser: async (req, res, next) => {
        if (await userExists(req.body.email)) {
            return erroResponder(req, res, 103)
        }
        if (await phoneAvailability(req.body.phoneNumber)) {
            return erroResponder(req, res, 104)
        }
        let newUser = new User(req.body);
        newUser.save().then(async data => {
            return responder(req, res, 101, data._id);
        }).catch(err => {
            return erroResponder(req, res, 102);
        })
    },

    getUserProfile: async (req, res) => {
        await User.findById(req.params.userId).then(data => {
            return responder(req, res, 105, data)
        }).catch(err => {
            return erroResponder(req, res, 106)
        })
    },

    getAllUser: async (req, res) => {
        await User.find().then(data => {
            return responder(req, res, 107, data)
        }).catch(err => {
            return erroResponder(req, res, 110)
        })
    },

    updateUser: async (req, res, next) => {
        await User.findByIdAndUpdate({_id:req.params.userId},req.body).then(data => {
            return responder(req, res, 108, data)
        }).catch(err => {
            return erroResponder(req, res, 109)
        })
    },

    deleteUser: async (req, res) => {
        await User.findByIdAndDelete({_id:req.params.userId}).then(data => {
            return responder(req, res, 111, data)
        }).catch(err => {
            return erroResponder(req, res, 112)
        })
    }
}

