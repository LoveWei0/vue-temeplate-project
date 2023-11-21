import { defineStore } from 'pinia'
export const useTagsViewStore = defineStore('tagView', {
  state: () => {
    return {
      cachedViews: []
    }
  },
  actions: {}
})
