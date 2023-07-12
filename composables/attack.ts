import { MessageType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, Chacracter } from '../composables/useNormal'
export class BasicAttack {
    public Damage = ref<number>(0);
    constructor(damage: number) {
        // 筛害值
        this.Damage.value = damage
    }
    attack(target: Chacracter): void {
        if (target.Armor.value >= 0 ) {
            target.Armor.value -= this.Damage.value
        }else {
            target.Heart.value -= this.Damage.value
        }
    }
}
