# vue-kanban [![Build Status](https://travis-ci.org/BrockReece/vue-kanban.svg?branch=master)](https://travis-ci.org/BrockReece/vue-kanban) [![npm version](https://badge.fury.io/js/vue-kanban.svg)](https://badge.fury.io/js/vue-kanban)

> A drag and drop kanban board component

### [Demo](https://brockreece.github.io/vue-kanban/)

### Installation

Add vue-kanban to your project with npm
``` bash
npm install vue-kanban 
```

... or yarn
```bash
yarn add vue-kanban
```

### Basic Usage

Install the plugin
```js
import vueKanban from 'vue-kanban'

Vue.use(vueKanban)
```

and then use the component in your project.
```html
<kanban-board :stages="stages" :blocks="blocks"></kanban-board>
```

#### Props
- stages: an array of stages for the kanban board
- blocks: an array of objects that will make up the blocks on the kanban board
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

### Add some style
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
  <div v-for="block in blocks" :slot="block.id">
    <div>
      <strong>id:</strong> {{ block.id }}
    </div>
    <div>
      {{ block.title }}
    </div>
  </div>
</kanban-board>
```
