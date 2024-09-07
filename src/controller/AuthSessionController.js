const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const db = require('../models');  // Path to your Sequelize models
const User = db.User;  // Import the Tutorial model

const create = (req, res) => {
    res.render('signin', {layout: 'layout',
    })
}
const checkUserExists = (email) => {
    User.findOne({ email:email}).then(user => {
        if (!user) {
            return user;
        }
        else {
            return false;
        }
    })
}

const post = (re, res) => {
    const user = {
        email: req.body.email,
        loginpassword: req.body.email
    };

    if(checkUserExists()) {
        bcrypt.compare(loginpassword, user.password)
        .then(isMatch => {
            if(isMatch) {
                req.session.Id = User.id;
                req.session.firstName = User.firstName;
                req.session.lastName = User.lastName;
                
                res.render('dashboard', {
                    firstname: req.session.firstName,
                    lastName: req.session.lastName
                });

            }
        });
    }

    res.render('signin', {
        errors: 'Invalid log in',
        formData: { email }
    });

}

module.exports = {
    create, post
}

