//Imports

const express = require('express');
const paymentService = require('../service/paymentService.js');


const { isAuthenticated } = require('../middlewares/auth');


// Defining Router
const router = express.Router();

router.post('/' ,isAuthenticated, async function (req, res) {

    const meetup_name = req.body.meetup_name;
    const reservation_price = req.body.reservation_price
    const date = req.body.date
    const time = req.body.time
    const id_user = req.auth.id;
    const id_meetup = req.body.meetup_id;

    // Crea los objetos de Pago
    
    const payment = {
        'meetup_name':meetup_name,
        'reservation_price':reservation_price,
        'date':date,
        'time':time,
        'meetup_id':id_meetup,
        'user_id': id_user,
    };

    console.log(payment)


    let responseDTO;
    if (await paymentService.addPayment(payment)){
        responseDTO = {
            'code': 200,
            'description': 'Payment created correctly',
            'data': payment
        }
    } else {
        responseDTO = {
            'code': 404,
            'description': 'Could not create payment',
        };
    }

    return res.status(responseDTO.code).json(responseDTO);
})

module.exports = router;