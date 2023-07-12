import { Monster } from './useMonster2'
import { Player } from './usePlayer2'
import { MessageType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, GetSentMessage } from '../composables/useNormal'
import { BasicAttack } from '../composables/attack'
let bit = new BasicAttack(10)
// 類別 - 主控台
export class Console implements GetSentMessage {
    // 變數 - 玩家
    public Player: Player 
    // 變數 - 怪物們物件
    public Monsters: Monster[]
    // 變數 - 回合數
    public Round = ref<number>(1)
    // 變數 - 選擇目標
    public Select = ref<number>(0)
    // 變數 - 倒數秒數
    public Second = ref<number>(60)
    // 變數 - 目前狀態
    public State = ref<string>('')
    // 變數 - 玩家訊息陣列
    private PlayerMessage = ref<string[]>([])
    // 變數 - 怪物訊息陣列
    private MonsterMessage = ref<string[]>([])

    // 建構函數 ( 變數 - 玩家物件 . 怪物們物件(陣列))
    constructor(player: Player, monster: Monster[]) {
        this.Player = player
        this.Monsters = monster
        this.Init()
    }

    // 行為 - 初始化
    Init(): void {
        const Role = <string>(this.CheckEvenOrOdd())
        console.log(Role)
        if ( Role === '玩家' ) {
             const text = <Message>{
                role: 'Main',
                message: GetMessage.MyRound,
            }
            console.log(text)
            this.Player.GetMessage(text)
        }
    }
    // 行為 - 傳送訊息
    SentMessage(message: Message): void {
        console.log(message)
        const Text = <Message> {
            role: 'Main',
            message: message.message
        }
        switch (message.message) {
            case GetMessage.Offense:
                break;
            case GetMessage.MyRound:
                if ( message.role === 'Player' ) {
                    this.Player.GetMessage(Text)
                }else {
                    this.Monsters[this.Select.value].GetMessage(Text)
                }
                break;
        }
    }
    // 行為 - 取得訊息
    GetMessage(message: Message): void {
        console.log(message)
        if ( message.role === this.Player.Name.value ) {
            this.PlayerMessage.value.push(message.message)
        } else {
            this.MonsterMessage.value.push(message.message)
        }
        switch (message.message) {
            // case GetMessage.Attack:
            //     if ( message.role === '')
            //     break;
            case GetMessage.Offense:
                break;
            case GetMessage.EndRound:
                // 回合數 + 1
                this.Round.value ++; 
                const Role = <string>(this.CheckEvenOrOdd())
                if ( Role === '玩家' ) {
                    
                }else {

                }

                const text = <Message>{
                    role: Role,
                    message: GetMessage.MyRound
                }
                
                this.SentMessage(text);
                break;
        }
    }

    // 行為 - 檢查基數偶數
    CheckEvenOrOdd(): string{
        // 回合數為偶數
        if ( this.Round.value % 2 === 0 ) {
            return "怪物"
        // 回合數為奇數
        }else {
            return "玩家"
        }
    }
}