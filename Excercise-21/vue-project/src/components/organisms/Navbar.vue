<template>
  <nav class="bg-blue-800 p-4 shadow-lg">
    <ul>
      <li>
        <RouterLink to="/" class="text-white hover:text-yellow-400 font-semibold">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/warehouse" class="text-white hover:text-yellow-400 font-semibold">Quản Lý Kho</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>

</script>

<style scoped lang="scss">
nav {
  .flex {
    display: flex;
    gap: 1rem;
  }
}
</style>