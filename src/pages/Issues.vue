<template>
  <q-page class="flex">
    <IssueList :project-id="projectId" :issue-state="issueState" bordered>
      <template #header="{count}">
        <q-item>
          <q-item-section>No. of Issues: {{ count }}</q-item-section>
          <q-btn-toggle v-model="issueState"
                        :options="issueStateOptions"
                        toggle-color="primary"
                        flat/>
        </q-item>
      </template>
    </IssueList>
  </q-page>
</template>

<script>
import IssueList from 'components/IssueList'

export default {
  name: 'Issues',
  components: { IssueList },
  props: {
    projectId: {}
  },
  data() {
    return {
      issueState: null,
      issueStateOptions: [
        { label: 'All', value: null },
        { label: 'Opened', value: 'opened' },
        { label: 'Closed', value: 'closed' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
