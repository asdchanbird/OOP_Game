import { MessageType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, Chacracter, GetSentMessage } from '../composables/useNormal'
import { onMounted } from 'vue';
export class Monster implements Chacracter {
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
    // 變數 - 訊息格式
    public MessageType!: Message;

    // 建構函數 ( 變數 - 玩家物件 . 怪物們物件(陣列))
    constructor(heart: number, armor: number, damage: number, offense: number) {
        this.Damage.value = damage
        this.Heart.value = heart
        this.Armor.value = armor    
        this.Offense.value = offense
        this.Watch()
        const Type: Message = {
            role: this.Name.value,
            message: ''
        }       
        this.MessageType = Type
    }

    Animation(index:number): void {
        
        // 客戶端執行
        if (process.client) {
            setTimeout(()=> {
                console.log('動畫開始')
                let Img = document.querySelectorAll('.monsterImg')
                $(Img[index]).addClass('beAttack')
    
                setTimeout(()=> {
                    $(Img[index]).removeClass('beAttack')
                },500)
            },500)
        }    

    }

    // 行為 - 傳送訊息
    SentMessage(message: Message): void {
        // if (!this.DeathOrLive.value) {
            switch (message.message) {
                // case SentMessage.MyRound:
                //     break;
                case SentMessage.Attack:
                    // console.log(message)
                    break;
                case SentMessage.EndRound:
                    // console.log(123)
                    break;
                case SentMessage.Death:
                    this.MessageType.message = SentMessage.Death
                    break;
            }
        // }

    }
    // 行為 - 取得訊息
    GetMessage(message: Message): void {
        // if (!this.DeathOrLive.value) {
            console.log(message)
            switch (message.message) {
                case GetMessage.MyRound:
                    setTimeout(()=> {
                        this.MessageType.message = SentMessage.Attack
                        this.SentMessage(this.MessageType)
                    },2000)
                    break;
                case GetMessage.FinishWork:
                    this.MessageType.message = SentMessage.EndRound
                    this.SentMessage(this.MessageType)
                    break;
                case GetMessage.Offense:
                    break;
            }
        // }

    }

    Watch(): void {
        watch(this.Heart, ()=> {
            if (this.Heart.value <= 0) {
                this.DeathOrLive.value = true
                this.MessageType.message = SentMessage.Death
                this.SentMessage(this.MessageType)
            }
        })
    }
}