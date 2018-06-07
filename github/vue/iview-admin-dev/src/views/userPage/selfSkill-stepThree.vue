<template>
<div class="skills">
  <template>
    <Form ref="studentResume" :model="studentResume" :rules="ruleValidate" :label-width="80">
        <FormItem label="Skill-Three-Name" prop="skillthree">
            <Input v-model="studentResume.skillthree" placeholder="Enter your skill name" style="width: 200px"></Input>
        </FormItem>
        <!-- <FormItem label="Skill-Status" prop="oneStatus">
          <Slider v-model="studentResume.status" :tip-format="format" show-input></Slider>
        </FormItem> -->
        <FormItem label="Skill-Decs" prop="threeinfo">
            <Input v-model="studentResume.threeinfo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <!-- <Button type="primary" @click="handleSubmit('studentResume')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        </FormItem>
    </Form>
</template>
</div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import Cookies from "js-cookie";
export default {
  data() {
    return {
      studentResume: {},
      ruleValidate: {
        skillthree: [{
          required: true,
          message: 'The skillthree cannot be empty',
          trigger: 'blur'
        }],
        status: [{
          required: true,
          message: 'The status cannot be empty',
          // trigger: 'mouseover'
        }],
        // date: [{
        //   required: true,
        //   type: 'date',
        //   message: 'Please select the date',
        //   trigger: 'change'
        // }],
        threeinfo: [{
            required: true,
            message: 'Please enter a threeinfo introduction',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 20,
            message: 'Introduce no less than 20 words',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$Message.success('Success!');
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
                  desc: 'skillThree,threeInfo',
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
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    format(val) {
      return 'Progress: ' + val + '%';
    },
    hideFormat() {
      return null;
    },
    getStudentResume: function() {
      axios.get('/rest/student-resume/' + Cookies.get("user") + '/edit')
        .then(function(response) {
          var status = response.data.status
          if (status == 'success') {
            this.studentResume = response.data.studentResume
            this.$Message.success('Load Success!');
          } else {
            this.$Message.error('Load Fail!');
          }
        }.bind(this))
        .catch(function(error) {
          console.log(error)
        }.bind(this))
    }
  },
  mounted() {
    this.getStudentResume()
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == '/upload-photo/index') {
      this.handleSubmit('studentResume')
      next()
    }else if (to.path == '/step/index/two') {
      next()
    }
  }
}
</script>
