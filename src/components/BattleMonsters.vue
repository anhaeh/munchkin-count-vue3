<script setup>
import { computed, reactive, ref, watch } from 'vue'
import StatButton from '@/components/StatButton.vue'

defineProps(['attack'])
const emit = defineEmits(['update:attack'])

const currentTabMonster = ref(0)
const currentMonster = computed(() => monsters.at(currentTabMonster.value))
let monsters = reactive([])

const addMonster = () => {
  monsters.push({
    level: 1,
    modifier: 0
  })
}
const deleteMonster = () => {
  const monsterToDelete = currentTabMonster.value
  currentTabMonster.value = 0
  monsters.splice(monsterToDelete, 1)
}
addMonster()


watch(monsters, (newValue) => {
  const totalAttack = newValue.reduce((count, x) => count += x.level + x.modifier, 0)
  emit('update:attack', totalAttack)
}, { immediate:true })
</script>

<template>
    <div class="border-b border-gray-200">
        <ul class="flex flex-wrap text-sm -mb-px font-medium text-center text-primary-900">
            <li v-for="(monster, tabId) in monsters">
                    <span class="cursor-pointer inline-flex py-2 px-4 border-b group items-center rounded-t-lg"
                          :class="{'--tab-active': currentTabMonster === tabId }"
                          @click="currentTabMonster = tabId"
                    >
                        <img class="h-8 rounded-full mr-2 border border-gray-400" src="../assets/images/monster.png"
                             alt="">
                        Monster {{ tabId + 1 }}
                    </span>
            </li>
            <li class="flex items-center" @click="addMonster">
              <span class="cursor-pointer h-12 flex group items-center px-4 py-2">
                  <i class="fa fa-plus mr-2"></i>
                  Add
              </span>
            </li>
        </ul>
    </div>

    <div class="stats flex flex-col gap-2 p-2 mt-2">
        <div class="attack-counter text-center p-3 my-3">
            <p class="text-red-900 font-bold"
               title="atack"
            >
                <i class="fa fa-hand-fist mr-1"></i>
                Attack {{ currentMonster.level + currentMonster.modifier }}
            </p>
        </div>
        <StatButton :value="currentMonster.level"
                    label="Level"
                    color="text-primary-900"
                    icon="fa-crown"
                    @update-counter="e => currentMonster.level += e"
        >
            {{ currentMonster.level }}
        </StatButton>
        <StatButton :value="currentMonster.modifier"
                    label="Modifier"
                    color="text-indigo-900"
                    icon="fa-scale-balanced"
                    @update-counter="e => currentMonster.modifier += e"
        >
            {{ currentMonster.modifier }}
        </StatButton>
    </div>
    <div class="flex justify-center mt-5" v-if="currentTabMonster > 0">
        <div class="btn btn-primary justify-center w-1/2" @click="deleteMonster">Delete monster</div>
    </div>
</template>
