import { AnimationEnum, AnimationType } from "../TypeSystem";
interface AnimationBasic {
    Transform(target: any): void;
}


// 受到傷害動畫
export class InjureAnimation implements AnimationBasic {
    Transform(target: any): void {
        $(target).addClass('beAttack')

        setTimeout(()=> {
            $(target).removeClass('beAttack')
        },500)
    }
}

// 提升防禦動畫
export class GetArmorAnimation implements AnimationBasic {
    Transform(target: any): void {
        $(target).addClass('offense')
        
        setTimeout(()=> {
            $(target).removeClass('offense')
        },500)
    }
}

// 輸出
export class ChooseAnimation {
    // type => 要使用的動畫類型
    // target => 動畫目標dom 
    OutputInstance(type: AnimationType, target:any ): void {
        switch (type) {
            case AnimationEnum.GetArmorAnimation:
                new GetArmorAnimation().Transform(target);
            case AnimationEnum.InjureAnimation:
                new InjureAnimation().Transform(target);


        }
    }
} 