import { createRouter, createWebHistory } from 'vue-router'
import MunchkinView from '@/views/PlayersListView.vue'
import AddPlayerView from '@/views/AddPlayerView.vue'
import PlayerInfo from '@/views/PlayerView.vue'
import BattleView from '@/views/BattleView.vue'


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
        title: 'Munchkin',
        showCube: true
      },
      props: true,
      component: PlayerInfo
    },
    {
      path: '/battle/:id/',
      name: 'battle',
      meta: {
        title: 'Battle',
        showCube: true,
        goBack: 'showPlayer'
      },
      props: true,
      component: BattleView
    },
  ]
})

export default router
