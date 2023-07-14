import { Monster } from "composables/useMonster2";

interface MonsterAbility {
    Name: string;
    Race: string;
    Heart: number;
    Armor: number;
    Offense: number;
    Damage: number;
    DeathOrLive: boolean; 
}

export class Monster1 implements MonsterAbility {
    public Name: string;
    public Race: string;
    public Heart: number;
    public Armor: number;
    public Offense: number;
    public Damage: number;
    public DeathOrLive = <boolean>(false);
    constructor(Name: string, Race: string,Heart: number,Armor: number, Offense: number, Damage: number){
        this.Name = Name
        this.Race = Race
        this.Heart = Heart
        this.Armor = Armor
        this.Offense = Offense
        this.Damage = Damage
    }
}
export class Monster2 implements MonsterAbility {
    public Name: string;
    public Race: string;
    public Heart: number;
    public Armor: number;
    public Offense: number;
    public Damage: number;
    public DeathOrLive = <boolean>(false);
    constructor(Name: string, Race: string,Heart: number,Armor: number, Offense: number, Damage: number){
        this.Name = Name
        this.Race = Race
        this.Heart = Heart
        this.Armor = Armor
        this.Offense = Offense
        this.Damage = Damage
    }
}

// 根據怪物等級回傳相對應的怪物等級物件物件
export class ChooseRace {
     ChooseRace(Name: string, Race: string,Heart: number,Armor: number, Offense: number, Damage: number): any {
        if (Race === '123') {
            return new Monster1(Name, Race, Heart, Armor, Offense, Damage) 
        }else {
            return new Monster2(Name, Race, Heart, Armor, Offense, Damage)
        }
    }
}