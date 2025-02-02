<template>
    <div class="flex flex-col h-screen">
        <LLMHeader class="flex-shrink-0" />
        <div class="flex overflow-auto flex-col items-center w-full p-6 flex-1">
            <CharacterIntroduction />
            <DialogBox />
        </div>
        <SubmitButton />
    </div>

</template>

<script setup lang="ts">
import LLMHeader from './LLMHeader.vue';
import CharacterIntroduction from './CharacterIntroduction.vue';
import DialogBox from './DialogBox.vue';
import SubmitButton from './SubmitButton.vue';
</script>

<style scoped>

</style>