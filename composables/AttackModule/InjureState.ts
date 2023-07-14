import { CharactorAbility } from "../CharactorModule/BasicCharactor";
interface AttackType {
    TakeDamage(damage:number, instance: any): Promise<boolean>;
}

// 玩家受傷方式
export class PlayerType implements AttackType {        
    TakeDamage( damage:number, instance: any): Promise<boolean> {
        return new Promise((resolve, reject)=> {
            try {
                if( instance.Armor.value >= 0 ) {
                    if ( damage > instance.Armor.value ) {
                        let decrement = damage - instance.Armor.value
                        instance.Armor.value = 0
                        instance.Heart.value -= decrement   
                    }else {
                        instance.Armor.value -= damage
                    }
                }else {
                    instance.Heart.value -= damage
                    if (instance.Heart.value <= 0) {
                        instance.Heart.value = 0
                    }
                }
                resolve(true)
            }catch {
                reject(false)
            }
        })
    }
}

// 怪物受傷方式
export class MonsterType implements AttackType {
    TakeDamage(damage:number, instance: any): Promise<boolean> {
        return new Promise((resolve, reject)=> {
            try {
                if( instance.Armor.value >= 0 ) {
                    if ( damage > instance.Armor.value ) {
                        let decrement = damage - instance.Armor.value
                        instance.Armor.value = 0
                        instance.Heart.value -= decrement   
                    }else {
                        instance.Armor.value -= damage
                    }
                }else {
                    instance.Heart.value -= damage
                    if (instance.Heart.value <= 0) {
                        instance.Heart.value = 0
                    }
                }
                resolve(true)
            }catch {
                reject(false)
            }
        })
    }
}

//選擇後回傳玩家攻擊物件或怪物攻擊物件
// export class ChooseType {
//     // type 選擇要攻擊的方式
//     // damage 變數
//     async OutputInstance(type: AttackType,damage: number,instance: any): boolean {
//         // type.AttackTarget(damage)
//         let obj = await type.TakeDamage(damage, instance) 
//         return obj
//     }
// }