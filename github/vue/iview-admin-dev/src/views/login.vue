<style lang="less">
  @import "./login.less";
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title" v-if="isLogin">
          <Icon type="log-in"></Icon>
          欢迎！企业用户注册~
        </p>
        <p slot="title" v-else>
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="userPassword">
              <Input type="password" v-model="form.userPassword" placeholder="请输入密码">
              <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long v-if="isLogin">注册</Button>
              <Button @click="handleSubmit" type="primary" long v-else>登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip" @click="signIn">{{signButton}}</p>
        </div>
      </Card>
    </div>
    <Spin fix v-if="isLoad">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
  import Cookies from "js-cookie";
  import axios from "axios";
  import qs from "qs";
  export default {
    data() {
      return {
        loginState: false,
        isLogin: false,
        isAdmin: false,
        isLoad: false,
        signButton: "欢迎！企业用户注册~",
        form: {
          userName: "iview_admin",
          userPassword: ""
        },
        rules: {
          userName: [{
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }],
          userPassword: [{
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }]
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            if (!this.isLogin) {
              this.isLoad = true;
              axios
                .post("/rest/login/1/vertifyLogin", qs.stringify(this.form), {
                  headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                  }
                })
                .then(
                  function(response) {
                    setTimeout(() => {
                      this.isLoad = false;
                    }, 500);
                    this.loginState = response.data.status;
                    this.isAdmin = response.data.isAdmin;
                    Cookies.set("userType", response.data.userType);
                    Cookies.set("user", this.form.userName);
                    Cookies.set("password", this.form.userPassword);
                    if (this.isAdmin) {
                      this.$store.commit(
                        "setAvator",
                        this.$store.state.vPath + "/pdfModel/studentPhoto/" + Cookies.get("user") + ".png"
                      );
                    } else {
                      this.$store.commit(
                        "setAvator",
                        this.$store.state.vPath + "/pdfModel/" + response.data.photoPath
                      );
                    }
                    if (this.loginState) {
                      if (this.isAdmin) {
                        Cookies.set("access", "0,8");
                      } else if(response.data.userType == 'company'){
                        Cookies.set("access", "2,3,4,5,6,7,8");
                      }else{
                        Cookies.set("access", "2,3,4,5,6,8,9");
                      }
                      this.$router.push({
                        name: "home_index"
                      });
                    } else {
                      this.$Notice.warning({
                        title: "账户或者密码错误！",
                        desc: "登录失败"
                      });
                    }
                  }.bind(this)
                )
                .catch(
                  function(error) {
                    console.log(error);
                  }.bind(this)
                );
            } else {
              this.isLoad = true;
              axios
                .post("/rest/sign/", qs.stringify(this.form), {
                  headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                  }
                })
                .then(
                  function(response) {
                    setTimeout(() => {
                      this.isLoad = false;
                    }, 500);
                    if (response.data.status) {
                      this.$Notice.success({
                        title: "企业用户注册成功，跳转到登录页面~",
                        desc: "成功注册",
                        duration: 1
                      });
                    } else {
                      this.$Notice.success({
                        title: "企业用户已经存在，跳转到登录页面~",
                        desc: "注册失败",
                        duration: 1
                      });
                    }
                    this.isLogin = false;
                  }.bind(this)
                )
                .catch(
                  function(error) {
                    console.log(error);
                  }.bind(this)
                );
            }
          }
        });
      },
      signIn() {
        if (!this.isLogin) {
          this.isLogin = true;
          this.form.userName = "";
          this.signButton = "返回~登录页面~";
        } else {
          this.isLogin = false;
          this.signButton = "欢迎！企业用户注册~";
        }
      }
    }
  };
</script>

<style>
  .signIn {
    width: 100%;
    height: 100%;
    background-image: url("../styles/computer.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
  }
  
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
