<script setup>
const props = defineProps({
    quantity: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['update-quantity'])

const increase = () => {
    emit('update-quantity', props.quantity + 1)
}

const decrease = () => {
    if (props.quantity > 1) {
        emit('update-quantity', props.quantity - 1)
    }
}
</script>

<template>
    <div class="quantity-input">
        <button class="btn-quantity" @click="decrease">-</button>
        <span class="quantity">{{ quantity }}</span>
        <button class="btn-quantity" @click="increase">+</button>
    </div>
</template>

<style lang="scss" scoped>
.quantity-input {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .btn-quantity {
        width: 30px;
        height: 30px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        
        &:hover {
            background: #f5f5f5;
        }
    }
    
    .quantity {
        min-width: 30px;
        text-align: center;
        font-weight: 500;
    }
}
</style>

