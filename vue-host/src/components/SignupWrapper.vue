<template>
  <div ref="container"></div>
</template>

<script>
import React from 'react'
import { createRoot } from 'react-dom/client'

export default {
  props: ['onLogin'],
  data() { return { _root: null } },
  async mounted() {
    const module = await import('react_signup/Signup')
    const SignupComponent = module.default
    this._root = createRoot(this.$refs.container)
    this._root.render(React.createElement(SignupComponent, { onLogin: this.onLogin }))
  },
  beforeUnmount() {
    if (this._root) this._root.unmount()
  }
}
</script>