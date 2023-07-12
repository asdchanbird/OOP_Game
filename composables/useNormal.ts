export enum MessageType {
    attack = 'attack',
    offense = 'offense',
    select = 'select',
    enermy = 'enermy',
    injure = 'injure'
}

export interface itemType {
    id: number;
    select: boolean;
    el: HTMLElement | ComponentPublicInstance | null;
}
//-----------------------------------------------------------------------


export enum GetMessage {
    EndRound = 'EndRound',
    // Attack = 'Attack',
    Offense = 'Offense',
    MyRound = 'MyRound',
    Injure = 'Injure',
}
export enum SentMessage {
    EndRound = 'EndRound',
    Injure = 'Injure',
    Attack = 'Attack',
    Offense = 'Offense',
    MyRound = 'MyRound',
    FinishWork = 'FinishWork',
}

export type BasicAction<T, U> = {
    id: T,
    data: U
}

export type MessageInfo<T> = {
    id: T,
    message: T
}

export interface Message {
    role: string;
    message: string;
    data?: any;
}


export interface Chacracter {
    Name: Ref<string>;
    Damage: Ref<number>;
    Heart: Ref<number>;
    Armor: Ref<number>;
    Offense: Ref<number>;
    DeathOrLive: Ref<boolean>;
}

export interface GetSentMessage {
    SentMessage(message: Message): void;
    GetMessage(message: Message): void;
}