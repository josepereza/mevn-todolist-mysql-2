<template>
  <div class="hello">

    <div id="todo-list-example" class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <h1 class="text-center">TODO List App</h1>
          <form v-on:submit.prevent="addNewTask">
            <label for="tasknameinput">Task Name</label>
            <input v-model="taskname" id="tasknameinput" class="form-control" placeholder="Add New Task">
            <button v-if="this.isEdit == false" type="submit" class="btn btn-success btn-block  mt-3">
              Submit
            </button>
            <button v-else type="button" v-on:click="updateTask()" class="btn btn-primary btn-block  mt-3">
              Update
            </button>
          </form>

          <table class="table">
            <tr v-for="(todo) in todos" v-bind:key="todo.id" v-bind:title="todo.task_name">
              <td class="text-left">{{todo.task_name}}</td>
              <td class="text-right">
                <button v-on:click="editTask(todo.task_name, todo.id)" class=" btn btn-info ">Edit</button>
                <button v-on:click="deleteTask(todo.id)" class=" btn btn-danger ">Delete</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        todos: [],
        id: '',
        taskname: '',
        isEdit: false
      }
    },
    mounted() {
      this.getTasks()
    },
    methods: {
      getTasks() {
        axios.get('http://173.249.39.9:3000/api/tasks').then(
          result => {
            this.todos = result.data
          },
          error => {
          }
        )
      },
      addNewTask() {
        axios.post('http://173.249.39.9:3000/api/task',
          { task_name: this.taskname }
        ).then((res) => {
          this.taskname = ''
          this.getTasks()
        }).catch((err) => {
        })
      },
      editTask(title, id) {
        this.id = id
        this.taskname = title
        this.isEdit = true
      },
      updateTask() {
        axios.put(`http://173.249.39.9:3000/api/task/${this.id}`,
          { task_name: this.taskname }
        ).then((res) => {
          this.taskname = ''
          this.isEdit = false
          this.getTasks()
        }).catch((err) => {
        })
      },
      deleteTask(id) {
        axios.delete(`http://173.249.39.9:3000/api/task/${id}`
        ).then((res) => {
          this.taskname = ''
          this.getTasks()
        }).catch((err) => {
        })
      }
    }
  }
</script>
