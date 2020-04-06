<template>
  <v-container grid-list-xs>
      <v-toolbar flat>
        <h1 class="title grey--text">Persons</h1>
        <v-spacer></v-spacer>
        <v-col cols="3" class="mt-2" v-if="false">
                <v-text-field label="Search" type="text" v-model="searchText"></v-text-field>
          </v-col>
        
        <v-btn fab text @click="dialog = !dialog">
         <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>

        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ text }}
        </v-snackbar>

        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="128"></v-progress-circular>
        </v-overlay>

        <v-dialog v-model="dialog"  max-width="290">
          <v-card dark>
            <v-card-title class="headline">Add Person</v-card-title>
              <v-col cols="12">
                    <v-text-field label="Name" type="text" required v-model="add.new_name"></v-text-field>
              </v-col>
              <v-col cols="12">
                    <v-text-field label="Nick" type="text" required v-model="add.new_nick"></v-text-field>
              </v-col>
              <v-col cols="12">
                    <v-text-field label="Age" type="number" required v-model="add.new_age"></v-text-field>
              </v-col>
          <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="error"
                text
                @click="dialog = false"
              >
                Cancel
              </v-btn>

              <v-btn
                color="success"
                text
                @click="post"
              >
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      <v-dialog
        v-model="updateDialog"
        max-width="290"
        >
      <v-card dark>
        <v-card-title class="headline">Update Person</v-card-title>
          <v-col cols="12">
                <v-text-field label="Name" type="text" required v-model="add.new_name"></v-text-field>
          </v-col>
          <v-col cols="12">
                <v-text-field label="Nick" type="text" required v-model="add.new_nick"></v-text-field>
          </v-col>
          <v-col cols="12">
                <v-text-field label="Age" type="number" required v-model="add.new_age"></v-text-field>
          </v-col>
      <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            text
            @click="updateDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="success"
            text
            @click="update"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <v-container class="my-5" v-if="isOpened">
        <div class="text-center"  v-if="isEmpty">
        <span><v-icon class="mb-5 right" color="warning" size="100px">mdi-tooltip-account</v-icon></span>
        <br>
        <h1 class="display-2 grey--text">No Persons</h1>
        <br>
        <span class="headline">Please add Persons</span>
      </div>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="(person, index) in person" :key="index">
            <v-card class="ma-4 text-center pa-3" dark>
              <span>{{ person.name }}</span>
              <br>
              <span class="grey--text">{{ person.nick }}</span>
              <br>
              <span class="caption grey--text">Age: {{ person.age }}</span>
              <br>
              <span class="caption">This person ID: {{ person.id }}</span>
              <br>
              <v-btn color="success" text small class="ma-4" @click="updatePerson(index, person.id)">Update</v-btn>
              <v-btn color="error" text small class="ma-4" @click="deletePerson(index, person.id)">Remove</v-btn>

            </v-card>
          </v-flex>
        </v-layout>
        
      </v-container>
  </v-container>
</template>

<script>

import axios from 'axios'

export default {
  data(){
    return{
      add:{
        new_name: "",
        new_nick: "",
        new_age: 0,
      },
      id: null,
      indeks: null,
      isOpened: false,
      person:[],
      dialog: false,
      updateDialog: false,
      snackbar: false,
      timeout: 0,
      text: "",
      overlay: true,
      searchText: "",
      isEmty: false
      
    }
  },
  computed:{
     getPeople(){
          let noSearch = this.searchText.length === 0;
        return this.person.filter(person => { // search
              if(noSearch) return this.person;
              return person.name.toLowerCase().trim().startsWith(this.searchText.toLowerCase().trim())
          })
      },
  },
  methods: {
     
    updatePerson(index, id){
      this.updateDialog = !this.updateDialog
      this.id = id
      this.indeks = index
      },
    deletePerson(index, id){
      this.person.splice(index, 1)
      axios.delete('https://owltodotest.herokuapp.com/api/v1/person/'+id)
      .then(res => {
        this.snackbar = !this.snackbar
        this.text = "Person Deleted Successfull"
        this.timeout = 2000
        if(this.person.length == 0 ){
            this.isEmpty = !this.isEmpty
          }
          else{
            this.isEmpty = false
          }
        console.log(res.data.data)
      })
    },
    update(){
      let id = this.id
      let indeks = this.indeks
      let c = {
        name: this.add.new_name,
        nick: this.add.new_nick,
        age: this.add.new_age
      }
      
      this.updateDialog = !this.updateDialog 
      axios.put('https://owltodotest.herokuapp.com/api/v1/person/'+id , c)
      .then(res => {
        this.person[indeks] = res.data.data
        this.add.new_name = ""
        this.add.new_nick = ""
        this.add.new_age = 0
        this.snackbar = !this.snackbar
        this.text = "Person Updated Successfull"
        this.timeout = 2000
      })
    },
    post(){

      this.dialog = !this.dialog
      var a = {
        name: this.add.new_name,
        nick: this.add.new_nick,
        age: this.add.new_age
      }
      axios.post('https://owltodotest.herokuapp.com/api/v1/person', a)
      .then(res => {
        this.person.unshift(res.data.data)
        if(this.person.length == 0 ){
            this.isEmpty = !this.isEmpty
          }
          else{
            this.isEmpty = false
          }
        this.add.new_name = ""
        this.add.new_nick = ""
        this.add.new_age = 0
        this.snackbar = !this.snackbar
        this.text = "Person Added Successfull"
        this.timeout = 2000
      })
    }
  },
  

  mounted() {
    axios.get('https://owltodotest.herokuapp.com/api/v1/person')
    .then(res =>  {
      this.person = res.data.data
      if(res.data.message === 'seccess'){
        this.isOpened = !this.isOpened
        this.overlay = !this.overlay
        if(this.person.length == 0 ){
            this.isEmpty = !this.isEmpty
          }
          else{
            this.isEmpty = false
          }
      }
    })
    .catch(error => {console.log(error)})
  },
  watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 1000)
      },
    },
}
</script>