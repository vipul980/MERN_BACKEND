const { body, validationResult } = require('express-validator');

exports.registrationRules = () => {
    return [
        body('firstName').not().isEmpty().isString(),
        body('lastName').not().isEmpty().isString(),
        body('phoneNumber').not().isEmpty().isNumeric().matches(/^\d{10}$/).withMessage('Please Enter a Valid Phone Number'),
        body('email').not().isEmpty().isEmail().withMessage('Please Enter a Valid Email Address'),
        body('DOB').not().isEmpty().isISO8601('dd-mm-yyyy').withMessage('Date of birth must be in format dd-mm-yyyy'),
    ];
}

exports.validate = (request, response, next) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({error: errors.array()})
        }
        next();
    }
    catch (error) {
        next(error);
    }
}