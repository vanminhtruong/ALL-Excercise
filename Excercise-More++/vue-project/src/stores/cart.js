import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: JSON.parse(localStorage.getItem('cartItems')) || [],
    }),

    getters: {
        totalPrice(state){
            return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    },

    actions: {
        addToCart(product){
            const existingItem = this.items.find(item => item.id === product.id);
            if(existingItem){
                existingItem.quantity += 1;
            } else {
                this.items.push({...product, quantity: 1});
            }
            this.saveCart();
            // Loại bỏ dòng sau
            // this.showToast(`${product.name} đã được thêm vào giỏ hàng`)
        },
        removeFromCart(productId){
            const item = this.items.find(item => item.id === productId)
            this.items = this.items.filter(item => item.id !== productId);
            this.saveCart();
            if(item) {
                // Loại bỏ dòng sau
                // this.showToast(`${item.name} đã được xóa khỏi giỏ hàng`)
            }
        },

        clearCart(){
            this.items = [];
            this.saveCart();
            // Loại bỏ dòng sau
            // this.showToast(`Giỏ hàng đã được làm trống`)
        },

        updateQuantity(productId, quantity){
            const item = this.items.find(item => item.id === productId);
            if(item){
                item.quantity = quantity;
                if(item.quantity < 1){
                    this.removeFromCart(productId);
                } else {
                    this.saveCart();
                    // Loại bỏ dòng sau
                    // this.showToast(`Số lượng của ${item.name} đã được cập nhật`)
                }
            }
        },

        saveCart(){
            localStorage.setItem('cartItems', JSON.stringify(this.items));
        }
    }
})