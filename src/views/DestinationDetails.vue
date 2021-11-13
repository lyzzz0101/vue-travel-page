<template>
    <!-- template中只允许一个块级作用域具有vue的引用功能,所以要一整个用一个div包裹着 -->
    <div>
    <section class="destination">
        <!-- 这一块section是整个地点大致加上经验的介绍 -->
        <GoBack />
        <!-- 后退键:在components中定义的功能,类似navbar一样,是一个内容不变,功能固定的组件 -->
        <h1>{{destination.name}}</h1>
        <!-- 从computed中拿到的属性，因为destination是destinations筛选后的结果 -->
        <div class="destination-details">
            <img :src="require(`@/assets/${destination.image}`)" alt="destination.name">
            <!-- 因为destination是本地的一个变量属性,所以引用时候要$()起来 -->
            <p>{{destination.description}}</p>
        </div>

        <section class="experiences">
            <!-- 这一块section是四个经验的内容 -->
            <h2>Top experiences in {{destination.name}}</h2>
            <div class="cards" id="experience">
                <div class="card" v-for="experience in destination.experiences" :key="experience.slug">
                    <!-- 每张卡片都在destination.experiences中,key的作用是让每张卡片保持一定的order -->
                <router-link :to="{ name: 'experienceDetails', params: {experienceSlug:experience.slug},id:'#experience'}">
                    <!-- experienceDetails属于detinationDetails的子路由,所以还是会处在这个页面;
                    这时候需要加上router-view来占位, 让experienceDetails的内容渲染到view中-->
                    <img :src="require(`@/assets/${experience.image}`)" alt="experience.name">
                    <span class="card_text">{{experience.name}}</span>
                </router-link>
                </div>
            </div>
            <router-view :key="$route.path"/>
            <!-- 如果点了别的experience,key的作用是会让SPA重新刷新 -->
            <!-- router-link可以生成一個可以點選的文字，最終會預設渲染成a標籤，與to一起使用
                而router-view相當於一個佔位的作用，決定跳轉後的內容顯示在link的上方或下方 -->
        </section>

    </section>
    </div>
</template>

<script>
    import store from '@/store.js'//要运用到store.js 里面的数据
    import GoBack from '@/components/GoBack'
    export default{
        components:{
            GoBack
        },
        data(){
            return{//也可以不用创建destinationId，这样会让代码逻辑更清楚
                // destinationId:this.$route.params.id
            }//这里的params是从home里面点击的时候传过来的
        },//data的缺点就是params必须跟url绑定，props可以多页面间传来传去的
        props:{
            slug:{
                type:String,
                require:true
        },
        },
        computed:{//template中destination是需要根据param里面id而更改的
            destination(){
                return store.destinations.find(
                    destination=>destination.slug===this.slug
                )
            }
        }
    }
</script>

<style scoped>
    img {
        max-width: 600px;
        height: auto;
        width: 100%;
        max-height: 400px;
    }
    .destination-details {
        display: flex;
        justify-content: space-between;
    }
    .experiences {
        padding: 40px 0;
    }
    p {
        margin:0 40px;
        font-size: 20px;
        text-align: left;
    }
    .cards{
        display: flex;
        justify-content: space-between;
    }
    .cards img{
        max-height: 200px;
    }
    .card{
        position: relative;
        padding: 0 20px;
    }
    .card_text{
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        color: white;
        font-size: 25px;
        font-weight: bold;
        text-decoration: none;
    }

</style>
