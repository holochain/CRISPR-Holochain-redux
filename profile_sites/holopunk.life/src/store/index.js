import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [
      {
        "title": "Identifying agents",
        "author": "Philip Beadle",
        "category": "CRISPR",
        "hero": "https://images.unsplash.com/photo-1541261248599-cef2fcabf912?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ"
      }
    ],
    drawer: false,
    items: [
      {
        text: 'Home',
        href: '#!',
      },
      {
        text: 'About',
        href: '#about',
      },
    ],
  },
  getters: {
    categories: state => {
      const categories = []

      for (const article of state.articles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        ) continue

        const text = article.category

        categories.push({
          text,
          href: '#!',
        })
      }

      return categories.sort().slice(0, 4)
    },
    links: (state, getters) => {
      return state.items.concat(getters.categories)
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
  },
  actions: {

  },
})
