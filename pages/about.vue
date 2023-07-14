<script setup lang="ts">
import MonsterSetting from "../content/MonsterSetting.json";
import PlayerSetting from "../content/PlayerSetting.json";
import { ref, nextTick } from 'vue'
import { MessageType, itemType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, Chacracter } from '../composables/useNormal'
</script>
<template>
    <div>
        <h1>about</h1>
        <Card />
    </div>
</template>


<style>
</style>