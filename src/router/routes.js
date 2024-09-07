const {Router} = require('express');
const { check, validationResult, body } = require('express-validator');
const path = require('path')
const db = require('../models');
const User = db.User;

module.exports = function(BASE_PATH) {

const { Welcome, RegisterUserController, AuthSessionController, DashboardController } = require(path.join(BASE_PATH, 'controller'));

const router = Router();

//sign up validation middleware
const validateSignUp = [
    check('firstName').notEmpty().withMessage('First name should not be blank'),
    check('lastName').notEmpty().withMessage('Last name should not be blank'),
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password').isLength({ min: 6}).withMessage('Password must be atleast 8 characters long'),
    
    body('passwordConfirm').custom((value, {req}) => {
        if( value !== req.body.password) {
            throw new Error('Password do not match');
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errors', errors.array());
            req.flash('formData', req.body);
            return res.redirect('back');
        }
        next();
    }
];

//check if email exists
const checkUserExists = (req, res, next) => {
    const email = req.body.email;
    console.log(email || 'walaaaa');
    User.findOne({where: { email: email}})
    .then(user => {
        if(user) {
            req.flash('errors,' [{ msg: 'Email already taken' }]);
            req.flash('formData', req.body);
            return res.redirect('back');
        }
        next();
    })
    .catch(err => {
        next(err);
    })
};

const signUpMiddleware = [
    validateSignUp,
    checkUserExists
];

//sign in validation middleware
const validateLogIn = [
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password').isLength({ min: 6}).withMessage('Password must be atleast 8 characters long'),
    
    body('passwordConfirm').custom((value, {req}) => {
        if( value !== req.body.password) {
            throw new Error('Password do not match');
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errors', errors.array());
            req.flash('formData', req.body);
            return res.redirect('back');
        }
        next();
    }
];

router.get('/', Welcome.index);
router.get('/signup', RegisterUserController.create);
router.post('/signup', signUpMiddleware, RegisterUserController.post);
router.get('/signin', AuthSessionController.create);
router.post('/signin', AuthSessionController.post);
router.get('/forgotpassword', RegisterUserController.forgotpassword);
router.get('/dashboard', DashboardController.index);


return router;
};
