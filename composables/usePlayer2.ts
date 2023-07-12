import MonsterSetting from "../content/MonsterSetting.json";
import { Console } from 'console';
import { MessageType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, Chacracter, GetSentMessage } from '../composables/useNormal'
import { keysOf } from "element-plus/es/utils";
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
    public TimeOut = ref<any>();
    // 變數 - 按鈕開關
    public BtnDisabled = ref<boolean>(false);
    // 變數 - 生命狀態存亡
    public DeathOrLive = ref<boolean>(false);

    // 建構函數 ( 變數 - 玩家物件 . 怪物們物件(陣列))
    constructor(heart: number, armor: number, damage: number, offense: number) {
        this.Damage.value = damage
        this.Heart.value = heart
        this.Armor.value = armor
        this.Offense.value = offense      
    }
    // 行為 - 倒數計時
    CountDown(): void {
        console.log(1)
        this.TimeOut.value = setTimeout(() => {
            console.log(12)
            this.SentMessage(SentMessage.EndRound)
            this.BtnDisabled.value = true
        },this.Second.value)
    }

    // 行為 - 傳送訊息
    SentMessage(message: string): void {
        
    }
    // 行為 - 取得訊息
    GetMessage(message: Message): void {
        switch(message.message) {
            case GetMessage.MyRound:
                // 開啟btn按鈕
                this.BtnDisabled.value = false 
                // 倒數計時開始
                this.CountDown()
                break;
            case GetMessage.Injure: 
                break;
        }
    }
}