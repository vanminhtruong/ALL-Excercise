<template>
    <button class="btn" @click="handleClick">
        <slot></slot>
    </button>
</template>

<script setup>
    defineProps({})
</script>

<style scoped lang="scss">
    .btn {
        padding: 0.5rem 1rem;
        background-color: #3498db;
        border: none;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        
        &:hover {
            background-color: #2980b9;
        }
    }
</style>
