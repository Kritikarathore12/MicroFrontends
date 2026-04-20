<template>
  <div ref="container"></div>
</template>

<script>
import React from 'react'
import { createRoot } from 'react-dom/client'

export default {
  props: ['token'],
  data() {
    return { _root: null, _Component: null }
  },
  async mounted() {
    const module = await import('react_dashboard/Dashboard')
    this._Component = module.default
    this._root = createRoot(this.$refs.container)
    this._render()
  },
  watch: {
    // Re-render React whenever the token prop updates from Vue
    token() {
      this._render()
    }
  },
  methods: {
    _render() {
      if (this._root && this._Component) {
        this._root.render(React.createElement(this._Component, { token: this.token }))
      }
    }
  },
  beforeUnmount() {
    if (this._root) this._root.unmount()
  }
}
</script>
