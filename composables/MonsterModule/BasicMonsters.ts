import { Monster } from "composables/useMonster2";
import { MonsterType } from '../AttackModule/InjureState';
import { ChooseAnimation } from '../AniamtionModule/AnimaitonSet'
import { AnimationEnum } from '../TypeSystem'
export interface MonsterAbility {
    Name: Ref<string>;
    Race: Ref<string>;
    Heart: Ref<number>;
    Armor: Ref<number>;
    Offense: Ref<number>;
    Damage: Ref<number>;
    Index: Ref<number>;
    DeathOrLive: boolean;
    InjureInstace: MonsterType;
    // 變數 - 動畫物件 
    AnimationInstance: ChooseAnimation;
    TakeDamage(damage: number, instance: MonsterAbility): Promise<boolean>;
}

export class Monster1 implements MonsterAbility {
    public Name = ref<string>('');
    public Race = ref<string>('');
    public Heart = ref<number>(0);
    public Armor = ref<number>(0);
    public Offense = ref<number>(0);
    public Damage = ref<number>(0);
    public Index = ref<number>(0);
    public DeathOrLive = <boolean>(false);
    public InjureInstace: MonsterType; 
    // 變數 - 動畫物件 
    public AnimationInstance: ChooseAnimation; 
    constructor(Name: string, Race: string,Heart: number,Armor: number, Offense: number, Damage: number,index: number){
        this.Name.value = Name
        this.Race.value = Race
        this.Heart.value = Heart
        this.Armor.value = Armor
        this.Offense.value = Offense
        this.Damage.value = Damage
        this.Index.value = index
        // 建立玩家受傷物件
        this.InjureInstace = new MonsterType;
        this.AnimationInstance = new ChooseAnimation();
    }
    async TakeDamage(damage: number, instance: MonsterAbility): Promise<boolean> {
        // 回傳受傷結果 boolean
        let result = await this.InjureInstace.TakeDamage(damage, instance)
        // 進行動畫
        let target = document.querySelectorAll(`.monsterImg`);
        this.AnimationInstance.OutputInstance(AnimationEnum.InjureAnimation, target[this.Index.value])
        // 回傳RoundSystem
        return result
    }
}
export class Monster2 implements MonsterAbility {
    public Name = ref<string>('');
    public Race = ref<string>('');
    public Heart = ref<number>(0);
    public Armor = ref<number>(0);
    public Offense = ref<number>(0);
    public Damage = ref<number>(0);
    public Index = ref<number>(0);
    public DeathOrLive = <boolean>(false);
    public InjureInstace: MonsterType; 
    // 變數 - 動畫物件 
    public AnimationInstance: ChooseAnimation; 
    constructor(Name: string, Race: string,Heart: number,Armor: number, Offense: number, Damage: number,index: number){
        this.Name.value = Name
        this.Race.value = Race
        this.Heart.value = Heart
        this.Armor.value = Armor
        this.Offense.value = Offense
        this.Damage.value = Damage
        this.Index.value = index
        // 建立玩家受傷物件
        this.InjureInstace = new MonsterType;
        this.AnimationInstance = new ChooseAnimation();
    }
    async TakeDamage(damage: number, instance: MonsterAbility): Promise<boolean> {
        // 回傳受傷結果 boolean
        let result = await this.InjureInstace.TakeDamage(damage, instance)
        // 進行動畫
        let target = document.querySelectorAll(`.monsterImg`);
        this.AnimationInstance.OutputInstance(AnimationEnum.InjureAnimation, target[this.Index.value])
        // 回傳RoundSystem
        return result
    }
}

// 根據怪物等級回傳相對應的怪物等級物件物
export class FilterMonster {
    ChooseRace(Name: string, Race: string,Heart: number,Armor: number, Offense: number, Damage: number, index: number): any {
        if (Race === '1') {
            return new Monster1(Name, Race, Heart, Armor, Offense, Damage, index) 
        }else {
            return new Monster2(Name, Race, Heart, Armor, Offense, Damage, index)
        }
    }
}