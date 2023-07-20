<script setup lang="ts">
declare var document: any;
declare var $: any;
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'
import { json } from 'stream/consumers';
const point = ref(100);
useHead({
    title: '首頁',
    meta: [
        { name: 'description', content: 'My amazing site.'}
    ],
    bodyAttrs: {
        class: 'test',
    },
})

function applyDynamicResources(jsCode: string, cssStyle: string) {
    // 執行 JavaScript 代碼
    eval(jsCode);

    // 創建 style 元素並應用 CSS 樣式
    const styleElement = document.createElement('style') as HTMLElement;
    styleElement.textContent = cssStyle;
    document.head.appendChild(styleElement);
}
// 假設從伺服器端獲取到的 JS 代碼和 CSS 樣式存儲在變量中
const dynamicJSCode: string = "function asd() { console.log('Dynamic JS code executed!'); } asd()";
const dynamicCSSStyle: string = "body { color: red; }";
onMounted(()=> {
    // 在需要的地方調用 applyDynamicResources 函式
    applyDynamicResources(dynamicJSCode, dynamicCSSStyle);
})



//Nuxt的原理其實就是做一個server階段的dom元素主要是給爬蟲去吃的 client階段是給瀏覽器去吃 主要是去阻斷在server階段發生的錯誤
// 所以可能多需要多一層判斷是否在客戶端執行
// 主要用來判斷現在是伺服器端渲染還是客戶端渲染 如果server side render 回傳false ||  client side render 回傳ture
// process.client環境變數
console.log(process.client)
const el = ref < HTMLElement | null > (null)
// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
    initialValue: { x: 40, y: 40 },
})
if (process.client) {
    console.log(window)
    // bind object
    const state = useStorage('my-store', { hello: 'hi', greeting: 'Hello' })
    
    // bind boolean
    const flag = useStorage('my-flag', true) // returns Ref<boolean>
    
    // bind number
    const countsss = useStorage('my-count', 0) // returns Ref<number>
    
    // bind string with SessionStorage
    const id = useStorage('my-id', 'some-string-id', sessionStorage) // returns Ref<string>
    
    // delete data from storage
    state.value = null
}
//*** 只要是跟瀏覽器相關的物件 例如: document & window 只能在onMounted裡面去做執行 一定要確保有dom的元素在才行 不然會發生錯誤 ***/
onMounted(async()=> {
    console.log(window)
    setInterval(()=> {
        // console.log(point.value)
    },1000)
})

interface Json {
    title: string;
    description: string;
    height: string;
    countries: string[];
    continent: string;
    image: string;
    dir: string;
    path: string;
    slug: string;
    updatedAt: string;
}
const { data, pending, error, refresh } = await useAsyncData('mountains',() => $fetch('https://api.nuxtjs.dev/mountains')
)
// console.log(data.value)
let mount = ref<Json[]>([])
fetch('https://api.nuxtjs.dev/mountains',{
    method: 'GET'
}).then((res)=> {
    return res.json()
}).then((result)=> mount = result)

const sameCounter = useState('counter')
console.log(sameCounter.value,124124)
</script>

<template>
    <div>
        <h1 class="index">首頁</h1>
        <h2>{{ point }}</h2>
        <h3>{{ sameCounter }}123</h3>
        <!-- AUTO import component -->
        <Card />

            
        <!-- <ul> -->
            <!-- 有ssr -->
            <!-- <li v-for="item in data" :key="item.title">{{ item }}</li>
            <h2>1214142312</h2>
        </ul> -->
        <!-- <hr> -->
        <ul>
            <!-- 沒有ssr -->
            <li v-for="item in mount" :key="item.title">{{ item.title }}</li>
            <h2 class="font-bold bg-gray-400 text-blue-600 ">8819417412</h2>
        </ul>
        <div ref="el" :style="style" style="position: fixed" class="move">
            Drag me! I am at {{ x }}, {{ y }}
             <Todo />
        </div>
    </div>
</template>


<style scoped>
.test {
    border-radius: 10px;
    background-color: darkcyan;
    width: 100px;
    height: 100px;
    padding: 10px;
    cursor: move;
}
.move {
    cursor: move;
    border: 2px solid gray;
    border-radius: 10px;
}
</style>
