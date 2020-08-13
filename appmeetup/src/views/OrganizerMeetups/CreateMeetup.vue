<template>
  <div class="register">
    <p class="errorMessage" v-show="errorMessage">You have empty fields</p>
    <form class="form">
      <div class="meetup-information">
        <h2>Create a Meetup</h2>
        
          <p v-if="!$v.title.required"> Obligatory Field . It can be empty</p>
          <label>User </label>
          <input type="text" v-model="$v.title.$model" placeholder="Insert a title for meetup" class="input" />
        
         <div class="dateandtime">
            <p>
                <label>Date</label>
                <input type="date" v-model="date"  class="date" />
            </p>
            <p>
                <label>Time</label>
                <input type="time" v-model="time"  class="time" />
            </p>
        </div>
        
           <p v-if="!$v.duration.numeric"> A Meetup Price must be composed only of numbers</p> 
          <p v-if="!$v.duration.required"> Obligatory Field . It can be empty</p>
          <label>Duration</label>
          <input type="text" v-model="$v.duration.$model" placeholder="In hours" class="input" />
        
         
           <p v-if="!$v.location.required"> Obligatory Field . It can be empty</p>
          <label>Location (City) </label>
          <input type="text" v-model="$v.location.$model" placeholder="Insert a City for Meetup" class="input" />
        
       
          <p v-if="!$v.category.required"> Obligatory Field . It can be empty</p>
          <label>Category</label>
          <select required v-model="$v.category.$model" name="category" id="category" class="select">
            <option value="">Choose a Category</option>
            <option value="natureandadventure">Nature And Adventure</option>
            <option value="sociallife">Social Life</option>
            <option value="languages">Languages</option>
            <option value="beliefs">Beliefs</option>
            <option value="sportsandphysicalcondition">Sports and Physical Condition</option>
            <option value="careersandbusiness">Careers and Business</option>
            <option value="travels">Travels</option>
          </select> 
        
        
          <p v-if="!$v.meetupPrincipalImage.required"> Obligatory Field . It can be empty</p>
          <label>Meetup Principal Image</label>
          <input v-model="$v.meetupPrincipalImage.$model" placeholder="Insert your Principal Image" type="text" class="input" />
        
            <p v-if="!$v.meetupSecondImage.required"> Obligatory Field . It can be empty</p>
          <label>Meetup Second Image</label>
          <input v-model="$v.meetupSecondImage.$model" placeholder="Insert Meetup Image 2" type="text" class="input" />
        
         
           <p v-if="!$v.meetupThirdImage.required"> Obligatory Field . It can be empty</p>
          <label>Meetup Third Image</label>
          <input v-model="$v.meetupThirdImage.$model" placeholder="Insert Meetup Image 3" type="text" class="input" />
                 
          <p v-if="!$v.meetupPrice.numeric"> A Meetup Price must be composed only of numbers</p> 
           <p v-if="!$v.meetupPrice.required"> Obligatory Field . It can be empty</p>
          <label>Meetup Price</label>
          <input v-model="$v.meetupPrice.$model" placeholder="Use '0' in case it is free" type="text" class="input" />
         
         
            <p v-if="!$v.description.required"> Obligatory Field . It can be empty</p>
          <label>Description</label>
          <input v-model="$v.description.$model" placeholder="Insert a description for Meetup" type="textarea" class="textarea" />
      
       </div> 
       <div class="create_meetups_buttons">
          <button title ="add-meetup" class="submit" @click="createAMeetup()"><fa-icon :icon="['fas','folder-plus']" size="2x" /></button>
          <button title="Return to Profile" class="submit"><router-link :to='{name:"UserProfile"}'><fa-icon :icon="['fas','step-backward']" size="2x" /></router-link></button>
        </div>
    </form>
  </div>
</template>


<script>
import { required , numeric } from "vuelidate/lib/validators"
import { getAuthToken } from '@/api/utils.js'
import axios from 'axios';

export default {
  name: "CreateMeetup",
  data() {
    return {
      title: "",
      date: "",
      time: "",
      duration: "",
      location:"",
      category: "",
      meetupPrincipalImage: "",
      meetupSecondImage: "",
      meetupThirdImage: "",
      meetupPrice: "",
      description: "",
      createMeetup: false,
      errorMessage: false,
    };
  },
  validations:{
      title:{required},
      duration:{required,numeric},
      location:{required},
      category:{required},
      meetupPrincipalImage:{required},
      meetupSecondImage:{required},
      meetupThirdImage:{required},
      meetupPrice:{required,numeric},
      description:{required}
  },
  methods: {
     createAMeetup() {
        this.createMeetup = true;
        this.addNewMeetup();
    },

    
    addNewMeetup() {
        console.log("Adding Meetup")
      if (this.createMeetup === true) {
        var self = this;
        axios
          .post("http://localhost:8888/meetups/", { 
            title: self.title,
            date: self.date,
            time: self.time,
            duration: self.duration,
            location: self.location,
            category: self.category,
            meetupPrincipalImage: self.meetupPrincipalImage,
            meetupSecondImage: self.meetupSecondImage,
            meetupThirdImage: self.meetupThirdImage,
            meetupPrice: self.meetupPrice,
            description: self.description,
          },{
             headers: {
              Authorization: getAuthToken()
            },  

          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          (this.title = "");
          (this.date = "");
          (this.time = "");
          (this.duration = "");
          (this.location = "");
          (this.meetupPrincipalImage = "");
          (this.meetupSecondImage = "");
          (this.meetupThirdImage = "");
          (this.meetupPrice = "");
          (this.description = "");
      } else {
        console.log("Suprem Error");
      }
    },
  },
};
</script>


<style scoped>



.dateandtime{
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    
}


.input{
    margin-bottom:0.5rem;
    border-radius: 20rem;
    width:60%;
    height:1.5rem;
    border:0.2rem solid #02C39A;
    font-size:15px;
}

.textarea{
  width:80%;
  height:5rem;
  resize:none;
}

.select{
  width:50%;
  height:1.5rem;
  background-color: #fff;
  color:#555a59;;
  border-color: 0.2rem solid #555a59;
  border-radius:20px;
}

.register{
  margin-bottom:5rem;
}
 h2{
    margin-top:3rem;
}

.register{
    display:flex;
    justify-content:center;
    flex-direction: column;
    margin-bottom:8rem;
}

.meetup-information{
    margin: 4rem 1rem 1rem 1rem;

}

.input{
    border:3px solid #02C39A;
    border-radius:20px;
}

label{
    margin-right:2rem;
}

button{
  align-items: center;
  justify-content:center;
  margin-top:1rem;
  margin-bottom:2rem;
  border-radius:20px;
  width:10rem;
  height:2.5rem;
  color:#fff;
  text-decoration: none;
  border:3px solid white;
  background-color: #00a896;
}

button a{
  color:#fff;
}

button a:hover{
  color:#00a896
}

button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  color:#00a896;
  cursor:pointer;
}

.create_meetups_buttons{
  display:flex;
  justify-content:space-around;
}


</style>