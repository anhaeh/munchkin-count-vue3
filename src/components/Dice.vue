<script setup>
import {reactive} from 'vue'

const dice = reactive({
  value: 'one',
  loading: false
})
const rollDice = () => {
  dice.loading = true
  const newValue = Math.floor(Math.random() * 5) + 1
  const diceClasses = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six'
  }
  dice.value = diceClasses[newValue]
  setTimeout(() => dice.loading = false, 400)

}
</script>

<template>
    <div class="justify-center flex w-12 h-12 cursor-pointer items-center text-secondary-700"
         @click="rollDice">
        <i :class="[{'fa-bounce': dice.loading}, `fa-solid fa-dice-${dice.value} fa-3x`]"></i>
    </div>
</template>

<style scoped lang="sass">

</style>
