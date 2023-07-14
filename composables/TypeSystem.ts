// 角色定位
export type Role = 'Player' | 'Monster';

// 動畫種類
export type AnimationType = 'GetArmorAnimation' | 'InjureAnimation';
// 動畫列舉
export enum AnimationEnum {
    GetArmorAnimation = 'GetArmorAnimation',
    InjureAnimation = 'InjureAnimation'
}

// 倒數計時項目列舉
export enum OptionType {
    Attack = 'Attack',
    Offense = 'Offense',
    TimeOut = 'TimeOut',
}


