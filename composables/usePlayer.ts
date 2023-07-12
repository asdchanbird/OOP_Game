import { Monster } from './useMonster'
import MonsterSetting from "../content/MonsterSetting.json";
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
    public DeathOrLive = ref<boolean>(false);
    constructor(damage: number, heart: number, armor: number, enermy: Monster[]) {
        this.Damage.value = damage
        this.Heart.value = heart
        this.armor.value = armor      
        this.watch()
        // this.hehe()
        enermy.forEach((item, index)=> {
            item.receiveMessage(MessageType.enermy, enermy)
        })
    }
    attack(monsterContanier: Monster[]): void {
        console.log(this.DeathOrLive.value)
        
        if (!this.DeathOrLive.value) {
            let index: string | null = sessionStorage.getItem('Select')
            if (index !== null) {
                console.log(this.Damage.value)
                monsterContanier[parseInt(index)].receiveMessage(MessageType.attack, this.Damage.value)
            }
        }else {
            console.log('角色死亡')
        }
    }
    injure(data: number): void {
        let Img = document.querySelector('.playerImg')
        setTimeout(()=> {
            $(Img).addClass('beAttack')
            if (this.armor.value >= 0) {
                if ( this.armor.value < data ) {
                    let decreament = data - this.armor.value
                    this.armor.value = 0
                    this.Heart.value -= decreament
                }else {
                    this.armor.value -= data
                }
            }else {
                this.Heart.value -= data
            }
    
        },1000)
        setTimeout(()=> {
            $(Img).removeClass('beAttack')
        },500)
    }
    offense(): void {
        console.log('防禦')
    }
    select(): void {
    }
    receiveMessage(type: string, data?: string | number | object): void {
        switch(type) {
            case MessageType.attack :
                if (typeof data === 'number') {
                    this.injure(data)
                }
                break;
            case MessageType.offense :
                this.offense();
                break;
            case MessageType.select :
                break;
        }
    }
    watch():void {
        watch(this.Heart, () => {
            // console.log(Monster.Heart.value)
            if (this.Heart.value <= 0) {
                console.log('變動')
                this.DeathOrLive.value = true
                // death.value = 'true'   
                // $('.death').removeClass('opacity-0')
            }
        })
    }
    // hehe(): void {
    //     let n = 1
    //     setInterval(()=> {

    //         console.log(n += 1)
    //     },1000)
    // }
}