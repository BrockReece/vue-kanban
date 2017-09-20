import Kanban from './components/Kanban';

export default {
  install(vue) {
    vue.component('kanban-board', Kanban);
  },
};
