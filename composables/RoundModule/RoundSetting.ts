import { InjureAnimation, GetArmorAnimation, ChooseAnimation } from '../AniamtionModule/AnimaitonSet'
import { Monster } from "../useMonster2";
import { Player } from "../usePlayer2";
import { TargetObject } from '../MessageModule/MessageChannel'
export class RoundSystem {
    public Player: Player;
    public Monsters: any[]= ([]);
    public GameOver = <boolean>(false);
    public Round = <number>(0);
    public Select = <number>(0);
    public CurrentRound = <boolean>(false);
    public AnimationInstance: ChooseAnimation;
    public targetValue: TargetObject;
    constructor(player: Player, monsters: Monster[]) {
        // 儲存玩家物件
        this.Player = player
        // 儲存怪物物件
        this.Monsters = monsters
        // 建立動畫物件
        this.AnimationInstance = new ChooseAnimation();
        // 建立訊息物件
        this.targetValue = new TargetObject();
    }
    // 回合開始
    async StartRound(): Promise<void> {

        if (!this.GameOver) {
            // 玩家回合
            if (this.CheckEvenOrOdd()) {
                
                // 倒數計時60s

                // 事件監聽器啟動 (事件監聽是剣放在角色物件中)
                // 動畫
                // 結束動作

                // 下一回合
                this.NextRound()
            }else {
            // 怪物回合
                
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
        this.StartRound()
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