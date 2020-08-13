import Vue from 'vue'
import VueRouter from 'vue-router'
import { isLoggedIn } from '../api/utils.js'
import { checkIsAdmin } from '../api/utils.js'
import { checkIsUser } from '../api/utils.js'
import { checkIsOrganizer } from '../api/utils.js'

Vue.use(VueRouter)

// Home habilitado para todos los usuarios

  const routes = [
    //Home
  {
    path: '/home',
    name: 'Home',
    component: () => import ('../views/Home.vue'),
  
  },

  // Login habilitado para todos los usuarios
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },

  // Habilitado para todos los usuarios 
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },

  // Habilitado solo para usuarios organizer ,register y admin

  {
    path: '/userprofile',
    name: 'UserProfile',
    component: () => import('../views/Profile/UserProfile.vue'),
},

// Organizer Profile
{
    path:'/organizerprofile',
    name: 'OrganizerProfile',
    component: () => import('../views/Profile/OrganizerProfile.vue')
},


// USER RESERVATIONS (ONLY FOR USERS)
  {
    path: '/userreservations',
    name: 'UserReservations',
     component: () => import('../views/Reservations/UserReservations.vue'),
     meta:{
       onlyUser:true,
       onlyOrganizer:false,
       onlyAdmin:false,
       allowAnon:false
     },
     beforeEnter: (to,from,next) =>{
      if(to.meta.onlyUser === true && !checkIsUser()){
        next({
          path:'/home',
          query: { redirect: to.fullPath }
        })
       }else{
          next()
        }
    }

  },

  // TODO Conseguir que el token del admin lleve "admin"

  //ADMINISTRATOR PAGE (ONLY FOR ADMINISTRATOR) 

  {
    path:'/administratorpanel',
    name:'AdministratorPanel',
    component:() => import('../views/AdministratorPanel.vue'),
    meta:{
      onlyAdmin: true,
      onlyOrganizer:false,
      onlyUser:false,
      onlyAnon:false
    },
    beforeEnter: (to,from,next) =>{
      if(to.meta.onyAdmin === true && !checkIsAdmin()){
        next({
          path:'/home',
          query: { redirect: to.fullPath }
        })
       }else{
          next()
        }
    }
  },


  // CREATE A MEETUP (Only for organizer)

  {
    path:'/createmeetup',
    name:'CreateAMeetup',
    component:() => import('../views/OrganizerMeetups/CreateMeetup.vue'),
    meta:{
      onlyOrganizer: true,
      onlyAnon:false,
      onlyAdmin:false,
      onlyUser:false
    },

    beforeEnter: (to,from,next) =>{
      if(to.meta.onlyOrganizer === true && !checkIsOrganizer()){
        next({
          path:'/home',
          query: { redirect: to.fullPath }
        })
       }else{
          next()
        }
    }
  },


  // ORGANIZER MEETUP PANEL (Only for Organizer)

  {
    path:'/organizermeetuppanel',
    name:'OrganizerMeetupPanel',
    component:() => import('../views/OrganizerMeetups/OrganizerMeetupPanel.vue'),
     meta:{
    onlyOrganizer: true,
    allowAnon: false,
    onlyAdmin:false,
    onlyUser:false,
    },

    beforeEnter: (to,from,next) =>{
      if(to.meta.onlyOrganizer === true && !checkIsOrganizer()){
        next({
          path:'/home',
          query: { redirect: to.fullPath }
        })
       }else{
          next()
        }
    }
  },




  // ORGANIZER RESERVATIONS (Only for organizers)
  {
    path: '/organizerReservations',
    name: 'OrganizerReservations',
     component: () => import('../views/Reservations/OrganizerReservations.vue'),
     meta:{
       onlyOrganizer:true,
       onlyUser:false,
       onlyAdmin:false,
       allowAnon:false
     },
     beforeEnter: (to,from,next) =>{
      if(to.meta.onlyOrganizer === true && !checkIsOrganizer()){
        next({
          path:'/home',
          query: { redirect: to.fullPath }
        })
       }else{
          next()
        }
    }

  },

  {
    path: '/payment/:id',
    name: 'Payment',
    component: () => import('../views/Payment.vue'),

  },
  // BUSCAR MEETUP (Accesible para todos incluso no registrados)

  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Filter/AdvancedSearch.vue'),

  },

  // ABOUT(Acceso para todos incluso no registrados)

  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),

  },
  

  //Error Page : Error 404
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue')
  },
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to,from,next) =>{
//   // Si la pagina no permite anonimos y no estas logeado
//   if(!to.meta.allowAnon && !isLoggedIn()){
//     next({
//       // A donde redirige 
//       path:'/',
//       query:{redirect:to.fullPath}
//     })
//   }else{
//     next()
//   }
// })

export default router
