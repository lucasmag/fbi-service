<template>
  <div class="main">
    <md-table class="messages-table" v-model="searched" md-sort="date" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">{{ title }}</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Buscar mensagem" v-model="search" @input="searchOnTable"/>
        </md-field>

      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Remetente" md-sort-by="from">{{ item.from }}</md-table-cell>
        <md-table-cell md-label="Destinatário" md-sort-by="to">{{ item.to }}</md-table-cell>
        <md-table-cell md-label="Mensagem" md-sort-by="content">
          <text-highlight :queries="item.suspectWords">{{ item.content }}</text-highlight>
        </md-table-cell>
        <md-table-cell md-label="Horário" md-sort-by="date">{{ new Date(item.date).toLocaleString() }}</md-table-cell>
        <md-table-cell md-label="Palavras suspeitas">{{ item.suspectWords }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByContent = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.content).includes(toLower(term)))
  }

  return items
}
export default {
  name: "Mediator",
  data() {
    return {
      title: "Mensagens suspeitas",
      search: null,
      searched: [],
    };
  },
  computed: {
    messages: {
      get () {
        return this.$store.state.messages
      },
      set (msgs) {
        this.$store.commit('setMessages', msgs)
      }
    },
    suspectWords: {
      get () {
        return this.$store.state.allSuspectWords
      },
      set (words) {
        this.$store.commit('setAllSuspectWords', words)
      }
    }
  },
  methods: {
    searchOnTable () {
      this.searched = searchByContent(this.messages, this.search)
    },
  },

  created () {
    this.searched = this.messages
    console.log(this.suspectWords)
  }
};
</script>

<style scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.messages-table {
  width: 100%;
}
</style>
