//Imports

const database = require('../database');
const { connection } = require('../database');
const logger = require('../utilities/logger');
const { getMaxListeners } = require('../utilities/logger');


//See rating assigned to the Meetup by previous meetups

async function avgMeetupRating(id_meetup) {

    const sql = 'SELECT AVG(valoration) AS media FROM ratings WHERE id_meetup = ? AND valoration != 0 ';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id_meetup]);
        let description;
        if (!rows[0]) {
            description = `The average of the meetup ${id_meetup} ratings could not be performed`;
        } else {
            description = `The average of the meetup ${id_meetup} ratings was successful`;
        }

        let responseDTO = {
            'code': 200,
            'description': description,
            'data': rows[0]
        };

        return responseDTO;

    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }
}

// Add ratings after meetups

async function addRatingAfterMeetups(meetupDate,meetupId,valoration) {

    // Si la fecha actual es mayor a la fecha en la que se ha realizado el meetup se puede realizar la valoracion
    // sino error

    if( date.now() > meetupDate){

    //Comparar la fecha de hoy con la fecha del evento
    try {
        const sqlAddRating = 'INSERT INTO ratings (valoration,id_meetup) VALUES (?,?)';
        connection.query(sqlAddRating, [valoration,meetupId], function (error) {
            let description;
            let code;
            if (!rows[0]) {
                description = `Could not insert rating for this meetup ${meetupId}`;
                code = 200;
            } else {
                description = `The rating for meetup ${id} was successful`;
                code = 201;
            }

            let responseDTO = {
                'code': code,
                'description': description,
                'data': rows[0]
            };

            logger.info(`The valuation of the meetup has been carried out on the following date ${meetupDate}`);

            return responseDTO;
        })

            } catch (exception) {
                return {
                    'code': 500,
                    'description': exception.toString()
                };
            }
    }

        if (error) {
            const errorResponse = '{"error", "The date is before the meetup. You cannot vote yet"}';
            return errorResponse;
        }
    
}

module.exports = {
    avgMeetupRating,
    addRatingAfterMeetups
}