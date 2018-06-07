<template>
  <div>
    <Steps :current="current">
      <Step title="确认中" content="确认个人信息无误"></Step>
      <Step title="进行中" content="填写个人技能信息"></Step>
      <Step title="进行中" content="填写个人技能信息"></Step>
      <Step title="进行中" content="填写个人技能信息"></Step>
    </Steps>
    <Content :style="{padding: '24px', minHeight: '350px', background: '#fff'}">
      <router-view></router-view>
    </Content>
    <Button type="primary" @click="back">Back</Button>
    <Button type="primary" @click="next">{{nextValue}}</Button>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
    data() {
      return {
        current: 0,
        nextValue: 'Next Step'
      }
    },
    methods: {
      next() {
        switch (this.current) {
          case 0:
            // this.$router.push('/mainFrame/self/selfSkills/stepOne')
            this.$router.push({
              name: 'one_index'
            })
            this.current += 1
            break
          case 1:
            // this.$router.push('/mainFrame/self/selfSkills/stepTwo')
            this.$router.push({
              name: 'two_index'
            })
            this.current += 1
            break
          case 2:
            // this.$router.push('/mainFrame/self/selfSkills/stepThree')
            this.$router.push({
              name: 'three_index'
            })
            this.current += 1
            this.nextValue = 'Finised'
            break
          case 3:
          alert(localStorage.avatorImgPath)
            // this.$router.push('/mainFrame/self/export')
            this.$router.push({
              name: 'upload-photo_index'
            })
        }
      },
      back() {
        switch (this.current) {
          case 0:
            // this.$router.push('/mainFrame/self/selfSkills/stepReady')
            this.$router.push({
              name: 'ready_index'
            })
            break
          case 1:
            // this.$router.push('/mainFrame/self/selfSkills/stepReady')
            this.$router.push({
              name: 'ready_index'
            })
            this.current -= 1
            break
          case 2:
            // this.$router.push('/mainFrame/self/selfSkills/stepOne')
            this.$router.push({
              name: 'one_index'
            })
            this.current -= 1
            break
          case 3:
            // this.$router.push('/mainFrame/self/selfSkills/stepTwo')
            this.$router.push({
              name: 'two_index'
            })
            this.current -= 1
            this.nextValue = 'Next Step'
            break
        }
      }
    }
    // },
    // created() {
    //   this.$router.push('/mainFrame/self/selfSkills/stepReady')
    // }
  }
</script>
