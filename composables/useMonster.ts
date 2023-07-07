let monsterContanier = <Monster[]>([]);
import { MessageType } from '../composables/useNormal'
export class Monster {
    private Damage = ref<number>(0);
    public Heart = ref<number>(0);
    public armor = ref<number>(0);
    public Select = ref<number>(0);
    public Focus = ref<string>('');
    private Session = ref<string>('')
    public Change = ref<boolean>(false);
    constructor(damage: number, heart: number, armor: number) {
        this.Damage.value = damage
        this.Heart.value = heart
        this.armor.value = armor        
        this.watch()
    }
    attack(data?: any): void {
        console.log(data)
        this.Heart.value -= this.Damage.value
    }
    offense(): void {
        console.log('防禦')
    }
    select(e: Event, index: number, monsterContanier: Monster[]): void {
        console.log(monsterContanier)
        sessionStorage.setItem('Select', String(index))
        monsterContanier.forEach((item,num)=> {
            if (num === index) {
                item.Focus.value = '攻擊目標'
            }else {
                item.Focus.value = ''
            }
        })
        this.Select.value = index
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
    receiveMessage(type: string, data?: any): void {
        switch(type) {
            case MessageType.attack :
                this.attack(data);
                break;
            case MessageType.offense :
                this.offense();
                break;
            case MessageType.select :
                // this.select();
                break;
        }
    }
    computed(index: number): any {

        // return this.Focus.value === true ? '攻擊目標' : ''
    }
}