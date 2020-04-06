<template>
  <v-container grid-list-xs>
    <v-toolbar flat>
        <h1 class="title grey--text">Tasks</h1>
        <v-spacer></v-spacer>
        <v-btn fab text @click="addTask"> 
           <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-toolbar>
    <!-- Dialogs -->
      
        <v-overlay v-model="overlay">
          <v-progress-circular indeterminate size="128"></v-progress-circular>
        </v-overlay>

        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ text }}
        </v-snackbar>

      <v-dialog
        v-model="isOpenAddTask"
        max-width="290"
        >
      <v-card dark>
        <v-card-title class="headline">Add Task</v-card-title>
          <v-col cols="12">
                <v-text-field label="Task Name" type="text" required v-model="addedTaskList.title"></v-text-field>
          </v-col>
          <v-col cols="12">
                <v-text-field label="Description" type="text" required v-model="addedTaskList.description"></v-text-field>
          </v-col>
          <v-col cols="12">
                <v-text-field label="Person ID" type="number" required v-model="addedTaskList.personId"></v-text-field>
          </v-col>
      <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            text
            @click="isOpenAddTask = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="success"
            text
            @click="addedTask"
          >
            Add Task
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog
        v-model="isOpenUpdateTask"
        max-width="290"
        >
      <v-card dark>
        <v-card-title class="headline">Update Task</v-card-title>
          <v-col cols="12">
                <v-text-field label="Task Name" type="text" required v-model="addedTaskList.title"></v-text-field>
          </v-col>
          <v-col cols="12">
                <v-text-field label="Description" type="text" required v-model="addedTaskList.description"></v-text-field>
          </v-col>
          <v-col cols="12">
                <v-text-field label="Person ID" type="number" required v-model="addedTaskList.personId"></v-text-field>
          </v-col>
      <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            text
            @click="isOpenUpdateTask = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="success"
            text
            @click="updateTask"
          >
            Update Task
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialogs -->
    <!-- Task lists -->
    <v-container class="my-5" v-if="isOpened">
      <div class="text-center"  v-if="isEmpty">
        <span><v-icon class="mb-5" color="success" size="120px">mdi-buffer</v-icon></span>
        <br>
        <h1 class="display-2 grey--text">No Tasks</h1>
        <br>
        <span class="headline">Please add Task</span>
      </div>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg2 v-for="(task, index) in tasks" :key="index">
              <v-card
                max-width="260"
                class="mx-auto ma-3"
                dark
              >
                <v-list-item class="darken">
                  <v-list-item-avatar color="info">
                      <span class="white--text display-4"> {{ task.title }}</span>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="subtitle-2">{{ task.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-img
                  src="../assets/task_scheduling.png"
                  height="180"
                  width="300"
                  class="white"
                ></v-img>

                <v-card-text>
                  <span class="caption white--text">Description task: </span>
                  <br>
                  {{ task.description }}
                </v-card-text>

                <v-card-actions>
                  <v-btn icon @click="info(task.personId)">
                    <v-icon color="info">mdi-information</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="updatedTask(index, task.id)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteTask(index, task.id)">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>

                <v-dialog v-model="isOpenInfo" max-width="300" dark>
                  <v-card>
                    <v-card-title class="subtitle-1 mb-4">Task Information</v-card-title>
                    <v-card-text>
                      <p class="caption grey--text">Task Editor: <span class="white--text">{{ onePersonId.name }}</span> </p>
                      
                      <p class="caption grey--text">Task ID: <span class="white--text">{{ task.id }}</span> </p>
                      
                      <p class="caption grey--text">Task Status: <span class="white--text">{{ task.status }}</span> </p>
                    </v-card-text>
                          
                    <v-card-actions>
                      <v-spacer></v-spacer>
                        <v-btn color="success" text @click="isOpenInfo = false" >
                        Ok
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

          </v-flex>
        </v-layout>
        
      </v-container>

  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data(){
   return {
     addedTaskList: {
       title: "",
       description: "",
       personId: 0
     },
     text: "",
     snackbar: false,
     tasks: [],
     index: null,
     taskId: null,
     timeout: 0,
     onePersonId: [],
     isEmpty: false,
     overlay: true,
     isOpened : false,
     isOpenInfo: false,
     isOpenAddTask: false,
     isOpenUpdateTask: false
   }
  },
  methods:{
    deleteTask(index, id){
      this.overlay = !this.overlay
      axios.delete('https://owltodotest.herokuapp.com/api/v1/task/'+id)
      .then(res => {
        this.tasks.splice(index , 1)
        if(res.data.message == 'seccess'){
          this.overlay = !this.overlay
          this.snackbar = !this.snackbar
          this.text = 'Task Deleted Successfull'
          this.timeout = 2000
          if(this.tasks.length == 0 ){
            this.isEmpty = !this.isEmpty
          }
          else{
            this.isEmpty = false
          }
        }
        console.log(res.data)
      })
      
    },

    info(id){

      axios.get('https://owltodotest.herokuapp.com/api/v1/person/'+id)
      .then(res => {
        this.onePersonId = res.data.data
        this.isOpenInfo = !this.isOpenInfo
      })
      .catch(error => {
        console.log(error)
      })
    },
    addTask(){
      this.isOpenAddTask = !this.isOpenAddTask
    },
    addedTask(){
      let c = {
        title: this.addedTaskList.title,
        description: this.addedTaskList.description,
        personId: this.addedTaskList.personId
      }
      this.isOpenAddTask = !this.isOpenAddTask
      this.overlay = !this.overlay
      axios.post('https://owltodotest.herokuapp.com/api/v1/task', c)
      .then(res => {
        this.tasks.unshift(res.data.data)
        if(this.tasks.length == 0 ){
            this.isEmpty = !this.isEmpty
          }
          else{
            this.isEmpty = false
          }
        if(res.data.message == 'seccess'){
          this.overlay = !this.overlay
          this.snackbar = !this.snackbar
          this.text = 'Task Added Successfull'
          this.timeout = 2000
        }
        this.addedTaskList.title = ""
        this.addedTaskList.description = ""
        this.addedTaskList.personId = 0
      })
      .catch(error => {
        console.log(error)
      })
    },
    updatedTask(index, id){
        this.taskId = id
        this.index = index
        this.isOpenUpdateTask = !this.isOpenUpdateTask
    },
    updateTask(){
      let index = this.index
      
      let a = {
        title: this.addedTaskList.title,
        description: this.addedTaskList.description,
        personId: this.addedTaskList.personId,
        id: this.taskId
      }
      this.isOpenUpdateTask = !this.isOpenUpdateTask
      this.overlay = !this.overlay
      axios.put('https://owltodotest.herokuapp.com/api/v1/task', a)
      .then(res => {
        console.log(res.data.data)
        this.tasks[index] = res.data.data
        this.snackbar = !this.snackbar
        this.text = 'Task Added Successfull'
        this.timeout = 2000
        if(res.data.message == 'seccess'){
          this.overlay = !this.overlay
        }
        this.addedTaskList.title = ""
        this.addedTaskList.description = ""
        this.addedTaskList.personId = 0
      })
    }
    
  },
  mounted(){
    axios.get('https://owltodotest.herokuapp.com/api/v1/task')
      .then(res => {
        this.tasks = res.data.data.list
        if(res.data.message == 'seccess'){
          this.overlay = !this.overlay
          this.isOpened = !this.isOpened
          if(this.tasks.length == 0 ){
            this.isEmpty = !this.isEmpty
          }
          else{
            this.isEmpty = false
          }
        }
        console.log(res.data.data.list)
        
      })
      .catch(error => {console.log(error)})
      
  }
}
  





</script>