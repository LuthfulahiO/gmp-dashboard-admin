<template>
  <va-card title="Mentors">
    <va-tabs grow v-model="tabsState">
      <va-tab>
        Requests List
      </va-tab>
      <va-tab>
        Make New Request
      </va-tab>
    </va-tabs>
    <va-separator/>
    <component :is="tabs[tabsState]"/>
  </va-card>
</template>

<script>
import ListMentorRequestTab from '../dashboard/dashboard-tabs/ListMentorRequestTab'
import RequestMentorTab from '../dashboard/dashboard-tabs/RequestMentorTab'

export default {
  name: 'DashboardTabs',
  components: {
    ListMentorRequestTab,
    RequestMentorTab,
  },
  data () {
    return {
      tabsState: 0,
      tabs: [
        'ListMentorRequestTab',
        'RequestMentorTab',
      ],
    }
  },
}
</script>
