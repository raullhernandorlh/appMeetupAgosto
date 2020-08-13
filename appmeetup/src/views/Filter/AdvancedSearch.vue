<template>
  <div clas="home">
     <vue headful = "Buscador de Meetups" /> 
    <h1>Advanced Search</h1>
    <searchcomponent :searchmeetups="searchmeetups" v-on:parametros="getAllMeetups" v-on:data="showMeetupsDetail" />
    <div v-show="seeModal" class="modal">
           <div class="modalBox">
             <span>Title</span><input type="text" class="text"  v-model="title" />
                <div class="images">
                  <p class="meetup-search-image"><img :src="meetup_principal_image"></p>
                  <p class="meetup-search-image"><img :src="meetup_second_image"></p>
                  <p class="meetup-search-image"><img :src="meetup_third_image"></p>
                </div>
                <div class="more-information">
                  <span>Date</span><input type="text" class="text"  v-model="date" />
                  <span>Time</span><input type="text" class="text"  v-model="time" />
                  <span>Duration</span><input type="text" class="text"  v-model="duration" />
                  <span>Location</span><input type="text" class="text"  v-model="location" />
                  <span>Category</span><input type="text" class="text"  v-model="category" />
                </div>
                <div class="buttons-in-search">  
                   <button title="Reserve your Meetup" @click="makeAReservation()" v-show="logged"><router-link :to='{name:"UserProfile"}'><fa-icon :icon="['fas','plus-square']" size="2x" /></router-link></button>
                   <button title = "View AVG rating " @click="viewRating()"><fa-icon :icon="['fas','star']" size="2x" /></button>
                  <button title = "Close the Detail" @click="seeModal =! seeModal"><fa-icon :icon="['fas','times']" size="2x" /></button>
                </div>
            </div>
       </div>
  </div>
</template>

<script>
import { isLoggedIn } from '@/api/utils'
import axios from "axios";
import {reservationsuccessmodal, reservationerrormodal} from '@/utilities/sweetalert-modals'
import searchcomponent from "@/components/Filter/Search.vue";
import { noSearchs } from "@/utilities/sweetalert-modals"
import { getAuthToken } from '../../api/utils';
export default {
  name: "AdvancedSearch",
  components: {
    searchcomponent,
  },
  data() {
    return {
        searchmeetups: [],
        id:"",
        title:"",
        date:"",
        time:"",
        duration:"",
        location:"",
        category:"",
        meetup_principal_image:"",
        meetup_second_image:"",
        meetup_third_image:"",
        meetup_price:"",
        description:"",
        list_meetups:"false",
        seeModal:false,
        logged:false
    };
  },

  methods: {
    getAllMeetups(info) {
      var self = this;
      //LLamada de axios para realizar una reserva
      axios
        .get("http://localhost:8888/meetups/filter", {
          params: {
            location: info.location,
            duration:info.duration,
            category: info.category,
            date: info.date,
            timezone : info.timezone,
            dateyear:info.dateyear,
            price: info.price,
          },
        })
        .then(function (response) {
          if(response.data == ""){
            noSearchs()
          }
          self.searchmeetups = response.data;
        })
        .catch(function (error) {
          noSearchs()
        });
    },

     showMeetupsDetail(dataMeetup){

        console.log("Estoy en show meetups detail")
        this.id = dataMeetup.id;
        this.title = dataMeetup.title
        this.date = dataMeetup.date;
        this.time = dataMeetup.time;
        this.duration = dataMeetup.duration;
        this.location = dataMeetup.location;
        this.category = dataMeetup.category;
        this.meetup_principal_image = dataMeetup.meetup_principal_image;
        this.meetup_second_image= dataMeetup.meetup_second_image;
        this.meetup_third_image = dataMeetup.meetup_third_image;
        this.meetup_price = dataMeetup.meetup_price;
        this.description = dataMeetup.description;
        this.seeModal = true;
        
    },

    makeAReservation() {
        axios.post("http://localhost:8888/reservations/" + this.id ,{ 
          },{
             headers: {
              Authorization: getAuthToken()
            },  

          })
          .then(function (response) {
            
            reservationsuccessmodal()
            
          })
          .catch(function (error) {
            reservationerrormodal()
          });
    },

    viewRating() {
      //LLamada de axios para realizar una reserva
      axios.get("http://localhost:8888/ratings/avg/" + this.id , {
        })
        .then(function (response) {
          console.log(response);
          self.searchmeetups = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getLogin(){
      this.logged = isLoggedIn()
    }
  },
  created(){
    this.getLogin()
  }

};
</script>

<style scoped>

.modal{
  display:flex;
  
  /* flex-direction: column; */
  justify-content:center;
  align-items:center;
}

.modalBox{
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  margin-bottom:6%;
  margin-top:-7%;
  width:80%;
}

span{
  margin:1rem;
  font-size: 25px;
}


.images{
  display:flex;
}

.images img{
  padding:1rem;
}

.more-information{
  display:flex;
  margin-top:0.5rem;
  margin-bottom:1rem;
}

img{
  width: 30rem;
  height:20rem;
  border:4px outset #00a896;
  margin-right:2rem;
}

button {
  border-radius:20px; 
  width:10rem;
  height:2.5rem;
  margin-right:0.5rem;
  color:#fff;
  text-decoration: none;
  border:3px solid white;
  background-color: #00a896;
}

button a {
  color:#fff;
}

.modalbox-buttons{
  margin-top:1.5rem;
}
button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  color:#00a896;
  font-weight: bold;
  cursor:pointer;
}

.text{
  width:50%;
  border-radius:20rem;
  height:1.5rem;
  border:3px solid #00a896;
  text-align:center;
  font-size:17px;
}

.buttons-in-search button{
  margin-right:2rem;
}

li {
  list-style: none;
}

h1 {
  padding-top: 2rem;
}


</style>



