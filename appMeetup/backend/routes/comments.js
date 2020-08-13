//Imports

const express = require('express');
const commentService = require('../service/commentService');
const moment = require('moment');
moment.locale('es');


// Funcion importada que convierte la fecha en UTC a date para tenerla la hora en un formato correcto

const { isAuthenticated, isOrganizer, isOrganizerOfThisMeetup } = require('../middlewares/auth');


// Defining Router
const router = express.Router();

// Add Comments

router.post('/:id' ,isAuthenticated,async function (req, res) {

    const id_user = req.auth.id;
    const id_meetup = req.params.id;
    const date = req.body.date
    const time = req.body.time
    const meetupComment= req.body.comment;




    // Objeto a meter en comentarios
    
    const comment = {
        'id_user': id_user,
        'id_meetup':id_meetup,
        'date':date,
        'time':time,
        'meetupComment': meetupComment,
    };

    console.log(comment)


    let responseDTO;
    if (await commentService.addComment(comment)){
        responseDTO = {
            'code': 200,
            'description': 'Comment created correctly',
            'data': meetupComment
        }
    } else {
        responseDTO = {
            'code': 404,
            'description': 'Could not create comment',
        };
    }

    return res.status(responseDTO.code).json(responseDTO);
})


//Show Meetup Comments

router.get('/:idMeetup', isAuthenticated,async function (req,res){

    const id = req.auth.id;
    const idMeetup = parseInt(req.params.idMeetup)

    console.log("Estoy en ver los comentarios añadidos")
    console.log(id)
    console.log(idMeetup)

    const responseDTO = await commentService.showMeetupComment(idMeetup,id);
    res.status(responseDTO.code).json(responseDTO);
})
module.exports = router;
