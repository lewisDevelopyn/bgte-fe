<template>
  <form action class="box">
    <div class="field">
      <label for class="label">Email</label>
      <div class="control has-icons-left">
        <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" v-model="email" required />
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <label for class="label">Password</label>
      <div class="control has-icons-left">
        <input type="password" placeholder="*******" class="input" v-model="password" required />
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <button @click="login" class="button is-success">Login</button>
    </div>
    <p class="has-text-danger has-text-centered">{{message}}</p>
  </form>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            message: ""
        }
    },
    methods: {
        async login(e) {
            e.preventDefault();
            this.message = "";
            try {
                const login = await this.$http.post('/user/login', {
                    email: this.email,
                    password: this.password
                })
                this.$store.commit('set_logged_in', true);
                localStorage.setItem('user', JSON.stringify(login.data.user));
                localStorage.setItem('accessToken', login.data.accessToken);
                this.$router.push('/');
            } catch(error) {
                this.message = error          
            }
        }
    }
};
</script>