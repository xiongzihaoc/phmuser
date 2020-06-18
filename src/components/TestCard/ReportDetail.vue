<template>
  <body class="ubg2">
    <!-- 公用头部组件 -->
    <Header></Header>
    <el-card
      style="width:97%;max-width:1000px;height:92%;margin:10px auto;overflow: auto;-webkit-overflow-scrolling: touch;"
    >
      <h2 style="font-weight:700;text-align:center;margin-bottom:10px;">
        {{ userInfo.name }}的检测报告
      </h2>
      <div v-for="item in reportInfo" :key="item.id">
        <div class="titleFlex" style="margin-top:1%;">
          <span class="orangeYuan"></span>
          <span class="dataStat">检测结果</span>
        </div>
        <p>{{ item.sheetName }}</p>
        <div style="width:100%">
          <span class="score" v-for="(subItem, i) in item.factor" :key="i"
            >{{ subItem.name }}：{{ subItem.score }}</span
          >
        </div>
        <div class="titleFlex" style="margin-top:1%;">
          <span class="orangeYuan"></span>
          <span class="dataStat">检测评语</span>
        </div>
        <p
          v-html="item.comment"
          style="padding: 5px 0  0 5px;font-size:14px;"
        ></p>
        <div class="titleFlex" style="margin:10px 0;">
          <span class="orangeYuan"></span>
          <span class="dataStat">检测建议</span>
        </div>
        <p
          v-html="item.suggestion"
          style="padding: 5px 0  0 5px;font-size:14px;"
        ></p>
      </div>
    </el-card>
  </body>
</template>
<script>
import Header from "../common/header";
export default {
  components: { Header },
  data() {
    return {
      Number: "",
      userInfo: {},
      reportInfo: [],
    };
  },
  created() {
    this.Number = window.localStorage.getItem("order");
    this.getReportDetail();
  },
  methods: {
    // 获取报告详情
    async getReportDetail() {
      const { data: res } = await this.$http.post("checkList/getReport", {
        orderNo: this.Number,
      });
      console.log(res);

      this.userInfo = res.data.info;
      this.reportInfo = res.data.report;
      this.reportInfo.forEach((item) => {
        item.factor = eval(item.factor);
      });
    },
  },
};
</script>
<style>
.titleFlex {
  box-sizing: border-box;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.orangeYuan {
  display: inline-block;
  width: 10px;
  height: 10px;
  /* border-radius: 50%; */
  background-color: #ff9a00;
}
.dataStat {
  font-size: 16px;
  font-weight: 700;
  padding-left: 5px;
  box-sizing: border-box;
}
.content {
  border: 1px dashed #ff9a00;
  border-radius: 10px;
  margin: 10px 0 0 0;
  padding: 5px;
}
.score {
  display: inline-block;
  border-radius: 5px;
  color: #ff9a00;
  font-size: 12px;
  padding: 4px 10px;
  margin: 5px;
  border: 1px solid #ff9a00;
}
</style>
