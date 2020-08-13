<template>
  <div class="organizer-profile">
    <ul class="profile">
      <li v-for="(profile,index) in organizerprofile" :key="profile.id">
        <p class="user-text"><span>Organizer Name</span>{{ profile.organizer_name }}</p>
        <p class="user-text"> <span>Organizer Autonomous Community</span>{{ profile.organizer_autonomous_community }}</p>
        <p class="user-text"><span>Organizer Province</span>{{ profile.organizer_province}}</p>
        <p class="user-text"><span>Organizer City</span>{{ profile.organizer_city}}</p>
        <p class="user-text"><span>Description</span>{{ profile.description}}</p>
        <div class="buttons">
          <button @click="sendOrganizerProfileData(index)">Organizer Details</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "OrganizerProfile",
  props: {
     organizerprofile: Object,
  },
  methods: {
    sendOrganizerProfileData(index) {
      let dataOrganizerProfile = this.organizerprofile[index];
      this.$emit("data", dataOrganizerProfile);
    }
  }
}
</script>


<style scoped>
li {
  list-style: none;
}


.user-profile{
  display:flex;
  flex-direction: column;
  margin-left:-2rem;
}

.buttons button{
  width:10rem;
  height:2.5rem;
  border-radius:4rem;
  color:#fff;
  border:3px solid white;
  margin-right:0.5rem;
  background-color: #00a896;
  cursor:pointer;
}

button a{
  text-decoration:none;
  color:#fff;
}
button a:hover {
  color:#00a896;
  
}

button:hover{
  background-color:#fff;
  color:#00a896;
  border:3px solid #00a896 ;

}

.user-text{
  margin-bottom:1rem;
  
}
</style>