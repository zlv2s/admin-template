<template>
  <div class="layout">
    <PageNav />
    <PageHeader />
    <PageMain />
  </div>
</template>

<script>
import PageHeader from './components/Header'
import PageNav from './components/Nav'
import PageMain from './components/Main'

export default {
  components: {
    PageHeader,
    PageNav,
    PageMain
  }
}
</script>

<style lang="scss" scoped></style>
