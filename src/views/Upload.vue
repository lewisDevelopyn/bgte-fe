<template>
  <div class="section container">
    <UploadForm />
  </div>
</template>


<script>
import UploadForm from "@/components/UploadForm.vue";
export default {
  components: {
    UploadForm
  },
  methods: {
    async check_user() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const access_token = localStorage.getItem("accessToken");
        await this.$http.post("/user/check", {
          user,
          access_token
        });
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.check_user();
  }
};
</script>
