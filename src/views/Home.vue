<template>
  <div class="todo-container">
    <div>
      <input @keyup.enter="addTodo" type="text" placeholder="Type your todo here">
        <ul style="list-style-type: none" v-for="(item,idx) in todoItems" :key="idx">
          <li>
            <div>
              <input type="checkbox"/>
              <span>
                {{item}}
              </span>
              
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      todoItems: []
    }
  },
  methods: {
    addTodo(e) {
      this.todoItems.push(e.target.value);
      e.target.value = ''
    }
  },
}
</script>
<style>
.todo-container {
  display: flex;
  justify-content: center;
}
</style>
