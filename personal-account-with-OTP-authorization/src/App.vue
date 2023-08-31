<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

// Что еще было бы неплохо сделать:
// TODO - Стандартизировать цветовую палитру и вынести цвета в переменные
// TODO - Поправить название вкладки и лого
// TODO - Добавить в стор фото юзера и выводить его в профиле

</script>
<style lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #e7ecf3;
}
</style>
