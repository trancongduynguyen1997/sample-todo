<template>
  <div class="todo-item" :class="{'todo-done': item.isDone}">
    <input type="checkbox" v-model="item.isDone" />
    <div style="display: flex; width: 100%">
      <span v-show="!showEditor" v-click-outside="onClickOutside" class="todo-display" @dblclick="editTodo">{{item.name}}</span>
      <input v-show="showEditor" type="text" />
      <i class="far fa-trash-alt" @click="$emit('delete-item')"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    editTodo() {
      this.showEditor = true;
    },
    onClickOutside() {
        this.showEditor = false;
    }
  },
  data() {
      return {
          showEditor: false
      }
  },
  directives: {
    clickOutside: {
      bind(el, binding) {
        let cb = binding.value;
        el.clickOutsideEvent = function(event) {
          if (!(event.target == el || el.contains(event.target))) {
            cb.call(this, event, el);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  }
};
</script>

<style>
.todo-item {
  border: 1px solid #dedede;
  display: flex;
  justify-content: start;
}
.todo-display {
  flex-grow: 1;
  text-align: left;
}
.todo-done {
    text-decoration: line-through;
}
</style>