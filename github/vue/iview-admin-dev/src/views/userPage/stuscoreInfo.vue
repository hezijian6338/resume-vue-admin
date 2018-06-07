// table.vue
<style>
  .ivu-table .demo-table-info-row td {
    background-color: #2db7f5;
    color: #fff;
  }
</style>

<template>
  <div>
    <Table border :columns="seletedTitle" :data="selectedCourse"></Table>
    <Table border :columns="columnsTitle" :data="socreInfo"></Table>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
  // import expandRow from "./table-expand.vue";
  import axios from "axios";
  import Cookies from "js-cookie";
  export default {
    data() {
      return {
        current: 1,
        total: 100,
        spinShow: false,
        select: 'select',
        seletedTitle: [{
            title: "Index",
            key: "index"
          },
          {
            title: "courseName",
            key: "coursename"
          },
          {
            title: "finalScore",
            key: "finalscore"
          },
        ],
        columnsTitle: [{
            title: "courseName",
            key: "coursename",
            render: (h, params) => {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "person"
                  }
                }),
                h("strong", params.row.coursename)
              ]);
            }
          },
          {
            title: "finalScore",
            key: "finalscore"
          },
          {
            title: "Studentno",
            key: "studentno"
          },
          {
            title: "employName",
            key: "employName"
          },
          {
            title: "Controller",
            key: "Controller",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button", {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.show(params.index);
                      }
                    }
                  },
                  "View"
                ),
                h(
                  "Button", {
                    props: {
                      type: "ghost",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        //this.remove(params.index);
                        this.selectCourse(params)
                      }
                    }
                  },
                  this.select
                )
              ]);
            }
          }
        ],
        socreInfo: [],
        selectedCourse: []
      };
    },
    methods: {
      getStudent: function() {
        this.spinShow = true;
        axios
          .get("/rest/score-info/" + Cookies.get("user"))
          .then(
            function(response) {
              // var status = response.data.status;
              this.socreInfo = response.data.socreInfo;
              this.spinShow = false;
            }.bind(this)
          )
          .catch(
            function(error) {
              console.log(error);
            }.bind(this)
          );
      },
      show(index) {
        this.$Modal.info({
          title: "User Info",
          content: `
                                总学时:&nbsp;&nbsp;&nbsp;${this.socreInfo[index].totalhours}时<br>
                                平时成绩:&nbsp;&nbsp;&nbsp;${this.socreInfo[index].usualscore}分<br>
                                期末成绩:&nbsp;&nbsp;&nbsp;${this.socreInfo[index].endscore}分
                                `
        });
      },
      selectCourse(params) {
        var isSeleted = false
        var Course = {
          index: "",
          coursename: "",
          finalscore: ""
        }
        // alert(this.selectedCourse.length)
        if (this.selectedCourse.length != 3) {
          this.selectedCourse.forEach((item, index) => {
            if (item.coursename === params.row.coursename) {
              alert("same," + index + params.index)
              this.selectedCourse.splice(index, 1)
              isSeleted = true
            }
          })
          if (!isSeleted) {
            Course.index = params.index
            Course.coursename = params.row.coursename
            Course.finalscore = params.row.finalscore
            this.selectedCourse.push(Course)
          }
        }
  
      }
    },
    mounted() {
      this.getStudent();
    }
  };
</script>
