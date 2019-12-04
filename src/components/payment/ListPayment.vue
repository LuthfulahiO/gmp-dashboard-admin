<template>
  <div class="markup-tables">
    <va-card title="Requests">
      <h1 v-if="paymentList.length == 0">No payment created yet</h1>
      <table v-else class="va-table va-table--striped va-table--hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="payment in paymentList" :key="payment.uuid">
            <td>{{ payment.name }}</td>
            <td>{{ payment.amount }}</td>
            <td>
                <va-inner-loading  :loading="isLoading">
                    <va-button color="danger" @click="deletePayment(payment.uuid)">
                        Delete
                    </va-button>
                </va-inner-loading>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card>
  </div>
</template>

<script>
import { callApi } from '../../app/utils'

export default {
  data () {
    return {
      paymentList: [],
      isLoading: false,
    }
  },
  methods: {
      deletePayment(uuid) {
          this.isLoading = true;
          callApi(`/admin/payment/type/delete/${uuid}`, {}, 'delete')
          .then(res => {
              console.log(res)
              this.getPayments()
          })
          .catch(err => {
              console.log(err)
          })
      },
      getPayments () {
          callApi('/admin/payment/type/list', {}, 'get')
          .then(res => {
              this.paymentList = res.data
          })
          .catch(err => {
              console.log(err)
          })
      }
  },
  created () {
    this.getPayments()
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
