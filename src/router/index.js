import { createRouter, createWebHistory } from 'vue-router'
import MunchkinView from '@/views/PlayersListView.vue'
import AddPlayerView from '@/views/AddPlayerView.vue'
import PlayerInfo from '@/views/PlayerInfo.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MunchkinView
    },
    {
      path: '/new-player/',
      name: 'addPlayer',
      meta: {
        title: 'Add player'
      },
      component: AddPlayerView
    },
    {
      path: '/player/:id/',
      name: 'showPlayer',
      meta: {
        title: 'Munchkin'
      },
      props: true,
      component: PlayerInfo
    },
  ]
})

export default router
