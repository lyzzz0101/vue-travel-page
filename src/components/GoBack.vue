<template lang="html">
    <span class="goback">
        <button @click="GoBack" >GoBack</button>
    </span>
</template>

<script>
export default {
    methods:{
        GoBack(){
            return this.$router.go(-1)
        }
    }
}
</script>

<style lang="css" scoped>
.goback {
    display: flex;
    cursor:pointer;
}
button {
    border:0;
}
</style>
