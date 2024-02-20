<script>


import AdminAssignForm from '../components/AdminAssignForm.vue'
import ModalForm from '../components/ModalForm.vue'
import {executeGroupSortData} from "../essentials/index.js"
import {db} from "../firebase/init.js"
import {collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc} from "firebase/firestore"


export default{
  components:{
    ModalForm,
    AdminAssignForm
  },
  created(){
    this.getTasks().then((newTasks)=>{
      //this.tasks = executeGroupSortData(newTasks)
      this.tasks = executeGroupSortData(newTasks,this.selectedGroupID,this.selectedSortID)
    })
  },
  data(){
    return {
      isModalVisible: false,
      isEditMode: false,
      selectedGroupID: 0,
      selectedSortID: 0,
      tasks: {},
      formData:{
        taskID: "",
        course: "",
        deadline: "",
        author: "",
        type: "",
        visibility: "",
        groups: [],
        description: "",
      }
    }
  },
  methods: {
    showModal(){
      console.log("Clicked")
      this.isModalVisible = true
      console.log(this.isModalVisible)
    },
    closeModal(){
      this.isModalVisible = false
      this.isEditMode = false
      console.log(this.isModalVisible)
    },
    async getTasks(){
      //const colRef = collection(db, "tasks");
      let newTasks = []
      const querySnapshot = await getDocs(collection(db, "tasks"))
      querySnapshot.forEach(doc => {
        newTasks.push(doc.data())
        //console.log(doc.id, " => ", doc.data())

      })
      return newTasks
    },
    loadView(){

      this.selectedGroupID = Number(this.selectedGroupID)
      this.selectedSortID = Number(this.selectedSortID)

      this.getTasks().then((newTasks)=>{
        this.tasks = executeGroupSortData(newTasks,this.selectedGroupID,this.selectedSortID)
      })

    },
    callSubmitHandler(){
      if(isEditMode){
        this.editItem()
      }else{
        this.addItem()
      }
    },
    async addItem(){

      const colRef = collection(db, 'tasks')
      const newTaskObj = this.formData
      const docRef = await addDoc(colRef, newTaskObj)
      //const docRef = await addDoc(colRef, newData)

      console.log(docRef.id)

      if(docRef!=null){
        const updateRef = doc(db, "tasks", docRef.id);
        await updateDoc(updateRef, {taskID: docRef.id})
      }

      this.formData = {
        taskID: "",
        course: "",
        deadline: "",
        author: "",
        type: "",
        visibility: "",
        groups: [],
        description: "",
      }

      this.closeModal()
      this.loadView()

    },
    async openEditor(event){

      this.isEditMode = true
      let toBeEdittedID = event.target.getAttribute("data-link")
      console.log(toBeEdittedID)

      const docSnap = await getDoc(doc(db, "tasks", toBeEdittedID))

      if(docSnap!=null){
        let currentTask = docSnap.data()
        this.formData = currentTask

        this.showModal()
      }

    },
    async editItem(){
      let currentTaskID = this.formData.taskID
      const updateRef = doc(db, "tasks", currentTaskID);
      await updateDoc(updateRef, this.formData)

      this.formData = {
        taskID: "",
        course: "",
        deadline: "",
        author: "",
        type: "",
        visibility: "",
        groups: [],
        description: "",
      }

      this.closeModal()
      this.loadView()

    },
    async deleteItem(event){
      let toBeDeletedID = event.target.getAttribute("data-link")
      console.log(toBeDeletedID)
      await deleteDoc(doc(db, "tasks", toBeDeletedID))
      this.loadView()      
    }
  }
}

</script>

<template>

  <div>

    <AdminAssignForm/>

    <h1>Targets</h1>
    <p>Find your submission and test dates here!</p>

    <button type="button" class="fab" id="add-btn" @click.prevent="showModal">ADD &plus;</button>

    <div class="filter-wrap">

        <label>Group By: 
            <select name="group-by" id="group-by" v-model="selectedGroupID" @change="loadView">
                <option value="0">Date</option>
                <option value="1">Course</option>
                <option value="2">Type</option>
                <option value="3">Date (desc)</option>
                <option value="4">Course (desc)</option>
                <option value="5">Type (desc)</option>
            </select>
        </label>

        <label>Sort By: 
            <select name="sort-by" id="sort-by" v-model="selectedSortID" @change="loadView">
                <option value="0">Date</option>
                <option value="1">Course</option>
                <option value="2">Type</option>
                <option value="3">Date (desc)</option>
                <option value="4">Course (desc)</option>
                <option value="5">Type (desc)</option>                
            </select>
        </label>

    </div>

    <div id="task-wrap" class="task-wrap">

      <details class="group-detail" open v-for="(value, name) in tasks">

          <summary class="group-heading">
              <hr class="dashed"> 
              <h2>{{name}}</h2>
              <hr class="dashed">
          </summary>

          <template v-for="formattedTask in value">
            <details  :data-tag="formattedTask.taskID" class="task-detail">
                <summary>
                    <div class="summary-wrap">
                        <span class="course">{{formattedTask.course}}</span>
                        <span class="title">{{ formattedTask.heading }}</span>
                        <span class="type assignment">{{formattedTask.type}}</span>
                        <span class="deadline">{{formattedTask.deadline}}</span>                    
                    </div>
                </summary>
                <div class="detail-content">
                    <p>{{formattedTask.description}}</p>
                    <p>{{formattedTask.groups.join(",")}}</p>
                    <p>Author: {{formattedTask.author}}</p>
                </div>
                <div class="admin-btn-wrap">
                    <button class="btn-task-edit" :data-link=formattedTask.taskID v-on:click="openEditor">Edit</button>
                    <button class="btn-task-delete" :data-link=formattedTask.taskID v-on:click="deleteItem">Delete</button>
                </div>

            </details>              
          </template>
      </details>

    </div>

  </div>

  <ModalForm v-show="isModalVisible" @close="closeModal">
      <template v-slot:header><h2>Editor</h2></template>
      <template v-slot:body>
        <form class="modal-form" id="modal-form">
          
          <div class="form-group">
            <label for="input-course">Course</label>
            <input type="text" name="input-course" id="input-course" v-model="formData.course"/>
          </div>
    
              <div class="form-group">      
                  <label for="input-deadline">Deadline</label>
                  <input type="datetime-local" name="input-deadline" id="input-deadline" v-model="formData.deadline"/>
              </div>
    
              <div class="form-group">      
                  <label for="author">Author</label>
                  <input type="text" name="author" id="author" v-model="formData.author"/>
              </div>
    
              <div class="form-group">                
                  <label for="typeSelect">Type</label>
                  <select name="typeSelect" id="typeSelect" v-model="formData.type">
                  <option value="0">Quiz</option>
                  <option value="3">Final Exam</option>
                  <option value="3">CA Tests</option>
                  <option value="3">General Report</option>
                  <option value="1">Thesis</option>
                  <option value="2">Presentation</option>
                  <option value="3">Self-Study Assessment</option>
                  <option value="4">Experiment / Lab Report</option>
                  <option value="3">Self Assessment</option>
                  <option value="3">Peer Assessment</option>
                  </select>
              </div>
    
              <div class="form-group">
                  <label for="visibilitySelect">Visibility</label>
                  <select name="visibilitySelect" id="visibilitySelect" v-model="formData.visibility">
                  <option value="0">Yes</option>
                  <option value="1">No</option>
                  </select>
              </div>
    
              <div class="form-group">
                  <label for="groupsText">Groups</label>
                  <select name="groupsText" id="groupsText" multiple v-model="formData.groups">
                      <option value="0">Smart EdTech M1</option>
                      <option value="1">Smart EdTech M2</option>
                      <option value="2">HCI M1</option>
                      <option value="3">HCI M2</option>
                      <option value="4">AI M1</option>
                      <option value="5">AI M2</option>
                      <option value="6">Data Science M1</option>
                      <option value="7">Data Science M2</option>
                  </select>
              </div>

              <div class="form-group">                
                  <label for="descriptionText">Description</label>
                  <textarea
                  name="descriptionText"
                  id="descriptionText"
                  placeholder="add your task description"
                  v-model="formData.description"
                  >
                  </textarea>
              </div>
    
              <button type="button" v-on:click="addItem">Save Changes</button>

            </form>        
      </template>
  </ModalForm>
</template>

<style>


.form-group{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
    margin-block: 10px;
}

.form-group input{
    padding: 5px;
}

</style>
