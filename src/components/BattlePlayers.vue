<script setup>
import { computed, reactive, ref, watch } from 'vue'
import Dropdown from '@/components/Dropdown.vue'
import PlayerStats from '@/components/PlayerStats.vue'
import { useMunchkinStore } from '@/stores/MunchkinStore'

const props = defineProps(['initialPlayer', 'attack'])
const emit = defineEmits(['update:attack'])

const { getImageUrl, getPlayer, getPlayersList } = useMunchkinStore()

const players = reactive([])

const addPlayerToBattle = (playerId) => {
  players.push(Object.assign(getPlayer(playerId), {modifier: 0}))
}

addPlayerToBattle(props.initialPlayer)

const currentTabPlayer = ref(0)
const currentPlayer = computed(() => players.at(currentTabPlayer.value))

const dropdownPlayers = getPlayersList
  .filter(x => x.id !== parseInt(props.initialPlayer))
  .map(x => ({
    label: x.name,
    callback: () => {
      addPlayerToBattle(x.id)
    }
  }))

watch(players, (newValue) => {
  const totalAttack = newValue.reduce((count, x) => count += x.level + x.items + x.modifier, 0)
  emit('update:attack', totalAttack)
}, { immediate:true })
</script>

<template>
    <div class="border-b border-gray-200 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-primary-900">
            <li v-for="(player, tabId) in players">
              <span class="cursor-pointer inline-flex py-2 px-4 border-b group items-center rounded-t-lg"
                    :class="{'--tab-active': currentTabPlayer === tabId }"
                    @click="currentTabPlayer = tabId"
              >
                <img class="h-8 rounded-full mr-2 border border-gray-400"
                     :src="getImageUrl(player.image)"
                     alt="">
                {{ player.name }}
              </span>
            </li>
            <div v-if="players.length < 2">
                <dropdown class="" :items="dropdownPlayers">
                    <li class="flex items-center p-2">
                      <span class="cursor-pointer flex p-2 group items-center">
                          <i class="fa fa-plus mr-2"></i>
                          Add ally
                      </span>
                    </li>
                </dropdown>
            </div>
        </ul>
    </div>
    <PlayerStats :key="currentPlayer.id"
                 :playerId="currentPlayer.id"
                 v-model:modifier="currentPlayer.modifier"
    />
</template>
