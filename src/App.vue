<template>
  <div id="app">
    <Kanban :statuses="statuses" :items="blocks" @update-block="updateBlock">
        <div v-for="item in blocks" :slot="item.id">
            <div>
                <strong>id:</strong> {{ item.id }}
            </div>
            <div>
                {{ item.title }}
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
        title: faker.company.bs(),
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

<style lang="scss">
    $ease-out: all .3s cubic-bezier(0.23, 1, 0.32, 1);
    $on-hold: #FB7D44;
    $in-progress: #2A92BF;
    $needs-review: #F4CE46;
    $approved: #00B961;

    * {
    	box-sizing: border-box;
    }

    body {
    	background: #33363D;
    	color: white;
    	font-family: 'Lato';
    	font-weight: 300;
    	line-height: 1.5;
    	-webkit-font-smoothing: antialiased;
    }

    ul {
    	list-style-type: none;
    	margin: 0;
    	padding: 0;
    }

    .drag-container {
    	max-width: 1000px;
    	margin: 20px auto;
    }

    .drag-list {
    	display: flex;
    	align-items: flex-start;

    	@media (max-width: 690px) {
    		display: block;
    	}
    }

    .drag-column {
    	flex: 1;
    	margin: 0 10px;
    	position: relative;
    	background: rgba(black, 0.2);
    	overflow: hidden;

    	@media (max-width: 690px) {
    		margin-bottom: 30px;
    	}

    	h2 {
    		font-size: 0.8rem;
    		margin: 0;
    		text-transform: uppercase;
    		font-weight: 600;
    	}

    	&-on-hold {
    		.drag-column-header,
    		.is-moved,
    		.drag-options {
    			background: $on-hold;
    		}
    	}

    	&-in-progress {
    		.drag-column-header,
    		.is-moved,
    		.drag-options {
    			background: $in-progress;
    		}
    	}

    	&-needs-review {
    		.drag-column-header,
    		.is-moved,
    		.drag-options{
    			background: $needs-review;
    		}
    	}

    	&-approved {
    		.drag-column-header,
    		.is-moved,
    		.drag-options {
    			background: $approved;
    		}
    	}
    }

    .drag-column-header {
    	display: flex;
    	align-items: center;
    	justify-content: space-between;
    	padding: 10px;
    }

    .drag-inner-list {
    	min-height: 50px;
        color: white;
    }

    .drag-item {
    	margin: 10px;
    	height: 100px;
    	background: rgba(black, 0.4);
    	transition: $ease-out;

    	&.is-moving {
    		transform: scale(1.5);
    		background: rgba(black, 0.8);
    	}

    }

    .drag-header-more {
    	cursor: pointer;
    }

    .drag-options {
    	position: absolute;
    	top: 44px;
    	left: 0;
    	width: 100%;
    	height: 100%;
    	padding: 10px;
    	transform: translateX(100%);
    	opacity: 0;
    	transition: $ease-out;

    	&.active {
    		transform: translateX(0);
    		opacity: 1;
    	}

    	&-label {
    		display: block;
    		margin: 0 0 5px 0;

    		input {
    			opacity: 0.6;
    		}

    		span {
    			display: inline-block;
    			font-size: 0.9rem;
    			font-weight: 400;
    			margin-left: 5px;
    		}
    	}
    }

    /* Dragula CSS  */

    .gu-mirror {
      position: fixed !important;
      margin: 0 !important;
      z-index: 9999 !important;
      opacity: 0.8;
    	list-style-type: none;
    }

    .gu-hide {
      display: none !important;
    }

    .gu-unselectable {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }

    .gu-transit {
      opacity: 0.2;
    }

    /* Demo info */

    .section {
    	padding: 20px;
    	text-align: center;

    	a {
    		color: white;
    		text-decoration: none;
    		font-weight: 300;
    	}

    	h4 {
    		font-weight: 400;
    		a {
    			font-weight: 600;
    		}
    	}
    }
</style>
