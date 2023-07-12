import { MessageType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, Chacracter, GetSentMessage } from '../composables/useNormal'
export class Difference {
    constructor() {

    }
    // 行為 - 檢查基數偶數
    CheckEvenOrOdd(Round: number): string{
        // 回合數為偶數
        if ( Round % 2 === 0 ) {
            return "Monster"
        // 回合數為奇數
        }else {
            return "Player"
        }
    }
    Separate(target: GetSentMessage, Round: number,): void {
        let Role = this.CheckEvenOrOdd(Round)

        if ( Role === 'Player' ) {
            
        }else {
            
        }
    }
    
}