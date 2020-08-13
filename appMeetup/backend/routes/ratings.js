//Imports

const express = require('express');
const ratingService = require('../service/ratingService');


const { isAuthenticated} = require('../middlewares/auth');

// Defining Router
const router = express.Router();

//Add Rating 

router.post('/:meetupId/:meetupDate', async function (req, res) {

    const meetupDate = req.params.meetupDate
    const meetupId = parseInt(req.params.meetupId);
    const reservationUser = req.auth.id
    const valoration = parseInt(req.body.valoration);


    const responseDTO = await ratingService.addRatingAfterMeetups(meetupDate,meetupId,reservationUser,valoration);
    res.json(responseDTO);
})

// Average Rating 

router.get('/avg/:id_meetup', async function (req, res) {

    const id_meetup  = parseInt(req.params.id_meetup);

    const responseDTO = await ratingService.avgMeetupRating(id_meetup)
    res.status(responseDTO.code).json(responseDTO);
})




module.exports = router;





