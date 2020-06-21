<template>
  <div class="home-page">
    <div class="todo-container">
      <input
        class="todo-input"
        @keyup.enter="addTodo"
        type="text"
        placeholder="Type your todo here"
      />
      <ul style="margin: unset">
        <transition-group name="fade">
          <li v-for="(item,idx) in filteredTodo" :key="idx">
            <TodoItem :item="item" @delete-item="removeTodo(idx)" />
          </li>
        </transition-group>
      </ul>
      <div class="todo-footer">
        <div>
          <label for="all">All</label>
          <input id="all" type="radio" v-model="filterType" value="all" />
        </div>
        <div>
          <label for="done">Done</label>
          <input id="done" type="radio" v-model="filterType" value="done" />
        </div>
        <div>
          <label for="notdone">Not done</label>
          <input id="notdone" type="radio" v-model="filterType" value="notdone" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
export default {
  data() {
    return {
      todoItems: [],
      filterType: ""
    };
  },
  methods: {
    addTodo(e) {
      this.todoItems.push({
        name: e.target.value,
        isDone: false
      });

      e.target.value = "";
    },
    removeTodo(idx) {
      this.todoItems.splice(idx, 1);
    }
  },
  computed: {
    filteredTodo() {
      switch (this.filterType) {
        case "all":
          return this.todoItems;
        case "done":
          return this.todoItems.filter(item => item.isDone);
        case "notdone":
          return this.todoItems.filter(item => !item.isDone);
        default:
          return this.todoItems;
      }
    }
  },
  components: { TodoItem }
};
</script>
<style>
.home-page {
  display: flex;
  justify-content: center;
}
.todo-container {
  border: 1px solid #dedede;
  width: 100%;
  width: 60vw;
}
.todo-input {
  width: 100%;
  height: 3em;
  outline: none;
  border: none;
  border-bottom: 1px solid #dedede;
  padding-left: 0.8em;
  font-size: 1.4em;
  background-color: rgb(127, 127, 213);
  color: #eee;
}
.todo-input::placeholder {
  color: #eee;
  font-style: italic;
  opacity: 70%;
}
.todo-footer {
  background-color: rgb(127, 127, 213);
  display: flex;
  justify-content: space-evenly;
  font-size: 1.2em;
  color: #eee;
  font-weight: lighter;
  font-style: italic;
}
ul {
  list-style-type: none;
  padding: unset;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease-in-out;
}
</style>
)