const Kanban = require('./components/Kanban.vue');

module.exports = {
  install(vue) {
    vue.component('kanban-board', Kanban);
  },
};
