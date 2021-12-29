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
export default {
  name: 'Settings',
  data() {
    return {
      gitlabApiUrl: '',
      gitlabAccessToken: ''
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
      // TODO: Use https://vuelidate.js.org/ for validation
      //  - null or undefined
      //  - empty string
      //  - string with only spaces
      //  - url format
      //  - etc.

      if (this.gitlabApiUrl && this.gitlabAccessToken) {
        localStorage.gitlabApiUrl = this.gitlabApiUrl
        localStorage.gitlabAccessToken = this.gitlabAccessToken
        this.$gitlabApi.defaults.baseURL = this.gitlabApiUrl
        this.$gitlabApi.defaults.headers['PRIVATE-TOKEN'] = this.gitlabAccessToken

        // TODO: Use quasar notification
        alert('Saved')
      } else {
        alert('Set values first')
      }
    }
  }
}
</script>

<style scoped>

</style>
