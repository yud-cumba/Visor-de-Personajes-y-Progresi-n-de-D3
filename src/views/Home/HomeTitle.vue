<template>
  <div class="home-title text-center">
    <!-- <h1 class="my-5 font-diablo">Diablo 3 Profile Finder</h1> -->
    <h1 v-diablo:white.bottom class="my-5">Diablo 3 Profile Finder</h1>
    <p class="lead text-muted">Write your
      <em>
        <a href="https://eu.battle.net/support/es/article/75767" target="_blank" title="Format: YourProfile#1234">battle-tag</a>
      </em>
      and choose your region profile.</p>
    <hr class="mt-5">
  </div>
</template>

<script>
export default {
  name: 'HomeTitle'
}
</script>
