const { check, validationResult } = require('express-validator')


module.exports.signupValidation=[
    check('username','invalid input').matches(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    check('email','invalid input').isEmail(),
    check('password','invalid input').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
]

module.exports.changePass= [
    check('newPassword','invalid input').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    check('confirmPassword','invalid input').custom((value, { req }) => {
        if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match the new password');
        }
        return true;
    })
]