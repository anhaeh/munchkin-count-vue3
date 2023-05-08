<script setup>
import { computed, ref } from 'vue'
import StatButton from '@/components/StatButton.vue'
import { useMunchkinStore } from '@/stores/MunchkinStore'
const { getPlayer, getImageUrl, removePlayer } = useMunchkinStore()
import { useRouter } from 'vue-router'
import Dropdown from '@/components/Dropdown.vue'

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
    callback: (count) => {
      const newLevel = player.level + count
      if (newLevel >= 1 && newLevel <= 10) player.level = newLevel
    }
  },
  {
    value: computed(() => player.items),
    label: 'Items',
    color: 'text-teal-700',
    icon: 'fa-shirt',
    callback: (count) => player.items += count
  },
  {
    value: computed(() => modifier.value),
    label:'Modifier',
    color: 'text-indigo-900',
    icon: 'fa-scale-balanced',
    callback: (count) => modifier.value += count
  }
]

const dropdownItems = [
  {
    label: 'Kill Player',
    icon: 'fa-skull',
    callback: () => {
        player.items = 0
        modifier.value = 0
    }
  },
  {
    label: 'Remove Player',
    icon: 'fa-trash',
    callback: () => {
        removePlayer(player.id)
        router.push({ name: 'home' })
    }
  }
]
</script>

<template>
    <div>
        <div v-if="player" class="p-2">
            <div class="flex items-center space-x-4">
                <img class="w-20 h-20 rounded-full drop-shadow border-primary-300 border-2"
                     :src="getImageUrl(player.image)"
                >
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
                    <i class="fa fa-hand-fist mr-1"></i>
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
        <div class="btn-primary float-btn rounded-full" @click="router.push({name: 'battle', params: { id: props.id }})">
            <i class="fa fa-dungeon"></i>
        </div>
        <dropdown :items="dropdownItems">
            <div class="btn-primary-outline float-btn rounded-full left-5"
                 title="more"
            >
                <i class="fa fa-ellipsis-vertical"></i>
            </div>
        </dropdown>
    </div>
</template>
