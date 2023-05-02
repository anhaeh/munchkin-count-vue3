<script setup>
import { computed } from 'vue'
import { useRoute } from "vue-router"

const route = useRoute()

const isHome = computed(() => {
  return route.name === 'home'
})
</script>

<template>
  <header class="flex justify-between items-center px-3 py-2 bg-primary-800">
    <div class="flex items-center">
        <img v-if="isHome"  class="w-12 h-12" src="../assets/images/skeleton.png">
        <button v-else class="btn-primary h-12 w-12 rounded-full border-0 justify-center" @click="$router.push({ name: 'home' })">
            <i class="fa-solid fa-chevron-left fa-xl"></i>
        </button>
        <h2 class="pl-4 text-secondary-700 text-2xl font-bold"
            v-text="isHome ? 'Munchkin Counter' : $route.meta.title"
        >
        </h2>
    </div>
    <div class="flex gap-2">
        <div id="header"></div>
        <slot name="actions"></slot>
    </div>
  </header>
</template>

<style scoped>
</style>
