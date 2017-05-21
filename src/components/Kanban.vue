<template>
    <div class="drag-container">
    	<ul class="drag-list">
    		<li v-for="status in statuses" class="drag-column" :class="{['drag-column-' + status]: true}">
    			<span class="drag-column-header">
    				<h2>{{ status }}</h2>
    			</span>
    			<div class="drag-options"></div>
    			<ul class="drag-inner-list" ref="list" :data-status="status">
                    <li class="drag-item" v-for="block in getBlocks(status)" :data-block-id="block.id" :key="block.id">
                        <slot :name="String(block.id)">
                            <strong>{{ block.status }}</strong>
                            <div>{{ block.id }}</div>
                        </slot>
                    </li>
    			</ul>
    		</li>
    	</ul>
        {{ blocks }}
    </div>
</template>

<script>
    import dragula from 'dragula';

    export default {
      name: 'KanbanBoard',

      props: {
        statuses: {},
        items: {},
      },

      computed: {
        blocks() {
          return this.items;
        },
      },

      methods: {
        getBlocks(status) {
          return this.blocks.filter(block => block.status === status);
        },
      },

      mounted() {
        dragula(this.$refs.list)
            .on('drag', (el) => {
              el.classList.add('is-moving');
            })
            .on('drop', (block, list) => {
              this.$emit('update-block', block.dataset.blockId, list.dataset.status);
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
    };
</script>
