<script setup>
import { useMunchkinStore } from '@/stores/MunchkinStore'
const { getImageUrl } = useMunchkinStore()

defineProps({
  player: {
    required: true,
    type: Object
  }
})

</script>

<template>
    <li class="munchkin-card"
        @click="$router.push({ name: 'showPlayer', params: { id: player.id }})"
    >
        <img class="h-14 flex-none rounded-full"
             :src="getImageUrl(player.image)"
             alt="">
        <div class="flex flex-col munchkin-details w-full gap-1">
            <div class="flex items-center">
                <div class="flex min-w-0 items-center">
                    <p class="text-xl font-semibold leading-6 text-gray-900">{{ player.name }}</p>
                    <div class="ml-2 text-sm mt-1 leading-5 text-gray-500"
                         title="gender"
                    >
                        <i class="fa fa-lg" :class="player.isMale ? 'fa-mars': 'fa-venus'"></i>
                    </div>
                </div>
            </div>
            <div class="flex justify-between">
                <div class="stats items-center flex gap-4">
                    <p class="text-red-900 text-lg font-bold"
                       title="atack"
                    >
                        <i class="fa fa-hand-fist"></i>
                        {{ player.level + player.items }}
                    </p>
                    <p class="text-gray-500 text-sm"
                       title="items"
                    >
                        <i class="fa fa-shirt"></i>
                        {{ player.items }}
                    </p>
                </div>

                <div class="text-xl text-primary-900 font-bold" title="level">
                    <i class="fa-solid fa-crown mr-1"></i>
                    {{ player.level }}
                </div>
            </div>
        </div>
    </li>
</template>

<style scoped lang="sass">
.munchkin-card
  @apply p-2 flex gap-2 bg-amber-50 rounded-md cursor-pointer hover:bg-secondary-100 drop-shadow-md items-center
</style>
