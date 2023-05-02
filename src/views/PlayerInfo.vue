<script setup>
import { computed, ref } from 'vue'
import StatButton from '@/components/StatButton.vue'
import { useMunchkinStore } from '@/stores/MunchkinStore'
const { getPlayer, getImageUrl, removePlayer } = useMunchkinStore()
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    required: true
  }
})

const router = useRouter()
const player = getPlayer(props.id)
if (!player) router.push('/')
const modifier = ref(0)

const stats = [
  {
    value: computed(() => player.level),
    label: 'Level',
    color: 'text-primary-900',
    icon: 'fa-crown',
    callback: (count) => player.level += count
  },
  {
    value: computed(() => player.items),
    label: 'Items',
    color: 'text-gray-500',
    icon: 'fa-shirt',
    callback: (count) => player.items += count
  },
  {
    value: computed(() => modifier.value),
    label:'Modifier',
    color: 'text-blue-700',
    icon: 'fa-scale-balanced',
    callback: (count) => modifier.value += count
  }
]

const deletePlayer = () => {
  removePlayer(player.id)
  router.push({ name: 'home' })
}
</script>

<template>
    <div class="float-btn btn-primary-outline rounded-full" @click="deletePlayer">
        <i class="fa fa-trash "></i>
    </div>
    <div v-if="player">
        <div class="flex items-center space-x-4">
            <img class="w-20 h-20 rounded-full drop-shadow" :src="getImageUrl(player.image)" alt="">
            <div class="font-medium">
                <div>{{ player.name }}</div>
                <div class="mt-3 leading-5 text-primary-300"
                     title="gender"
                     @click="player.isMale = !player.isMale"
                >
                    <i class="fa fa-xl" :class="player.isMale ? 'fa-mars': 'fa-venus'"></i>
                </div>
            </div>
        </div>
        <div class="text-center p-5 my-3">
            <p class="text-red-900 text-3xl font-bold"
               title="atack"
            >
                <i class="fa fa-hand-fist"></i>
                Attack {{ player.level + player.items + modifier }}
            </p>
        </div>
        <div class="flex flex-col gap-5">
            <StatButton v-for="item in stats"
                        :key="item.label"
                        :value="item.value"
                        :label="item.label"
                        :color="item.color"
                        :icon="item.icon"
                        @update-counter="item.callback"
            >
                {{ player.level }}
            </StatButton>
        </div>
    </div>
</template>

<style scoped lang="sass">
</style>
