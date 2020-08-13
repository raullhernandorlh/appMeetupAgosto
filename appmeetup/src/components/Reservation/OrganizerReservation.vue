<template>
    <div class="reservations">
        <h2>Organizer Reservations</h2>
        <ul class="reservation-list">
            <li v-for="(reservation,index) in organizerreservations" :key="reservation.id">
                <h3>Meetup Resume </h3>
                    <p class="user-text"><span> Meetup Title</span>{{ reservation.title}}</p>
                    <p class="user-text"><span> Meetup Date</span>{{ reservation.date}}</p>
                    <p class="user-text"><span> Meetup Hour</span>{{ reservation.time}}</p>

                    <h3>Reservation Resume</h3>
                    <p class="user-text"><span> Reservation Date</span>{{ reservation.reservation_date}}</p>
                    <p class="user-text"><span>Reservation Price</span>{{ reservation.reservation_price}}</p>
                     <p :class="{red: reservation.reservation_price  > notPay, green: reservation.reservation_price == notPay}"><span>Paid Out</span>{{ reservation.paid_out}}</p>
                    <div class="buttons">
                        <button title="Delete a Meeup" @click="sendReservationIndex(index)"><fa-icon :icon="['fas','trash-alt']" size="2x" /></button>
                        <button title = "Meetup Info" @click="sendDataReservation(index)"><fa-icon :icon="['fas','info-circle']" size="2x" /></button>
                         <button title= "Meetup Pay"><router-link :to='{name:"Payment"}'><fa-icon :icon="['fas','shopping-cart']" size="2x" /></router-link></button>
                    </div>
            </li>
            <button title="Return to Organizer Menu" class="return"><router-link :to='{name:"UserProfile"}'><fa-icon :icon="['fas','step-backward']" size="2x" /></router-link></button>
        </ul>
        
  </div>
</template>

<script>
export default {
    name:"OrganizerReservation",
    props:{
        organizerreservations: Array
    },
    methods:{
        sendReservationIndex(index){
            let reservationIndex = this.organizerreservations[index].id;
            this.$emit('index',reservationIndex)
        },
        sendDataReservation(index){
            let dataReservation = this.organizerreservations[index]
            this.$emit('data',dataReservation)
        }
    }
    
}
</script>



<style scoped>

li{
    list-style:none;
    background-color: #fff;
    border: 5px solid #00a896;
    border-radius:2rem; 
    width:40%;
    margin-bottom:3rem;
}

.reservation-list{
    display:flex;
    width:90%;
    justify-content:space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 5rem;
}

.users-data{
    border:8px outset #00a896;
    border-radius:5rem;
    margin-left: 2rem;
    padding:1rem;
    margin-bottom:3rem;
}

button{
    width: 7rem;
    height:2.5rem;
    margin:0.5rem;
    border-radius:20rem;
    border: 3px solid #fff;
    background-color:#00a896;
    color:white;
    cursor:pointer;
}

button:hover{
    border: 3px solid #00a896;
    background-color:#fff;
    color:#00a896;

}

.return{
    
   position:absolute;
   right:0;
   top:85%;
}

button a{
    text-decoration:none;
    color:#fff;
}

button a:hover{
    color:#00a896
}

.red{color: red;}
.green{color:yellowgreen;}

</style>