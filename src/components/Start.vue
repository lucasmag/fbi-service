<template>
    <div class="main">
        <h1 style="padding: 50px 0">FBI Service</h1>

        <div class="options">
            <md-field style="margin: 10px 0">
                <label>Endereço do servidor</label>
                <md-input v-model="serverURI" placeholder="localhost:40000"></md-input>
            </md-field>
            <span v-if="serverInUse" class="warning" style="margin-bottom: 10px">Endereço e porta estão em uso!</span>
            <span v-if="serverError" class="warning" style="margin-bottom: 10px">Erro no formato do URI!</span>

            <md-button class="md-primary md-raised button" @click="start()">Entrar</md-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Start",
    data() {
        return {
            serverInUse: false,
            serverError: false,
            serverURI: 'localhost:40000',
        };
    },
    computed: {
        serverPort: function () { return parseInt(this.serverURI.split(':')[1]) },
        serverAdress: function () { return this.serverURI.split(':')[0] },
    },
    methods: {
        checkServer: async function(port, address) {
            const thisVue = this

            if (port && address) {
                this.serverError = false
                await this.$tcpPortUsed.check(port, address).then(function(inUse) {
                    thisVue.serverInUse = inUse
                }, function(err) { console.error('Error on check:', err.message) });
            } else 
                this.serverError = true

        },
        start: async function () {
            await this.checkServer(this.serverPort, this.serverAdress)

            if (this.serverError) return

            if (!this.serverInUse) {
                this.$server.sendSync('startServer', this.serverURI)
            }

            this.$router.push({name: 'mediator'});
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.options {
    padding: 0;
    height:-webkit-fill-available;
    width: 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}


.md-dialog /deep/.md-dialog-container {
    max-width: 768px;
    padding: 30px
}

.warning {
    color: rgb(185, 73, 73);
    font-style: oblique;
}

.button {
    margin: 0px;
}
</style>
