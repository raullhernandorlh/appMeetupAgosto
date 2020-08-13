<template>
    <div class="login">
      <vue-headful title="Login"/>
        <form class="form">
            <h1>Login</h1>
            <input v-model="email" type="text" class="text" placeholder="Enter your email" />
            <input v-model="pass" type="password" class="text" placeholder="Enter your password" />
            <button @click="loginUser()"><fa-icon :icon="['fas','sign-in-alt']" size="2x" /></button>
        </form>
    </div>
</template>

<script>
import {emptyFieldsLogin} from "@/utilities/sweetalert-modals"
import axios from 'axios'
export default {
    name:"Login",
    data(){
      return{
        email:'',
        pass:''
      }
    },
     methods:{
      loginUser(){
        var self = this;
        if(this.email === '' || this.pass === ''){
        emptyFieldsLogin()
      }else{
        axios
          .post("http://localhost:8888/users/login", {
            email:self.email,
            pass:self.pass
        })
         .then(function (response) {
           console.log(response)
            let token = response.data.token;
            let role = response.data.role;
            let name = response.data.name;
            localStorage.setItem("AUTH_TOKEN_KEY",token)
            localStorage.setItem("TYPE_USER",role)
            localStorage.setItem("NAME",name)
          
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      setTimeout(() =>{
         this.$router.push('/home')
         location.reload()
      },1000);
    }
  }
}
</script>

<style scoped>

.login{
    display:flex;
    justify-content:center;
    background-image: url("https://images.unsplash.com/photo-1500771309643-de18b0aea901?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
    background-repeat: no-repeat;
    background-position:center;
    background-attachment: cover;
    margin-top:4%;
    
}
h1{
    letter-spacing: 0.3rem;
    margin-bottom:1rem;
    color:#00a896;
    
}
label{
    margin-bottom: 0.5rem;
    color:#00A896;
}

.form{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 10px outset #00a896;
    width: 60%;
    margin-top:2rem;
    margin-bottom:2rem;
    min-height : 50%;
    position: relative;
    background-color :#fff;
    margin-left:8%;
}


.text{
    margin-bottom:0.5rem;
    text-align:center;
    border-radius: 20rem;
    width:60%;
    height:2.5rem;
    border:0.2rem solid #02C39A;
    font-size:15px;
}

button {
  text-transform: uppercase;
  border: none;
  height:3rem;
  margin-top: 2rem;
  background: #00A896;
  color: #fff;
  padding: 10px;
  width: 60%;
  border-radius: 20rem;
  position: relative;
  box-sizing: border-box;
  transition: all 500ms ease; 
  border: 3px solid #fff;
  margin-bottom:1rem;
}

button:hover {
  animation: bounce 1s;
}


@keyframes bounce {
  0%, 20%, 60%, 100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  40% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
  }

  80% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
}

@media only screen and (min-width: 400px) { 

  .login{
    margin-top:10rem;
  }

}

@media only screen and (min-width: 600px) { 

  .login{
    margin-top:10rem;
  }

}



@media only screen and (min-width: 950px) { 

  
  #nav img{
    margin-top:-1.7rem;
    width:13rem;
    float:left;
  }
  
}


@media only screen and (min-width: 750px) { 

  
}





</style>