const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const db = require('../models');  // Path to your Sequelize models
const User = db.User;  // Import the Tutorial model

const create = (req, res) => {
    res.render('auth/register', {
        layout: 'layout',
    })
}

const post = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds)
        .then(hashedPassword => {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword
            };

            User.create(user).then(data => {
                res.redirect('/signin');
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        });
}

const forgotpassword = (req, res) => {
    res.render('auth/forgotpassword', {
        layout: 'layout',
    })
}



module.exports = {
    create, post, forgotpassword
}