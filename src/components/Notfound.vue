<template>
      <div class="text-center">
          <img style="width: 80px;" src="/assets/icon/undraw_handcrafts_file.svg">
          <h3 class="mt-3">{{ text }}</h3>
      </div>
</template>

<script>
export default {
    props : [
        'text'
    ]
}
</script>