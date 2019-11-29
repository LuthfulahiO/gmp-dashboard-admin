<template>
<form @submit.prevent="onsubmit">
  <va-notification v-if="errorMessageFromServer" color="danger" closeable>
    <va-badge color="danger">
      Error
    </va-badge>
    {{ errorMessageFromServer }}
  </va-notification>
  <va-notification v-if="successMessage" color="success" closeable>
    <va-badge color="success">
      Success
    </va-badge>
    {{ successMessage }}
  </va-notification>
  <va-input
    v-model="email"
    type="email"
    :label="$t('auth.email')"
    :error="!!emailErrors.length"
    :error-messages="emailErrors"
  />

  <va-input
    v-model="password"
    type="password"
    :label="$t('auth.password')"
    :error="!!passwordErrors.length"
    :error-messages="passwordErrors"
  />

  <div class="auth-layout__options d-flex align--center justify--space-between">
    <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="$t('auth.keep_logged_in')"/>
    <router-link class="ml-1 link" :to="{name: 'recover-password'}">{{$t('auth.recover_password')}}</router-link>
  </div>

  <div class="d-flex justify--center mt-3">
    <va-button v-if="!isSubmit" type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
    <fingerprint-spinner
      v-if="isSubmit"
      :animation-duration="1500"
      :size="64"
      :color="'#4ae387'"
    />
  </div>
</form>
</template>

<script>
import {callApi, LocalStore} from '@/app/utils'
import {FingerprintSpinner} from 'epic-spinners'
export default {
  name: 'login',
  components: {
    FingerprintSpinner
  },
  data () {
    return {
      email: '',
      password: '',
      errorMessageFromServer: null,
      successMessage: null,
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
      isSubmit: false
    }
  },
  computed: {
    formReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
  },
  methods: {
    onsubmit () {
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }else {
        this.isSubmit = true
        callApi(`/login`, {email: this.email, password: this.password }, "post")
        .then(res => {
          this.isSubmit = false
          LocalStore.saveToken(res.data.token)
          LocalStore.saveUser(res.data.user)
          this.successMessage = res.message
          this.$router.push({ name: 'profile' })
        })
        .catch(err => {
          this.isSubmit = false
          this.errorMessageFromServer = err.message
        });
      }
    },
  },
}
</script>

<style lang="scss">
</style>
