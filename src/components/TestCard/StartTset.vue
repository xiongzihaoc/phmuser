<template>
  <body class="ubg2">
    <!-- 公用头部组件 -->
    <Header></Header>
    <div class="container">
      <div class="row mt20 mb20">
        <div class="col-xs-6 col-md-6"></div>
        <div class="col-xs-6 col-md-6">
          <div class="tou text-right">
            <a href="javascript:;history.back()" class="green">
              返回>>
            </a>
          </div>
        </div>
      </div>
      <div class="test-answer">
        <div class="pd2">
          <h2 class="t-title text-center">测试指导语</h2>
        </div>
        <div class="pd2 guide">
          <div id="guideBox" class="guide-txt" style="min-height: 100px">
            <p>{{ instr }}</p>
          </div>
          <div class="text-center padd">
            <a
              href="javascript:;"
              class="btn btn-danger bg-red pdlr30 ml10"
              id="btnStart"
              @click.prevent.stop="startTest"
              >开始测试</a
            >
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import Header from "../common/header";
export default {
  components: { Header },
  data() {
    return {
      instr: "",
      sheetUuid: "",
      name: "",
      ansUuid: "",
      state: "",
    };
  },
  created() {
    this.instr = this.$route.query.instruction;
    this.sheetUuid = this.$route.query.sheetId;
    this.name = this.$route.query.name;
    this.ansUuid = this.$route.query.ansUuid;
    this.state = this.$route.query.status;
  },
  methods: {
    startTest() {
      this.$router.replace({
        path: "StartTestWrite",
        query: {
          sheetUuid: this.sheetUuid,
          name: this.name,
          ansUuid: this.ansUuid,
          state: this.state,
        },
      });
    },
  },
};
</script>
<style lang="less">
.row2 {
  display: flex;
}
.padd {
  margin-bottom: 20px;
}
</style>
