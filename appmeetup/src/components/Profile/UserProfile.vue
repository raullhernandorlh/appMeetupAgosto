<template>
    <div class="user-profile">
        <ul class="profile">
            <li v-for="(profile,index) in userprofile" :key="profile.id">
              <article>
                  <div class = "organizer-card" v-show ="organizer">
                    <div class="organizer-details">
                      <h2>User Profile</h2>
                      <p class="user-text"><span> Name </span>{{ profile.first_name}}</p>
                      <p class="user-text"><span> Last Name </span>{{ profile.last_name}}</p>
                      <p class="user-img"><img :src="profile.user_image"></p>
                      <p class="user-text"><span> Phone </span>{{ profile.phone}}</p>
                      <button  title = "User Detail" @click="sendUserProfileData(index)"><fa-icon :icon="['fas','user-circle']" size="2x" /></button>
                       <button><router-link title = "View My Reservations" :to='{name:"OrganizerReservations"}'><fa-icon :icon="['fas','clipboard-list']" size="2x" /></router-link></button>
                    </div>
                    <div class="organizer-menu">
                      <h3 > ORGANIZER MENU </h3>
                      <button><router-link  title = "Organizer Detail" :to='{name:"OrganizerProfile"}'><fa-icon :icon="['fas','info-circle']" size="2x" /></router-link></button>
                      <button><router-link title="Create A Meetup" :to='{name:"CreateAMeetup"}'><fa-icon :icon="['fas','plus-square']" size="2x" /></router-link></button>
                      <button><router-link title = "List Organizer Meetups"  :to='{name:"OrganizerMeetupPanel"}'><fa-icon :icon="['fas','list']" size="2x" /></router-link></button>
                  </div>
                    </div>
                  <div v-show="user" >
                   <h2>User Profile</h2>
                      <p class="user-text"><span> Name </span>{{ profile.first_name}}</p>
                      <p class="user-text"><span> Last Name </span>{{ profile.last_name}}</p>
                      <p class="user-img"><img :src="profile.user_image"></p>
                      <p class="user-text"><span> Phone </span>{{ profile.phone}}</p>
                      <button @click="sendUserProfileData(index)">User Detail</button>
                       <button><router-link :to='{name:"UserReservations"}'>Reservations</router-link></button>
                  </div>
              </article>
            </li>
        </ul>
  </div>
</template>
<script>

import {checkIsOrganizer,checkIsUser} from "@/api/utils.js"

export default {

  name: "UserProfile",
  data(){
    return{
      user: false,
      organizer: false,
    }
  },
  props: {
     userprofile: Array,
  },
  methods: {
    sendUserProfileData(index) {
      let dataUserProfile = this.userprofile[index];
      this.$emit("data", dataUserProfile);
    },

    showOrganizerMenu() {
      this.organizer = checkIsOrganizer();
    },

    showUserMenu() {
      this.user = checkIsUser();
    }
  },

   created() {
    this.showOrganizerMenu();
    this.showUserMenu();
  }
}
</script>


<style scoped>
li {
  list-style: none;
}


article{
  
  margin-top:7rem;
 
}


.organizer-card{
  display:flex;
  justify-content:center
}



.organizer-menu{
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction: column;
  margin-bottom:4rem;
}



button{
  width:10rem;
  height:2.5rem;
  border-radius:4rem;
  color:#fff;
  border:3px solid white;
  margin-right:0.5rem;
  margin-bottom:2rem;
  background-color: #00a896;
  cursor:pointer;
}

button a {
  text-decoration:none;
  color:#fff;
}

button a:hover{
  color:#00a896;

}
button:hover{
  background-color:#fff;
  color:#00a896;
  border:3px solid #00a896 ;

}
img{
  margin-left:auto;
  margin-right:auto;
  width:15rem;
  height:15rem;
}
.user-text{
  margin-bottom:1rem;
}

ul.profile{
  margin-left:-2rem;
  margin-right:auto;
}


@media only screen and (min-width: 680px) {
  
  .article{
    display:flex;
  }

  
  
}


</style>