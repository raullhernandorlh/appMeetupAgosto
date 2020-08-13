//Imports
const database = require('../database');
const express = require('express');
const meetupService = require('../service/meetupService');
const validation = require('../validations/validations')
const logger = require('../utilities/logger');

const moment = require("moment");
moment.locale('es')


const { isAuthenticated, isOrganizer, isOrganizerOfThisMeetup } = require('../middlewares/auth');
// Defining Router
const router = express.Router();

// Array with all the categories 

const categories = ["natureandadventure", "sociallife", "languages", "beliefs"
    , "sportsAndPhisycalCondition", "careersandbusiness", "travels"]


// Create Meetups
// Luego hay que ponerlo isAuthenticated
// Luehop hay que poner el isOrganizer

router.post('/',isAuthenticated, async function (req, res) {


    const idOrganizer = req.auth.id;
    
    

    const meetup = {
        'title': req.body.title,
        'date':req.body.date,
        'time':req.body.time,
        'duration': req.body.duration,
        'location': req.body.location,
        'category': req.body.category,
        'meetupPrincipalImage': req.body.meetupPrincipalImage,
        'meetupSecondImage': req.body.meetupSecondImage,
        'meetupThirdImage': req.body.meetupThirdImage,
        'meetupPrice': req.body.meetupPrice,
        'description':req.body.description,
        'idOrganizer':idOrganizer
    };
  

    // Meetup Validation

    try {
        validation.meetupValidation(meetup)
        logger.info("The validation of register fields was successful");

    } catch (e) {
        res.status(400).send();
        return
    }


    // Categories Allowed

    if (meetup.category === categories[0] || meetup.category === categories[1] || meetup.category === categories[2]
        || meetup.category === categories[3] || meetup.category === categories[4] || meetup.category === categories[5]
        || meetup.category === categories[6]) {


        // Adding the meetup
        let responseDTO;
        if (await meetupService.registerMeetup(meetup)){
            responseDTO = {
                'code': 200,
                'description': 'Successfully created Meetup',
                'data': meetup
            };
        } else {
            responseDTO = {
                'code': 404,
                'description': 'The meetup could not be registered',
            };
        }
    
        return res.status(responseDTO.code).json(responseDTO);
    } else {
       
        res.status(404).send();
    }

})

// Delete Meetup
// Luego hay que ponerlo isAuthenticated
//Luego hay que ponerlo IsOrganizer
// Luego hay que ponerlo el isOrganizerOfThisMeetup

router.delete('/:id',isAuthenticated,async function (req, res){

    console.log("Hola")
    const id = parseInt(req.params.id);

    if (id === undefined) {
        res.status(402).send();
        return
    }

    meetupService.deleteMeetup(id);
    res.send();

})

// List All meetups

router.get('/listallmeetups', async function (req, res) {
    const listAllMeetups = await meetupService.listAllMeetups();
    const responseDTO = {
        'code': 200,
        'data': listAllMeetups
    };

    return res.status(responseDTO.code).json(responseDTO);
})



// List Organizer Meetups

//Luego hay que ponerlo "isAuthenticated"
//Luego hay que ponerlo "isOrganizer"
// Luego hay que ponerlo "isOrganizerOfThisMeetup"


router.get('/listmeetups/',isAuthenticated, async function (req,res){

    console.log("Estoy en el metodo de mostrar las meetups del organizador")

    const id = req.auth.id;

    const responseDTO = await meetupService.listOrganizerMeetups(id);
    res.status(responseDTO.code).json(responseDTO);
})


// Filter Meetups 

router.get('/filter', async function (req,res){

    const { price, category, duration, location ,date, dateyear, dateMonth, timezone} = req.query;

    let filter = {
        "price": price,
        "category": category,
        "duration": duration,
        "location": location,
        "date": date,
        "dateyear" : dateyear,
        "dateMonth" : dateMonth,
        "timezone":timezone
    }

    console.log(timezone)

    const filterMeetups = await meetupService.filterMeetups(filter);
    const responseDTO = {
        'code': 200,
        'data': filterMeetups
    };

    return res.status(responseDTO.code).json(filterMeetups);
})

// Detail Meetup
// Luego hay que ponerlo isAuthenticated

router.get('/:id', isOrganizer, isOrganizerOfThisMeetup,async function (req,res){

    const id = parseInt(req.params.id);

    const responseDTO = await meetupService.detailMeetup(id);
    res.status(responseDTO.code).json(responseDTO);
})


// Update Meetup 
// Luego hay que ponerlo luego "isOrganizer"
// Luego hay que poinerlo "isOrganizerOfThisMeetup"


router.put('/:id_meetup', isAuthenticated, async function (req,res) {

    console.log("Hola estoy actualizando");

    let  id_meetup = parseInt(req.params.id_meetup);
    console.log("Estoy en la actualizacion del meetup");
    console.log(id_meetup);

    if (isNaN(id_meetup)) {
        res.status(400).send();
        return;
    }
   
    const meetup = {
        'title':req.body.title,
        'date':req.body.date,
        'time':req.body.time,
        'duration': req.body.duration,
        'location':req.body.location,
        'category':req.body.category,
        'meetup_principal_image': req.body.meetup_principal_image,
        'meetup_second_image': req.body.meetup_second_image,
        'meetup_third_image': req.body.meetup_third_image,
        'meetup_price': req.body.meetup_price,
        'description':req.body.description,
    };

    console.log(meetup.title);
    

    // // Meetup Validation

    // try {
    //     validation.meetupUpdateValidation(meetup);

    // } catch (e) {
    //     res.status(400).send();
    //     return
    // }

    // Updating the meetup
    
        let responseDTO;
        if (await meetupService.updateMeetup(meetup,id_meetup)){
            responseDTO = {
                'code': 200,
                'description': `Meetup ${id} successfully updated`,
                'data': meetup
            };
        } else {

            responseDTO = {
                'code': 404,
                'description': `The meetup ${id_meetup} could not be updated`,
            };
        }
    
        return res.status(responseDTO.code).json(responseDTO);
})

module.exports = router;