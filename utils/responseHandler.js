const Constants = require('../config/constant');

module.exports = {

responder : (request, response, status, data) => {
    response.status(200).json({
        status: status,
        message: Constants[status],
        data: data,
    });
},

erroResponder : (request, response, status) => {
    response.status(400).json({
        status: status,
        message: Constants[status],
    });
}

}