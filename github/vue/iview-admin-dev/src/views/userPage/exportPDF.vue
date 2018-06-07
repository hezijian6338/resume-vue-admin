<template>
  <div>
    <Row>
      <Col span="11">
      <Card style="width:320px;cursor: pointer" @click.native.prevent="createPDF">
        <div style="text-align:center">
          <img src="../../images/drive.jpg" style="width: 50%;height: 50%">
          <h3>---个人简历模板-1--</h3>
        </div>
      </Card>
      <button @click="downloadPDF">下载简历</button>
      </Col>
      <Col span="11">
      <Card style="width:320px;cursor: pointer" @click.native.prevent="createPDF">
        <div style="text-align:center">
          <img src="../../images/couple.jpg" style="width: 50%;height: 50%">
          <h3>---个人简历模板-2--</h3>
        </div>
      </Card>
      </Col>
    </Row>
    <pdf :src="PDFsrc"></pdf>
    <Spin fix v-if="isLoad">
      <Icon type="load-c" size=23 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
  import axios from "axios";
  import qs from "qs";
  import Cookies from "js-cookie";
  import pdf from 'vue-pdf'
  export default {
    data() {
      return {
        model: {
          modelName: "resume-beta"
        },
        isLoad: false,
        PDFsrc: ""
      };
    },
    methods: {
      createPDF: function() {
        this.isLoad = true
        var url = "/rest/student-resume/" + Cookies.get("user") + "/createPDF"
        axios.post(url, qs.stringify(this.model), {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        }).then(
          response => {
            setTimeout(() => {
              this.isLoad = false;
            }, 500);
            this.$Notice.success({
              title: "成功生成电子个人简历(PDF版本)"
            });
            var pdfURL = this.$store.state.vPath + response.data.pdfURL
            this.PDFsrc = pdfURL
            this.download(pdfURL)
          },
          response => {
            setTimeout(() => {
              this.isLoad = false;
            }, 500);
            this.$Notice.error({
              title: "保存信息失败，检查数据是否正确！"
            });
          }
        );
      },
      downloadPDF: function() {
        var url = "/rest/student-resume/" + Cookies.get("user") + "/exportPDF"
        axios.get(url, {
          params: {
            modelName: this.model.modelName
          }
        }, {
          headers: {
            "Content-type": "blob"
          }
        }).then(
          response => {
            const elink = document.createElement('a')
            // elink.download = "test.pdf"
            elink.style.display = 'none'
            elink.href = "/pdfModel/studentPDF/160204107189-resume-beta-model.pdf"
            document.body.appendChild(elink)
            elink.click()
            // URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
  
          },
          response => {
  
          }
        );
      },
      download: function(pdfURL) {
        const elink = document.createElement('a')
        elink.download = "test.pdf"
        elink.style.display = 'none'
        elink.href = pdfURL
        document.body.appendChild(elink)
        elink.click()
        // URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      }
    },
    components: {　　　　
      pdf　　　　　
    }
  }
</script>

<style>
  
</style>

