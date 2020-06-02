<template>
<body>
  <header>
    <img src="../images/logo.png" alt />
  </header>
  <div class="infoBox">
    <h2 style="margin-bottom:20px;">基本信息</h2>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="Addrules"
      class="login-form"
      label-width="80px"
      label-position="left"
    >
      <el-form-item label="姓名" prop="name">
        <el-input ref="name" v-model="loginForm.name" placeholder="请输入姓名" type="text" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input
          ref="phone"
          :disabled="true"
          v-model="loginForm.phone"
          placeholder="请输入电话"
          type="text"
        />
      </el-form-item>
      <!-- 出生年月 -->
      <el-form-item label="出生年月" prop="birth" style="wdith:100%">
        <el-input v-model="loginForm.birth" placeholder="选择日期" @focus="showPopFn()" readonly></el-input>
        <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirmFn()"
            @cancel="cancelFn()"
          />
        </van-popup>
      </el-form-item>
      <!-- sex -->
      <el-form-item label="性别" prop="sex">
        <el-select v-model="loginForm.sex" placeholder="请选择性别" style="width:100%">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="婚姻状况" prop="marriage">
        <el-select v-model="loginForm.marriage" placeholder="请选择" style="width:100%">
          <el-option label="未婚" value="未婚"></el-option>
          <el-option label="已婚" value="已婚"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业" prop="job">
        <el-select v-model="loginForm.job" placeholder="请选择职业" style="width:100%">
          <el-option v-for="item in jobList" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文化程度" prop="edu">
        <el-select v-model="loginForm.edu" placeholder="请选择职业" style="width:100%">
          <el-option v-for="item in eduList" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-button
        class="loginBtn"
        type="danger"
        @click.native.prevent="handleLogin"
        @confirm="saveEnter"
      >保 存</el-button>
    </el-form>
  </div>
  <van-dialog
    class="dialogSu"
    :showCancelButton="false"
    v-model="Isshow"
    title="提示"
    show-cancel-button
    @confirm="saveEnter"
  >
    <p class="loginSuccess" style="text-align:center">保存成功</p>
  </van-dialog>
</body>
</template>
<script>
import { timesChangeDate } from "../assets/js/changeTime";
export default {
  data() {
    // 手机验证规则
    var checkMobile = (rule, value, cb) => {
      const regMoblie = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMoblie.test(value)) {
        return cb();
      }
      return cb(new Error("请输入合法的手机号"));
    };
    return {
      timesChangeDate,
      Addrules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        docName: [
          { required: true, message: "请输入医生姓名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birth: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
        job: [{ required: true, message: "请选择职业", trigger: "blur" }],
        marriage: [
          { required: true, message: "请选择婚姻状况", trigger: "blur" }
        ],
        edu: [{ required: true, message: "请选择教育程度", trigger: "blur" }]
      },
      jobList: [
        { id: 1, name: "国家公务员" },
        { id: 2, name: "专业技术人员" },
        { id: 3, name: "职员" },
        { id: 4, name: "企业管理人员" },
        { id: 5, name: "工人" },
        { id: 6, name: "农民" },
        { id: 7, name: "学生" },
        { id: 8, name: "现役军人" },
        { id: 9, name: "自由职业者" },
        { id: 10, name: "个体经营者" },
        { id: 11, name: "无业人员" },
        { id: 12, name: "退(离)休人员" },
        { id: 13, name: "其他" }
      ],
      eduList: [
        { id: 1, name: "博士" },
        { id: 2, name: "硕士" },
        { id: 3, name: "本科" },
        { id: 4, name: "大专" },
        { id: 5, name: "中专和中技" },
        { id: 6, name: "技工学校" },
        { id: 7, name: "高中" },
        { id: 8, name: "初中" },
        { id: 9, name: "小学" },
        { id: 10, name: "文盲与半文盲" }
      ],
      loginForm: {
        name: "",
        sex: "",
        phone: "",
        job: "",
        marriage: "",
        edu: "",
        birth: "",
        hasConfirm: ""
      },
      Isshow: false,
      currentDate: new Date(),
      minDate: new Date(1930, 0, 1),
      maxDate: new Date(2100, 0, 1),
      show: false // 用来显示弹出层
    };
  },
  created() {
    this.loginForm = JSON.parse(window.localStorage.getItem("infoForm"));
    this.loginForm.birth = this.timesChangeDate(this.loginForm.birth);
  },
  methods: {
    handleLogin() {
      if (this.loginForm.hasConfirm == 0) {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return;
          const { data: res } = await this.$http.post("checkList/update", {
            id: this.loginForm.id,
            name: this.loginForm.name,
            phone: this.loginForm.phone,
            sex: this.loginForm.sex,
            birth: this.timesChangeDate(this.loginForm.birth),
            job: this.loginForm.job,
            marriage: this.loginForm.marriage,
            edu: this.loginForm.edu,
            hasConfirm: "1",
            state: "1"
          });
        });
        this.Isshow = true;
      } else {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return;
          const { data: res } = await this.$http.post("checkList/update", {
            name: this.loginForm.name,
            id: this.loginForm.id,
            phone: this.loginForm.phone,
            sex: this.loginForm.sex,
            birth: this.timesChangeDate(this.loginForm.birth),
            job: this.loginForm.job,
            marriage: this.loginForm.marriage,
            edu: this.loginForm.edu,
            hasConfirm: "1",
            state: "1"
          });
          this.$router.push("testReport");
        });
      }
    },
    // 选择日期
    showPopFn() {
      this.show = true;
    },
    // 确定按钮
    confirmFn() {
      this.loginForm.birth = this.timesChangeDate(this.currentDate);
      this.show = false;
    },
    // 关闭按钮
    cancelFn() {
      this.show = true;
    },
    saveEnter() {
      this.$router.push("testReport");
    }
  },
  mounted() {
    this.timesChangeDate(new Date());
  }
};
</script>
<style>
header {
  padding: 10px 10px 10px 20%;
  width: 100%;
  background-color: #fff;
}
body {
  height: 100%;
  background: #0088b3 url("../images/nbg.png") no-repeat bottom center;
  background-size: contain;
}
.infoBox {
  width: 90%;
  max-width: 800px;
  padding: 5%;
  margin: 20px auto;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
}
.loginBtn {
  margin-left: 50%;
  transform: translate(-50%);
}
.infoBox .el-form-item__label {
  color: #000;
}

.show {
  width: 60%;
  max-width: 600px;
  border-radius: 8px;
}
.loginSuccess {
  padding: 30px 0;
}
.dialogSu {
  width: 80%;
  max-width: 600px;
}
</style>