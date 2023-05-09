<script setup>
import { computed, ref } from 'vue'
import StatButton from '@/components/StatButton.vue'
import { useMunchkinStore } from '@/stores/MunchkinStore'
const { getPlayer, getImageUrl } = useMunchkinStore()

const props = defineProps({
  playerId: {
    required: true
  },
  modifier: {
    required: true,
    type: Number
  }
})

const emit = defineEmits(['update:modifier'])

const player = getPlayer(props.playerId)

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
    value: computed(() => props.modifier),
    label: 'Modifier',
    color: 'text-indigo-900',
    icon: 'fa-scale-balanced',
    callback: (count) => emit('update:modifier', props.modifier + count)
  }
]
</script>

<template>
    <div v-if="player" class="p-2">
        <div class="avatar-title flex items-center space-x-4 mb-2">
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
        <div class="attack-counter text-center p-3 my-3">
            <p class="text-red-900 text-3xl font-bold"
               title="atack"
            >
                <i class="fa fa-hand-fist mr-1"></i>
                Attack {{ player.level + player.items + modifier }}
            </p>
        </div>
        <div class="stats flex flex-col gap-4">
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
