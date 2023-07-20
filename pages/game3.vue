<script setup lang="ts">
import  MonsterSetting from '../content/MonsterSetting.json'
import PlayerSetting from "../content/PlayerSetting.json";  
import { Swordman, Archer } from "../composables/CharactorModule/BasicCharactor";
import { FilterMonster} from '../composables/MonsterModule/BasicMonsters'
import { RoundSystem } from "../composables/RoundModule/RoundSetting";
import { CharactorAbility } from "../composables/CharactorModule/BasicCharactor";
import { MonsterAbility } from "../composables/MonsterModule/BasicMonsters";

// 變數 - Monster物件群體
let MonsterGroup = <MonsterAbility[]>([]);

// 物件 - 建立怪物物件放進MonsterGroup陣列中
MonsterSetting.forEach((item, index: number)=> {
    let Choose = new FilterMonster()
    let CreateMonster = Choose.ChooseRace(item.Name, item.Race, item.Heart, item.Armor, item.Offense, item.Damage, index)
    console.log(CreateMonster)

    MonsterGroup.push(CreateMonster)
})
// 物件 - 玩家
const Person = new Swordman(PlayerSetting.Name, PlayerSetting.Job, PlayerSetting.Heart, PlayerSetting.Armor, PlayerSetting.Offense, PlayerSetting.Damage)

// 物件 - 主控台 (玩家物件, 怪物物件們)
const RoundControl = new RoundSystem(Person, MonsterGroup);

RoundControl.StartRound()
onMounted(()=> {    
    
})
</script>
<template>
    <div class="w-full h-full">
        <GameBg />
        <div class="text-center font-bold text-4xl p-6">{{ `第${RoundControl.Round.value}回合 ` }} {{ RoundControl.CheckEvenOrOdd() === false ? '怪物回合' : '' }}</div>
        <div class="flex w-full justify-center items-center">
            <div class="w-1/3 relative">
                <div class="p-2">
                    <h2 class="font-bold text-center">{{ PlayerSetting.Name }}</h2>
                </div>
                <div class="flex justify-center height playerImg">
                    <img class="object-contain playerImg" src="/assets/images/main.png" alt="">
                </div>
                <div class="p-4 text-center">
                    <p class="font-bold text-lg ">生命值 : {{ Person.Heart.value >= 0 ? Person.Heart.value : 0 }} / {{ PlayerSetting.Heart }}</p>
                    <p class="font-bold text-lg ">護甲值 : {{ Person.Armor.value >= 0 ? Person.Armor.value : 0 }} / {{ PlayerSetting.Armor }}</p>
                </div>
                <div class="flex flex-row justify-center">
                    <button class="border-solid bg-red-400 p-3 rounded-md mx-4 text-lg font-bold text-white duration-300 hover:bg-red-500" id="attack"
                    @click="RoundControl.RoundOver = true" >attack</button>
                    <button class="border-solid duration-300 bg-blue-400 p-3 rounded-md text-lg font-bold text-white hover:bg-blue-500"
                    @click="" id="offense">offense</button>
                </div>
                <div class="absolute bg-red-500 top-1/2 left-1/3 p-4 rounded-lg" v-if="Person.Heart.value <= 0">
                    <h2 class="font-bold text-2xl text-white">已死亡</h2>
                </div>
            </div>
            <div class="w-1/3 font-bold text-center text-5xl">
                <h2 class="">vs</h2>
            </div>
            <div class="w-1/3 flex">
                <div v-for="(item, index) in MonsterSetting" :key="item.Name" class="relative">
                    <div class="font-bold text-center cursor-pointer">
                        <div class="attackItem">
                            <h3></h3>
                        </div>
                        <h2 class="">{{ item.Name }}</h2>
                    </div>  
                    <div class="flex justify-center height monsterImg cursor-pointer" @click="RoundControl.SelectTarget(index)">
                        <img class="object-contain" src="/assets/images/monster.png" alt="" ref="monsterImg">
                    </div>
                    <div class="text-center">
                        <p class="font-bold text-xl ">生命值 : {{ MonsterGroup[index].Heart.value >= 0 ?
                            MonsterGroup[index].Heart : 0 }} / {{ item.Heart }}</p>
                        <p class="font-bold text-xl ">護甲值 : {{ MonsterGroup[index].Armor.value >= 0 ?
                            MonsterGroup[index].Armor : 0 }} / {{ item.Armor }}</p>
                    </div>
                    <div class="absolute bg-red-500 top-1/2 left-1/3 p-4 rounded-lg"
                        v-if="MonsterGroup[index].Heart.value <= 0">
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
    font-weight: bold;
}

.beAttack {
    animation: horizontal-shaking 0.5s;
}
.offense {
     animation: vertical-shaking 0.5s;
}

@keyframes horizontal-shaking {
    0% {
        transform: translateX(0)
    }

    25% {
        transform: translateX(20px)
    }

    50% {
        transform: translateX(-20px)
    }

    75% {
        transform: translateX(20px)
    }

    100% {
        transform: translateX(0)
    }
}
@keyframes vertical-shaking {
    0% {
        transform: translateY(0)
    }

    25% {
        transform: translateY(20px)
    }

    50% {
        transform: translateY(-20px)
    }

    75% {
        transform: translateY(20px)
    }

    100% {
        transform: translateX(0)
    }
}
</style>