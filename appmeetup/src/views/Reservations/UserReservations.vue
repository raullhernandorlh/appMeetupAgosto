<template>
  <div class="user-reservations">
    <vue-headful title=" User Reservations Panel" />
    <h1 class="title">User Reservations </h1>
    <spinner v-show="loading_spinner"/>
    <userreservations :userreservations="userreservations" 
    v-on:data="showReservationsDetail" 
    v-on:indexForDelete="deleteReservations" 
    v-on:dataForValoration="makeAValoration" 
    v-on:indexForRating="avgRating" 
    v-show="list_reservations"/>
    <div v-show="seeModal" class="modal">
           <div class="modalBox">
                <h3>User reservations</h3>
                <span>Id</span><input type="text" class="text"  v-model="id" />
                <span>Meetup Title</span><input type="text" class="text"  v-model="title" />
                <p><img :src="meetup_principal_image"></p>
                <span>Description</span><textarea type="textarea" class="textarea"  v-model="description" readonly="readonly" />
                <span>Meetup Duration</span><input type="text" class="text"  v-model="duration" readonly="readonly" />
                <span>Meetup Location</span><input type="text" class="text"  v-model="location" readonly="readonly" />
                <span>Reservation Date</span><input type="text" class="text"  v-model="reservation_date" readonly="readonly" />
                <span>Reservation Price</span><input type="text" class="text"  v-model="reservation_price" readonly="readonly"/>
                
                <span>Paid Out</span><input type="text" class="text"  v-model="paid_out" />
            <div class="modalbox-buttons">
                <button @click="seeModal =! seeModal"><fa-icon :icon="['fas','times']" size="2x" /></button>
            </div>
            </div>
       </div>
       
  </div>
</template>

<script>

// Imports sweet alerts from class "utilities"
import { sweetAlertUserReservationsConfirmDelete, sweetAlertUserReservationsErrorDelete } from '@/utilities/sweetalert-modals'
import { getAuthToken} from '@/api/utils.js'
// Import de la libreria axios
import axios from "axios"



// Import del componente "UserReservations"
import  userreservations from "@/components/Reservation/UserReservation.vue"

// Importamos el componente " Spinner" para poder relacionarlo con la vista "Home"

import spinner from '@/components/Spinner.vue'

export default {

name:"UserReservations",

components:{
    userreservations,
    spinner
},

data(){
    return{
        userreservations:[],
        id:"",
        title:"",
        meetup_principal_image:"",
        description:"",
        duration:"",
        location:"",
        reservation_date:"",
        reservation_price:"",
        paid_out:"",
        loading_spinner:false,
        list_reservations:"false",
        seeModal:false,
    }
},

methods:{

     activatespinner(){
      setTimeout( () =>
        { 
          this.loading_spinner = false; 
          this.list_products = true;
        }, 1000);
    },

  //Metodo para actualizar Meetups

    // Metodo para BORRAR las reservas de la base de datos
    deleteReservations(reservationIndex){

       var self = this;
        //LLamada de axios para obtner los clientes de la BBDDD
        axios.delete("http://localhost:8888/reservations/" + reservationIndex,{
          headers:{
            Authorization: getAuthToken()
          }
        })
        .then(function(response){
          
        })
        .catch(function(error){
            sweetAlertReservationsErrorDelete()
        })

        sweetAlertReservationsConfirmDelete()
    },

    // Metodo para  MOSTRAR el detalle de las reservas

    showReservationsDetail(dataReservation){
        this.id = dataReservation.id;
        this.title = dataReservation.title;
        this.meetup_principal_image = dataReservation.meetup_principal_image;
        this.description = dataReservation.description;
        this.duration = dataReservation.duration;
        this.location = dataReservation.location;
        this.reservation_date = dataReservation.reservation_date;
        this.reservation_price = dataReservation.reservation_price;
        this.paid_out = dataReservation.paid_out;
         this.seeModal = true;

    },

    //Metodo para OBTENER las Reservas de la base de datos

    getUserReservations(){

      console.log("LLego al metodo para coger las reservas de usuario")
        var self = this;
        //LLamada de axios para obtner los clientes de la BBDDD
        axios.get("http://localhost:8888/reservations/userreservations/",  {
          headers:{
            Authorization: getAuthToken()
          }
        })
        .then(function(response){
          console.log(response)
            self.userreservations = response.data.data;
        })
        .catch(function(error){
            console.log(error);
        })
    },



     avgRating(ratingIndex) {
      axios.get("http://localhost:8888/ratings/avg/" +  ratingIndex, {
        })
        .then(function (response) {
          console.log(response);
          self.searchmeetups = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    makeAValoration(dataForValoration){
      const idMeetup = dataForValoration.id
      const meetupDate = dataForValoration.date
      axios.post("http://localhost:8888/ratings/" + idMeetup + dataforValoration.date,{
        })
        .then(function (response) {
          console.log(response);
          self.searchmeetups = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
},

},


created(){
    this.getUserReservations();
  },




// Hook "mounted". Utilizado para ejecutar el spinner una vez la app ya esta montada
mounted(){
  this.activatespinner()
}

}


</script>

<style scoped>

.user-reservations{
  display:flex;
  flex-direction:column;
  justify-content:center;
  margin-left:-5rem;
}

.title{
  margin-top:5rem;
  margin-bottom:1rem;
  margin-left:5rem;
}

img{
  width:auto;
  height:20rem;
  margin:1rem;
}

/* .administrator{
 
} */
.modal{
  display:flex;
  justify-content:center;
  margin-bottom:10rem;
}
span{
  margin-bottom:1rem;
}

.modalBox{
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
  width:50%;
  border:5px solid #00a896;
  border-radius: 5rem;;
  padding:2rem;
  background-color:#fff;
}

.text{
  text-align:center;
  align-items:center;
  height:1.5rem;
  border:3px solid #00a896;
  border-radius:20rem;
  margin-bottom:1rem;
  width:40%;
}

.textarea{

  text-align:justify;
  align-items:center;
  height:5rem;
  border:3px solid #00a896;
  margin-bottom:1rem;
  width:70%;
}



</style>

