<template>
  <div id="app">
    <div v-if="errored">
      <div class="retry">
        <h1 class="status">Error {{serverHealth}}</h1>
        <p class="error-message">{{serverMessage.status}}</p>
        <button class="btn-retry" v-on:click="retryBtn()">Please, Try Again</button>
      </div>
    </div>

    <div v-else>
      <!-- loading  screen -->
      <div class="loading" v-if="loading">Loading...</div>

      <!-- list screen / home -->
      <div v-else>
        
        <!-- header -->
        <hero />
        <!-- pages -->
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const proxy = 'https://cors-anywhere.herokuapp.com/';
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
  //  HelloWorld
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
    //reload page
    retryBtn(){
    window.location.reload();
    }
  },
  mounted () {
    axios.get(`${proxy}https://private-anon-2910d706bc-blissrecruitmentapi.apiary-mock.com/health`)
      .then(res => {
        this.serverHealth = res.status,
        this.serverMessage = res.data
        })
      .catch(error => {
        //console.log(error),
        this.errored = true 
      })
      .finally(() => this.loading = false)
  }
}

</script>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700')

  $font: Montserrat, sans-serif
  $ddark: #42285b
  $dark: #7648A5
  $light: #ffffff
  $error: #db0847

  html,
  body,
  ul,
  ol
    margin:  0
    padding: 0

  body
    background: $dark
    font: 100% $font
    box-sizing: border-box
  
  a, a:visited
    text-decoration: none
    color: $dark

  a:hover
    color: black

  p,
  a,
  h1,
  h2,
  h3,
  h4
    padding: 0
    margin: 0
  
  img
     width: 100%
     
  .loading, .retry
    width: 100%
    height: 100vh
    display: flex
    align-items: center
    justify-content: center
    color: $light
    font-size: 10wv
    transition: all 0.5s ease
    font-weight: 700
  
  .loading
    background: $ddark
  
  .retry
    background: $error
    flex-direction: column
    

  .status
    font-size: 30wh
  
  .error-message
    font-weight: 400
    padding: 5vh

  .btn-retry
    padding: 10px 70px
    border-radius: 20px
    border: none

  .link:focus 
    outline: 0
</style>
