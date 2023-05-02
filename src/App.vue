<script setup>
import TopHeader from '@/components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <TopHeader />
    <main class="container mx-auto px-4 p-5 flex flex-col">
       <router-view v-slot="{ Component, route }">
           <Transition>
               <component :is="Component" :key="route.path"></component>
           </Transition>
        </router-view>
    </main>
  </div>
</template>

<style lang="sass">
.app
  @apply bg-secondary-300
  height: 100vh
.float-btn
  @apply drop-shadow-md h-14 w-14 justify-center cursor-pointer
  position: fixed
  bottom: 1rem
  right: 1rem
.v-enter-active
  transition: opacity 0.3s ease
.v-enter-from, .v-leave-to
  opacity: 0
</style>
