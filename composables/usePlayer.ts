import { Monster } from './useMonster'
import setting from "../content/setting.json";
import { Console } from 'console';
import { MessageType } from '../composables/useNormal'
let monsterContanier = <Monster[]>([]);
interface itemType {
    id: number;
    select: boolean;
    el: HTMLElement | ComponentPublicInstance | null;
}
export class Player {
    public Damage = ref<number>(0);
    public Heart = ref<number>(0);
    public armor = ref<number>(0);
    public Select = ref<number>(0);
    constructor(damage: number, heart: number, armor: number) {
        this.Damage.value = damage
        this.Heart.value = heart
        this.armor.value = armor        
        this.watch()
    }
    attack(monsterContanier: Monster[]): void {
        console.log(this.Damage.value)
        // mon
        if (this.armor.value >= 0) {
            if (monsterContanier[this.Select.value].armor.value < this.Damage.value) {
                let decreament = this.Damage.value - monsterContanier[this.Select.value].armor.value
                monsterContanier[this.Select.value].armor.value = 0
                monsterContanier[this.Select.value].Heart.value -=  decreament
            }else {
                monsterContanier[this.Select.value].armor.value -= this.Damage.value
            }
        }else {
            monsterContanier[this.Select.value].Heart.value -= this.Damage.value
        }
        console.log('進攻')
        console.log(monsterContanier)
    }
    offense(): void {
        console.log('防禦')
    }
    select(e: Event, index: number, monsterContanier: Monster[]): void {
        let obj: string | null =  sessionStorage.getItem('Select')
        // let obj = parseInt(JSON.stringify(sessionStorage.getItem('Select')))
        console.log(obj)
        if (obj !== null) {
            if ( index !== parseInt(obj)) {
                console.log(monsterContanier)
                monsterContanier[index].Focus.value = '攻擊對象'
                monsterContanier[parseInt(obj)].Focus.value = ''
                sessionStorage.setItem('Select', String(index))
            }else {
                sessionStorage.setItem('Select', String(index))
            }
        }
        if (obj !== null) {
            if (obj !== String(index) ) {
                $(e.target).addClass('select')
                if (!$(e.target).hasClass('select')) {
                }else {
                    $(e.target).removeClass('select')
                }
            }
            sessionStorage.setItem('Select', String(index))
        }else {
            $(e.target).addClass('select')
            sessionStorage.setItem('Select', String(index))
        }
        this.Select.value = index
    }
    receiveMessage(type: string, data?: string | number | object): void {
        switch(type) {
            case MessageType.attack :
                // this.attack();
                break;
            case MessageType.offense :
                this.offense();
                break;
            case MessageType.select :
                // this.select();
                break;
        }
    }
    watch():void {
        watch(this.Heart, () => {
            // console.log(Monster.Heart.value)
            console.log('變動')
            if (this.Heart.value <= 0) {
                // death.value = 'true'   
                // $('.death').removeClass('opacity-0')
            }
        })
    }
}