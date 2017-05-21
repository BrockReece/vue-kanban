<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Kanban :statuses="statuses" :items="blocks" @update-block="updateBlock">
        <div v-for="item in blocks" :slot="item.id">
            <div>
                <strong>id:</strong> {{ item.id }}
            </div>
            <div>
                <strong>Title:</strong> {{ item.title }}
            </div>
            <div>
                <strong>Status:</strong> {{ item.status }}
            </div>
        </div>
    </Kanban>
  </div>
</template>

<script>
import faker from 'faker';
import Kanban from './components/Kanban';

export default {
  name: 'app',
  components: {
    Kanban,
  },
  data() {
    return {
      statuses: ['on-hold', 'in-progress', 'needs-review', 'approved'],
      blocks: [],
    };
  },
  mounted() {
    for (let i = 0; i <= 10; i += 1) {
      this.blocks.push({
        id: i,
        status: this.statuses[Math.floor(Math.random() * 4)],
        title: faker.company.bsBuzz(),
      });
    }
  },

  methods: {
    updateBlock(id, status) {
      this.blocks.find(b => b.id === Number(id)).status = status;
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
