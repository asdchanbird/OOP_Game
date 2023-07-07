<script setup lang="ts">
    // const counter = useState('counter', () => Math.round(Math.random() * 1000))
    // const sameCounter = useState('counter')
    const counter = useCounter()
    // onMounted(()=> {
    //     console.log(counter.get)
    // })
</script>
<template>
    <div>
        <p>Counter: {{ counter }}</p>
        <p>
          <button @click="counter--">-</button>
          <button @click="counter++">+</button>
        </p>
        <!-- <p>Same Counter: {{ sameCounter }}</p> -->
    </div>
</template>