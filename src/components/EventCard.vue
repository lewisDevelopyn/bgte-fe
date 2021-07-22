<template>
  <div class="column">
    <div class="card is-horizontal">
      <div class="card-image">
          <slot name="image"></slot>
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <div class="media-content">
            <slot name="name"></slot>
            <slot name="location"></slot>
          </div>
          <div class="content">
            <slot name="description"></slot>
            <slot name="dates"></slot>
          </div>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item has-text-left">
            <slot name="price"></slot>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>