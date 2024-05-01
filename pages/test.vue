<script setup>
const { data, error } = await useFetch('https://members-dev.xfit.sa');

if (error.value) {
  console.error('Error fetching data:', error.value);
} else {
  console.log(data.value);
}
</script>

<template>
  <h1 class="mt-40">{{ data }}</h1>
</template>
