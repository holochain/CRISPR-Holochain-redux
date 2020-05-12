const Parser = require('rss-parser')
const parser = new Parser()

export default {
  namespaced: true,

  state: {
    articles: []
  },
  mutations: {
    setArticles (state, payload) {
      state.articles = payload.articles
    }
  },
  getters: {
    listArticles: state => (base) => {
      return state.articles
    }
  },
  actions: {
    fetchNews: ({ state, commit, rootState }, base) => {
      parser.parseURL('https://blog.holochain.org/rss/').then((result) => {
        if (result.items === undefined) {
          console.log(result)
        } else {
          // console.log(result)
          const articles = []
          result.items.forEach(item => {
            const imgStartIndex = item['content:encoded'].indexOf('https://')
            const imgEndIndex = item['content:encoded'].indexOf('"', imgStartIndex)
            articles.push({
              img: item['content:encoded'].substring(imgStartIndex, imgEndIndex),
              title: item.title,
              link: item.link,
              content: item['content:encoded'],
              snippet: item.contentSnippet,
              author: item.creator,
              date: item.pubDate,
              guid: item.guid
            })
          })
          commit('setArticles', { articles: articles })
        }
      })
    }
  }
}
