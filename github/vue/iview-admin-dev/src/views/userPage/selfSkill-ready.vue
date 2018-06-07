<template>
  <div class="change">
    <Form :model="studentResume" label-position="top">
      <Row>
        <Col span="2">
        <FormItem label="姓名：" prop="stuname">
          <Input v-model="studentResume.stuname" placeholder="Enter something..." clearable></Input>
        </FormItem>
        </Col>
        <Col span="3">
        <FormItem label="学号：" prop="studentno">
          <Input v-model="studentResume.studentno"></Input>
        </FormItem>
        </Col>
        <Col span="5">
        <FormItem label="邮件：" prop="email">
          <!-- <Input v-model="studentResume.email"></Input> -->
          <AutoComplete v-model="studentResume.email" @on-search="handleSearch2" placeholder="请输入你的邮箱地址😯">
            <Option v-for="item in data2" :value="item" :key="item">{{ item }}</Option>
          </AutoComplete>
        </FormItem>
        </col>
        <Col span="3">
        <FormItem label="手机号码：" prop="mobileno">
          <Input v-model="studentResume.mobileno" placeholder="Enter something..." clearable></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="5">
        <FormItem label="学校：" prop="schoolname">
          <Input v-model="studentResume.schoolname" placeholder="北京理工大学珠海学院😍" clearable></Input>
        </FormItem>
        </Col>
        <Col span="5">
        <FormItem label="学院：" prop="org_name">
          <Input v-model="studentResume.org_name" placeholder="计算机学院🙄" clearable></Input>
        </FormItem>
        </Col>
        <Col span="5">
        <FormItem label="专业：" prop="major">
          <Input v-model="studentResume.major" placeholder="Enter something..." clearable></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="15">
        <FormItem label="专业学习情况：" prop="majorinfo">
          <Input v-model="studentResume.majorinfo" type="textarea" :autosize="true" placeholder="描述你学习的语言，状态，熟练度等等😏" clearable></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="15">
        <FormItem label="自我评价：" prop="selfevaluation">
          <Input v-model="studentResume.selfevaluation" type="textarea" :autosize="true" placeholder="描述你自己的学习能力，个人状态，还有优缺点，兴趣爱好等等😆" clearable></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="5">
        <FormItem label="英语等级：" prop="englishlevel">
          <Select v-model="studentResume.englishlevel" clearable>
            <Option v-for="item in englishlevellist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="5">
        <FormItem label="软件技能：" prop="sofewareskills">
          <Select v-model="sofewareskills" multiple>
            <Option v-for="item in sofewareskillslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="5">
        <FormItem label="求职意向：" prop="jobwant">
          <Input v-model="studentResume.jobwant" placeholder="一定要填喔！😝"></Input>
        </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">Submit</Button>
        <!-- <Button type="ghost" @click="handleReset()" style="margin-left: 8px">Reset</Button> -->
      </FormItem>
    </Form>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
  import {
    formatDate
  } from '@/libs/date.js'
  import {
    rand
  } from '@/libs/rand.js'
  import Cookies from "js-cookie";
  import axios from 'axios'
  import qs from 'qs'
  export default {
    data: function() {
      return {
        student: {},
        studentResume: {},
        data2: [],
        englishlevellist: [{
            value: 'CET-4',
            label: 'CET-4'
          },
          {
            value: 'CET-6',
            label: 'CET-6'
          }
        ],
        sofewareskillslist: [{
            value: 'JAVA',
            label: 'JAVA'
          },
          {
            value: 'C语言',
            label: 'C语言'
          },
          {
            value: 'C++',
            label: 'C++'
          },
          {
            value: 'C#',
            label: 'C#'
          },
          {
            value: 'JavaScript',
            label: 'JavaScript'
          },
          {
            value: 'Android',
            label: 'Android'
          },
          {
            value: 'Swift Code(IOS)',
            label: 'Swif Code(IOS)'
          }
        ],
        sofewareskills: [],
        isCreate: true,
        spinShow: true
      }
    },
    methods: {
      handleSubmit: function() {
        this.studentResume.sofewareskills = this.sofewareskills.toString()
        if (!this.isCreate) {
          axios.post('/rest/student-resume/edit/createNewSkillInfo',
            qs.stringify(this.studentResume), {
              headers: {
                'Content-type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
            this.$Notice.success({
              title: '保存信息成功！' + response.data.status
            });
          }, (response) => {
            this.$Notice.error({
              title: '保存信息失败，检查数据是否正确！'
            });
          })
        } else {
          axios.post('/rest/student-resume/' + this.studentResume.id + '/update?_method=PUT',
              qs.stringify(this.studentResume), {
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                }
              })
            .then(function(response) {
              var status = response.data.status
              if (status == 'success') {
                this.$Notice.success({
                  title: '数据更新成功',
                  desc: 'baseInfo',
                  duration: 1
                });
              } else {
                this.$Notice.error({
                  title: '更新数据失败',
                  desc: '请检查网络状态是否正常？',
                  duration: 1
                });
              }
            }.bind(this))
            .catch(function(error) {
              console.log(error)
            }.bind(this))
        }
      },
      randomId: function() {
        this.stuId = rand(1000000000000000)
      },
      getStudent: function() {
        axios.get('/rest/student-resume/' + Cookies.get("user") + '/edit')
          .then(function(response) {
            var status = response.data.status
            if (status == 'error') {
              this.isCreate = false
              axios.get('/rest/student/' + Cookies.get("user") + '/edit')
                .then(function(response) {
                  var stuInfo = response.data.student
                  this.studentResume = stuInfo
                  this.spinShow = false
                }.bind(this))
                .catch(function(error) {
                  console.log(error)
                }.bind(this))
            } else {
              this.studentResume = response.data.studentResume
              this.sofewareskills = this.studentResume.sofewareskills.split(",")
              this.spinShow = false
            }
          }.bind(this))
          .catch(function(error) {
            console.log(error)
          }.bind(this))
      },
      handleSearch2(value) {
        this.data2 = !value || value.indexOf('@') >= 0 ? [] : [
          value + '@qq.com',
          value + '@sina.com',
          value + '@163.com',
          value + '@gmail.com',
          value + '@yahoo.cn'
        ];
      }
    },
    mounted() {
      this.getStudent()
    }
  }
</script>
