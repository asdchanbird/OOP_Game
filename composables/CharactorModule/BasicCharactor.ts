import { PlayerType } from '../AttackModule/InjureState';
import { ChooseAnimation } from '../AniamtionModule/AnimaitonSet'
import { AnimationEnum } from '../TypeSystem'
export interface CharactorAbility {
    // 變數 - 名字
    Name: Ref<string>;
    // 變數 - 職業
    Job: Ref<string>;
    // 變數 - 生命值
    Heart: Ref<number>;
    // 變數 - 護甲值
    Armor: Ref<number>;
    // 變數 - 防禦值
    Offense: Ref<number>;
    // 變數 - 傷害值
    Damage: Ref<number>;
    // 變數 - 身亡狀態
    DeathOrLive: boolean;
    // 變數 - 受傷物件 
    InjureInstance: PlayerType;
    // 變數 - 動畫物件 
    AnimationInstance: ChooseAnimation;
    // 變數 - 受損傷函數
    TakeDamage(damage: number, instance: CharactorAbility): Promise<boolean>;
    // TakeAmimation(): void;
}

// 剣士類別
export class Swordman implements CharactorAbility {
    // 變數 - 名字
    public Name = ref<string>('');
    // 變數 - 職業
    public Job = ref<string>('');
    // 變數 - 生命值
    public Heart = ref<number>(0);
    // 變數 - 護甲值
    public Armor = ref<number>(0);
    // 變數 - 防禦值
    public Offense = ref<number>(0);
    // 變數 - 傷害值
    public Damage = ref<number>(0);
    // 變數 - 身亡狀態
    public DeathOrLive = <boolean>(false); 
    // 變數 - 受傷物件 
    public InjureInstance: PlayerType; 
    // 變數 - 動畫物件 
    public AnimationInstance: ChooseAnimation; 
    // 建構函數
    constructor(Name: string, Job: string,Heart: number,Armor: number, Offense: number, Damage: number) {
        this.Name.value = Name;
        this.Job.value = Job;
        this.Heart.value = Heart;
        this.Armor.value = Armor;
        this.Offense.value = Offense;
        this.Damage.value = Damage;
        // 建立玩家受傷物件
        this.InjureInstance = new PlayerType;
        this.AnimationInstance = new ChooseAnimation();
    }
    // 行為 - 受傷害函數
    async TakeDamage(damage: number, instance: CharactorAbility): Promise<boolean> {
        // 回傳受傷結果 boolean
        let result = await this.InjureInstance.TakeDamage(damage, instance)
        // 進行動畫
        let target = document.querySelector('.playerImg') as HTMLElement
        this.AnimationInstance.OutputInstance(AnimationEnum.InjureAnimation, target)
        // 回傳RoundSystem
        return result
    }
}
// 弓箭手類別
export class Archer implements CharactorAbility {
    // 變數 - 名字
    public Name = ref<string>('');
    // 變數 - 職業
    public Job = ref<string>('');
    // 變數 - 生命值
    public Heart = ref<number>(0);
    // 變數 - 護甲值
    public Armor = ref<number>(0);
    // 變數 - 防禦值
    public Offense = ref<number>(0);
    // 變數 - 傷害值
    public Damage = ref<number>(0);
    // 變數 - 身亡狀態
    public DeathOrLive = <boolean>(false); 
    // 變數 - 受傷物件 
    public InjureInstance: PlayerType; 
    // 變數 - 動畫物件 
    public AnimationInstance: ChooseAnimation; 
    // 建構函數
    constructor(Name: string, Job: string,Heart: number,Armor: number, Offense: number, Damage: number) {
        this.Name.value = Name;
        this.Job.value = Job;
        this.Heart.value = Heart;
        this.Armor.value = Armor;
        this.Offense.value = Offense;
        this.Damage.value = Damage;
        // 建立玩家受傷物件
        this.InjureInstance = new PlayerType;
        // 建立動畫物件
        this.AnimationInstance = new ChooseAnimation();
    }
    // 行為 - 受傷害函數
    async TakeDamage(damage: number, instance: CharactorAbility): Promise<boolean> {
        // 回傳受傷結果 boolean
        let result = await this.InjureInstance.TakeDamage(damage, instance)
        // 進行動畫
        let target = document.querySelector('.playerImg') as HTMLElement
        this.AnimationInstance.OutputInstance(AnimationEnum.InjureAnimation, target)
        // 回傳RoundSystem
        return result
    }
}


// 選擇職業回傳相對應的玩家職業物件
export class ChooseJob {
    ChooseJob(Name: string, Job: string,Heart: number,Armor: number, Offense: number, Damage: number): any {
        if (Job === 'Swordman') {
            return new Swordman(Name, Job, Heart, Armor, Offense, Damage) 
        }else {
            return new Archer(Name, Job, Heart, Armor, Offense, Damage)
        }
    }
}
