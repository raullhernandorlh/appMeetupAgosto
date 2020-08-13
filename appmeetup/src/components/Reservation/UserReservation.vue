<template>
    <div class="reservations">
        <ul class="reservation-list">
            <li v-for="(reservation,index) in userreservations" :key="reservation.id">
                <div class="users-data">

                    <h3>Meetup Resume </h3>
                    
                    <p class="user-text"><span> Meetup Title</span>{{ reservation.title}}</p>
                    <p class="user-text"><span> Meetup Date</span>{{ reservation.date}}</p>
                    <p class="user-text"><span> Meetup Hour</span>{{ reservation.time}}</p>

                    <h3>Reservation Resume</h3>
                    <p class="user-text"><span> Reservation Date</span>{{ reservation.reservation_date}}</p>
                    <p class="user-text"><span>Reservation Price</span>{{ reservation.reservation_price}}</p>
                    <p  :class="{red: reservation.paid_out === notPay, green: reservation.paid_out  != notPay}"><span>Paid Out</span>{{ reservation.paid_out}}</p>
                    <div class="buttons"> 
                        <button title="Delete Reservation" @click="sendReservationIndex(index)"><fa-icon :icon="['fas','trash-alt']" size="2x" /></button>
                        <button title=" Rate The Meetup" @click="sendDataForValoration(index)"><fa-icon :icon="['fas','star']" size="2x" /></button>
                        <button title="Avg Rating" @click="sendRatingIndex(index)"><fa-icon :icon="['fas','smile']" size="2x" /></button>
                        <button title ="Meetup Information" @click="sendDataReservation(index)"><fa-icon :icon="['fas','info-circle']" size="2x" /></button>
                        <router-link :to="{name:'Payment',params: {id:reservation.id }}">
                    
                        <button  title="Buy Meetup"><fa-icon :icon="['fas','shopping-cart']" size="2x" /></button>
                        </router-link>
                  </div> 
                </div>
            </li>
        </ul>


  </div>
</template>

<script>
export default {
    name:"UserReservation",
    data(){
        return{
            paid_out:"",
            notPay :0,
            id:null
        }
    },
    props:{
        userreservations:Array
         
    },
    methods:{


        sendReservationIndex(index){
            let reservationIndex = this.userreservations[index].id;
            this.$emit('indexForDelete',reservationIndex)
        },

          sendRatingIndex(index){
            let ratingIndex = this.userreservations[index].id;
            this.$emit('indexForRating',ratingIndex)
        },
        sendDataReservation(index){
            let dataReservation = this.userreservations[index]
            this.$emit('data',dataReservation)
        },

        sendDataForValoration(index){
            let dataForValoration = this.userreservations[index]
            this.$emit('dataForValoration',dataForValoration)
        }
    }
    
}
</script>



<style scoped>



li{
    list-style:none;
}

.reservations{
    display:flex;
    align-items: center;
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
    background-color:#fff;
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


.red{color: red;}
.green{color:yellowgreen;}



</style>