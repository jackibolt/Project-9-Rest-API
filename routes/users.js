
const express = require('express');
const router = express.Router();

//Database
const db = require('../db');
const { User } = db.models;

const { validationResult } = require('express-validator');


//Middleware
const authenticateUser = require('../middleware/authenticateUser');
const validateUser = require('../middleware/validateUser');


// return current authenticated user
router.get('/users', authenticateUser, async (req, res, next) => {
    try {
        const user = await req.currentUser;
        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress
        });
    } catch (err) {
        console.error("There's been an error: ", err);
    }

})


// create new user
router.post('/users', validateUser, (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        res.status(400).json({
            errors: errorMessages
        })
    } else {
        const user = req.body;
        console.log(user);
        User.create(user)
        res.status(201).end();
    }

})



module.exports = router;