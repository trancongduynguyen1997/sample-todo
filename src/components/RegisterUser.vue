<template>
  <div class="form-container">
    <form @submit.prevent="register">
      <div class="input-group">
        <label for>Name:</label>
        <input type="text" v-model="name" />
      </div>
      <div class="input-group">
        <label for>Email:</label>
        <input type="text" v-model="email" />
      </div>
      <div class="input-group">
        <label for>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit" name="button">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    created() {
        axios.get("//localhost:3000/test")
        .then(res => console.log(res))
        .catch(err => console.error(err.response))
    },
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "DashBoard" });
        });
      this.name = "";
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style>
.input-group {
    margin-bottom: 1em;
}
label {
  width: 100px;
  float: left;
  text-align: right;
}
form {
  width: 300px;
}
</style>