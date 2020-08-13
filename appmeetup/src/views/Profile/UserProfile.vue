<template>
  <div class="user-profile">
    <vue-headful title=" User Profile" />
    <userprofile :userprofile="userprofile" v-on:data="showUserProfileDetail" />
    <div v-show="seeModal" class="modal">
      <div class="modalBox">
        <h3>User Detail</h3>
        <span>Name</span><input type="text" class="text" v-model="first_name" />
        <span>Lastname</span><input type="text" class="text" v-model="last_name" />
        <span>Image</span><input type="text" class="text" v-model="user_image" />
        <span>Autonomous Community</span><input type="text" class="text" v-model="user_autonomous_community" />
        <span>Province</span><input type="text" class="text" v-model="user_province" />
        <span>City</span><input type="text" class="text" v-model="user_city" />
        <span>Phone</span><input type="text" class="text" v-model="phone" />
        <div class="modalbox-buttons">
          <button @click="seeModal =! seeModal"><fa-icon :icon="['fas','times']" size="2x"/></button>
          <button @click="updateProfile()"><fa-icon :icon="['fas','edit']" size="2x" /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sweetAlertUserProfileConfirmUpdate, sweetAlertUserProfileNotUpdateProfile} from '@/utilities/sweetalert-modals'
import { getAuthToken } from '@/api/utils.js'
import axios from "axios";
import userprofile from "@/components/Profile/UserProfile.vue";

export default {
  name: "UserProfile",
  components: {
    userprofile,
  },
  data() {
    return {
      userprofile:[],
      first_name: "",
      last_name: "",
      user_image: "",
      user_autonomous_community: "",
      user_province: "",
      user_city: "",
      phone: "",
      seeModal: false,
    }
  },

  methods: {
     getUserProfile() {
       var self = this;
        axios.get("http://localhost:8888/profiles/user/" ,{ 
             headers: {
              Authorization:getAuthToken()
            },  
          })
          .then(function (response) {
             self.userprofile = response.data.data;
             console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    showUserProfileDetail(dataUserProfile) {
      this.first_name = dataUserProfile.first_name;
      this.last_name = dataUserProfile.last_name;
      this.user_image = dataUserProfile.user_image;
      this.user_autonomous_community = dataUserProfile.user_autonomous_community;
      this.user_province = dataUserProfile.user_province;
      this.user_city = dataUserProfile.user_city;
      this.phone = dataUserProfile.phone;
      this.seeModal = true;
    },

    updateProfile(){
        axios.put("http://localhost:8888/profiles/user/",{ 

            first_name:this.first_name,
            last_name: this.last_name,
            user_image: this.user_image,
            user_autonomous_community: this.user_autonomous_community,
            user_province :this.user_province,
            user_city : this.user_city,
            phone :this.phone,
        },
        {headers:{
            Authorization:getAuthToken()
          },
        })
        .then(function(response) {
            sweetAlertUserProfileConfirmUpdate()
        })
        .catch(function(error){
        })
       sweetAlertUserProfileConfirmUpdate()  
    },
  },

  created() {
    this.getUserProfile();
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




</style>