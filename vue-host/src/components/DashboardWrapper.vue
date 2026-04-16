<template>
  <div ref="container"></div>
</template>

<script>
import React from 'react'
import { createRoot } from 'react-dom/client'

export default {
  async mounted() {
    const module = await import('react_dashboard/Dashboard')
    const DashboardComponent = module.default

    const root = createRoot(this.$refs.container)
    root.render(React.createElement(DashboardComponent))
  },
}
</script>
