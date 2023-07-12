let monsterContanier = <Monster[]>([]);
import { MessageType } from '../composables/useNormal'
import { onMounted } from 'vue';
export class Monster {
    public Damage = ref<number>(0);
    public Heart = ref<number>(0);
    public armor = ref<number>(0);
    public Select = ref<number>(0);
    public Focus = ref<string>('');
    public Change = ref<boolean>(false);
    public DeathOrLive = ref<boolean>(false);
    // Total 敵人總數量
    private Total = ref<Monster[]>([]);
    constructor(damage: number, heart: number, armor: number) {
        this.Damage.value = damage
        this.Heart.value = heart
        this.armor.value = armor    
        this.watch()
    }
    attack(): void {
        
    }
    injure(data?: any): void {
        if (!this.DeathOrLive.value) {
            let Img = document.querySelectorAll('.monsterImg')
            let session = <string>(sessionStorage.getItem('Select'))
            $(Img[parseInt(session)]).addClass('beAttack')
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
    
            setTimeout(()=> {
                $(Img[parseInt(session)]).removeClass('beAttack')
            },500)
        }
    }
    offense(): void {

    }
    select(data?: any | undefined): void {
        if (data !== undefined ) {
            sessionStorage.setItem('Select', String(data.index))
            data.monster.forEach((item: any,num : number)=> {
                if (num === data.index) {
                    item.Focus.value = '攻擊目標'
                }else {
                    item.Focus.value = ''
                }
            })
            this.Select.value = parseInt(data.index)
        }else {
            let num = <string>(sessionStorage.getItem('Select'))
            // this.Total.value[parseInt(num)].Focus = '攻擊目標'
        }
    }
    watch():void {
        watch(this.Heart, () => {
            // console.log(Monster.Heart.value)
            if (this.Heart.value <= 0) {
                console.log('變動')
                this.DeathOrLive.value = true
            }else {
                
                // player.receiveMessage(MessageType.attack, this.Damage.value)
            }
            
        })
    }
    receiveMessage(type: string, data?: any): void {
        switch(type) {
            case MessageType.attack :
                this.injure(data);
                break;
            case MessageType.offense :
                this.attack();
                break;
            case MessageType.select :
                this.select(data);
                break;
            case MessageType.enermy :
                this.Total.value = data
                onMounted(()=>{
                    this.select()
                })
                break;
        }
    }
}