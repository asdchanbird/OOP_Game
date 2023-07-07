<script setup lang="ts">
definePageMeta({
    layout: "custom",
});
</script>
<template>
    <div class="page-box">
        <div class="header-box bg-red-200">
            <!-- 插槽 - 這邊加入內容 -->
            <slot name="header-box"/>
        </div>
        <div class="body-box">
            <div class="left-sider bg-yellow-200">
                <!-- 插槽 - 這邊加入內容 -->
                <slot name="left-sider"/>
            </div>
            <div class="body-content bg-blue-200">
                <!-- 插槽 - 這邊加入內容 -->
                <slot name="body-content"/>
            </div>
        </div>
    </div>
</template>
<style>
.page-box {
    display: flex;
    flex-direction: column;
}
.header-box {
    width: 100%;
    height: 100px;
    display: flex;
    /* background-color: red; */
}
.body-box {
    width: 100%;
    display: flex;
    flex-flow: row;
}
.left-sider {
    width: 400px;
    height: calc(100vh - 100px);
    overflow: auto;
}
.body-content {
    flex: 1;
    height: calc(100vh - 100px);
    overflow: auto;
}
.sider-content {
    height: 1300px;
    width: 200px;
    background-color: black;
}
</style>