<template>
  <q-page class="flex">
    <div class="col-grow">
      <q-scroll-area style="height: 100%">
        <q-list bordered separator>
          <q-item>
            <q-item-section>No. of Issues: {{ issues.length }}</q-item-section>
            <q-btn-toggle v-model="issueState"
                          :options="issueStateOptions"
                          @input="loadIssues"
                          toggle-color="primary"
                          flat/>
          </q-item>

          <q-linear-progress v-if="issuesLoading" indeterminate/>

          <IssueListItem v-for="issue in issues"
                         :key="issue.id"
                         :issue="issue"
                         @stateChanged="loadIssues"
                         show-actions/>

        </q-list>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
import IssueListItem from 'components/IssueListItem'

export default {
  name: 'Issues',
  components: { IssueListItem },
  props: {
    projectId: {},
    hideActions: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      issues: [],
      issuesLoading: false,
      issueState: null,
      issueStateOptions: [
        { label: 'All', value: null },
        { label: 'Opened', value: '&state=opened' },
        { label: 'Closed', value: '&state=closed' }
      ]
    }
  },
  created() {
    this.loadIssues()
  },
  methods: {
    loadIssues() {
      // FIXME: verry ineffective method. Optimize!
      // FIXME: make pagination dynamically [https://docs.gitlab.com/ee/api/README.html#pagination]

      this.issuesLoading = true

      const url = (this.projectId)
        ? `/projects/${this.projectId}/issues?per_page=100${this.issueState || ''}`
        : `/issues?scope=assigned_to_me&per_page=100${this.issueState || ''}`

      this.$gitlabApi.get(url)
        .then(({ data }) => {
          this.issues = data.map(issue => {
            return { loading: false, ...issue }
          })
          this.issuesLoading = false
          this.$emit('issues-loaded', this.issues)
        })
        .catch(error => {
          console.error(error)
          this.issuesLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
