<template>
  <div>
    <div class="header">
      <div class="container">
        <div class="row2">
          <div class="col-xs-6 col-md-6" id="logo">
            <a href="javascript:;">
              <img src="../../images/logo.png" />
            </a>
          </div>
          <div class="col-xs-6 col-md-6 text-right login-out" @click="logout">退出登录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$router.push("/login");
      window.localStorage.clear();
    }
  }
};
</script>
<style lang='less' scoped>
</style>