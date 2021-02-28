import Vue from 'vue'
import Vuex from 'vuex'
Vue.config.productionTip = false

Vue.use(Vuex)

const getDefaultState = () => {
    return {
        allSuspectWords: ['palavra1', "palavra2"],
        messages: [
            {
                suspectWords: [ 'palavra1', 'palavra2' ],
                content: 'poxa vida palavra1 eoq msm palavra2',
                from: 'lucas',
                to: 'ana',
                date: 1614546439891
            },
            {
                suspectWords: [ 'palavra1' ],
                content: 'poxa vida palavra1 hehehe',
                from: 'lucas',
                to: 'ana',
                date: 1614546439800
            }
        ]
    }
}

export default new Vuex.Store({
    state: getDefaultState(),
    mutations: {
        newMessageIntercepted: function (state, payload) {
          state.messages.push(payload)
        },
        setMessages: (state, payload) => state.messages = payload,
        setAllSuspectWords: (state, payload) => state.allSuspectWords = payload,
        insertSuspectWordsIfDoesntExists: function (state, payload) {
            payload.forEach( word => {
                if (state.allSuspectWords.indexOf(word) === -1)
                    state.allSuspectWords.push(word)
            })
        },
    },
    getters: {
        messages: state => state.messages,
        allSuspectWords: state => state.allSuspectWords,
    }
})