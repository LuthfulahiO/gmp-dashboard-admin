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
          Create new job
        </div>
        <va-input
          label="title"
          v-model="job.title"
          placeholder="Job title"
        />
        <va-input
          label="descrption"
          v-model="job.description"
          placeholder="Job description"
        />
        <va-input
          label="Company"
          v-model="job.company"
          placeholder="Company"
        />
        <va-input
          label="company description"
          v-model="job.company_description"
          placeholder="Company description"
        />
        <va-input
          label="email"
          v-model="job.email"
          placeholder="example@email.com"
        />
        <va-date-picker
          label="Deadline"
          v-model="job.deadline"
        />
        <va-checkbox
          label="GMP"
          v-model="job.gmp"
        />
      </div>
    </div>
    <div class="row justify--center">
    <va-inner-loading class="flex-center py-3" :loading="isLoading">
      <va-button @click="sendRequest()">
        Add
      </va-button>
    </va-inner-loading>
    </div>
  </div>
</template>

<script>
import { callApi } from '../../app/utils'
export default {
  data () {
    return {
      job: {
        title: "",
	      description: "",
	      company: "",
	      company_description: "",
	      email: "",
	      deadline: "",
	      gmp: true
      },
      isLoading: false,
      successMessage: null,
      errorMessageFromServer: null,
    }
  },
  methods: {
    sendRequest () {
      this.isLoading = true
      callApi('/admin/job/add', this.job, 'post')
        .then(res => {
          this.isLoading = false
          this.errorMessageFromServer = null
          this.successMessage = res.message
          this.job =  {
            title: "",
            description: "",
            company: "",
            company_description: "",
            email: "",
            deadline: "",
            gmp: true
          }
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
