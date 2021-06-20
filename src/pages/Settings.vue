<template>
  <q-page class="flex column">
    <div class="q-gutter-md">
      <q-input v-model="gitlabApiUrl" label="GitLab API URL" filled dense/>
      <q-input v-model="gitlabAccessToken" label="GitLab Access Token" filled dense/>

      <div class="text-center">
        <q-btn @click="saveSettings" label="Save" color="primary" class="q-mr-md"/>
        <q-btn type="a" :href="gitlabCreateAccessTokenUrl" target="_blank" no-caps>
          Create Access Token
          <q-icon name="launch" size="xs" class="q-ml-sm"/>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>

// gzeG--UEZBmbLnRpr5Vu

export default {
  name: 'Settings',
  data() {
    return {
      gitlabApiUrl: null,
      gitlabAccessToken: null
    }
  },
  computed: {
    gitlabCreateAccessTokenUrl() {
      return `${this.gitlabApiUrl}/-/profile/personal_access_tokens`
    }
  },
  created() {
    this.gitlabApiUrl = localStorage.gitlabApiUrl
    this.gitlabAccessToken = localStorage.gitlabAccessToken
  },
  methods: {
    saveSettings() {
      localStorage.gitlabApiUrl = this.gitlabApiUrl
      localStorage.gitlabAccessToken = this.gitlabAccessToken
      this.$gitlabApi.defaults.baseURL = this.gitlabApiUrl
      this.$gitlabApi.defaults.headers['PRIVATE-TOKEN'] = this.gitlabAccessToken
    }
  }
}
</script>

<style scoped>

</style>
