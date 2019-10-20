<template>
    <div class="question" >
            <div>
                    <div>
                        <img v-bind:src="ques.image_url" />
                        <h4>Question {{ ques.id }} - Published: {{ ques.published_at }}</h4>
                        <h1>{{ques.question}}</h1>
                            <form>
                                <div v-for="(opt, idx) in ques.choices" :key="idx">
                                    <div class="votes">
                                        <div>
                                            <input
                                            type="radio"
                                            v-bind:value="opt.votes"
                                            v-model="sendvote">
                                            <label>{{opt.choice}}</label>
                                        </div>
                                    </div>
                                </div>
                                <button class="btn-vote" v-on:click="onVote()">Send Vote</button>
                            </form>
                    </div>
                    
                    <div class="return">
                        <router-link :to="{ path: '/questions'}">&larr;  Back to Questions</router-link>
                    </div>
            </div>

    </div>
</template>
<script>
import axios from 'axios';
const proxy = 'https://cors-anywhere.herokuapp.com/';

    export default {
        name: 'Detail',
        data () {
            return {
                sendvote: 0,
                id: this.$route.query.question_id,
                ques: [],
                question_votes: []
            }
        },
        props: {
     
        },
        methods: {
            onVote() {
                axios.put(`${proxy}https://private-anon-4c8f9b4a5f-blissrecruitmentapi.apiary-mock.com/questions` + this.id, {votes: this.sendvote})
                .then(res => {this.question_votes = res.data, this.sendvote = res.choices.votes + 1})
                .catch(err => alert(err));
            }
        },
        created() {
            //get selected question
            axios.get(`${proxy}https://private-anon-4c8f9b4a5f-blissrecruitmentapi.apiary-mock.com/questions/` + this.id)
            .then(res => this.ques = res.data)
            .catch(err => alert(err));
    }

    
}

</script>
<style lang="sass" scoped>
    $dark: grey;
    $light: white;
    $mobile: 600px;

    .question
        width: 50vw;
        margin: 5vh auto;
        background: $light;
        padding: 2em;
        border-radius: 5px;
        @media screen and (max-width: $mobile)
            width: 70vw;
      

    .question h1
        color: black;
        font-size: 20px;
        line-height: 1.5;
    
    .question h4
        font-size: 12px;
        color: $dark;
    
    .question div .share
        text-align: right;
    
    .question .btn-share
        padding: 10px 30px;
        margin-bottom: 10px;
        border-radius: 20px;
        border: none;
        background: $dark;
        color: $light;
        font-size: 12px;
        transition: all 0.5s ease;
    
    .question .btn-share:hover
        background: $dark;
    
    .question .btn-vote
        padding: 10px 40px;
        border-radius: 15px;
        border: none;
        background: $dark;
        color: white;
        font-size: 15px;
        cursor: pointer;
        transition: 0.2s;
        margin-top: 30px;

    .question .btn-vote:hover 
     background: lightgray;   


    .question img
        background: cover;
        width: 100%;
        margin: 30px 0;

    .votes
        margin: 10px 0;
    
    .return
        margin: 30px 0 10px 0;
        font-size: 12px;
        color: grey;
        font-size: 15px;


</style>
