<script setup lang="ts">
declare var $: any;
class Div {
    public Right: number = 50;
    public Left: number = 50;
    public Top: number = 50;
    public Bottom: number = 50;
    public IsDown = <boolean>false;
    public IsMove = <boolean>false;
    public State = <string>('');
    public StartX = <number>(0);
    public StartY = <number>(0);
    constructor() {
        this.resize()
        this.mouseUp()
        this.mouseMove()
        onMounted(()=> {
            const resizableDiv = document.getElementById("resizableDiv") as any;
            const resizeHandles = document.getElementsByClassName("resizeHandle");
            this.Bottom += resizableDiv.clientHeight + 2 
            this.Top += resizableDiv.clientHeight + 2 
            this.Right += resizableDiv.clientWidth + 2 
            this.Left += resizableDiv.clientWidth + 2 
        })
    }
    mouseDown(e: MouseEvent): void {
        // e.preventDefault()
        // e.stopPropagation()
        console.log('down')
        console.log(e)
        let result = $(e.target).attr('id') as string
        console.log(result)
        if ( result !== 'resizableDiv') {
            this.IsDown = true
        }else {
            this.IsMove = true
            this.StartX = e.clientX
            this.StartY = e.clientY
        }
        this.State = result
    }
    resize(): void {
        onMounted(()=> {
            window.addEventListener('mousemove', (e: MouseEvent)=> {
                // e.stopPropagation()
                // e.preventDefault()
                if (this.IsDown) {
                    console.log(this.IsDown)
                    // console.log(e,'按著')
                    const resizableDiv = document.getElementById("resizableDiv") as any;
                    if (this.State === 'right' || this.State === 'left' ) {
                        $(resizableDiv).css('width', e.clientX-50)
                    }else {
                        $(resizableDiv).css('height', e.clientY-50)
                        // if (this.State === 'top') {
                        //     $(resizableDiv).css('top', e.clientY)                            
                        // }else {
                        // }
                    }
                }
            })
        })
    }
    mouseMove(): void {
        onMounted(()=> {
            window.addEventListener('mousemove', (e: MouseEvent) => {
                // e.stopPropagation()
                if (this.IsMove) {
                    console.log(this.IsMove)
                    const resizableDiv = document.getElementById("resizableDiv") as any;
                    console.log(e)
                    let X = e.clientX - this.StartX 
                    let Y = e.clientY - this.StartY 
                    $(resizableDiv).css({
                        'transform': `translate(${X+ 50}px, ${Y + 50}px)`,
                    })
                }
            })
        })
    }
    mouseUp(): void {
        onMounted(()=> {
            window.addEventListener('mouseup', (e: MouseEvent) => {
                this.IsDown = false
                this.IsMove = false
                console.log('up')
                // console.log(e, '沒按')
            })
        })
    }
}
// @mousemove="div.mouseMove($event)"
const div = new Div()
</script>
<template>
    <div>
        <div id="resizableDiv" @mousedown="div.mouseDown($event)" class="overflow-hidden">
            <div class="resizeHandle top" id="top" @mousedown="div.mouseDown($event)"></div>
            <div class="resizeHandle right" id="right" @mousedown="div.mouseDown($event)"></div>
            <div class="resizeHandle bottom" id="bottom" @mousedown="div.mouseDown($event)"></div>
            <div class="resizeHandle left" id="left" @mousedown="div.mouseDown($event)"></div>
            <!-- <div class="bg-blue-300 h-full text-center">123</div> -->
        </div>        
    </div>
</template>

<style lang="scss" scoped>
#resizableDiv {
  position: relative;
  top: 50px;
  left: 50px;
  width: 200px;
  height: 200px;
  border: 1px dashed #000;
  cursor: move;
}

.resizeHandle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #000;
}

.resizeHandle.top {
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  cursor: s-resize;
}

.resizeHandle.right {
    top: 50%;
    right: -5px;
    transform: translateY(-50%);
    cursor: w-resize;
}

.resizeHandle.bottom {
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    cursor: s-resize;
}

.resizeHandle.left {
    top: 50%;
    left: -5px;
    transform: translateY(-50%);
    cursor: w-resize;
}

</style>