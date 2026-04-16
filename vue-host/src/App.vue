<script setup>
import LoginWrapper from './components/LoginWrapper.vue'
import SignupWrapper from './components/SignupWrapper.vue'
</script>

<template>
  <div
    style="
      background-color: #0b1020;
      min-height: 100vh;
      color: white;
      padding: 20px;
    "
  >
    <h1>Vue Host Working</h1>

    <LoginWrapper />

    <br /><br />

    <SignupWrapper />
  </div>
</template>