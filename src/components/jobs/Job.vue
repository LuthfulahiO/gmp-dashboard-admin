<template>
  <va-card title="Payments">
    <va-tabs grow v-model="tabsState">
      <va-tab>
        Job List
      </va-tab>
      <va-tab>
        Create New Job
      </va-tab>
    </va-tabs>
    <va-separator/>
    <component :is="tabs[tabsState]"/>
  </va-card>
</template>

<script>
import JobList from './JobList'
import CreateJob from './CreateJob'

export default {
  name: 'JobTabs',
  components: {
    JobList,
    CreateJob,
  },
  data () {
    return {
      tabsState: 0,
      tabs: [
        'JobList',
        'CreateJob',
      ],
    }
  },
}
</script>
