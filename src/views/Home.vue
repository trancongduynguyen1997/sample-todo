<template>
  <div class="todo-container">
    <div>
      <input @keyup.enter="addTodo" type="text" placeholder="Type your todo here" />
      <ul>
        <li v-for="(item,idx) in todoItems" :key="idx">
          <TodoItem :item="item" @delete-item="removeTodo(idx)"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue"
export default {
  data() {
    return {
      todoItems: []
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
    },
  },
  components: {TodoItem}    
  
};
</script>
<style>
.todo-container {
  display: flex;
  justify-content: center;
}
ul {
  list-style-type: none;
  padding: unset;
}
</style>
)