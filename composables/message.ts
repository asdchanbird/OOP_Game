import { MessageType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, Chacracter, GetSentMessage } from '../composables/useNormal'
export class Messagess {
    constructor(role:string, message: string, data?: any) {
    }
    Sent(target: GetSentMessage, message: Message ): void {
        if (typeof target !== undefined ) {
            console.log(message)
            target.SentMessage(message)
            console.log(123123)
        }
    }
    Get( target: GetSentMessage, message: Message): void {
         if (typeof target !== undefined ) {
            target.GetMessage(message)
        }
    }
}
