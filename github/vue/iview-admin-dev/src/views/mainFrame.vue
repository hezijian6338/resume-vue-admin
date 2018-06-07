<template>
<!-- <img src="./assets/logo.png"> -->
<div class="layout">
  <Layout>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
          <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          Item 1
          </MenuItem>
          <MenuItem name="2">
          <Icon type="ios-keypad"></Icon>
          Item 2
          </MenuItem>
          <MenuItem name="3">
          <Icon type="ios-analytics"></Icon>
          Item 3
          </MenuItem>
          <MenuItem name="4">
          <Icon type="ios-paper"></Icon>
          Item 4
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu theme="light" width="auto">
          <Submenu name="1">
            <template slot="title">
                <Icon type="ios-navigate"></Icon>
                个人资料
            </template>
            <MenuItem name="1-1" @click.native.prevent="Option1">个人信息预览</MenuItem>
            <MenuItem name="1-2" @click.native.prevent="Option2">个人信息修改</MenuItem>
            <MenuItem name="1-3" @click.native.prevent="Option3">个人技能填写</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        简历模板
                    </template>
            <MenuItem name="2-1" @click.native.prevent="upload">上传控制</MenuItem>
            <MenuItem name="2-2" @click.native.prevent="exportPDF">生成PDF个人简历</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                    </template>
            <MenuItem name="3-1">Option 1</MenuItem>
            <MenuItem name="3-2">Option 2</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{padding: '0 24px 24px'}">
        <Breadcrumb :style="{margin: '24px 0'}">
          <BreadcrumbItem :to="BreadcrumbHomePath">
            <Icon class="bIcon" type="ios-home-outline"></Icon>{{BreadcrumbHome}}
          </BreadcrumbItem>
          <BreadcrumbItem :to="BreadcrumbStepPath" v-if="BreadcrumbStepPath != ''">
            <Icon class="bIcon" :type="BreadcrumbStepIcon"></Icon>{{BreadcrumbStep}}
          </BreadcrumbItem>
          <BreadcrumbItem :to="BreadcrumbDetailPath" v-if="BreadcrumbDetailPath != ''">
            <Icon class="bIcon" type="pound"></Icon>{{BreadcrumbDetail}}
          </BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px', minHeight: '650px', background: '#fff'}">
          <router-view class="view"></router-view>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import $ from 'jquery'
Vue.use(iView)
export default {
  name: 'App',
  data: function() {
    return {
      BreadcrumbHome: "主页",
      BreadcrumbHomePath: "",
      BreadcrumbStep: "",
      BreadcrumbStepPath: "",
      BreadcrumbStepIcon: "",
      BreadcrumbDetail: "",
      BreadcrumbDetailPath: ""
    }
  },
  methods: {
    BreadcrumbItemOne: function() {
      this.BreadcrumbHome = "主页"
      this.BreadcrumbHomePath = "/mainFrame/homePage"
      this.BreadcrumbStep = "个人资料"
      this.BreadcrumbStepPath = "/mainFrame/homePage"
      this.BreadcrumbStepIcon = "ios-navigate"
    },
    BreadcrumbItemTwo: function() {
      this.BreadcrumbHome = "主页"
      this.BreadcrumbHomePath = "/mainFrame/homePage"
      this.BreadcrumbStep = "简历模板"
      this.BreadcrumbStepPath = "/mainFrame/homePage"
      this.BreadcrumbStepIcon = "ios-keypad"
    },
    Option1: function() {
      this.$router.push('/mainFrame/self/selfInfo')
      this.BreadcrumbItemOne()
      this.BreadcrumbDetail = "个人信息预览"
      this.BreadcrumbDetailPath = "/mainFrame/self/selfInfo"
    },
    Option2: function() {
      this.$router.push('/mainFrame/self/changeInfo')
      this.BreadcrumbItemOne()
      this.BreadcrumbDetail = "个人信息修改"
      this.BreadcrumbDetailPath = "/mainFrame/self/changeInfo"
    },
    Option3: function() {
      this.$router.push('/mainFrame/self/selfSkills')
      this.BreadcrumbItemOne()
      this.BreadcrumbDetail = "个人技能填写"
      this.BreadcrumbDetailPath = "/mainFrame/self/selfSkills"
    },
    upload: function() {
      this.$router.push('/mainFrame/self/upload')
      this.BreadcrumbItemTwo()
      this.BreadcrumbDetail = "上传控制"
      this.BreadcrumbDetailPath = "/mainFrame/self/upload"
    },
    exportPDF: function() {
      this.$router.push('/mainFrame/self/export')
      this.BreadcrumbItemTwo()
      this.BreadcrumbDetail = "PDF模板生成"
      this.BreadcrumbDetailPath = "/mainFrame/self/export"
    }
  },
  created() {
    this.$router.push('/')
  }
}
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}

.bIcon {
  padding-right: 5px;
}
</style>
