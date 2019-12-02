<template>
  <va-card :title="$t('dashboard.setupRemoteConnections')">
    <va-tabs grow v-model="tabsState">
      <va-tab>
        {{$t('dashboard.tabs.overview.title')}}
      </va-tab>
      <va-tab>
        {{$t('dashboard.tabs.billingAddress.title')}}
      </va-tab>
      <va-tab>
        {{$t('dashboard.tabs.bankDetails.title')}}
      </va-tab>
    </va-tabs>
    <va-separator/>
    <component :is="tabs[tabsState]"/>
  </va-card>
</template>

<script>
import ListMentorRequestTab from './dashboard-tabs/ListMentorRequestTab'
import RequestMentorTab from './dashboard-tabs/RequestMentorTab'
import BankDetailsTab from './dashboard-tabs/BankDetailsTab'

export default {
  name: 'DashboardTabs',
  components: {
    ListMentorRequestTab,
    RequestMentorTab,
    BankDetailsTab,
  },
  data () {
    return {
      tabsState: 1,
      tabs: [
        'ListMentorRequestTab',
        'RequestMentorTab',
        'BankDetailsTab',
      ],
    }
  },
}
</script>
