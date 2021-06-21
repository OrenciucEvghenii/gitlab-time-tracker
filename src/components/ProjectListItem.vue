<template>
  <q-item>
    <q-item-section>
      <div>
        <q-btn type="a" :href="project.web_url" target="_blank" icon="launch" size="sm" flat dense/>
        {{ project.name }}
      </div>
    </q-item-section>
    <q-btn @click="$emit('pinClicked')"
           :color="isPinned ? 'primary' : 'black'"
           icon="push_pin"
           size="sm"
           flat
           dense/>
    <q-btn :to="{ name: 'issues', params: { projectId: project.id }}"
           label="Issues"
           icon-right="navigate_next"
           no-caps
           flat/>
  </q-item>
</template>

<script>
export default {
  name: 'ProjectListItem',
  props: ['project', 'isPinned']
}
</script>

<style scoped>

</style>
