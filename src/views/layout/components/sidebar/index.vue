<template>
    <el-aside width="200">
        <div class="logo"></div>
        <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        >
            <menuItem v-for="route in routes" :key="route.name" v-bind:item="route" :base-path="route.path"></menuItem>
        </el-menu>
    </el-aside>
</template>
<script>
import { mapGetters } from 'vuex'
import menuItem from './menuitem'
export default {
    data(){
        return{
            aside:'200'
        }
    },
  components: { menuItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
        console.log(this.sidebar.opened)
      return !this.sidebar.opened
    },
  },
}
</script>
<style lang="scss">
.sidebar-container{
    overflow: hidden;
    .logo{
        width: 100%;
        height:65px;
        background: #304156;
    }
}
.el-scrollbar__wrap{
    overflow: hidden;
}
.sidebar-container,.el-scrollbar__view,.el-menu.el-menu{
    height:100%;
}
</style>
