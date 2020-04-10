<template>
<body class="ubg2">
  <div class="header">
    <div class="container">
      <div class="row2">
        <div class="col-xs-6 col-md-6" id="logo">
          <a href="javascript:;">
            <img src="../../images/logo.png" />
          </a>
        </div>
        <div class="col-xs-6 col-md-6 text-right login-out">退出登录</div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt20 mb20">
      <div class="col-xs-6 col-md-6"></div>
      <div class="col-xs-6 col-md-6">
        <div class="tou text-right">
          <a href="javascript:;history.back()" class="green">
            返回
            <i class="ic ic-arr-right"></i>
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
          <p>{{this.infoForm.instruction}}</p>
        </div>
        <div class="text-center padd">
          <a
            href="javascript:;"
            class="btn btn-danger bg-red pdlr30 ml10"
            id="btnStart"
            @click.prevent.stop="startTest"
          >开始测试</a>
        </div>
      </div>
    </div>
  </div>
</body>
</template>
<script>
export default {
  data() {
    return {
      infoForm: {}
    };
  },
  created() {
    this.infoForm = JSON.parse(this.$route.query.infoList);
  },
  methods: {
    startTest() {
      this.$router.push({
        path: "StartTestWrite",
        query: { infoList: JSON.stringify(this.infoForm) }
      });
    }
  }
};
</script>
<style lang='less'>

.row2 {
  display: flex;
}
.padd {
  margin-bottom: 20px;
}
</style>