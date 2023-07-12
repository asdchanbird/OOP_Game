<script setup lang="ts">
import { ref, nextTick } from 'vue'
import MonsterSetting from "../content/MonsterSetting.json";
import { Monster } from "../composables/useMonster";
import { Player } from "../composables/usePlayer";
import { MessageType, itemType } from '../composables/useNormal'
// import { Bg } from "../components/Game/Bg.vue";

let death = ref<string>('false') 
// 類別 - Player
class Player1 extends Player {
    public selectMonster = ref<any>(0);
    constructor(damage: number, heart: number, armor: number, enermy: Monster[]) {
        super(damage, heart, armor, enermy)
    }
    attack(monsterContanier: Monster[]): void {
        super.attack(monsterContanier)
        console.log(this.DeathOrLive.value)
    }
    offense(): void {
        super.offense()
        monsterContanier.forEach((item) => {
            item.receiveMessage(MessageType.offense)
        })
        // monsterContanier
    }
    select(): void {
    }
    receiveMessage(type: string, data?: any): void {
        super.receiveMessage(type, data)
        // monsterContanier[index]
    }
    watch(): void {
        super.watch()
        // watch()
    }
}
// 類別 - Monster
class MonsterItem extends Monster{
    constructor(damage: number, heart: number, armor: number) {
        super(damage, heart, armor)
        onMounted(()=> {
            this.attack()
        })
    }
    attack(): void {
        super.attack()
        watch(this.Heart,()=> {
            if( this.Heart.value >= 0) {
                Person.receiveMessage(MessageType.attack, this.Damage.value)
            }
        })
    }
    offense(): void {
        super.offense()
    }
    watch(): void {
        super.watch()
    }
    receiveMessage(type: string, data?: any): void {
        console.log(type)
        super.receiveMessage(type, data)
    }
}
let itemRefs: itemType[] = [];
const setItemRefs = (el: HTMLElement | ComponentPublicInstance | null, item:number) => {
    if (el) {
        itemRefs.push({
            id: item,
            select: false,
            el,
        })
    }
}
// monster包裝
let monsterContanier = <Monster[]>([]);
// let Person = new Model(48, 100, 40)
const monsterImg = ref<any>()
for(let i=0; i< MonsterSetting.length;i++) {
    let MonsterWrpper = new MonsterItem(MonsterSetting[i].damage, MonsterSetting[i].heart, MonsterSetting[i].armor)
    monsterContanier.push(MonsterWrpper)
}
let Person = new Player1(48, 100 ,40, monsterContanier)

onMounted(()=> {
    // console.log(itemRefs[0].select)
})
</script>
<template>
    <div class="w-full h-full">
        <GameBg />
        <div class="text-center font-bold text-4xl p-6">地下城冒險</div>
        <div class="flex w-full justify-center items-center">
            <div class="w-1/3 relative">
                <div class="p-2">
                    <h2 class="font-bold text-center">Player 1</h2>
                </div>
                <div class="flex justify-center height playerImg">
                    <img class="object-contain" src="/assets/images/main.png" alt="">
                </div>
                <div class="p-4 text-center">
                    <p class="font-bold text-lg ">生命值 : {{ Person.Heart.value >= 0 ? Person.Heart.value : 0 }} /  100</p>
                    <p class="font-bold text-lg ">護甲值 : {{ Person.armor.value >= 0 ? Person.armor.value : 0 }} / 40</p>
                </div>
                <div class="flex flex-row justify-center">
                    <button class="border-solid bg-red-400 p-3 rounded-md mx-4 text-lg font-bold text-white" @click="Person.attack(monsterContanier)">attack</button>
                    <button class="border-solid bg-blue-400 p-3 rounded-md text-lg font-bold text-white" @click="Person.offense()">offense</button>
                </div>
                <div class="absolute bg-red-500 top-1/2 left-1/3 p-4 rounded-lg"  v-if="Person.Heart.value <= 0">
                    <h2 class="font-bold text-2xl text-white">已死亡</h2>
                </div>
            </div>
            <div class="w-1/3 font-bold text-center text-5xl">
                <h2 class="">vs</h2>
            </div>
            <div class="w-1/3 flex">
                <div v-for="(item,index) in MonsterSetting" :key="item.name" class="relative" :ref="(el: any) => setItemRefs(el, index)">
                    <div class="font-bold text-center cursor-pointer" @click="monsterContanier[index].receiveMessage(MessageType.select,{ index: index, monster: monsterContanier })">
                        <div class="attackItem">
                            <h3>{{ monsterContanier[index].Focus.value }}</h3>
                        </div>
                        <h2 class="" >{{ item.name }}</h2>
                    </div>
                    <div class="flex justify-center height monsterImg">
                        <img class="object-contain" src="/assets/images/monster.png" alt="" ref="monsterImg">
                    </div>
                    <div class="text-center">
                        <p class="font-bold text-xl ">生命值 : {{ monsterContanier[index].Heart.value >= 0 ? monsterContanier[index].Heart.value : 0 }} / {{ item.heart }}</p>
                        <p class="font-bold text-xl ">護甲值 : {{ monsterContanier[index].armor.value >= 0 ? monsterContanier[index].armor.value : 0 }} / {{ item.armor }}</p>
                    </div>
                    <div class="absolute bg-red-500 top-1/2 left-1/3 p-4 rounded-lg" v-if="monsterContanier[index].Heart.value <= 0">
                        <h2 class="font-bold text-2xl text-white">已死亡</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.height {
    height: 600px;
}
.select {
    color: red;
}
.attackItem {
    height: 30px;
    color: red;
}

.beAttack {
    animation: horizontal-shaking 0.5s;
}
@keyframes horizontal-shaking {
 0% { transform: translateX(0) }
 25% { transform: translateX(5px) }
 50% { transform: translateX(-5px) }
 75% { transform: translateX(5px) }
 100% { transform: translateX(0) }
}
</style>