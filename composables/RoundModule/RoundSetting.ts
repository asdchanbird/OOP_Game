import { InjureAnimation, GetArmorAnimation, ChooseAnimation } from '../AniamtionModule/AnimaitonSet'
import { CharactorAbility } from "../CharactorModule/BasicCharactor";
import { MonsterAbility } from "../MonsterModule/BasicMonsters";
import { TargetObject } from '../MessageModule/MessageChannel'
import { totalmem } from 'os';
export class RoundSystem {
    // 變數 - 玩家物件
    public Player: CharactorAbility;
    // 變數 - 怪物們物件
    public Monsters: MonsterAbility[]= ([]);
    // 變數 - 遊戲結束狀態
    public GameOver = <boolean>(false);
    // 變數 - 回合數
    public Round = <number>(1);
    // 變數 - 選擇怪物目標
    public Select = <number>(0);
    public targetValue: TargetObject;
    // 建構函數
    constructor(player: CharactorAbility, monsters: MonsterAbility[]) {
        // 儲存玩家物件
        this.Player = player
        // 儲存怪物物件
        this.Monsters = monsters
        // 建立訊息物件
        this.targetValue = new TargetObject();
    }
    // 回合開始
    async StartRound(): Promise<void> {
        // 遊戲尚未結束
        if (!this.GameOver) {

            // 玩家回合
            if (this.CheckEvenOrOdd()) {
                // 玩家攻擊 - 怪物受傷
                this.Monsters[this.Select].TakeDamage(this.Player.Damage.value, this.Monsters[this.Select])
                // 倒數計時60s

                // 事件監聽器啟動 (事件監聽是剣放在角色物件中)
                // 動畫
                // 結束動作

                // 下一回合
                this.NextRound()
            }else {
            // 怪物回合
                // 怪物攻擊 - 玩家受傷
                let TotalDamage = <number>(0)
                this.Monsters.forEach((item,index)=> {
                    if (!item.DeathOrLive) {
                        TotalDamage += item.Damage.value
                    }
                })
                this.Player.TakeDamage(TotalDamage, this.Player)
                // 自動攻擊
                // 動畫

                // 結束動作

                // 下一回合
                this.NextRound()
            }   


        }
    }
    NextRound(): void {
        this.Round ++ 
        // this.StartRound()
    }
    CountDown(): Promise<void> {
        return new Promise(()=> {
            setTimeout(()=>{
                console.log('倒數計時開始')
            },2000)
        })
    }

    MessageChannel():void {
        this.targetValue.ProcessTarget(12412)
    }
     // 行為 - 檢查基數偶數
    CheckEvenOrOdd(): boolean{
        // 回合數為偶數
        if ( this.Round % 2 === 0 ) {
            return false
        // 回合數為奇數
        }else {
            return true
        }
    }
} 