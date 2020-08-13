<template>
  <div class="organizer-meetup">
    <vue-headful title=" Organizer Meetup Panel" />
    <!-- <spinner v-show="loading_spinner"/> -->
    <organizermeetuppanel :meetups="meetups" 
    v-on:data="showMeetupsDetail" 
    v-on:index="deleteMeetups" 
    v-on:indexShowComment="showMeetupComments"
    v-on:indexForComment="addMeetupComments"
    v-show="list_meetups"/>
    <div v-show="seeModal" class="modal" >
      <!-- Modal para detalle y actualizar -->
           <div class="modalBox">

                <h3>Meetups Detail</h3>
                <span class="title">Id:</span><input type="text" class="text"  v-model="id" />
                <span>Title</span><input type="text" class="text"  v-model="title" />
                <span>Date</span><input type="text" class="text"  v-model="date" />
                <span>Time</span><input type="text" class="text"  v-model="time" />
                <span>Duration</span><input type="text" class="text"  v-model="duration" />
                <span>Location</span><input type="text" class="text"  v-model="location" />
                <span>Category</span><input type="text" class="text"  v-model="category" />
                <span>Meetup Principal Image</span><input type="text" class="text"  v-model="meetup_principal_image" />
                <span>Meetup Second Image</span><input type="text" class="text"  v-model="meetup_second_image" />
                <span>Meetup Third Image</span><input type="text" class="text"  v-model="meetup_third_image" />
                <span>Meetup Price</span><input type="text" class="text"  v-model="meetup_price" />
                <span>Description</span><input type="text" class="text"  v-model="description" /> 
              <div class="modalbox-buttons">
                <button @click="seeModal =! seeModal">Cancel</button>
                <button class="button" @click="updateMeetup()"><fa-icon :icon="['fas','edit']" size="2x" /></button>
            </div>
          </div>
          
    </div>
      
       <!-- Modal para Comentario -->
         <div v-show="seeModalComment" class="modalComment">
            <div class="commentModalBox">
              <h3>Comments and Updates</h3>
              <textarea class="textarea" type ="textarea" v-model="comment" placeholder="Insert a comment or update to Meetup" />
            </div>
            <div class = "button-comment">
              <button class="button" @click="seeModalComment =! seeModalComment">Cancel</button>
              <button class="button" @click="addMeetupComments()"><fa-icon :icon="['fas','comment']" size="2x" /></button>
            </div>
        </div>

        <!--Modal para ver los comentarios de los meetups -->
          <div v-show="seeModalMeetupsComments" class="showModalComment">
            <div class="showCommentsModalBox">
              <h3>MeetupComments</h3>
              <ul class="comments-list">
                <li v-for="comment in comments" :key="comment.id">
                    <div class="data-comment">
                        <p class="client-text"><span>Comment</span>{{ comment.comment }}</p>
                        <p class="client-text"><span>Date</span>{{ comment.date }}</p>
                        <p class="client-text"><span>Time</span>{{ comment.time }}</p>
                    </div>
                </li>
              </ul>
            </div>
            <div class = "button-comment">
              <button title="Close Comment Window" class="button" @click="seeModalMeetupsComments =! seeModalMeetupsComments"><fa-icon :icon="['fas','times']" size="2x" /></button>
            </div>
        </div>
  </div>
</template>

<script>

// Imports sweet alerts from class "utilities"
import { sweetAlertMeetupConfirmUpdate,  sweetAlertMeetupNotUpdateMeetup, commentsuccessmodal } from '@/utilities/sweetalert-modals'
import { getAuthToken} from '@/api/utils.js'
// Import de la libreria axios
import axios from "axios"

import  organizermeetuppanel from "@/components/Meetup/OrganizerMeetupPanel.vue"

// Importamos el componente " Spinner" para poder relacionarlo con la vista "Home"

import spinner from '@/components/Spinner.vue'

import moment from 'moment'


export default {

name:"OrganizerMeetupPanel",

components:{
    organizermeetuppanel,
    spinner
},

data(){
    return{
        meetups:[],
        comments:[],
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
        comment:"",
        list_meetups:"false",
        seeModal:false,
        seeModalComment :false,
        seeModalMeetupsComments:false
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

  updateMeetup(){
        axios.put("http://localhost:8888/meetups/" + this.id , {
            title: this.title,
            date: this.date,
            time: this.time,
            duration: this.duration,
            location: this.location,
            category: this.category,
            meetup_principal_image : this.meetup_principal_image,
            meetup_second_image :this.meetup_second_image,
            meetup_third_image : this.meetup_third_image,
            meetup_price: this.meetup_price,
            description: this.description
           
        },{
          headers:{
            Authorization:getAuthToken()
          },
        })
        .then(function(response) {
            
        })
        .catch(function(error){
        })
        sweetAlertMeetupConfirmUpdate();
    },


    //Show Meetups Comments

    showMeetupComments(meetupShowCommentIndex){
      var self=this;
        const id = meetupShowCommentIndex;
        //LLamada de axios para obtner los clientes de la BBDDD
        axios.get("http://localhost:8888/comments/" + id,{
          headers:{
            Authorization: getAuthToken()
          }

        })
        .then(function(response){
          console.log(response)
            self.comments = response.data.data;
        })
        .catch(function(error){
            console.log(error);
        })
        this.seeModalMeetupsComments = true;
    },

    // Metodo para agregar comentarios

    addMeetupComments(meetupIndexForComment){
        this.seeModalComment=true
        const todayDate = moment().format("YYYY-MM-DD");
        const todayTime = moment().format("hh:mm:ss");
        const idMeetup = meetupIndexForComment;

          
      
          axios.post("http://localhost:8888/comments/" + idMeetup ,{
            comment:this.comment,
            date:todayDate,
            time:todayTime
          }
          ,{
          headers:{
            Authorization:getAuthToken()
          }
          })
          .then(function (response) {

            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      

    // Metodo para BORRAR los Meetups de la base de datos
    deleteMeetups(meetupIndex){

       var self = this;
        //LLamada de axios para obtner los clientes de la BBDDD
        axios.delete("http://localhost:8888/meetups/" + meetupIndex,{
          headers:{
            Authorization: getAuthToken()
          }

        })
        .then(function(response){
          console.log(response)
        })
        .catch(function(error){
            console.log(error);
        })
    },

    // Metodo para  MOSTRAR de los datos de los Meetups del Organizador

    showMeetupsDetail(dataMeetup){
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

    //Metodo para OBTENER los Meetupsde la base de datos

    getOrganizerMeetups(){
        var self = this;
        //LLamada de axios para obtner los clientes de la BBDDD
        axios.get("http://localhost:8888/meetups/listmeetups/",{
          headers:{
            Authorization: getAuthToken()
          }

        })
        .then(function(response){
          console.log(response)
            self.meetups = response.data.data;
        })
        .catch(function(error){
            console.log(error);
        })
    },


    
    
    },
created() {
    this.getOrganizerMeetups();
},

// Hook "mounted". Utilizado para ejecutar el spinner una vez la app ya esta montada
mounted(){
  this.activatespinner()
}

}
</script>

<style scoped>

.button{
  align-items: center;
  justify-content:center;
  margin:1rem;
  border-radius:20px;
  width:10rem;
  height:2rem;
  color:#fff;
  text-decoration: none;
  border:3px solid white;
  background-color: #00a896;
  margin-top:4rem;
}



.button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  color:#00a896;
  cursor:pointer;
}

/* Modal Update */
.modal{
   display:flex;
   flex-direction: column;
   justify-content: center;
   position: absolute;
   width:30%;
   height:20%;
   left: 40%;
   top: 50%;
   background-color:rgb(255, 255, 255,0.9);
   border-radius:3rem;
}

/* Modal Comment */

.modalComment{
   display:flex;
   flex-direction: column;
   justify-content: center;
   position: absolute;
   width:40%;
   height:20%;
   left: 32%;
   top: 50%;
   background-color:rgb(255, 255, 255,0.85);
  border:5px outset #00a896 ;
}




/* Modal for Update */
 .modalBox{
  display:flex;
  flex-direction: column;
  background-color:rgb(255, 255, 255,0.9);
  border:5px outset #00a896 ;
  border-radius:3rem;
  margin-bottom:5rem;
  align-items:center;
} 

.text{
  text-align:center;
  border:3px solid #00a896 ;
  margin:0.8rem;
  height:1.5rem;
  border-radius:8rem;
  width:60%;
}

.textarea{
  height:4rem;
  border:5px outset #00a896 ;
  width:50%;

}

div.data-comment{
  display:flex;
  width:10rem;
  height:4rem;
 
}
span{
  margin:0.7rem
}


 /* Modal For All Comments */

 .showModalComment{
   display:flex;
   flex-direction: column;
   justify-content: center;
   position: absolute;
   width:40%;
   height:80%;
   left: 32%;
   top: 5%;
   background-color:rgb(255, 255, 255,0.85);
  border:5px outset #00a896 ;
}


.commentModalBox.data-comment{

  border:3px solid green;
}

div.showComentsModalBox{
  height:30%;
}

ul.comments-list{
  list-style: none;
  display:flex;
  height:15rem;
  flex-direction: column;
 
}

p.client-text{
  margin-left:0.6rem
}




</style>

