<template>
<nav class="navbar" role="navigation" aria-label="main navigation">

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        <a class="button is-primary" href="/">Home</a>
      </a>

      <a class="navbar-item">
          <a class="button is-primary" href="/events">Events</a>
      </a>

      <a class="navbar-item">
        <a v-if="logged_in" class="button is-primary" href="/upload">Upload</a>
      </a>

      
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons" >
          <a class="button is-primary" href="/login">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    computed: {
      logged_in() {
        return this.$store.getters.logged_in;
      }
    }
}
</script>