# vue-kanban [![Build Status](https://travis-ci.org/BrockReece/vue-kanban.svg?branch=master)](https://travis-ci.org/BrockReece/vue-kanban) [![npm version](https://badge.fury.io/js/vue-kanban.svg)](https://badge.fury.io/js/vue-kanban)

> A drag and drop kanban board component

### [Demo](https://vue-kanban.netlify.com/)

## Installation

### Vue CLI
You can install this plugin through the [Vue CLI](https://cli.vuejs.org/)
```
vue add vue-cli-plugin-kanban
```

### Manual installation

Add vue-kanban to your project with npm
``` bash
npm install vue-kanban
```

... or yarn
```bash
yarn add vue-kanban
```

Then install the plugin in your entry file
```js
import vueKanban from 'vue-kanban'

Vue.use(vueKanban)
```

## Basic Usage

The `kanban-board` component has been added globally to your project and so can be used in your templates without having to explicitly import it.
```html
<kanban-board :stages="stages" :blocks="blocks"></kanban-board>
```

### Required Props
- **stages**: an array of stages for the kanban board
- **blocks**: an array of objects that will make up the blocks on the kanban board
```js
{
  stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
  blocks: [
    {
      id: 1,
      status: 'on-hold',
      title: 'Test',
    },
  ],
}
```

### Advanced Props
- **config**: an object of dragula options to be passed to the kanban board, see [dragula docs](https://github.com/bevacqua/dragula#dragulacontainers-options) for more details
- **state-machine-config**: an xstate config object that can be used to manage the kanban board, read [here](#state-machine) for more details
```js
{
  config: {
    // Don't allow blocks to be moved out of the approved stage
    accepts(block, target, source) {
      return source.dataset.status !== 'approved',
    }
  }
}
```

### Receiving Changes
The component will emit an event when a block is moved

```html
<kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock"></kanban-board>
<script>
...
  methods: {
    updateBlock(id, status) {
      this.blocks.find(b => b.id === Number(id)).status = status;
    },
  },
...
</script>
```

## Add some style
I have included a scss stylesheet in this repo as a starting point that can be used in your project
```html
<style lang="scss">
  @import './assets/kanban.scss';
</style>
```

### Customize the kanban blocks
Each block has a named slot which can be extended from the parent, like so...
```html
<kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock">
  <div v-for="stage in stages" :slot="stage" :key="stage">
    <h2>{{ stage }}</h2>
  </div>
  <div v-for="block in blocks" :slot="block.id" :key="block.id">
    <div>
      <strong>id:</strong> {{ block.id }}
    </div>
    <div>
      {{ block.title }}
    </div>
  </div>
</kanban-board>
```

### State machine
Vue-kanban is now compatible with [xstate](https://xstate.js.org/docs/) state machines.

You can pass an xstate config as a prop and the Kanban board will use the state machine to restrict which moves are allowed.

As an example we can achieve the following workflow

![Read more words!](/src/assets/fsm.png)

With the following config
```js
stateMachineConfig: {
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
},
```
