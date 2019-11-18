import Vue from 'vue/dist/vue';
import { Machine } from 'xstate';
import VueKanban from '../src/plugin';

Vue.use(VueKanban);

const stateMachineConfig = {
  id: 'kanban',
  initial: 'on-hold',
  states: {
    'on-hold': {
      on: {
        PICK_UP: 'in-progress',
      },
    },
    'in-progress': {
      on: {
        RELINQUISH_TASK: 'on-hold',
        PUSH_TO_QA: 'needs-review',
      },
    },
    'needs-review': {
      on: {
        REQUEST_CHANGE: 'in-progress',
        PASS_QA: 'approved',
      },
    },
    approved: {
      type: 'final',
    },
  },
};

const vm = new Vue({
  template: '<kanban-board :stages="stages" :blocks="blocks" ref="kanban" :state-machine-config="stateMachineConfig"></kanban-board>',
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
      stateMachineConfig,
    };
  },
}).$mount();

describe('State Machine', () => {
  describe('initialise', () => {
    it('should build a state machine from the state machine config', () => {
      expect(vm.$refs.kanban.machine).toEqual(Machine(stateMachineConfig));
    });

    it('should behave like a state machine', () => {
      expect(vm.$refs.kanban.machine.transition('on-hold', 'PICK_UP').value).toEqual('in-progress');
      expect(vm.$refs.kanban.machine.transition('on-hold', 'PUSH_TO_QA').value).toEqual('on-hold');
    });
  });

  describe('accepts', () => {
    const [onHold, inProgress, needsReview, approved] = vm.$refs.kanban.stages.map(status => ({
      dataset: { status },
    }));

    it('should allow move from on-hold to in-progress', () => {
      expect(vm.$refs.kanban.accepts({}, inProgress, onHold)).toBe(true);
    });

    it('should allow move from in-progress tp on-hold', () => {
      expect(vm.$refs.kanban.accepts({}, onHold, inProgress)).toBe(true);
    });

    it('should NOT allow move from in-progress to approved', () => {
      expect(vm.$refs.kanban.accepts({}, approved, inProgress)).toBe(false);
    });

    it('should NOT allow move from needs-review to on-hold', () => {
      expect(vm.$refs.kanban.accepts({}, onHold, needsReview)).toBe(false);
    });

    it('should NOT allow move from approved to needs-review', () => {
      expect(vm.$refs.kanban.accepts({}, needsReview, approved)).toBe(false);
    });
  });
});
