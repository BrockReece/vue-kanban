import Kanban from './components/Kanban.vue';

export default {
  install(vue) {
    vue.component('kanban-board', Kanban);
  },
};
