import { InjureAnimation, GetArmorAnimation, ChooseAnimation } from '../AniamtionModule/AnimaitonSet'
import { CharactorAbility } from "../CharactorModule/BasicCharactor";
import { MonsterAbility } from "../MonsterModule/BasicMonsters";
import { CountDown } from "../CountDownModule/CountDown";
import { OptionType } from '../TypeSystem'
import { clearInterval } from 'timers';
export class RoundSystem {
    // 變數 - 玩家物件
    public Player: CharactorAbility;
    // 變數 - 怪物們物件
    public Monsters: MonsterAbility[]= ([]);
    // 變數 - 遊戲結束狀態
    public GameOver = <boolean>(false);
    // 變數 - 回合狀態
    public RoundOver = <boolean>(false);
    // 變數 - 回合數
    public Round = ref<number>(1);
    // 變數 - 選擇怪物目標
    public Select = <number>(0);
    // 變數 - 秒數
    public Second = ref<number>(60000);
    // 建構函數
    constructor(player: CharactorAbility, monsters: MonsterAbility[]) {
        // 儲存玩家物件
        this.Player = player
        // 儲存怪物物件
        this.Monsters = monsters
        

        onMounted(()=>{
            this.SelectTarget(this.Select)
        })
    }
    // 回合開始
    async StartRound(): Promise<void> {
        // 遊戲尚未結束
        console.log(this.RoundOver)
        if (!this.GameOver && !this.RoundOver) {
            console.log('玩家回合')
            // 玩家回合
            if (this.CheckEvenOrOdd()) {
                // 玩家攻擊 - 怪物受傷
                
                // 建立倒數計時物件並啟動函數計時
                const result = await new CountDown().SetTimeOut(this.Second.value)
                switch (result) {
                    case 'TimeOut':
                        console.log('時間到摟!')
                        break;
                    case 'Attack':
                        console.log('攻擊摟!')
                        this.Monsters[this.Select].TakeDamage(this.Player.Damage.value, this.Monsters[this.Select])
                        break;
                    case 'Offense':
                        console.log('防禦瞜!')
                        break;
                    default:
                        console.log('12412')
                        break;
                }
                this.CheckDeathOrLive()
                // 倒數計時60s

                // 事件監聽器啟動 (事件監聽是剣放在角色物件中)
                // 動畫
                // 結束動作

                // 下一回合
                this.NextRound()
            }else {
            // 怪物回合
                console.log('怪物回合')
                setTimeout(()=> {
                    // 怪物攻擊 - 玩家受傷
                    let TotalDamage = <number>(0)
                    this.Monsters.forEach((item,index)=> {
                        if (!item.DeathOrLive) {
                            TotalDamage += item.Damage.value
                        }
                    })
                    this.Player.TakeDamage(TotalDamage, this.Player)
                },1000)
                // 自動攻擊
                // 動畫
                this.CheckDeathOrLive()
                // 結束動作

                // 下一回合
                this.NextRound()
            }   


        }else {
            console.log('遊戲結束!!!!')
        }
    }
    NextRound(): void {
        setTimeout(()=>{
            this.Round.value ++ 
            this.StartRound()
        }, 2000)
    }
    // 行為 - 檢查基數偶數
    SelectTarget(index: number): void {
        this.Select = index
        const Target = document.querySelectorAll('.attackItem')
        Target.forEach((item,num)=> {
            if ( num === index) {
                $(item).html('攻擊目標')
            }else {
                $(item).html('')
            }
        })
    }
    // 行為 - 檢查基數偶數
    CheckEvenOrOdd(): boolean{
        // 回合數為偶數
        if ( this.Round.value % 2 === 0 ) {
            return false
        // 回合數為奇數
        }else {
            return true
        }
    }

    CheckDeathOrLive(): boolean {
        let state = this.Monsters.every((item)=> {
            return item.Heart.value <= 0
        })

        console.log(state,179147)
        if (state === true) {
            this.RoundOver = state
        }
        return state
    }
} 