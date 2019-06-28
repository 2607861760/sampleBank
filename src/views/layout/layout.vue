<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar></navbar>
            <AppMain></AppMain>
        </div>
    </div>
</template>
<script>
import { Navbar, Sidebar, AppMain } from "./components";
export default {
    name: "layout",
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
}
</script>
<style lang="scss" scoped>
.app-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    background: #f2f2f2;
}
.sidebar-container,.main-container{
    float: left;
}
.main-container{
    flex:1;
}
</style>


