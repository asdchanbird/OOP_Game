interface MessageType {
    CreateEventListener(name: string): void
    Channel(action: string): void;
}


export class AttackEvent implements MessageType {
    CreateEventListener(name: string): void {
        let Dom = document.querySelector(`.${name}`) as HTMLElement
        Dom.addEventListener('click', ()=> {
            this.Channel('Attack')
        }) 
    }
    Channel(action: string): string {
        return action
    }
}
export class OffenseEvent implements MessageType {
    CreateEventListener(name: string): void {
        let Dom = document.querySelector(`.${name}`) as HTMLElement
        Dom.addEventListener('click', ()=> {
            this.Channel('Attack')
        }) 
    }
    Channel(action: string): string {
        return action
    }
}


export class TargetObject {
    ProcessTarget(value: any) {
        console.log(value)
    }
}

// export class ChooseChannel {
//     ChannelConnect(type: MessageType, action: string): void {
//         type.Channel(action)
//     }
// }