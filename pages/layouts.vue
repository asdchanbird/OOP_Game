<script setup lang="ts">
// import { userInfo } from 'os';
// import { useState } from 'nuxt/app'

const useInfo =  useState('user', ()=> {
    return {
        id: 1,
        name: 'Felix'
    }
})
console.log(useInfo.value)
if (!process.client) {
    
}
// useState<T>(init ?: () => T | Ref<T>): Ref<T>
// useState<T>(key: string, init ?: () => T | Ref<T>): Ref<T>
</script>
<template>
    <div class="font-bold text-xl">
        <h2>Layouts畫面</h2>
        <NuxtLayout name="custom">
            <template #header-box>
              <div>首頁</div>
              <div>關於</div>
            </template>
            <template #left-sider>
              <div>快速入門</div>
              <div>使用</div>
              <div>目錄結構</div>
            </template>
            <template #body-content>
              <div>我應該顯示一點內容</div>
            </template>
        </NuxtLayout>
    </div>
    <NuxtLayout name="default"/>
</template>
<style lang="" scoped>
    
</style>