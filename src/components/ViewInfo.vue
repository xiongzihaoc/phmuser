<template>
  <div class="ubg">
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-12" id="logo">
            <img src="../images/logo.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="form-horizontal user-info">
        <div class="form-group mb40">
          <label for="name" class="col-sm-4 col-md-4 text-right" style="padding-right: 11px">
            <h3>基本信息</h3>
          </label>
        </div>
        <div class="form-group">
          <label
            for="name"
            class="col-sm-4 col-md-4 control-label text-right"
          >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label>
          <div class="col-sm-6 col-md-6">
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="请输入姓名"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="form-group">
          <label
            for="mobile"
            class="col-sm-4 col-md-4 control-label text-right"
          >电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</label>
          <div class="col-sm-6 col-md-6">
            <input
              type="text"
              class="form-control"
              id="mobile"
              placeholder="请输入手机号"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="birthday" class="col-sm-4 col-md-4 control-label text-right">出生年月</label>
          <div class="col-sm-6 col-md-6">
            <input
              type="text"
              class="form-control Wdate"
              id="birthday"
              placeholder="请选择日期"
              onclick="WdatePicker()"
              autocomplete="off"
              onfocus="this.blur();"
            />
          </div>
        </div>
        <div class="form-group">
          <label
            for="gender"
            class="col-sm-4 col-md-4 control-label text-right"
          >性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</label>
          <div class="col-sm-6 col-md-6">
            <select class="form-control" id="gender">
              <option value="0">女</option>
              <option value="1">男</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="maritalStatus" class="col-sm-4 col-md-4 control-label text-right">婚姻状况</label>
          <div class="col-sm-6 col-md-6">
            <select class="form-control" id="maritalStatus">
              <option value="0">未婚</option>
              <option value="1">已婚</option>
              <option value="2">离异</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label
            for="career"
            class="col-sm-4 col-md-4 control-label text-right"
          >职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业</label>
          <div class="col-sm-6 col-md-6">
            <!--<input type="text" class="form-control" id="career" placeholder="请选择职业">-->
            <select class="form-control" id="career">
              <option value=" ">请选择职业</option>
              <option value="企业职员">企业职员</option>
              <option value="国家公职人员">国家公职人员</option>
              <option value="务农">务农</option>
              <option value="务工">务工</option>
              <option value="科技技术员">科技技术员</option>
              <option value="教师">教师</option>
              <option value="学生">学生</option>
              <option value="无业">无业</option>
              <option value="其他">其他</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="degree" class="col-sm-4 col-md-4 control-label text-right">&nbsp;&nbsp;文化程度</label>
          <div class="col-sm-6 col-md-6">
            <select class="form-control" id="degree">
              <option value=" ">请选择文化程度</option>
              <option value="本科及以上">本科及以上</option>
              <option value="大专">大专</option>
              <option value="高中/中专">高中/中专</option>
              <option value="初中">初中</option>
              <option value="小学">小学</option>
              <option value="其它">其它</option>
            </select>
          </div>
        </div>
        <div class="form-group text-center">
          <button type="button" class="mbtn" id="btnSubmit">保 存</button>
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
  methods: {}
};
</script>
<style lang='less' scoped>
</style>