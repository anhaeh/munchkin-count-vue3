<script setup>
import { useMunchkinStore } from '@/stores/MunchkinStore'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const { addPlayer } = useMunchkinStore()
const router = useRouter()

const newPlayer = reactive({
  name: '',
  isMale: true,
  image: 1
})

const addNewPlayer = () => {
  addPlayer(newPlayer)
  router.push('/')
}

</script>

<template>
 <div class="bg-amber-50 rounded-md p-5">
     <form class="form flex flex-col gap-3" @submit.prevent="addNewPlayer">
         <div>
             <label for="name" class="block mb-2 font-medium text-primary-900">Name</label>
             <input required type="text" class="input" id="name" name="name"
                    v-model="newPlayer.name"
             >
         </div>
         <div>
             <label for="gender" class="block mb-2 font-medium text-primary-900">Gender</label>
             <select class="input" name="gender" id="gender"
                     v-model="newPlayer.isMale"
             >
                 <option :value="true">Male</option>
                 <option :value="false">Female</option>
             </select>
         </div>
         <div>
             <label for="image" class="block mb-2 font-medium text-primary-900">Avatar</label>
             <select class="input"
                     name="image" id="image"
                     v-model="newPlayer.image"
             >
                 <option v-for="x in 5"
                         v-text="`Avatar ${x}`"
                         :value="x"
                 ></option>
             </select>
         </div>
         <button type="submit" class="btn-primary-outline mt-6 text-xl justify-center">
             <i class="fa-solid fa-user"></i>
             Create
         </button>
     </form>
 </div>

</template>

<style scoped>

</style>
