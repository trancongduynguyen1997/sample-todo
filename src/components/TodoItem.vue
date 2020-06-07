<template>
  <div class="todo-item" :class="{'todo-done': item.isDone}">
    <input type="checkbox" v-model="item.isDone" class="todo-checkbtn" />
    <div class="todo-display" v-click-outside="hideEditTodo">
      <span v-show="!showEditor" class="todo-text" @dblclick="showEditTodo">{{item.name}}</span>
      <input
        class="todo-text"
        v-model="item.name"
        v-show="showEditor"
        type="text"
        @keyup.enter="hideEditTodo"
      />
      <i class="far fa-trash-alt delete-btn" @click="$emit('delete-item')"></i>
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
    showEditTodo() {
      this.showEditor = true;
    },
    hideEditTodo() {
      this.showEditor = false;
    }
  },
  data() {
    return {
      showEditor: false
    };
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
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.5em;
  color: rgb(127, 127, 213);
  font-size: 1.4em;
}
input.todo-text {
  outline: none;
  border: none;
  color: rgb(127, 127, 213);
  font-size: 1em;
  border-bottom: 1px solid #dedede;
}
.todo-text {
  flex-grow: 1;
  text-align: left;
}
.todo-display {
  display: flex;
  width: 100%;
}
.todo-done {
  text-decoration: line-through;
}
.todo-done > .todo-display {
  opacity: 40%;
}
.delete-btn {
  margin-left: 1em;
  cursor: pointer;
}
.todo-checkbtn {
  margin-right: 0.8em;
  cursor: pointer;
}
</style>