<template>
  <header>
    <div class="title">
      Личный кабинет
    </div>
  </header>
  <main>
    <div class="container">
      <div class="user">
        <div class="user__icon">
<!--          Поставил свг как заглушку-->
          <svg class="svg-icon" style="width: 3em; height: 3em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z"  /></svg>
        </div>
        <div class="user__info">
          <div class="name">{{ user.userName }}</div>
          <div class="phone">{{ user.phoneNumber }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import router from "@/router";
import {useCookies} from "vue3-cookies";
import {ref} from "vue";

const user = useUserStore()
const { cookies } = useCookies()
const token = ref(cookies.get('token'))

// Проверяем токен и обновляем данные из профиля
if (token.value) {
  user.getSubscribe()
} else {
  // тут можно как-то иначе чистить стор, например реализовать метод логаут
  user.phoneNumber = 0
  user.userName = ''
  user.error = false
  user.errorMessage = ''
  router.push('/login')
}



</script>
<style lang="scss">
header {
  .title {
    font-size: 40px;
    font-weight: 700;
    padding: 12px 24px;
  }
}
main {
  .container {
    padding: 12px 24px;
    .user {
      background-color: #d2dcec;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      gap: 12px;
      &__icon {
        border-radius: 100%;
        border: 1px solid #282828;
        padding: 3px;
        background-color: #eeeeee;
      }
      &__info {
        .name {
          font-size: 18px;
          font-weight: 700;
        }
        .phone {
          font-size: 14px;
          font-weight: 500;
          color: #818181;
        }
      }
    }
  }
}
</style>
