// table.vue
<template>
    <div>
        <Table  border :columns="columnsTitle" :data="studentData"></Table>
        <Page :total="total" @on-change="pageChange" page-size="8" show-elevator></Page>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>
<script>
// import expandRow from "./table-expand.vue";
import axios from "axios";
export default {
  data() {
    return {
      current: 1,
      total: 100,
      spinShow: false,
      columnsTitle: [
        {
          title: "stuName",
          key: "stuname",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.stuname)
            ]);
          }
        },
        {
          title: "Major",
          key: "major"
        },
        {
          title: "Studentno",
          key: "studentno"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
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
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      studentData: []
    };
  },
  methods: {
    getStudent: function(page) {
      this.spinShow = true;
      axios
        .get("/rest/student/" + page)
        .then(
          function(response) {
            // var status = response.data.status;
            this.studentData = response.data.result;
            this.total = response.data.total;
            this.spinShow = false;
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    pageChange: function(page) {
      this.getStudent(page);
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: 
        `
        学院名称${this.studentData[index].orgName}<br>
        年级${this.studentData[index].grade}<br>
        电话${this.studentData[index].mobileno}
        `
      });
    }
  },
  mounted() {
    this.getStudent(this.current);
  }
};
</script>
