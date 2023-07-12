import { MessageType, GetMessage, SentMessage, BasicAction, MessageInfo, Message, Chacracter, GetSentMessage } from '../composables/useNormal'
import { Console } from '../composables/useMain'
export class ChannelMessage {
    private Server: Console;
    constructor(server: Console) {
        this.Server = server
    }
    Sent(target: GetSentMessage, message: Message ): void {
        if (typeof target !== undefined ) {
            console.log(message)
            target.SentMessage(message)
            console.log(123123)
            console.log(this.Server)
        }
    }
    Get( target: GetSentMessage, message: Message): void {
         if (typeof target !== undefined ) {
            target.GetMessage(message)
        }
    }
}
