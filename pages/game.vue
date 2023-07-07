<script setup lang="ts">
import { ref, nextTick } from 'vue'
import setting from "../content/setting.json";
import { Monster } from "../composables/useMonster";
import { Player } from "../composables/usePlayer";
import { MessageType, itemType } from '../composables/useNormal'
import { thumbProps } from 'element-plus';

let death = ref<string>('false') 
// 類別 - Player
class Player1 extends Player {
    public selectMonster = ref<any>(0);
    constructor(damage: number, heart: number, armor: number) {
        super(damage, heart, armor)
    }
    attack(monsterContanier: Monster[]): void {
        super.attack(monsterContanier)
        let index: string | null = sessionStorage.getItem('Select')
        console.log(index)
        if (index !== null) {
            monsterContanier[parseInt(index)].receiveMessage(MessageType.attack, this.Damage.value)
        }
    }
    offense(): void {
        super.offense()
    }
    select(e: Event, index: number, monsterContanier: Monster[]): void {
        super.select(e, index, monsterContanier)
        itemRefs[index].select = true
        let obj: string | null = sessionStorage.getItem('Select')
        if (obj !== null) {
            if (index !== parseInt(obj)) {
                monsterContanier[index].Focus.value = '攻擊對象'
                monsterContanier[parseInt(obj)].Focus.value = ''
            } else {
                
            }
            sessionStorage.setItem('Select', String(index))
        }else {
            sessionStorage.setItem('Select', String(index))
        }
    }
    receiveMessage(type: string): void {
        super.receiveMessage(type)
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
            // console.log(this.computed())
        })
    }
    // attack(): void {
    //     super.attack()
    // }
    offense(): void {
        super.offense()
    }
    watch(): void {
        super.watch()
    }
    select(e: Event, index: number, monsterContanier: Monster[]): void {
        super.select(e, index, monsterContanier)
    }
    receiveMessage(type: string, data?: any): void {
        console.log(type,1441489)
        super.receiveMessage(type)
    }
    computed(index: number): any {
        // console.log(itemRefs[index])
        console.log(super.computed(index))
        // if (itemRefs[index] !== undefined) {
        //     console.log(123)
        //     return itemRefs[index].focus
        // }
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
let Person = new Player1(48, 100 ,40)

for(let i=0; i<setting.length;i++) {
    let MonsterWrpper = new MonsterItem(setting[i].damage, setting[i].heart, setting[i].armor)
    monsterContanier.push(MonsterWrpper)
}

onMounted(()=> {
    // console.log(itemRefs[0].select)
})
</script>
<template>
    <div class="w-full">
        <div class="flex w-full justify-center items-center">
            <div class="w-1/3">
                <div class="p-2">
                    <h2 class="font-bold text-center">Player 1</h2>
                </div>
                <div class="flex justify-center height">
                    <img class="object-contain" src="/assets/images/main.jpg" alt="">
                </div>
                <div class="p-4">
                    <p class="font-bold text-lg ">生命值 : {{ Person.Heart }} /  100</p>
                    <p class="font-bold text-lg ">護甲值 : {{ Person.armor }} / 40</p>
                </div>
                <div class="flex flex-row justify-center">
                    <button class="border-solid bg-red-400 p-3 rounded-md mx-4 text-lg font-bold text-white" @click="Person.attack(monsterContanier)">attack</button>
                    <button class="border-solid bg-blue-400 p-3 rounded-md text-lg font-bold text-white" @click="Person.offense()">offense</button>
                </div>
            </div>
            <div class="w-1/3 font-bold text-center text-5xl">
                <h2 class="">vs</h2>
            </div>
            <div class="w-1/3 flex">
                <div v-for="(item,index) in setting" :key="item.name" class="relative" :ref="(el: any) => setItemRefs(el, index)">
                    <div class="font-bold text-center cursor-pointer" @click="monsterContanier[index].select($event, index, monsterContanier)">
                        <div class="attackItem">
                            <h3>{{ monsterContanier[index].Focus.value }}</h3>
                        </div>
                        <h2 class="" >{{ item.name }}</h2>
                    </div>
                    <div class="flex justify-center height">
                        <img class="object-contain" src="/assets/images/monster.jpg" alt="" ref="monsterImg">
                    </div>
                    <div>
                        <p class="font-bold text-xl ">生命值 : {{ monsterContanier[index].Heart.value >= 0 ? monsterContanier[index].Heart.value : 0 }} / {{ item.heart }}</p>
                        <p class="font-bold text-xl ">護甲值 : {{ monsterContanier[index].armor.value >= 0 ? monsterContanier[index].armor.value : 0 }} / {{ item.armor }}</p>
                    </div>
                    <div class="absolute bg-red-500 top-1/2 left-1/3 p-4 rounded-lg opacity-0" :ref="death">
                        <h2 class="font-bold text-2xl text-white">已死亡</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
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
</style>