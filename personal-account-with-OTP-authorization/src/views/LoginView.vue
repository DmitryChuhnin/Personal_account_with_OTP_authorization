<template>
  <div class="container">
    <div class="login-window">
      <div class="login-window__title">
        Вход в личный кабинет
      </div>
      <div class="generate-otp otp" v-if="screen === 'generate'">
        <div class="heading">Введите номер телефона</div>
        <input type="tel" class="input" placeholder="Номер телефона*" v-model="phoneNumber">
        <div class="error-box" v-if="user.error">
          {{errorMessage}}
        </div>
        <button class="button" @click="sendCode()">Далее</button>
      </div>
      <div class="verify-otp otp" v-if="screen === 'verify'">
        <input type="text" class="input" placeholder="Введите код из SMS" v-model="smsCode">
        <div class="error-box" v-if="user.error">
          {{errorMessage}}
        </div>
        <button class="button" @click="sendSmsCode()">Далее</button>
        <div class="verify-otp__no-code">
          <div class="no-code">Не пришел код?</div>
          <div class="no-code__link" v-if="time>0" @click="repeatCode()">Отправить повторно или ввести другой номер можно через {{time}} секунд</div>
          <div class="no-code__link" v-else @click="repeatCode()">Отправить повторно или ввести другой номер</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref, watchEffect} from "vue"
import {useUserStore} from "@/stores/user.store"
import router from "@/router";

const user = useUserStore()
const screen = ref('generate')
const time = ref(60)
const phoneNumber = ref()
const smsCode = ref()
const errorMessage = ref(user.errorMessage)

// Не стал делать полноценную валидацию, просто меняю тип
async function sendCode(){
  await user.generateOtp(parseInt(phoneNumber.value))
  errorMessage.value = user.errorMessage
  if (!user.error) {
    screen.value = 'verify'
    startTimer()
  }
}
async function sendSmsCode(){
  await user.verifyOtp(parseInt(smsCode.value))
  errorMessage.value = user.errorMessage
  if (!user.error) {
    router.push('/')
  }
}

const startTimer = ()=> {
  if (time.value>0){
    setInterval(()=>{
      time.value-=1
    }, 1000)
  }
}

function repeatCode(){
  if (time.value<=0) {
    screen.value = 'generate'
  }
}

</script>
<style lang="scss">
.container{
  .login-window {
    width: 30%;
    padding: 32px;
    background-color: #ffffff;
    margin: 0 auto;
    border-radius: 16px;
    &__title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 32px;
    }
    .otp {
      display: flex;
      flex-direction: column;
      gap: 16px;
      .heading {
        font-size: 24px;
        font-weight: bold;
      }
      .input {
        padding: 12px 8px;
        border-radius: 8px;
        outline: none;
        border: 1px solid #c0c0c0;
        font-size: 14px;
      }
      .button {
        padding: 12px 8px;
        border-radius: 8px;
        outline: none;
        border: none;
        background-color: #ffcc42;
        font-weight: 600;
        font-size: 14px;
      }
      .verify-otp__no-code {
        font-size: 14px;
        .no-code {

        }
        .no-code__link {
          color: #0e4db6;
          cursor: pointer;
        }
        .no-code__link:hover {
          text-decoration: underline;
        }
      }
      .error-box {
        border: 1px solid #f56868;
        border-radius: 8px;
        padding: 8px;
        background-color: #ffdede;
        font-size: 14px;
      }
    }
  }
}
</style>
