const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const db = require('../models');
const User = db.User;

const create = (req, res) => {
    res.render('signin', {
        layout: 'layout',
    })
}

const checkUserExists = async (userEmail) => {
    const user = await User.findOne({ where: { email: userEmail } });
    return user !== null ? user : false;
}


const post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userModel = await checkUserExists(email);

        if (userModel) {
            const isMatch = await bcrypt.compare(password, userModel.password);
            if (isMatch) {
                req.session.Id = userModel.id;
                req.session.firstName = userModel.firstName;
                req.session.lastName = userModel.lastName;
                return res.redirect('/dashboard');
            }
        }

        return res.render('signin', {
            errors: 'Invalid log in',
            formData: { email }
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.render('signin', {
            errors: 'An error occurred, please try again later.',
            formData: { email }
        });
    }
}

module.exports = {
    create, post
}

