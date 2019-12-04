<template>
  <div class="markup-tables">
    <va-card title="Requests">
      <circles-to-rhombuses-spinner
      v-if="isFetching"
      :animation-duration="1500"
      :size="64"
      :color="'#4ae387'"
    />
      <h1 v-if="applicantList.length == 0 && !isFetching">No applicannts</h1>
      <table v-else class="va-table va-table--striped va-table--hoverable">
        <thead>
          <tr>
            <!-- <th>ID</th> -->
            <th>Name</th>
            <th>Email</th>
            <!-- <th>Phone</th> -->
            <!-- <th>State</th> -->
          </tr>
        </thead>

        <tbody>
          <tr v-for="applicant in applicantList" :key="applicant.uuid">
            <!-- <td>{{applicant.details.applicant_id}}</td> -->
            <td>{{`${applicant.first_name} ${applicant.last_name}` }}</td>
            <td>{{ applicant.email }}</td>
            <!-- <td>{{ applicant.details.phone_number ? applicant.details.phone_number : "" }}</td> -->
            <!-- <td>
              {{applicant.details.state ? applicant.details.state : ""}}
            </td> -->
          </tr>
        </tbody>
      </table>
    </va-card>
  </div>
</template>

<script>
import { callApi } from '../../app/utils'
import {CirclesToRhombusesSpinner} from 'epic-spinners'
export default {
  name: "ApplicantsTable",
  components: {
    CirclesToRhombusesSpinner
  },
  data () {
    return {
      applicantList: [],
      isFetching: true,
      jobuuid: ""
    }
  },
  created () {
    if (!this.$route.params.uuid) {
      this.$router.push('/joblist')
    } else {
      this.jobuuid = this.$route.params.uuid
    }
    callApi(`/admin/job/application/${this.jobuuid}`, {}, 'get')
      .then(res => {
        this.applicantList = res.data
        this.isFetching = false
      })
      .catch(err => {
        console.log(err)
        this.isFetching = false
      })
  },
}
</script>

<style lang="scss">
  .markup-tables {
    .va-table {
      width: 100%;
    }

    .va-card {
      max-width: 1200px;
    }
  }
</style>
