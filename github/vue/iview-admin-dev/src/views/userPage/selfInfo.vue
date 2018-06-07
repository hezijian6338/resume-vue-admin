<template>
<div class="info">
  <!-- <template>
    <Row :gutter="16">
      <Col span="6">
        <div>学号：</div>
      </Col>
      <Col span="6">
        <div><Input v-model="studentno" placeholder="Enter something..." clearable style="width: 200px"></Input></div>
      </Col>
    </Row>

  </template>
  <br/> 姓名：
  <Input v-model="store.stuName" placeholder="Enter something..." clearable style="width: 200px"></Input>
  <br/> 性别：
  <Input v-model="sex" placeholder="Enter something..." clearable style="width: 200px"></Input>
  <br/> 出生日期：
  <Input v-model="birthday" placeholder="Enter something..." clearable style="width: 200px"></Input>
  <br/> 手机号码：
  <Input v-model="mobileno" placeholder="Enter something..." clearable style="width: 200px"></Input>
  <br/> 民族：
  <Input v-model="nation" placeholder="Enter something..." clearable style="width: 200px"></Input>
  <br/> 面貌：
  <Input v-model="politicalstatus" placeholder="Enter something..." clearable style="width: 200px"></Input>
  <br/> 出生地：
  <Input v-model="fromPlace" placeholder="Enter something..." clearable style="width: 200px"></Input>
  <br/> 身份证号：
  <Input v-model="idcardno" placeholder="Enter something..." clearable style="width: 200px"></Input>
  <br/> 自我评价：
  <Input v-model="selfdescription" placeholder="Enter something..." clearable style="width: 400px"></Input>
  <br/> 学院：
  <Input v-model="department" placeholder="Enter something..." clearable style="width: 200px"></Input>
  <br/> 专业：
  <Input v-model="major" placeholder="Enter something..." clearable style="width: 200px"></Input> -->
  <!-- <div v-for="student in students"> -->
    <Input v-model="students.stuname" placeholder="Enter something..." clearable style="width: 200px" readonly = "false"></Input>
    <Input v-model="students.sex" placeholder="Enter something..." clearable style="width: 200px" readonly = "false"></Input>
    <Input v-model="students.studentno" placeholder="Enter something..." clearable style="width: 200px" readonly = "false"></Input>
    <DatePicker v-model="students.birthday" type="date" format="yyyy-MM-dd" placeholder="Select date" style="width:15.8em" clearable></DatePicker>
    <Input v-model="students.politicalstatus" placeholder="Enter something..." clearable style="width: 200px" readonly = "false"></Input>
  <!-- </div> -->
  <Button type="primary" @click="getStudents()">获取学生信息</Button>

</div>
</template>
<script>
import store from '../../store/store.js'
import axios from 'axios'
import $ from 'jquery'
export default {
  name: 'selfInfo',
  data() {
    return {
      students: {}
    }
  },
  methods: {
    getStudents() {
      axios.get('http://192.168.8.176/rest/student/140202011031/edit')
        .then(function(response){
          var stuInfo = response.data.student
          this.students = stuInfo
        }.bind(this))
        .catch(function(error){
          console.log(error)
        }.bind(this))
    },
    Test() {
      axios.get('http://192.168.8.176/rest/student/140202011031/edit')
        .then(function(response){
            var stuInfo = response.data
            this.students = stuInfo
        }.bind(this))
        .catch(function(error){
          console.log(error)
        }.bind(this))
    }
  },
  mounted() {
    this.getStudents()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
