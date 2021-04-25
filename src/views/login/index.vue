<template>
  <div class="login">
    <div class="login-box">
      <ul class="menu-tab">
        <li :class="{ current: status === 0 }" @click="toggleTab(0)">登录</li>
        <li :class="{ current: status === 1 }" @click="toggleTab(1)">注册</li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="login-form"
        label-position="top"
      >
        <el-form-item label="邮箱" prop="email" class="form-item">
          <el-input
            type="email"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="form-item">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="重复密码"
          prop="confirmPassword"
          class="form-item"
          v-if="status === 1"
        >
          <el-input
            type="password"
            v-model="ruleForm.confirmPassword"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode" class="form-item">
          <div class="flex justify-between">
            <div style="flex: 1; padding-right:20px">
              <el-input v-model="ruleForm.verifyCode"></el-input>
            </div>
            <div>
              <el-button
                type="success"
                :disabled="getCodeBtn.isDisabled"
                :loading="getCodeBtn.isLoading"
                @click="getCode"
                >{{ getCodeBtn.text }}</el-button
              >
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="danger"
            @click="submitForm()"
            :disabled="isSubmitBtnDisabled"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getSms, login, register } from '@api/login'
import { isValidEmail, isValidPassword, isValidCode } from '@utils/validate'

export default {
  name: 'login',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!isValidEmail(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!isValidPassword(value)) {
        callback(new Error('密码6-20位，包含数字、大小写字母'))
      } else {
        callback()
      }
    }
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('输入的密码不匹配'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (!isValidCode(value)) {
        callback(new Error('验证码格式错误'))
      } else {
        callback()
      }
    }

    return {
      status: 0,
      ruleForm: {
        email: '706809256@qq.com',
        password: '123456Aa',
        confirmPassword: '',
        verifyCode: ''
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        confirmPassword: [{ validator: validateConfirmPass, trigger: 'blur' }],
        verifyCode: [{ validator: validateCode, trigger: 'blur' }]
      },
      getCodeBtn: {
        isLoading: false,
        isDisabled: false,
        text: '获取验证码'
      },
      isSubmitBtnDisabled: true,
      timer: null
    }
  },
  methods: {
    toggleTab(status) {
      this.status = status
      this.resetForm()
      this.resetCodeBtn()
    },
    countDown(t) {
      if (this.timer) {
        clearInterval(this.timer)
      }
      let count = t
      this.timer = setInterval(() => {
        count--
        if (count === 0) {
          clearInterval(this.timer)
          this.setCodeBtn({
            text: '获取验证码'
          })
        } else {
          this.setCodeBtn({
            isDisabled: true,
            text: `${count} 秒后重新获取`
          })
        }
      }, 1000)
    },
    getCode() {
      // 校验邮箱和密码输入框
      this.$refs.ruleForm.validateField(['email'], errMsg => {
        if (!errMsg) {
          // 设置验证码按钮状态
          this.setCodeBtn({ isLoading: true, text: '发送中' })
          getSms({ username: '706809256@qq.com' })
            .then(res => {
              console.log(res)
              this.$message({
                message: res.message,
                type: 'success'
              })

              this.isSubmitBtnDisabled = false
              // 倒计时开启
              this.countDown(60)
            })
            .catch(err => {
              this.isSubmitBtnDisabled = true
              this.setCodeBtn({
                isLoading: false,
                isDisabled: false,
                text: '获取验证码'
              })
              console.log(err)
            })
        }
      })
    },

    // 设置验证码按钮状态
    setCodeBtn({ isLoading = false, isDisabled = false, text }) {
      this.getCodeBtn.isLoading = isLoading
      this.getCodeBtn.isDisabled = isDisabled
      this.getCodeBtn.text = text
    },

    // 提交表单
    submitForm() {
      this.$refs.ruleForm.validate((valid, obj) => {
        console.log(obj)
        if (valid) {
          this.status === 0 ? this.login() : this.register()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    async login() {
      try {
        const res = await login({
          username: this.ruleForm.email,
          password: this.ruleForm.password,
          code: this.ruleForm.verifyCode
        })
        console.log(res)
        if (res.resCode === 0) {
          this.$message({
            type: 'success',
            message: res.message
          })

          this.$router.push({ path: '/dashboard' })
        }
      } catch (err) {
        console.log(err)
      }
    },

    async register() {
      try {
        const res = await register({
          username: this.ruleForm.email,
          password: this.ruleForm.password,
          code: this.ruleForm.verifyCode,
          module: 'register'
        })
        console.log(res)
        if (res.resCode === 0) {
          this.$message({
            type: 'success',
            message: res.message
          })

          this.toggleTab(0)
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      } catch (err) {
        console.log(err)
      }
    },

    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },

    resetCodeBtn() {
      this.setCodeBtn({ text: '获取验证码' })
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .login-box .el-form-item__label {
  color: #fff !important;
}

::v-deep .el-col-24 {
  width: none;
}

.login {
  height: 100vh;
  background: #495c75;
}

.login-box {
  width: 338px;
  margin: auto;

  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;

      &.current {
        background: rgba(0, 0, 0, 0.5);
      }
    }
  }

  .login-form {
    margin-top: 30px;

    .form-item {
      margin-bottom: 14px;
    }

    .login-btn {
      display: block;
      width: 100%;
      margin-top: 19px;
    }
  }
}
</style>
