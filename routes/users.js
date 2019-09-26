
const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validtaor');

//Database
const db = require('../db');
const { User } = db.models;


//Middleware
const authenticateUser = require('../middleware/authenticateUser');


// return current authenticated user
router.get('/users', authenticateUser, async (req, res) => {
    try {
        const user = await req.currentUser;
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress
        });
    } catch (err) {
        console.error("There's been an error: ", err);
    }

})


// create new user
router.post('/users', async(req, res) => {
    try {
        const user = await req.body;
        console.log(user);
        User.create(user)
        res.status(200).end();

    } catch (err) {
        console.log('not creating the dang user')
    }
})



module.exports = router;