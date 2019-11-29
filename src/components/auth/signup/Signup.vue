<template>
<form @submit.prevent="onsubmit()">
  <va-notification v-if="errorMessageFromServer" color="danger" closeable>
    <va-badge color="danger">
      Error
    </va-badge>
    {{ errorMessageFromServer }}
  </va-notification>
  <va-notification v-if="successMessageFromServer" color="info" closeable>
    <va-badge color="info">
      Info
    </va-badge>
    {{ successMessageFromServer }}
  </va-notification>
  <va-input
    v-model="email"
    type="email"
    :label="$t('auth.email')"
    :error="!!emailErrors.length"
    :error-messages="emailErrors"
  />

  <va-input
    v-model="firstName"
    type="text"
    label="FirstName"
    :error="!!firstNameErrors.length"
    :error-messages="firstNameErrors"
  />

  <va-input
    v-model="lastName"
    type="text"
    label="LastName"
    :error="!!lastNameErrors.length"
    :error-messages="lastNameErrors"
  />

  <va-input
    v-model="otherName"
    type="text"
    label="OtherName"
    :error="!!otherNameErrors.length"
    :error-messages="otherNameErrors"
  />

  <va-input
    v-model="password"
    type="password"
    :label="$t('auth.password')"
    :error="!!passwordErrors.length"
    :error-messages="passwordErrors"
  />

  <div class="auth-layout__options d-flex align--center justify--space-between">
    <va-checkbox
      v-model="agreedToTerms"
      class="mb-0"
      :error="!!agreedToTermsErrors.length"
      :errorMessages="agreedToTermsErrors"
    >
      <template slot="label">
        {{ $t('auth.agree') }}
        <span class="link">{{ $t('auth.termsOfUse') }}</span>
      </template>
    </va-checkbox>
    <router-link class="ml-1 link" :to="{name: 'recover-password'}">
      {{$t('auth.recover_password')}}
    </router-link>
  </div>

  <div class="d-flex justify--center mt-3">
    <va-button v-if="!isSubmit" type="submit" class="my-0">{{ $t('auth.sign_up') }}</va-button>
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
import {callApi} from '@/app/utils'
import {FingerprintSpinner} from 'epic-spinners'
export default {
  name: 'signup',
  components: {
    FingerprintSpinner
  },
  data () {
    return {
      email: '',
      firstName:'',
      lastName: '',
      otherName:'',
      password: '',
      agreedToTerms: false,
      emailErrors: [],
      firstNameErrors:[],
      lastNameErrors:[],
      otherNameErrors:[],
      passwordErrors: [],
      agreedToTermsErrors: [],
      isSubmit: false,
      successMessageFromServer:null,
      errorMessageFromServer: null
    }
  },
  methods: {
    onsubmit () {
      this.emailErrors = this.email ? [] : ['Email is required']
      this.firstNameErrors = this.firstName ? [] : ['Firstname is required']
      this.lastNameErrors = this.lastName ? [] : ['Lastname is required']
      this.otherNameErrors = this.otherName ? [] : ['Othername is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      this.agreedToTermsErrors = this.agreedToTerms ? [] : ['You must agree to the terms of use to continue']
      if (!this.formReady) {
        return
      }else {
        this.isSubmit = true
        callApi(`/register`, {email: this.email, password: this.password, first_name: this.firstName, last_name: this.lastName, other_name: this.otherName }, "post")
        .then(res => {
          this.isSubmit = false
          this.successMessageFromServer = res.message
          this.$router.push({name:'login'})
        })
        .catch(err => {
          this.isSubmit = false
          this.errorMessageFromServer = err.message
        });
      }
    },
  },
  computed: {
    formReady () {
      return !(this.emailErrors.length || this.passwordErrors.length || this.agreedToTermsErrors.length || this.firstNameErrors.length || this.lastNameErrors.length)
    },
  },
}
</script>

<style lang="scss">
</style>
