import Vue from 'vue/dist/vue';
import VueKanban from '../src/plugin';

Vue.use(VueKanban);

const vm = new Vue({
  template: '<kanban-board :stages="stages" :blocks="blocks" ref="kanban" :config="config"></kanban-board>',
  data() {
    return {
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
      blocks: [
        {
          id: 1,
          status: 'on-hold',
          title: 'Test',
        },
      ],
      config: {
        copy: true,
        direction: 'horizontal',
      },
    };
  },
}).$mount();

describe('VueKanban', () => {
  describe('installing plugin', () => {
    it('load component', () => {
      expect(typeof Vue.options.components['kanban-board']).toEqual('function');
    });
  });

  describe('Handles props', () => {
    it('stages', () => {
      expect(typeof vm.$refs.kanban.stages).toEqual('object');
      expect(vm.$refs.kanban.stages).toContain('approved');
    });

    it('blocks', () => {
      expect(typeof vm.$refs.kanban.blocks).toEqual('object');
      expect(vm.$refs.kanban.blocks.map(b => b.id)).toContain(1);
    });

    describe('config', () => {
      it('should be an object', () => {
        expect(typeof vm.$refs.kanban.config).toEqual('object');
      });

      it('should use values in prop', () => {
        expect(vm.$refs.kanban.config.copy).toEqual(true);
        expect(vm.$refs.kanban.config.direction).toEqual('horizontal');
      });
      it('should set the dragula defaults', () => {
        expect(vm.$refs.kanban.config.copySortSource).toEqual(false);
      });
    });
  });

  describe('Assign to correct column', () => {
    it('stages', () => {
      expect(vm.$refs.kanban.getBlocks('on-hold').map(b => b.id)).toContain(1);
    });

    it('should match snapshot', () => {
      expect(vm.$refs.kanban.$el).toMatchSnapshot();
    });
  });
});
