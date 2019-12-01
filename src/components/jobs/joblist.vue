<template>
  <div class="cards">
    <div class="cards-container row d-flex wrap align--start">
      <!-- eslint-disable vue/valid-v-for -->
        <div v-if="jobs.length == 0" class="flex xs12"><h1>No Jobs available at the moment</h1></div>
        <div v-for="job in jobs" :key="job.uuid" class="flex xs12 sm6 md4">
          <va-card>
            <template slot="header">
              <va-icon name="fa fa-check mr-2" color="success"/>
              <h3 class="mt-0 mb-0">{{job.title}}</h3>
            </template>
           {{job.description}}
            <hr>
            <div><b>Company</b>: <span>{{job.company}}</span></div>
            <div class="my-3"><b>Description</b>: <span>{{job.company_description}}</span></div>
            <div><b>Email</b>: <span>{{job.email}}</span></div>
            <va-inner-loading class="flex-center py-3" :loading="isLoading">
            <va-button @click="addCards(job.uuid)">
                Apply
            </va-button>
            </va-inner-loading>
          </va-card>
        </div>
    </div>
  </div>
</template>

<script>
import {callApi} from '@/app/utils'
export default {
  name: 'joblist',
  data () {
    return {
      jobs: [],
      isLoading: false,
    }
  },
  created () {
    callApi(`/jobs/list`, {}, "get")
        .then(res => {
          this.jobs = res.data
        })
        .catch(err => {
          console.log(err)
        });
  },
  methods: {
    addCards (uuid) {
      this.$router.push(`apply/${uuid}`);
    },
  },
}
</script>

<style lang="scss">
.cards-container {
  .va-card {
    margin: 0;
  }
}
</style>