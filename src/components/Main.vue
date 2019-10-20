<template>
  <div class="content">
        <div>
            <div v-if="$route.query.question_id"> 
                <Detail />
            </div>

            <div v-else> 
                <div class="questions" v-bind:key="item.id" v-for="item in defaultList">
                    <div>
                        <img class="thumb" v-bind:src="item.thumb_url"/>
                    </div>
                    <div>
                        <h4>Question {{item.id}}</h4>
                        <router-link class="link" v-bind:to="{ path: '/questions', query: { question_id: item.id }}"><h3>{{item.question}}</h3></router-link>
                    </div>
                </div>
            </div>
        </div> 

  </div>
</template>

<script>
import axios from 'axios';
import Detail from './Detail';
const proxy = 'https://cors-anywhere.herokuapp.com/';

export default {
  name: 'Main',
  components: {
        Detail
  },
  data () {
    return {
      defaultList: [],
      filter: this.$route.query.filter,
      filterResults: []
    }
  },
  methods: {
  
  },
  created() {

    //get the questions - limit 10 / offset 10
    
    axios.get(`${proxy}https://private-anon-4c8f9b4a5f-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=10`)
    .then ( res => this.defaultList = res.data )
    .catch ( err => alert(err));
    }
}
</script>

<style lang="sass" scoped>

    $dark: grey;
    $light: white;
    $mobile: 600px;

    .content
      width: 50vw;
      margin: 5vh auto;
      @media screen and (max-width: $mobile)
            width: 70vw;
    
    .questions
      width: 100%;
      background: $light;
      padding: 2em;
      border-radius: 5px;
      margin: 5vh auto;
      display: grid;
      grid-template-columns: auto 1fr;
      align-content: center;
      grid-column-gap: 10vh;
      @media screen and (max-width: $mobile)
        grid-template-columns: auto;
        text-align: center;
        grid-row-gap: 5vh;
      
    .questions div
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
        
    .thumb
      border-radius: 50%;
      border: 2px solid $dark;
      width: 120px;
      align-self: center;

</style>