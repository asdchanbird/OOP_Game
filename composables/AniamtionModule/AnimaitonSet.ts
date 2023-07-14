interface AnimationBasic {
    Transform(target: HTMLElement): void;
}


// 受到傷害動畫
export class InjureAnimation implements AnimationBasic {
    Transform(target: HTMLElement): void {
        $(target).addClass('beAttack')

        setTimeout(()=> {
            $(target).removeClass('beAttack')
        },500)
    }
}

// 提升防禦動畫
export class GetArmorAnimation implements AnimationBasic {
    Transform(target: HTMLElement): void {
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
    OutputInstance(type: AnimationBasic, target:HTMLElement ): void {
        type.Transform(target)
    }
} 