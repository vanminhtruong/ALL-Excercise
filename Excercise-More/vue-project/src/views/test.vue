<script setup>
import Test1 from './test1.vue';
import {reactive} from 'vue';

const product = reactive({
    name: 'Sản phẩm 1',
    price: 199000,
    quantity: 1
})

const handleUpdateQuantity = (newQuantity) => {
    product.quantity = newQuantity;
    console.log(`Số lượng mới: ${newQuantity}`);
    console.log(`Tổng giá trị: ${newQuantity * product.price}`);
}

</script>

<template>
    <div class="product-card">
        <h3>{{ product.name }}</h3>

        <div class="price">{{product.price.toLocaleString()}}</div>

        <Test1
            :quantity="product.quantity"
            @update-quantity="handleUpdateQuantity"
        />

        <p class="total">
            Tổng tiền: {{(product.quantity * product.price).toLocaleString()}}đ
        </p>
    </div>
</template>

<style lang="scss" scoped>
.product-card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-width: 300px;
    
    h3 {
        margin-bottom: 0.5rem;
    }
    
    .price {
        color: #e53935;
        font-weight: 500;
        margin-bottom: 1rem;
    }
    
    .total {
        margin-top: 1rem;
        font-weight: 500;
    }
}
</style>
