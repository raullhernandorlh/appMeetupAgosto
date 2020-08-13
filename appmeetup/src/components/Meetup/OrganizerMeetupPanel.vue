<template>
    <div class="meetups">
        <h2>Organizer Meetups</h2>
        <ul class="meetups-list">
            <li v-for="(meetup,index) in meetups" :key="meetup.id">
                <div class="meetup-data">
                    <p class="user-text"><span>Id </span>{{ meetup.id }}</p>
                    <p class="user-text"><span>Title </span>{{ meetup.title }}</p>
                    <p class="user-text"><span>Date</span>{{ meetup.date }}</p>
                    <p class="user-text"><span>Time </span>{{ meetup.time}}</p>
                    <p class="user-text"><span>Duration</span>{{ meetup.duration}}</p>
                    <p class="user-text"><span>Location</span>{{ meetup.location}}</p>
                    <p class="user-text"><span>Category</span>{{ meetup.category}}</p>
                    <img :scr="meetup.meetup_principal_image"/>
                <div claas="meetup_principal_image">
                    <img :scr="meetup.meetup_principal_image"/>
                </div>
                    <div class="buttons">
                        <button title="Delete Meetup" @click="sendMeetupIndex(index)"><fa-icon :icon="['fas','trash-alt']" size="2x" /></button>
                        <button title ="Show Comments Of Meetup" @click="sendMeetupShowCommentIndex(index)"><fa-icon :icon="['fas','comments']" size="2x" /></button>
                        <button  title = "Add Comment" @click="sendMeetupIndexForComment(index)"><fa-icon :icon="['fas','comment']" size="2x" /></button>
                        <button title = "Meetup Info" @click="sendDataMeetup(index)"><fa-icon :icon="['fas','info-circle']" size="2x" /></button>
                    </div>
                </div>
            </li>
        </ul>
        <button  title ="Return to Profile" class="return"><router-link :to='{name:"UserProfile"}'><fa-icon :icon="['fas','step-backward']" size="2x" /></router-link></button>
  </div>
</template>

<script>
export default {
    name:"OrganizerMeetupPanel",
    props:{
        meetups:Array
    },
    methods:{

        // Show Meetups Comment
        sendMeetupShowCommentIndex(index){
            let meetupShowCommentIndex = this.meetups[index].id;
            this.$emit('indexShowComment',meetupShowCommentIndex);
        },

        // Delete
        sendMeetupIndex(index){
            let meetupIndex = this.meetups[index].id;
            console.log(meetupIndex);
            this.$emit('index',meetupIndex)
        },

        // Add Organizer Comments In Meetups

         sendMeetupIndexForComment(index){
            let meetupIndexForComment = this.meetups[index].id;
            console.log("Ese es el id que se me envia desde el componente")
            console.log(meetupIndexForComment);
            this.$emit('indexForComment',meetupIndexForComment)
        },

        //Edit
        sendDataMeetup(index){
            let dataMeetup = this.meetups[index]
            this.$emit('data',dataMeetup)
        }
    }
    
}
</script>



<style scoped>

li{
    list-style:none;
}

.return a {
    color:#fff;
}
.return{
    position:absolute;
    top:85%;
    margin:1.5rem;
    right:0;
    width:8rem;
    height:2.5rem;
    border-radius:4rem;
    border:3px solid #fff;
    background-color: #00a896;
    cursor:pointer;
}

meetups-list{
    display:flex;
    width:90%;
    justify-content:space-around;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 5rem;
}

.meetup-data{
    border:8px outset #00a896;
    margin-left: 2rem;
    padding:1rem;
    margin-bottom:3rem;
    background-color:#fff;
    border-radius:5rem;
}


.meetups{
    margin-top:5rem;
}

.buttons button{
  width:8rem;
  height:2.5rem;
  border-radius:4rem;
  border:3px solid white;
  background-color: #00a896;
  cursor:pointer;
}

.buttons button{
  width:8rem;
  height:2.5rem;
  border-radius:4rem;
  border:3px solid #fff;
  background-color: #00a896;
  cursor:pointer;
}

.buttons button:hover{
  border:3px solid #00a896;
  background-color: #fff;
}

span{
    margin-right:1rem;
    text-transform: uppercase;
}



</style>