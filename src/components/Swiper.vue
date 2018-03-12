<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="list in lists" :key="list.id">
                <a class="js-no-follow" :href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" :src="list.image">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>


<style>
    .swiper-slide img {
        width: 100%;
        height: 100%;
    }
</style>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    export default {
        name: 'swiper',
        props: {
            lists: {
                type: Array,
                required: true
            }
        },
        mounted(){
            new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                loop: true,
                autoplay: true
            })
        }
    }
</script>
