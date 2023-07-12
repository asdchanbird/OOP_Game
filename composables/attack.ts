import { MessageType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, Chacracter } from '../composables/useNormal'
export class BasicAttack {
    public Damage = ref<number>(0);
    public Offense = ref<number>(0);
    constructor(damage: number, offense: number) {
        // 筛害值
        this.Damage.value = damage
        // 防禦值
        this.Offense.value = offense
    }
    // target - 對方
    attack(target: Chacracter): void {
        console.log(this.Damage.value)
        if (target.Armor.value >= 0 ) {
            if (target.Armor.value < this.Damage.value) {
                let decreament = this.Damage.value - target.Armor.value
                target.Armor.value = 0;
                target.Heart.value -= decreament
            }else {
                target.Armor.value -= this.Damage.value
            }
        }else {
            target.Heart.value -= this.Damage.value
        }
    }
    // target - 自身
    offense(target: Chacracter): void {
        target.Armor.value += this.Offense.value
    }
}
