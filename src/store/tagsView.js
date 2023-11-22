import { defineStore } from 'pinia'

export const useTagsViewStore = defineStore('tagView', {
  state: () => {
    return {
      cachedViews: [],
      visitedViews: []
    }
  },
  actions: {
    /**
     * 添加
     * @param {*} view
     * @returns
     */
    addView(view) {
      console.log(view.meta.title)
      // 去重操作
      if (this.visitedViews.some(item => item.path === view.path)) {
        return false
      }
      // 当没有标题
      this.visitedViews.push({ ...view, title: view.meta?.title || 'tag-name' })
      this.addCachedView(view)
    },
    /**
     * 添加到缓冲中
     * @param {*} view
     * @returns
     */
    addCachedView(view) {
      if (this.cachedViews.includes(view.name)) return
      // 需要缓冲
      if (view.meta.keepAlive) {
        this.cachedViews.push(view.name)
      }
    },
    /**
     * 刷新
     * @param {*} view
     */
    delCachedView(view) {
      const index = this.cachedViews.indexOf(view.name)
      index > -1 && this.cachedViews.splice(index, 1)
    },
    /**
     * 删除
     * @param {*} view
     */
    delView(view) {
      const i = this.visitedViews.indexOf(view)
      if (i > -1) {
        this.visitedViews.splice(i, 1)
      }
      this.delCachedView(view)
    },
    /**
     * 全部关闭
     */
    delAllView() {
      this.visitedViews = this.visitedViews.filter(tag => tag.meta.affix)
      this.cachedViews = []
    },
    /**
     * 关闭其他
     * @param {*} view
     */
    delOthersViews(view) {
      this.visitedViews = this.visitedViews.filter(
        tag => tag.meta.affix || tag.path === view.path
      )
      this.cachedViews = this.cachedViews.filter(name => name !== view.name)
    }
  },
  persist: true
})
