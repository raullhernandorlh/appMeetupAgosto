<template>
  <div class="register">
    <p class="errorMessage" v-show="errorMessage">You have empty Fields</p>
    <form class="form">
      <div class="personal-information">
        <h2>Personal Information</h2>

          <p v-if="!$v.first_name.required"> Obligatory Field . It can be empty</p>
          <label>User </label>
          <input type="text" v-model="$v.first_name.$model" placeholder="Insert your Name" class="input" />

          <p v-if="!$v.last_name.required"> Obligatory Field . It can be empty</p>
          <label>Surname </label>
          <input type="text" v-model="$v.last_name.$model" placeholder="Insert your Surname" class="input" />
        <p>
          <label>Image </label>
          <input type="text" v-model="user_image" placeholder="Insert your User Image" class="input" />
        </p>
        
          <p v-if="!$v.email.email"> The Email is incorrect</p>
           <p v-if="!$v.email.required"> Obligatory Field . It can be empty</p>
           <label>Email </label>
          <input type="email" v-model="$v.email.$model" placeholder="Insert your Email" class="input"/>
          
         <p>
          <label>Password </label>
          <input type="text" v-model="pass" placeholder="Insert your password" class="input" />
        </p>
      
           <p v-if="!$v.phone.numeric"> A Phone must be composed only of numbers</p>
           <p v-if="!$v.phone.required"> Obligatory Field . It can be empty</p>
           <p v-if="!$v.phone.minLength"> The phone cannot have less than 9 numbers</p>
           <p v-if="!$v.phone.maxLength"> The phone cannot have more tham 9 numbers</p>
          <label>Phone </label>
          <input v-model="$v.phone.$model" placeholder="Insert your Phone" type="text" class="input" />
        
        <label>User Type</label>
        <p>
          <select required v-model="user_type" name="user_type" id="user_type" class="select">
            <option value="">Choose a type of User</option>
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>
        </p>
        <p>
          <label>A.Com </label>
          <input
            type="text"
            v-model="user_autonomous_community"
            placeholder="Insert your Automnomous Community"
            class="input"
          />
        </p>
        <p>
          <label>Province </label>
          <input type="text" v-model="user_province" placeholder="Insert Your Province" class="input" />
        </p>
        <p>
          <label>City </label>
          <input type="text" v-model="user_city" placeholder="Insert Your City" class="input" />
        </p>
      </div>
      <div class="organizer-information">
        <h2>Organizer Information (Optional)</h2>
        <p>
          <label>Name </label>
          <input
            v-model="organizer_name"
            type="text"
            placeholder="Insert Your Organizer Name"
            class="input"
          />
        </p>
        <p>
          <label>A.Com </label>
          <input type="text" v-model="organizer_autonomous_community" placeholder="Insert your Autonommous Community" class="input" />
        </p>
        <p>
          <label>Province </label>
          <input type="text" v-model="organizer_province" placeholder="Insert your Province" class="input" />
        </p>
        <p>
          <label>City </label>
          <input type="text" v-model="organizer_city" placeholder="Insert your City" class="input" />
        </p>
        <label>Description </label>
        <p>
          <textarea 
            type="textarea"
            v-model="description_text"
            placeholder="Insert a Description"
            class="textarea"
          />
        </p>
      </div>
        <button class="submit" @click="validatingData()"><fa-icon :icon="['fas','user-plus']" size="2x" /></button>
    </form>
  </div>
</template>


<script>

import { required,email,numeric,minLength,maxLength } from "vuelidate/lib/validators"
import axios from 'axios';
export default {
  name: "Register",
  data() {
    return {
      first_name: "",
      last_name: "",
      user_image: "",
      email: "",
      pass:"",
      phone: "",
      user_type: "",
      user_autonomous_community: "",
      user_province: "",
      user_city: "",
      organizer_name:"",
      organizer_autonomous_community: "",
      organizer_province:"",
      organizer_city:"",
      description_text: "",
      createUser: false,
      errorMessage: false,
    };
  },
  validations:{
    first_name:{required},
    last_name:{required},
    pass:{required},
    phone:{required,numeric,minLength:minLength(9),maxLength:maxLength(9)},
    email:{required,email}
  },
  methods: {
     validatingData() {
         console.log('Validating data in Validating Data Method');
      if (this.first_name === "" || this.last_name === "" || this.user_image === "" || this.email === "" || this.pass === ""
            || this.phone === "" || this.user_type === "" || this.user_autonomous_community  === "" || this.user_province === ""
            || this.user_city === "" 
      ) {
          console.log("Validating Data Error ")
        this.errorMessage = true;
        this.createClient = false;
      } else {
          console.log("New User Creating")
        this.createClient = true;
        this.addNewUser();
      }
    },
    addNewUser() {
        console.log("Adding User")
      if (this.createClient === true) {
        var self = this;
        axios
          .post("http://localhost:8888/users", {
            first_name: self.first_name,
            last_name: self.last_name,
            user_image: self.user_image,
            email: self.email,
            pass: self.pass,
            phone: self.phone,
            user_type: self.user_type,
            user_autonomous_community: self.user_autonomous_community,
            user_province: self.user_province,
            user_city: self.user_city,
            phone: self.phone,
            organizer_name: self.organizer_name,
            organizer_autonomous_community: self.organizer_autonomous_community,
            organizer_province: self.organizer_province,
            organizer_city: self.organizer_city,
            description_text: self.description_text,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          // (this.first_name = ""),
          // (this.last_name = ""),
          // (this.user_image = ""),
          // (this.email = ""),
          // (this.pass = "")
          // (this.phone = ""),
          // (this.user_type = ""),
          // (this.user_autonomous_community = ""),
          // (this.user_province = ""),
          // (this.user_city = ""),
          // (this.organizer_name = ""),
          // (this.organizer_autonomous_community = ""),
          // (this.organizer_province = ""),
          // (this.organizer_city = ""),
          // (this.description_text = "");
      } else {
        console.log("Suprem Error");
      }
    },
  },
};
</script>


<style scoped>


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

.personal-information{
    margin: 4rem 1rem 1rem 1rem;

}

.input{
    border:3px solid #02C39A;
    border-radius:20px;
}

label{
    margin-right:0.5rem;
}

.organizer-information{
    margin:1rem;
}

button{
  align-items: center;
  justify-content:center;
  margin-top:1rem;
  margin-bottom:2rem;
  border-radius:20px;
  width:10rem;
  height:2.5rem;
  color:black;
  text-decoration: none;
  border:3px solid white;
  background-color: #00a896;
}

button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  cursor:pointer;
}


</style>