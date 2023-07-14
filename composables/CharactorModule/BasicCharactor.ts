interface CharactorAbility {
    Name: string;
    Job: string;
    Heart: number;
    Armor: number;
    Offense: number;
    Damage: number;
    DeathOrLive: boolean; 
}

// 剣士類別
class Swordman implements CharactorAbility {
    public Name: string;
    public Job: string;
    public Heart: number;
    public Armor: number;
    public Offense: number;
    public Damage: number;
    public DeathOrLive = <boolean>(false); 
    constructor(Name: string, Job: string,Heart: number,Armor: number, Offense: number, Damage: number) {
        this.Name = Name
        this.Job = Job
        this.Heart = Heart
        this.Armor = Armor
        this.Offense = Offense
        this.Damage = Damage
    }
}
// 弓箭手類別
class Archer implements CharactorAbility {
    public Name: string;
    public Job: string;
    public Heart: number;
    public Armor: number;
    public Offense: number;
    public Damage: number;
    public DeathOrLive = <boolean>(false); 
    constructor(Name: string, Job: string,Heart: number,Armor: number, Offense: number, Damage: number) {
        this.Name = Name
        this.Job = Job
        this.Heart = Heart
        this.Armor = Armor
        this.Offense = Offense
        this.Damage = Damage
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
