<template>
<div class="change" :style="{position:'absolute'}">
  <Form :model="student" label-position="top">
    <Row>
      <Col span="6">
      <FormItem label="姓名：" prop="stuname">
        <Input v-model="student.stuname" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
      <Col span="6">
      <FormItem label="学号：" prop="studentno">
        <Input v-model="student.studentno"></Input>
      </FormItem>
      </Col>
      <Col span="6">
      <FormItem label="性别：" prop="sex">
        <Input v-model="student.sex" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
      <Col span="6">
      <FormItem label="民族：" prop="nation">
        <Input v-model="student.nation" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="4">
      <FormItem label="学院：" prop="department">
        <Input v-model="student.department" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
      <Col span="4">
      <FormItem label="专业：" prop="major">
        <Input v-model="student.major" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
      <Col span="4">
      <FormItem label="班级：" prop="classname">
        <Input v-model="student.classname" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
      <Col span="4">
      <FormItem label="面貌：" prop="politicalstatus">
        <Input v-model="student.politicalstatus" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
      <Col span="4">
      <FormItem label="出生地：" prop="fromPlace">
        <Input v-model="student.fromPlace" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
      <Col span="4">
      <FormItem label="出生日期：" prop="birthday">
        <DatePicker v-model="student.birthday" type="date" format="yyyy-MM-dd" placeholder="Select date" style="width:15.8em" clearable></DatePicker>
      </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
      <FormItem label="身份证号：" prop="idcardno">
        <Input v-model="student.idcardno" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
      <Col span="12">
      <FormItem label="邮政编码：" prop="postcode">
        <Input v-model="student.postcode" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
      <FormItem label="手机号码：" prop="mobileno">
        <Input v-model="student.mobileno" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
      <Col span="12">
      <FormItem label="家庭电话：" prop="familytelno">
        <Input v-model="student.familytelno" placeholder="Enter something..." clearable></Input>
      </FormItem>
      </Col>
    </Row>
    <FormItem label="自我评价：" prop="selfdescription">
      <Input v-model="student.selfdescription" type="textarea" :autosize="true" placeholder="Enter something..." clearable></Input>
    </FormItem>
    <FormItem label="接受教育时间：" prop="acceptancedate">
      <DatePicker v-model="student.acceptancedate" type="date" format="yyyy-MM-dd" placeholder="Select date" style="width:15.8em" clearable></DatePicker>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit()">Submit</Button>
      <Button type="ghost" @click="handleReset()" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
  <Spin size="large" fix v-if="spinShow"></Spin>
</div>
</template>
<script>
import Cookies from "js-cookie";
import axios from "axios";
import qs from "qs";
export default {
  data: function() {
    return {
      student: {},
      spinShow: true
    };
  },
  methods: {
    handleSubmit: function() {
      axios
        .post(
          "/rest/student/"+Cookies.get("user")+"/update?_method=PUT",
          qs.stringify(this.student),
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(
          response => {
            this.$Notice.success({
              title:
                "保存信息成功！" +
                response.data.student +
                response.data.studentID
            });
          },
          response => {
            this.$Notice.error({
              title: "保存信息失败，检查数据是否正确！"
            });
          }
        );
    },
    randomId: function() {
      this.stuId = rand(1000000000000000);
    },
    getStudent: function() {
      axios
        .get("/rest/student/"+Cookies.get("user")+"/edit")
        .then(
          function(response) {
            var stuInfo = response.data.student;
            this.student = stuInfo;
            this.spinShow = false;
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    }
  },
  mounted() {
    this.getStudent();
  }
};
</script>
