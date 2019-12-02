<template>
  <div class="markup-tables">
    <va-card title="Requests">
      <h1 v-if="mentorRequestList.length == 0">No mentor request yet</h1>
      <table v-else class="va-table va-table--striped va-table--hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="request in mentorRequestList" :key="request.uuid">
            <td>{{ request.reason }}</td>
            <td>{{ request.preference }}</td>
            <td>{{ request.created_at }}</td>
            <td>
              <va-badge v-if="request.status === 1" color="success">
                Accepted
              </va-badge>
              <va-badge v-else color="danger">
                Not Accepted Yet
              </va-badge>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card>
  </div>
</template>

<script>
import { callApi } from '../../../app/utils'

export default {
  data () {
    return {
      mentorRequestList: [],
    }
  },
  created () {
    callApi('mentor/list', {}, 'get')
      .then(res => {
        this.mentorRequestList = res.data
      })
      .catch(err => {
        this.mentorRequestList = err.data
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
