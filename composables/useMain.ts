import { Monster } from './useMonster2'
import { Player } from './usePlayer2'
import { MessageType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, GetSentMessage } from '../composables/useNormal'
import { BasicAttack } from '../composables/attack'

// 類別 - 主控台
export class Console implements GetSentMessage {
    // 變數 - 玩家
    public Player: Player 
    // 變數 - 怪物們物件
    public Monsters: Monster[]
    // 變數 - 回合數
    public Round = ref<number>(0)
    // 變數 - 選擇目標
    public Select = ref<number>(0)
    // 變數 - 倒數秒數
    public Second = ref<number>(60)
    // 變數 - 目前狀態
    public State = ref<string>('')
    // 變數 - 怪物回傳訊息集合
    private MonsterState = <boolean[]>([])
    // 變數 - 玩家攻擊物件
    private PlayerAttack: BasicAttack;
    // 變數 - 怪物們攻擊物件
    private MonsterAttack = <BasicAttack[]>([]);
    // 變數 - 訊息格式
    public MessageType!: Message;
    // 變數 - 訊息格式
    public CanUse = ref<boolean>(true);

    // 建構函數 ( 變數 - 玩家物件 . 怪物們物件(陣列))
    constructor(player: Player, monster: Monster[]) {
        this.Player = player
        this.Monsters = monster
        this.PlayerAttack = new BasicAttack(this.Player.Damage.value,this.Player.Offense.value)
        for(let i = 0; i < this.Monsters.length; i++) {
            let NewObj = new BasicAttack(this.Monsters[i].Damage.value, this.Monsters[i].Offense.value)
            this.MonsterAttack.push(NewObj)
        }
        
        const Type: Message = {
            role: 'Player',
            message: SentMessage.MyRound,
            data: ''
        }       
        this.MessageType = Type
        // 初始化設定
        this.RoundSystem()
        // 初始化選擇目標
        onMounted(()=> {
            this.SelectMonster(this.Select.value)
        })
    }

    // 行為 - 回合機制
    RoundSystem(): void {
        // 回合數 + 1
        this.Round.value ++;
        console.log(this.CheckEvenOrOdd())
        switch(this.CheckEvenOrOdd()) {
            case 'Player':
                this.MessageType.role = this.Player.Name.value
                this.MessageType.message = SentMessage.MyRound
                this.SentMessage(this.MessageType)
                break;
            case 'Monster':
                this.MonsterState = [];
                console.log(123)
                this.MessageType.role = this.Monsters[0].Name.value
                this.MessageType.message = SentMessage.MyRound
                this.SentMessage(this.MessageType)
                break;
        }
    }
    // 行為 - 傳送訊息
    SentMessage(message: Message): void {
        console.log(message)
        if (message.role === 'Player') {
            switch (message.message) {
                case SentMessage.FinishWork:
                    this.MessageType.role = message.role
                    this.MessageType.message = message.message
                    this.Player.GetMessage(this.MessageType)
                    break;
                case SentMessage.Offense:
                    break;
                case SentMessage.MyRound:
                    this.Player.GetMessage(this.MessageType)
                    break;
            }
        }else {
            switch (message.message) {
                case SentMessage.FinishWork:
                    this.MessageType.role = message.role
                    this.MessageType.message = message.message
                    console.log(this.Monsters,1374124192)
                    for(let i = 0; i < this.Monsters.length; i++) {
                        this.Monsters[i].GetMessage(this.MessageType)
                    }
                    break;
                case SentMessage.Offense:
                    break;
                case SentMessage.MyRound:
                    for(let i = 0; i < this.Monsters.length; i++) {
                        this.Monsters[i].GetMessage(this.MessageType)
                        
                    }
                    break;
            }
        }
    }
    // 行為 - 取得訊息
    GetMessage(message: Message): void {
        console.log(message)
        if (message.role === 'Player') {
            switch (message.message) {
                case GetMessage.Attack:
                    this.Monsters[this.Select.value].Animation(this.Select.value)
                    this.PlayerAttack.attack(this.Monsters[this.Select.value])
                    message.message = SentMessage.FinishWork
                    this.SentMessage(message)
                    
                    break;
                case GetMessage.Offense:
                    this.PlayerAttack.offense(this.Player)
                    message.message = SentMessage.FinishWork
                    this.SentMessage(message)
                    break;
                case GetMessage.EndRound:
                    setTimeout(()=> {
                        // 進行下一回合
                        this.RoundSystem()
                    },3000)
                    break;
            }
        }else {
            switch (message.message) {
                case GetMessage.Attack:
                    if (this.CanUse.value) {
                        this.Player.Animation(this.MonsterAttack.length) 
                        for(let i=0; i< this.MonsterAttack.length; i++) {
                            this.MonsterAttack[i].attack(this.Player)
                        }
                        message.message = SentMessage.FinishWork
                        this.SentMessage(message)
                    }
                    this.CanUse.value = false
                    setTimeout(()=>{
                        this.CanUse.value = true
                    },2000)

                    break;
                case GetMessage.Offense:
                    break;
                case GetMessage.Death:
                    this.Monsters.forEach((item,index)=> {
                        console.log(item.DeathOrLive.value)
                        if (item.DeathOrLive.value === true) {
                            console.log('腳色死亡')
                            // this.Monsters.splice(index, 1 )
                        }
                    })
                    break;
                case GetMessage.EndRound:
                    this.MonsterState.push(true)
                    if(this.MonsterState.length === this.Monsters.length) { 
                        setTimeout(()=> {
                            // 進行下一回合
                            this.RoundSystem()
                        },1000)    
                    }
                    break;
            }
        }
    }
    SelectMonster(index: number): void {
        this.Select.value = index
        const Item = document.querySelectorAll('.attackItem')
        Item.forEach((item,num)=> {
            if (num === index) {
                $(Item[num]).html('攻擊目標')
            }else {
                $(Item[num]).html('')
            }
        })
    }
    // 行為 - 檢測所有怪物都有回傳結果後在進行下一步
    MonstersResult(message: Message): void {

    }
    // 行為 - 檢查基數偶數
    CheckEvenOrOdd(): string{
        // 回合數為偶數
        if ( this.Round.value % 2 === 0 ) {
            return "Monster"
        // 回合數為奇數
        }else {
            return "Player"
        }
    }
}