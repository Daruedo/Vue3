const todosApp = {
    data() {
        return {
            todos: [],
            newTodo: {
                done: false
            }
        }
    },
    methods:{
        addTodo: function() {
            if (this.newTodo.text && this.newTodo.text.trim()) {
                this.todos.push(this.newTodo);
                this.newTodo = {
                    done: false
                };
            } else {
                alert("A descrição da tarefa é obrigatória")
            }
        }
    }
};

Vue.createApp(todosApp).mount('#app');