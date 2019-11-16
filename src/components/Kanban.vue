<template>
  <div class="drag-container">
    <ul class="drag-list">
      <li v-for="stage in stages" class="drag-column" :class="{['drag-column-' + stage]: true}" :key="stage">
        <span class="drag-column-header">
          <slot :name="stage">
            <h2>{{ stage }}</h2>
          </slot>
        </span>
        <div class="drag-options"></div>
        <ul class="drag-inner-list" ref="list" :data-status="stage">
          <li class="drag-item" v-for="block in getBlocks(stage)" :data-block-id="block.id" :key="block.id">
            <slot :name="block.id">
              <strong>{{ block.status }}</strong>
              <div>{{ block.id }}</div>
            </slot>
          </li>
        </ul>
        <div class="drag-column-footer">
            <slot :name="`footer-${stage}`"></slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import dragula from 'dragula';
  import { Machine } from 'xstate';

  export default {
    name: 'KanbanBoard',

    props: {
      stages: {
        type: Array,
        required: true,
      },
      blocks: {
        type: Array,
        required: true,
      },
      config: {
        type: Object,
        default: {},
      },
      stateMachineConfig: {
        type: Object,
        default: null,
      },
    },

    data() {
      return {
        machine: null,
      };
    },

    computed: {
      localBlocks() {
        return this.blocks;
      },
    },

    methods: {
      getBlocks(status) {
        return this.localBlocks.filter(block => block.status === status);
      },

      findPossibleTransitions(sourceState) {
        return this.machine.config.states[sourceState].on || {};
      },

      findTransition(target, source) {
        const targetState = target.dataset.status;
        const sourceState = source.dataset.status;
        const possibleTransitions = this.findPossibleTransitions(sourceState);
        return Object.keys(possibleTransitions)
          .find(transition => possibleTransitions[transition] === targetState);
      },

      accepts(block, target, source) {
        if (!this.machine) return true;
        const targetState = target.dataset.status;
        const sourceState = source.dataset.status;
        return Object.values(this.findPossibleTransitions(sourceState)).includes(targetState);
      },
    },

    updated() {
      this.drake.containers = this.$refs.list;
    },

    mounted() {
      this.drake = dragula(this.$refs.list, {
        accepts: this.accepts,
        ...this.config,
      })
      .on('drag', (el) => {
        el.classList.add('is-moving');
      })
      .on('drop', (block, list) => {
        let index = 0;
        for (index = 0; index < list.children.length; index += 1) {
          if (list.children[index].classList.contains('is-moving')) break;
        }
        this.$emit('update-block', block.dataset.blockId, list.dataset.status, index);
      })
      .on('dragend', (el) => {
        el.classList.remove('is-moving');

        window.setTimeout(() => {
          el.classList.add('is-moved');
          window.setTimeout(() => {
            el.classList.remove('is-moved');
          }, 600);
        }, 100);
      });
    },

    created() {
      if (!this.stateMachineConfig) return;
      this.machine = Machine(this.stateMachineConfig);
    },
  };
</script>
