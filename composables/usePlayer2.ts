import MonsterSetting from "../content/MonsterSetting.json";
import { Console, clear, time } from 'console';
import { MessageType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, Chacracter, GetSentMessage } from '../composables/useNormal'
import { keysOf } from "element-plus/es/utils";
import { tr } from "element-plus/es/locale";
// 類別 - 玩家
export class Player implements Chacracter {
    // 變數 - 玩家
    public Name = ref<string>('Player');
    // 變數 - 傷害量
    public Damage = ref<number>(0);
    // 變數 - 生命值
    public Heart = ref<number>(0);
    // 變數 - 護甲值
    public Armor = ref<number>(0);
    // 變數 - 防護值
    public Offense = ref<number>(0);
    // 變數 - 秒數
    public Second = ref<number>(60000);
    // 變數 - 時間計時器
    private TimeOut = ref<any>();
    // 變數 - 按鈕開關
    public BtnDisabled = ref<boolean>(false);
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

    Animation(action: string): void {
        // 客戶端執行
        if (process.client) {
            let Img = document.querySelector('.playerImg')
            if ( action === GetMessage.Attack ) {
                $(Img).addClass('beAttack')
    
                setTimeout(()=> {
                    $(Img).removeClass('beAttack')
                },500)
            }else if ( action === GetMessage.Offense ) {
                console.log(123)
                $(Img).addClass('offense')
    
                setTimeout(()=> {
                    $(Img).removeClass('offense')
                },500)
            }
        }    

    }
    // 行為 - 倒數計時
    CountDown(): void {
        // 初始化 按鈕開啟
        this.BtnDisabled.value = false
        // 初始化 秒數設置60秒
        this.Second.value = 60000
        // 每次輪到我的回合時 先清除setInterval再開始計時
        clearInterval(this.TimeOut.value)
        // 倒數計時
        var timeId = setInterval(()=>{
            this.Second.value -= 1000
            if (this.Second.value === 0) {
                this.MessageType.message = SentMessage.EndRound
                this.BtnDisabled.value = true
                this.Second.value = 60000
                this.SentMessage(this.MessageType)
                clearInterval(timeId)
            }else {
                
            }
        },1000)
        // 把這個倒數計時的放到變數中
        this.TimeOut.value = timeId
    }

    // 行為 - 傳送訊息
    SentMessage(message: Message): void {
        switch (message.message) {
            case SentMessage.EndRound:
                this.MessageType.message = SentMessage.EndRound
                this.BtnDisabled.value = true
                break;
            case SentMessage.Attack:
                this.MessageType.message = SentMessage.Attack
                break;
            case SentMessage.Offense:
                this.MessageType.message = SentMessage.Offense
                this.Animation(SentMessage.Offense)
                break;
            case SentMessage.FinishWork:
                this.MessageType.message = SentMessage.FinishWork
                break;
            case SentMessage.FinishWork:
                this.MessageType.message = SentMessage.Death
                break;
        }
    }
    // 行為 - 取得訊息
    GetMessage(message: Message): void {
        switch(message.message) {
            case GetMessage.MyRound:
                // 倒數計時開始
                this.CountDown()
                break;
            case GetMessage.Injure: 
                break;
            case GetMessage.FinishWork:

                this.MessageType.message = SentMessage.EndRound
                this.SentMessage(this.MessageType) 
                break;
        }
    }

    Watch(): void {
        watch(this.Heart, ()=> {
            
            if ( this.Heart.value <= 0 ) {
                console.log('玩家已死亡 遊戲結束~~')
            }
        })
    }
}