import { MessageType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, Chacracter, GetSentMessage } from '../composables/useNormal'
import { onMounted } from 'vue';
export class Monster implements Chacracter, GetSentMessage {
    // 變數 - 怪物
    public Name = ref<string>('Monster');
    // 變數 - 傷害量
    public Damage = ref<number>(0);
    // 變數 - 生命值
    public Heart = ref<number>(0);
    // 變數 - 護甲值
    public Armor = ref<number>(0);
    // 變數 - 防護值
    public Offense = ref<number>(0);
    // 變數 - 生命狀態存亡
    public DeathOrLive = ref<boolean>(false);

    // 建構函數 ( 變數 - 玩家物件 . 怪物們物件(陣列))
    constructor(heart: number, armor: number, damage: number, offense: number) {
        this.Damage.value = damage
        this.Heart.value = heart
        this.Armor.value = armor    
        this.Offense.value = offense
    }

    // 行為 - 傳送訊息
    SentMessage(message: Message): void {
        switch (message.message) {
            case SentMessage.MyRound:
                
                break;
        }

    }
    // 行為 - 取得訊息
    GetMessage(message: Message): void {
        console.log('終於換我瞜')
        switch (message.message) {
            case GetMessage.MyRound:
                this.SentMessage(message)
                break;
            // case GetMessage.Attack:
            //     break;
            case GetMessage.Offense:
                break;
        }
    }
}