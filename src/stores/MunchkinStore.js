import { defineStore } from 'pinia'

export const useMunchkinStore = defineStore('munchkins', {
  state: () => {
    return {
      players: []
    }
  },
  getters: {
    getPlayersList: (state) => state.players
  },
  actions: {
    addPlayer: function (player) {
      const newPlayer = Object.assign({
        id: Date.now(),
        level: 1,
        items: 0
      }, player)
      this.players.push(newPlayer)
    },
    getPlayer: function(playerId) {
      return this.players.find(x => x.id === parseInt(playerId))
    },
    getImageUrl: function(imageId) {
      return new URL(`../assets/images/munchkins/avatar_${imageId}.png`, import.meta.url).href
    },
    removePlayer: function(playerId) {
      return this.players = this.players.filter(x => x.id !== parseInt(playerId))
    },
    newGame: function() {
      this.players = []
    },
  },
  persist: true
})
