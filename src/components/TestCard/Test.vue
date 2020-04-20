<template>
<body class="ubg2">
  <!-- 公用头部组件 -->
  <Header></Header>
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
import Header from "../common/header";
export default {
  components: { Header },
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