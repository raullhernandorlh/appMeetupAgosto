//Imports


const  {formatDateToDB} =require('../utilities/convertDate.js')
const database = require('../database');
// const { connection } = require('../database');
const logger = require('../utilities/logger');
const { getMaxListeners } = require('../utilities/logger');
const { Console } = require('winston/lib/winston/transports');
const moment = require('moment');
moment.locale('es');



// Register Meetups

async function registerMeetup(meetup) {

    const id = meetup.idOrganizer

        const selectOrganizerProfileId = 'SELECT id from organizerprofiles  WHERE id_user = ?'
        const connection = await database.connection();
        const rows = await connection.execute(selectOrganizerProfileId, [id]);
        console.log(rows)
        rows[0].forEach(row => {
            const sqlInsertMeetup = 'INSERT INTO meetups (title,date,time,duration,location,category,meetup_principal_image,meetup_second_image,meetup_third_image,meetup_price,description,id_organizer_profile) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            connection.query(sqlInsertMeetup, [meetup.title, meetup.date,meetup.time, meetup.duration,meetup.location, meetup.category, meetup.meetupPrincipalImage
                , meetup.meetupSecondImage, meetup.meetupThirdImage, meetup.meetupPrice, meetup.description, row.id], function (error) {
                    if (error) {
                        const errorResponse = '{"error", "An error occurred inserting the meetup"}';
                        return errorResponse;
                    }
                })
            logger.info(`The meetup ${meetup.title} has been created`);
    
        })
    
    }



// Delete Meetup

async function deleteMeetup(id) {

    const sqlDeleteMeetup = "DELETE FROM meetups WHERE id = ? ";
    const connection = await database.connection();

    await connection.query(sqlDeleteMeetup, [id], function (error) {

        if (error) {
            const errorResponse = '{"error":An error occurred while deleting the meetup"}';
            logger.error(`Meetup ${id} has not been deleted`);
            return errorResponse
        }
        return [id];
    })

}



// List All Meetups

async function listAllMeetups() {

    const sql = 'SELECT * FROM meetups';
    const connection = await database.connection();
    const [rows] = await connection.execute(sql);

    return rows;
}
// List Organizer Meetups
async function listOrganizerMeetups(id) {


    
    console.log("Este es el id del organizador de listOrganizerMeetups" + id)
    console.log(id);

    const sql = 'SELECT M.id ,M.title, M.date, M.time, M.duration, M.location, M.category , M.meetup_principal_image, M.meetup_second_image, M.meetup_third_image,M.meetup_price, M.description FROM meetups M ,organizerprofiles OP ,users U WHERE M.id_organizer_profile = OP.id AND OP.id_user = U.id AND OP.id_user = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id]);
        console.log(rows[0]);
        let description;
        if (!rows[0]) {
            description = `The Organizer with this id  ${id} does not exist in the database`;
        } else {
            description = `Organizer Meetups displayed correctly ${id}`;
        }

        let responseDTO = {
            'code': 200,
            'description': description,
            'data': rows
        };

        return responseDTO;

    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }


}
// Filter meetups

async function filterMeetups(filter) {

    const category = filter.category;
    const price = parseInt(filter.price);
    const duration = parseInt(filter.duration);
    const location = filter.location;
    const date = filter.date;
    const dateyear = filter.dateyear;
    const timezone = filter.timezone;

   
  
    // Filter by Category and Location

    if ((location) && (category)) {
        const sqlFilterByLocationAndCategory = 'SELECT * FROM meetups WHERE location = ? AND category = ? ORDER BY category '
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterByLocationAndCategory, [location, category]);
        return rows;
    }



    // Filter by Duration And Category

    if ((duration) && (category)) {
        const sqlFilterByDurationAndCategory = 'SELECT * FROM meetups WHERE meetup_price = ? AND category = ? ORDER BY category '
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterByDurationAndCategory, [price, category]);
        return rows;
    }

    // Filter by Duration And Price

    if ((duration) && (price)) {

        const sqlFilterByDurationAndPrice = 'SELECT * FROM meetups WHERE meetup_price = ? AND duration = ? ORDER BY meetup_price';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterByDurationAndPrice, [price, duration]);
        return rows;
    }


    // Filter By Category

    if (category) {
        const sqlFilterCategory = 'SELECT * FROM meetups WHERE category = ?';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterCategory, [category]);
        return rows;
    }

    // Filter By Date

    if (date) {
        const convertDate = formatDateToDB(date);
        const sqlFilterDate = 'SELECT * FROM meetups WHERE date = ?';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterDate, [convertDate]);
        return rows;
    }

     // Filter By Year

     if (dateyear) {
        const sqlFilterDateYear = 'SELECT * FROM meetups M where YEAR(M.date)= ? ';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterDateYear, [dateyear]);
        return rows;
    }

    // Filter by Time Zone 
    //We can filter by time slot. If the meetup takes place before 3:00 p.m. or after 3:00 p.m. 
    //That is, if it is a morning or afternoon event

    if (timezone === 'morning') {
        const minorSign = "<";
        const sqlFilterMorningTime = `SELECT * FROM meetups M where HOUR(M.time) ${minorSign} + '15' `
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterMorningTime);
        return rows;
    }


    if (timezone === 'afternoon') {
        const greaterEqualSign = ">=";
        const sqlFilterAfternoonTime = `SELECT * FROM meetups M where HOUR(M.time) ${greaterEqualSign} + '15' `
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterAfternoonTime);
        return rows;
    }
  


    // Filter by City

    if (location) {
        const sqlFilterCity = 'SELECT * FROM meetups WHERE location = ?';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterCity, [location]);
        return rows;
    }


    // Filter By Price

    if (price) {
        const sqlFilterPrice = 'SELECT * FROM meetups WHERE meetup_price = ? ORDER BY meetup_price ';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterPrice, [price]);
        return rows;
    }

    // Filter By Duration
    if (duration) {
        const sqlFilterDuration = 'SELECT * FROM meetups WHERE duration = ? ORDER BY meetup_price ';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterDuration, [duration]);
        return rows;
    }

}

// Meetup Detail
async function detailMeetup(id) {

    const sql = 'SELECT * FROM meetups WHERE id = ?';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id]);
        let description;
        if (!rows[0]) {
            description = `The meetup ${id} does not exist in the database`;
        } else {
            description = `Meetup displayed correctly ${id}`;
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

// Update Meetup


async function updateMeetup(meetup, id_meetup) {
    
    const meetupDate  = formatDateToDB(meetup.date);
    const meetupDuration = parseInt(meetup.duration);
    const meetupPrice = parseInt(meetup.meetup_price);

        const sqlUpdateMeetup = 'UPDATE meetups SET title = ?, date = ?, time = ? , duration = ?, location = ? , category = ? , meetup_principal_image = ?, meetup_second_image = ?, meetup_third_image = ?, meetup_price = ?, description = ? WHERE id = ?';
        const connection = await database.connection();
        connection.query(sqlUpdateMeetup, [meetup.title, meetupDate, meetup.time, meetupDuration, meetup.location, meetup.category , meetup.meetup_principal_image, meetup.meetup_second_image, meetup.meetup_third_image, meetupPrice, meetup.description, id_meetup], function (error) {
            if (error) {
                const errorResponse = '{"error", "An error occurred while updating ${} the meetup"}';
                return errorResponse;
            }
        })
        logger.info(`The update of the meetup with id ${id_meetup} was successful`);
}

module.exports = {
    registerMeetup,
    deleteMeetup,
    listOrganizerMeetups,
    listAllMeetups,
    filterMeetups,
    detailMeetup,
    updateMeetup
}