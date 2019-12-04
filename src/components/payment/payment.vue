<template>
  <va-card title="Payments">
    <va-tabs grow v-model="tabsState">
      <va-tab>
        Payments List
      </va-tab>
      <va-tab>
        Add New Payment
      </va-tab>
    </va-tabs>
    <va-separator/>
    <component :is="tabs[tabsState]"/>
  </va-card>
</template>

<script>
import ListPayment from './ListPayment'
import AddPayment from './AddPayment'

export default {
  name: 'DashboardTabs',
  components: {
    ListPayment,
    AddPayment,
  },
  data () {
    return {
      tabsState: 0,
      tabs: [
        'ListPayment',
        'AddPayment',
      ],
    }
  },
}
</script>
