<template>
  <q-page class="flex column">
    <div>Settings</div>

    <div class="q-gutter-md">
      <q-input v-model="gitlabUrl" label="GitLab URL" filled dense>
        <template v-slot:after>
          <q-btn @click="persistGitlabUrl" dense flat icon="save"/>
        </template>
      </q-input>

      <q-input v-model="gitlabAccessToken" label="GitLab Access Token" filled dense>
        <template v-slot:after>
          <q-btn @click="persistGitlabAccessToken" dense flat icon="save"/>
        </template>
      </q-input>

      <q-btn type="a" :href="gitlabCreateAccessTokenUrl" target="_blank" label="Create AT" no-caps/>
    </div>

  </q-page>
</template>

<script>

// gzeG--UEZBmbLnRpr5Vu

export default {
  name: 'Settings',
  data() {
    return {
      gitlabUrl: null,
      gitlabAccessToken: null
    }
  },
  computed: {
    gitlabCreateAccessTokenUrl() {
      return `${this.gitlabUrl}/-/profile/personal_access_tokens`
    }
  },
  created() {
    this.gitlabUrl = localStorage.gitlabUrl
    this.gitlabAccessToken = localStorage.gitlabAccessToken
  },
  methods: {
    persistGitlabUrl() {
      localStorage.gitlabUrl = this.gitlabUrl
    },
    persistGitlabAccessToken() {
      localStorage.gitlabAccessToken = this.gitlabAccessToken
    }
  }
}
</script>

<style scoped>

</style>
