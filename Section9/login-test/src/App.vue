<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld :msg="'登录状态' + login" />
      <el-button @click="showLoginModal" type="primary">登录</el-button>
      <el-button @click="logout" type="danger">退出登录</el-button>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <LoginModal v-model:visible="loginModalVisible" />
  <RouterView />
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import LoginModal from './components/LoginModal.vue'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    HelloWorld,
    LoginModal,
  },
  setup() {
    const store = useStore()
    const loginModalVisible = ref(false)
    const login = computed(() => store.state.isLoggedIn)
    const showLoginModal = () => {
      loginModalVisible.value = true
    }
    const logout = () => {
      store.commit('setLoggedIn', false)
      localStorage.removeItem('username')
      localStorage.removeItem('password')
    }

    return {
      loginModalVisible,
      showLoginModal,
      login,
      logout,
    }
  },
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
