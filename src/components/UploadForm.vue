<template>
  <form action class="box" enctype="multipart/form-data">
    <div class="field">
      <label for class="label">Upload Data</label>
      <div class="control has-icons-left">
        <input type="file" @change="storeFile" accept=".csv" name="csv_data" required /> 
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <button @click="submitFile" class="button is-success">Submit</button>
    </div>
    <p v-if="success && uploaded" class="has-text-success title is-6 has-text-centered">{{message}}</p>
    <p v-if="!success && uploaded" class="has-text-danger title is-6 has-text-centered">{{error_message}}</p>
  </form>
</template>

<script>
export default {
    data() {
        return{
            file: null,
            message: "",
            success: false,
            uploaded: false,
        }
    },
    methods: {
        storeFile(event) {
            this.file = event.target.files[0]
        },
        async submitFile(e) {
            e.preventDefault();
            if (!this.file) return this.message = "Please upload a file";
            try {
                let formData = new FormData();
                formData.append('csv_data', this.file);
                const upload = await this.$http.post('/events/upload', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })
                this.message = upload.data.message;
                this.success = true;
            } catch (error) {
                this.message = error.response.data;
            }
            this.uploaded = true;
        }
    }
}
</script>