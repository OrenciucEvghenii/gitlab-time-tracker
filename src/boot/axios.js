import Vue from 'vue'
import axios from 'axios'

const gitlabApi = axios.create()

Vue.prototype.$axios = axios
Vue.prototype.$gitlabApi = gitlabApi

export { axios, gitlabApi }
