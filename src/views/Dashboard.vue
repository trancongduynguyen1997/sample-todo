<template>
  <div>
      <h1>Dashboard</h1>
      <template v-if="!isLoading"> 
          <!-- <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard> -->
      </template>
      <p v-else>Loading events</p>
  </div>

</template>

<script>
import axios from 'axios';
// import EventCard from "../components/EventCard"
export default {
    components: {
        // EventCard
    },
    data() {
        return {
            isLoading: false,
            events: []
        }
    },
    created() {
        axios.get('//localhost:3000/dashboard').then(({data}) => {
            console.log(data);
            // this.events = data.events.events
            this.isLoading = false;
        })
    }
}
</script>

<style>

</style>