<template>
<body class="ubg2">
  <div class="header">
    <span class="container">
      <span class="row2">
        <div class="col-xs-6 col-md-6" id="logo">
          <img src="../../images/logo.png" />
        </div>
        <span class="col-xs-6 col-md-6 text-right login-out">
          <span>退出登录</span>
        </span>
      </span>
    </span>
  </div>
  <div class="container">
    <div class="row idx">
      <div class="col-sm-12 col-md-6">
        <div class="idx-box">
          <div>
            <i class="ic ic-edit"></i>
          </div>
          <a href="javascript:;" class="mbtn" @click.prevent.stop="test">测试</a>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="idx-box">
          <div>
            <i class="ic ic-search"></i>
          </div>
          <a href="javascript:;" class="mbtn" @click.prevent.stop="report">报告</a>
        </div>
      </div>
    </div>
  </div>
</body>
</template>
<script>
export default {
  data() {
    return {};
  },

  methods: {
    test() {
      this.$router.push("testWork");
    },
    report() {}
  }
};
</script>
<style lang='less'>
.row2 {
  display: flex;
}
</style>