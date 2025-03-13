<script setup lang="ts">
import fechi from 'fechi'

const handleGetList = async () => {
  try {
    const data  = await fechi.get('http://1.92.82.236:7422/api/getAssistantList')
    console.log('助手列表:', data)
  } catch (error) {
    console.error('获取失败:', error)
  }
}
</script>

<template>
  <button class="fetch-btn" @click="handleGetList">获取助手列表</button>
</template>

<style scoped>

</style>