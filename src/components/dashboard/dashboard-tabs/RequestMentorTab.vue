<template>
  <div class="pt-2">
    <div class="row">
      <div class="flex xs12">
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
        <div class="title text-dark mb-3">
          Request for a mentor
        </div>
        <va-input
          label="Reason"
          v-model="mentorform.reason"
          placeholder="Tell us why you want a mentor."
        />
        <va-input
          label="Preference"
          v-model="mentorform.preference"
          placeholder="State your ideal type of mentor."
        />
      </div>
    </div>
    <div class="row justify--center">
    <va-inner-loading class="flex-center py-3" :loading="isLoading">
      <va-button @click="sendRequest()">
        Request
      </va-button>
    </va-inner-loading>
    </div>
  </div>
</template>

<script>
import { callApi } from '../../../app/utils'
export default {
  data () {
    return {
      mentorform: {
        reason: '',
        preference: '',
      },
      isLoading: false,
      successMessage: null,
      errorMessageFromServer: null,
    }
  },
  methods: {
    sendRequest () {
      this.isLoading = true
      callApi('/mentor/request', this.mentorform, 'post')
        .then(res => {
          this.isLoading = false
          this.errorMessageFromServer = null
          this.successMessage = res.message
          this.mentorform.reason = ''
          this.mentorform.preference = ''
        })
        .catch(err => {
          this.isSubmit = false
          this.successMessage = null
          this.errorMessageFromServer = err.message
        })
    },
  },
}
</script>
