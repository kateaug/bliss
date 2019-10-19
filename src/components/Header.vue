<template>
    <!-- header -->
    <div>
        <router-link class="link logo" v-bind:to="{ path: '/'}"><h1>Bliss App</h1></router-link>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="sass">

    $dark: #7648A5
    $light: #ffffff
    $mobile: 600px

    *
        box-sizing: border-box

    *:focus
        outline: none

    .logo h1
        color: white
        text-align: center
        padding: 20px
        @media screen and (max-width: $mobile)
            font-size: 25px

</style>