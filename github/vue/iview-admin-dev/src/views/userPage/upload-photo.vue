<style lang="less">
  @import "../../styles/common.less";
  @import "../my-components/file-upload/upload.less";
</style>

<template>
  <div>
    <Row>
      <Col span="8" class="padding-left-10">
      <Card>
        <p slot="title">
          <Icon type="upload"></Icon>
          上传个人头像照片
        </p>
        <div class="height-120px">
          <Row type="flex" justify="center" align="middle" class="height-100">
            <Upload name="file" ref="image" :data="this.userInfo" action="/rest/upload/" :format="['jpg', 'png', 'jpeg', 'gif', 'bmp', 'svg']" :on-format-error="handleFormatError" :on-success="handleSuccess2" :on-preview="preview">
              <span>选择图片上传&nbsp;&nbsp;</span>
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
          </Row>
        </div>
      </Card>
      </Col>
    </Row>
    <Modal title="查看图片" v-model="visible">
      <img :src="this.photoPath" v-if="visible" style="width: 100%">
    </Modal>
  
  </div>
</template>

<script>
  import Cookies from "js-cookie";
  export default {
    name: "file-upload",
    data() {
      return {
        defaultList: [{
            name: "a42bdcc1178e62b4694c830f028db5c0",
            url: "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
          },
          {
            name: "bc7521e033abdd1e92222d733590f104",
            url: "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
          }
        ],
        imgName: "",
        visible: false,
        uploadList: [],
        headers: {
          "Content-Type": "multipart/form-data"
        },
        userInfo: {
          user: "",
          userType: ""
        },
        photoPath: ""
      };
    },
    methods: {
      handleFormatError(file) {
        this.$Notice.warning({
          title: "文件格式不正确",
          desc: "文件 " + file.name + " 格式不正确，请选择图片文件。"
        });
      },
      handleBeforeUpload(file) {
        this.$Notice.warning({
          title: "文件准备上传",
          desc: "文件 " + file.name + " 准备上传。"
        });
      },
      handleProgress(event, file) {
        this.$Notice.info({
          title: "文件正在上传",
          desc: "文件 " + file.name + " 正在上传。"
        });
      },
      handleSuccess(evnet, file) {
        this.$Notice.success({
          title: "文件上传成功",
          desc: "文件 " + file.name + " 上传成功。"
        });
      },
      handleError(event, file) {
        this.$Notice.error({
          title: "文件上传成功",
          desc: "文件 " + file.name + " 上传失败。"
        });
      },
      handleView(name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove(file) {
        // // 从 upload 实例删除数据
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess2(res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        this.$Notice.success({
          title: "文件上传成功",
          desc: "文件 " + res.photoName + " 上传成功。"
        });
        file.url =
          res.photoPath;
        file.name = res.photoName;
      },
      handleFormatError2(file) {
        this.$Notice.warning({
          title: "文件格式不正确",
          desc: "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: "超出文件大小限制",
          desc: "文件 " + file.name + " 太大，不能超过 2M。"
        });
      },
      handleBeforeUpload2() {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: "最多只能上传 5 张图片。"
          });
        }
        return check;
      },
      preview(file) {
        this.visible = true;
        //alert(file.response.photoPath + file.url + file.name);
        this.photoPath = this.$store.state.vPath + "/pdfModel/studentPhoto/" + file.name;
      }
    },
    mounted() {
      // this.uploadList = this.$refs.upload.fileList;
      // alert(Cookies.get("user"));
      this.userInfo.user = Cookies.get("user");
      this.userInfo.userType = Cookies.get("userType");
    }
  };
</script>
