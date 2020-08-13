<template>
  <div class="search">
    <vue-headful title=" Search Meetup" />
    <div class="searchform">
      <!-- Input para la fecha . Se selecciona del calendario -->
      <input type="date" v-model="date"  class="date"/>
      <!-- Input para buscar por fecha -->
      <!-- Input para la localizacion . Se mete a mano . Ejemplo Bilbao -->
      <input type="text" placeholder="Seach By Location" v-model="location" class="text" />
      <input type="text" placeholder="Seach By Price" v-model="price" class="text" />
      <!-- Se hace un  select para buscar por una de las categorias pre guardadas -->
      <select type="select" v-model="category" name="category"  class="select">
        <option  selected value="">Choose a Category</option>
        <option value="natureandadventure">Nature And Adventure</option>
        <option value="sociallife">Social Life</option>
        <option value="languages">Languages</option>
        <option value="beliefs">Beliefs</option>
        <option value="sportsandphysicalcondition">Sports and Physical Condition</option>
        <option value="careersandbusiness">Careers and Business</option>
        <option value="travels">Travels</option>
      </select>
      <!-- Se hace un select para filtrar por año -->
      <select type="select" v-model="dateyear" name="dateyear"  class="select">
        <option selected value="">Choose a Year</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>

      <!-- Se hace un select para filtrar por franja horaria "Mañana" o "Tarde" -->

       <select  type="select" v-model="timezone" name="timezone"  class="select">
        <option selected value="">Choose a Time Zone</option>
        <option value="morning">MORNING</option>
        <option value="afternoon">AFTERNOON</option>
      </select>
    </div> 

    <button title ="Search Your Meetup" @click="enviarInformacion()"><fa-icon :icon="['fas','search-plus']" size="2x" /></button>

    <div class="meetup-information"> 
     <ul class="meetups-list">
      <li v-for="(meetup,index) in searchmeetups" :key="meetup.id">
        <div class="meetups-data">
          <p class="meetup-search-text"><span>Id</span>{{ meetup.id }}</p>
          <p class="meetup-search-text"><span>Title</span>{{ meetup.title }}</p>
          <p class="meetup-search-image"><img :src="meetup.meetup_principal_image"></p>
          <p class="meetup-search-text"><span>Date</span>{{ meetup.date }}</p>
          <p class="meetup-search-text"><span>Time</span>{{ meetup.time}}</p>
          <p class="meetup-search-text"><span>Location</span>{{ meetup.location}}</p>
          <p class="meetup-search-text"><span>Category</span>{{ meetup.category}}</p>
          <div class="button-submit">
            <button @click="sendDataMeetup(index)"><fa-icon :icon="['fas','step-backward']" size="2x"/></button>
          </div>
        </div>
      </li>
    </ul>
  </div>

  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    searchmeetups: Array,
  },
  data() {
    return {
      info : {
        date: '',
        category: '',
        location:'',
        price:'',
        dateyear:'',
        timezone:'',
      },
      date: "",
      time:"",
      category: "",
      location: "",
      price:"",
      dateyear:"",
      timezone:""
    };
  },

  methods:{
    enviarInformacion(){
      this.info.date = this.date;
      this.info.location = this.location;
      this.info.category = this.category;
      this.info.price = this.price;
      this.info.dateyear = this.dateyear
      this.info.timezone = this.timezone
      this.$emit ('parametros',this.info)
    },

     sendDataMeetup(index){
      let dataMeetup = this.searchmeetups[index]
      this.$emit('data',dataMeetup)
    }

  }
 
};
</script>

<style scoped>

.meetup-information{
  margin-bottom:10rem;
}

button {

  border-radius:20px; 
  width:10rem;
  height:2.5rem;
  color:#fff;
  text-decoration: none;
  border:3px solid #fff;
  background-color: #00a896;
}

button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  cursor:pointer;
}

.searchform{
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  align-items: center;
  margin:3rem;
}

.div.search{
  display:flex;
  flex-direction: column;
  align-items: baseline;
}
div.meetups-data{
  margin-left:2rem;
  align-items: center;
  background-color: #fff;
  border-radius:2rem;
  border:3px solid #00a896;
  width:80%;
}

li{
  width:50%;
}

.button-submit{
  margin:1rem;
}
img{
  width:8rem;
  height:8rem;
}

span{
  margin-right:1rem;
}
.text{
  margin-bottom: 1rem;
  width:70%;

}


.select{
  margin-bottom: 2rem;
  width:40%;
}

li{
  list-style: none;
  margin-bottom:2rem;
}

/* Meetups List */

ul.meetups-list{
  display:flex;
  width:100%;
}

/* Calendar class */

input.date{
  width:40%;
  color:green;
  height:2rem;
  margin-bottom:1rem;
}

/* Input to search */

.text{
  width:40%;
  height:1.5rem;
  color:green;
  border-radius:5rem;
  border-color:5px solid  #00a896;
  text-align: center;
  margin:2rem;
 
}
</style>