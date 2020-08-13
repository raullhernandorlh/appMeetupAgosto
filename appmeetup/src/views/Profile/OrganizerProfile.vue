<template>
  <div clas="organizer-profile">
    <vue-headful title=" Organizer Profile" />
    <h1>Organizer Profile</h1>
    <organizerprofile :organizerprofile="organizerprofile" v-on:data="showOrganizerProfileDetail" />
    <div v-show="seeModal" class="modal">
      <div class="modalBox">
        <h3>Organizer Detail</h3>
        <span>Organizer Name</span><input type="text" class="text" v-model="organizer_name" />
        <span>Organizer Autonommous Community</span><input type="text" class="text" v-model="organizer_autonomous_community" />
        <span>Organizer Province</span><input type="text" class="text" v-model="organizer_province" />
        <span>Organizer City</span><input type="text" class="text" v-model="organizer_city" />
        <span>Description</span><textarea type="text" class="textarea" v-model="description" />
        <div class="modalbox-buttons">
          <button @click="seeModal =! seeModal">Cancel</button>
          <button @click="updateMeetup()"><fa-icon :icon="['fas','edit']" size="2x" /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { sweetAlertUserProfileConfirmUpdate, sweetAlertUserProfileNotUpdateProfile} from '@/utilities/sweetalert-modals'
import { getAuthToken} from '@/api/utils.js'
import axios from "axios";
import organizerprofile from "@/components/Profile/OrganizerProfile.vue";

export default {
  name: "OrganizerProfile",
  components: {
    organizerprofile,
  },
  data() {
    return {
      organizerprofile:{},
      organizer_name: "",
      organizer_autonomous_community: "",
      organizer_province: "",
      organizer_city: "",
      description: "",
      seeModal: false,
    }
  },

  methods: {
     getOrganizerProfile() {
       var self = this
        axios.get("http://localhost:8888/profiles/organizer/" ,{ 
             headers: {
              Authorization:getAuthToken()
            },  
          })
          .then(function (response) {
             self.organizerprofile = response.data.data;
             console.log(response)
             
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    showOrganizerProfileDetail(dataOrganizerProfile) {
      this.organizer_name = dataOrganizerProfile.organizer_name;
      this.organizer_autonomous_community= dataOrganizerProfile.organizer_autonomous_community;
      this.organizer_province= dataOrganizerProfile.organizer_province;
      this.organizer_city = dataOrganizerProfile.organizer_city;
      this.description = dataOrganizerProfile.description;
      this.seeModal = true;
    },

    updateMeetup(){
        axios.put("http://localhost:8888/profiles/organizer/",{ 
            organizer_name:this.organizer_name,
            organizer_autonomous_community: this.organizer_autonomous_community,
            organizer_province: this.organizer_province,
            organizer_city: this.organizer_city,
            description: this.description,
        },
        {headers:{
            Authorization:getAuthToken()
          },
        })
        .then(function(response) {
          sweetAlertOrganizerProfileConfirmUpdate()
           
        })
        .catch(function(error){
          sweetAlertUserProfileNotUpdateProfile()
        })
    },
  },

  created() {
    this.getOrganizerProfile();
  }
}
</script>




<style  scoped>


h1{
  margin-top:8rem;
}

.modalbox-buttons{
  margin-top:1rem;
  display:flex;
  justify-content:center;
  align-items: center;
  
}

.modal{
  display:flex;
  justify-content:center;
  margin-bottom: 5rem;
}

.modalBox{
  display:flex;
  flex-direction:column;
  width:50%;
  justify-content:center;
}

span{
  margin-bottom: 1rem;
}

.text{
  border-radius:5rem;
  height:1.5rem;
  border: 3px solid #00a896;
  margin-bottom:0.5rem;
  text-align: center;
}

button{
  width:10rem;
  height:2.5rem;
  border-radius:4rem;
  color:#fff;
  border:3px solid white;
  margin-right:0.5rem;
  background-color: #00a896;
  cursor:pointer;
}

button:hover{
  background-color:#fff;
  color:#00a896;
  border:3px solid #00a896 ;

}

.textarea{
  height:3rem;
  resize:none;
}


</style>