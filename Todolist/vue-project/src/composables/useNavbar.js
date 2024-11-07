// src/composables/useNavbar.js
import { ref } from 'vue'

export function useNavbar() {
  const activeLink = ref('Home')

  const setActiveLink = (link) => {
    activeLink.value = link
  }

  return {
    activeLink,
    setActiveLink,
  }
}