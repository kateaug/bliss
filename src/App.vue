<template>
  <div id="app">
    <div v-if="errored">
      <div class="retry">
        <h1 class="status">Something went wrong ...</h1>
        <button class="btn-retry" v-on:click="retryBtn()">RETRY</button>
      </div>
    </div>

    <div v-else>
      <!-- loading  screen -->
      <div class="loading" v-if="loading">Loading ...</div>

      <!-- list questions -->
      <div v-else>
        <!-- header -->
        <Header />
        <router-view/>

      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
import axios from 'axios';

const proxy = 'https://cors-anywhere.herokuapp.com/';

export default {
  name: 'app',
  components: {
   Header
  },
  data(){
    return {
      serverHealth: [],
      serverMessage: [],
      loading: true,
      errored: false
    }
  },
  methods: {
    retryBtn() {
      window.location.reload();
    } 
  },
  mounted () {
    axios.get(`${proxy}https://private-anon-4c8f9b4a5f-blissrecruitmentapi.apiary-mock.com/health`)
      .then(res => {
        this.serverHealth = res.status,
        this.serverMessage = res.data
        })
      .catch(err => {
        alert(err);
        this.errored = true 
      })
      .finally(() => this.loading = false)
  }
}

</script>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

  $font: Montserrat, sans-serif;
  $dark: gray;
  $light: lightgray;
  $error: #db0847;

  html,
  body,
  ul,
  ol
    margin: 0;
    padding: 0;

  body
    background: $light;
    font: 100% $font;
    box-sizing: border-box;
  
  a, a:visited
    text-decoration: none;
    color: $dark;

  a:hover
    color: $light;

  p,
  a,
  h1,
  h2,
  h3,
  h4
    padding: 0;
    margin: 0;
  
  img
     width: 100%;
     
  .loading, .retry
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    color: white;
    font-size: 10wv;
    transition: all 0.5s ease;
    font-weight: 700;
  
  .loading
    background: $dark;
  
  .retry
    background: $error;
    flex-direction: column;   

  .status
    font-size: 30px;
  
  .btn-retry
    padding: 10px 70px;
    border-radius: 20px;
    border: none;
    font-size: 15px; 
    margin-top: 35px;
    color: $error;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s;
  
  .btn-retry:hover 
   color: #800020;


  .link:focus 
    outline: 0;

</style>
