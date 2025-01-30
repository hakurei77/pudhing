<template>
    <div class="flex flex-col h-screen">
        <LLMHeader class="flex-shrink-0" />
        <div class="flex overflow-auto flex-col items-center w-full p-6 ">
            <CharacterIntroduction />
            <CharacterIntroduction />
            <CharacterIntroduction />
            <CharacterIntroduction />
            <CharacterIntroduction />
            <CharacterIntroduction />
            <CharacterIntroduction />
        </div>
        <SubmitButton />
    </div>

</template>

<script setup lang="ts">
import CharacterIntroduction from './CharacterIntroduction.vue';
import LLMHeader from './LLMHeader.vue';
import SubmitButton from './SubmitButton.vue';
</script>

<style scoped>

</style>