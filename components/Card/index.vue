<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import { useDraggable } from '@vueuse/core'
import { UseDraggable } from '@vueuse/components'
// const el = ref<HTMLElement | null>(null)
// const el2 = ref<HTMLElement | null>(null)

onMounted(() => {

});

// `style` will be a helper computed for `left: ?px; top: ?px;`
// const { x, y, style } = useDraggable(el, {
//     initialValue: { x: 40, y: 40 },
// })

// `style` will be a helper computed for `left: ?px; top: ?px;`
// const { x2, y2, style2 } = useDraggable(el2, {
//     initialValue: { x: 400, y: 400 },
// })
</script>

<template>
    <div class="card-box"> 
        <h2>123</h2>
        <CardPhotoItem />
        <!-- <UseDraggable :initialValue="{ x: 100, y: 100 }" v-slot="{ x, y }" class="test">
      Drag me! I am at {{ x }}, {{ y }}
    </UseDraggable>
    <UseDraggable storage-key="vueuse-draggable" storage-type="session" class="test">
      Refresh the page and I am still in the same position!
    </UseDraggable> -->

         <!-- <div ref="el" :style="style" style="position: fixed" class="test">
        Drag me! I am at {{ x }}, {{ y }}
      </div> -->
    </div>
</template>

<style scoped>
.card-box {
    width: 200px;
    height: 400px;
    background-color: dodgerblue;
    border-radius: 10px;
    margin: 10px;
}

.test {
    border-radius: 10px;
    background-color: darkcyan;
    width: 100px;
    height: 100px;
    padding: 10px;
    cursor: move;
}
</style>
