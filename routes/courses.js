
'use strict';

const express = require('express');
const router = express.Router();

//Database
const db = require('../db');
const { User, Course } = db.models;

router.get('/courses', async (req, res, next) => {
    try {
        const courses = await Course.findAll({
            attributes: { 
                include: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
                exclude: ['createdAt', 'updatedAt']
            },
            // include: [{
            //     model: User
            // }],
        });
        res.status(200).json({ courses });

    } catch (err) {
        console.log("Courses aren't loading");
        next();
    }



})





module.exports = router;