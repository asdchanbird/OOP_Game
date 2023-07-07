export enum MessageType {
    attack = 'attack',
    offense = 'offense',
    select = 'select',
}

export interface itemType {
    id: number;
    select: boolean;
    el: HTMLElement | ComponentPublicInstance | null;
}