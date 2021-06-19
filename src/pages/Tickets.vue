<template>
  <q-page class="flex column">
    <q-list bordered separator>
      <q-item v-for="ticket in tickets" :key="ticket.id" clickable v-ripple>
        <q-item-section>
          {{ ticket.name }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'Tickets',
  data() {
    return {
      tickets: []
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
