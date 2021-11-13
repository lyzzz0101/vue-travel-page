<template>
    <nav id="nav">
        <p class="logo">The Vue School Travel App</p>
        <ul class="nav-links">
            <li class="links">
                <router-link to="/">Home</router-link>
            </li>
            <li v-for="destination in destinations" :key="destination.name" class="links">
                <router-link :to="{name:'destinationDetails',params:{slug:destination.slug}}">{{destination.name}}</router-link>
            </li>
        </ul>
    </nav>
  <!-- 与views的区别在于，components是可以重复使用的组件，很多页都存在这个东西 -->
  <!-- views则是用于页面的组件 -->
</template>
<script>
    import store from '@/store'
    export default{
        data(){
            return{
                destinations:store.destinations
            }
        }
    }
</script>
<style scoped>
#nav {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    background: white;
    z-index:1;

}

#nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: black;
}

.nav-links{
    display: flex;
}

.links {
    padding-right: 20px;
    list-style: none;
}

.links:hover{
    text-decoration: underline;
}
.logo{
    font-size: 20px;
    color: green;
    font-weight: bold;
}


</style>
