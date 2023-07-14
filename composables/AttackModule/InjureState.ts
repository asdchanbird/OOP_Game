interface AttackType {
    TakeDamage(damage:number, instance: any): Promise<void>;
}

// 玩家攻擊方式
export class PlayerType implements AttackType {        
    TakeDamage( damage:number, instance: any): Promise<void> {
        return new Promise(()=> {
            console.log('生命值減少')
        })
    }
}

// 怪物攻擊方式
export class MonsterType implements AttackType {
    TakeDamage(damage:number, instance: any): Promise<void> {
        return new Promise(()=> {
            
            console.log('生命值減少')
        })
    }
}

//選擇後回傳玩家攻擊物件或怪物攻擊物件
export class ChooseType {
    // type 選擇要攻擊的方式
    // args 變數
    OutputInstance(type: AttackType,args: number,instance: any): void {
        // type.AttackTarget(args)
        // type.TakeDamage(args, instance)
    }
}