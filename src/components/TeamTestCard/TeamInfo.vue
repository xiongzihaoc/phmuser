<template>
<body>
  <header>
    <img src="../../images/logo.png" alt />
  </header>
  <div class="infoBox">
    <h2 style="margin-bottom:20px;">基本信息</h2>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="Addrules"
      class="login-form"
      label-width="80px"
      label-position="center"
    >
      <el-form-item label="部  门" prop="dept">
        <el-input
          v-model="loginForm.dept"
          placeholder="请选择部门"
          type="text"
          @focus="showDept()"
          readonly
        ></el-input>
        <VuePicker
          :layer="4"
          :data="deptDate"
          @cancel="cancel"
          @confirm="confirm"
          :showToolbar="true"
          :maskClick="true"
          :visible.sync="pickerVisible"
        ></VuePicker>
      </el-form-item>
      <el-form-item label="姓  名" prop="name">
        <el-input ref="name" v-model="loginForm.name" placeholder="请输入姓名" type="text" />
      </el-form-item>
      <el-form-item label="电  话" prop="phone">
        <el-input ref="phone" v-model="loginForm.phone" placeholder="请输入电话" type="text" />
      </el-form-item>
      <el-form-item label="生  日" prop="birth" style="wdith:100%">
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
      <el-form-item label="性  别" prop="sex">
        <el-select v-model="loginForm.sex" placeholder="请选择性别" style="width:100%">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="婚  姻" prop="marriage">
        <el-select v-model="loginForm.marriage" placeholder="请选择" style="width:100%">
          <el-option label="未婚" value="未婚"></el-option>
          <el-option label="已婚" value="已婚"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职  业" prop="job">
        <el-select v-model="loginForm.job" placeholder="请选择职业" style="width:100%">
          <el-option v-for="item in jobList" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文  化" prop="edu">
        <el-select v-model="loginForm.edu" placeholder="请选择职业" style="width:100%">
          <el-option v-for="item in eduList" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-button class="loginBtn" type="danger" @click.native.prevent="handleLogin">保 存</el-button>
    </el-form>
  </div>
</body>
</template>
<script>
import { timesChangeDate } from "../../assets/js/changeTime";
import VuePicker from "vue-pickers";
export default {
  components: {
    VuePicker
  },
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
      // 表单检验规则
      Addrules: {
        dept: [{ required: true, message: "请选择部门" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        docName: [
          { required: true, message: "请输入医生姓名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        job: [{ required: true, message: "请选择职业", trigger: "blur" }],
        marriage: [
          { required: true, message: "请选择婚姻状况", trigger: "blur" }
        ],
        edu: [{ required: true, message: "请选择教育程度", trigger: "blur" }]
      },
      jobList: [
        { id: 1, name: "职员" },
        { id: 2, name: "企业职员" },
        { id: 3, name: "国家公职人员" },
        { id: 4, name: "务农" },
        { id: 5, name: "务工" },
        { id: 6, name: "科技技术员" },
        { id: 7, name: "教师" },
        { id: 8, name: "学生" },
        { id: 9, name: "无业" },
        { id: 10, name: "其他" }
      ],
      eduList: [
        { id: 1, name: "本科" },
        { id: 2, name: "大专" },
        { id: 3, name: "高中" },
        { id: 4, name: "初中" },
        { id: 5, name: "其他" }
      ],
      loginForm: {
        name: "",
        sex: "",
        phone: "",
        job: "",
        marriage: "",
        edu: "",
        dept: "",
        deptValue: "",
        birth: "",
        hasConfirm: ""
      },
      //   Isshow: false,
      //   时间选择配置
      currentDate: new Date(),
      minDate: new Date(1930, 0, 1),
      maxDate: new Date(2100, 0, 1),
      show: false, // 用来显示弹出层
      //   测试数据
      pickerVisible: false,
      deptDate: []
    };
  },
  created() {
    this.getDeptList();
  },
  methods: {
    async getDeptList() {
      const { data: res } = await this.$http.post("teamList/dept/tree", {});
      console.log(res);

      this.deptDate = res.data;
    },
    // 保存
    handleLogin() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("teamList/addMember", {
          id: 132148489456456540,
          teamDept: this.loginForm.deptValue,
          teamPackageUuid: "SDWQDEWQDASDSADWQQWWQEEW",
          patient: {
            name: this.loginForm.name,
            phone: this.loginForm.phone,
            sex: this.loginForm.sex,
            birth: this.timesChangeDate(this.loginForm.birth),
            job: this.loginForm.job,
            marriage: this.loginForm.marriage,
            edu: this.loginForm.edu
          }
        });
      });
    },
    saveEnter() {
      this.$router.push("testReport");
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
    // 选择部门区域方法
    showDept() {
      this.loginForm.deptValue = "";
      this.loginForm.dept = "";
      this.pickerVisible = true;
    },
    cancel() {
      console.log("cancel");
    },
    confirm(res) {
      console.log(res);

      // 数组长度减1 获取数组最后一项的下标
      var DeptLength = res.length;
      this.loginForm.deptValue = res[DeptLength - 1].value;

      var deptStr = "";
      for (var i = 0; i < res.length; i++) {
        deptStr += res[i].label + "-";
      }
      if (deptStr.length > 0) {
        deptStr = deptStr.substr(0, deptStr.length - 1);
      }
      this.loginForm.dept = deptStr;
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
  background: #0088b3 url("../../images/nbg.png") no-repeat bottom center;
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