<template>
  <div class="event-card">
      <span>@{{event.time}} on {{event.date}}</span>
      <h4>{{event.title}}</h4>
  </div>
</template>

<script>
export default {
    props: {
        type: Object,
        default: {}
    }
}
</script>

<style>

</style>