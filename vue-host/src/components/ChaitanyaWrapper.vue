<template>
  <div style="width: 100%; height: calc(100vh - 120px); border-radius: 16px; overflow: hidden; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
    <iframe 
      src="https://chaitanya-kv.vercel.app/" 
      style="width: 100%; height: 100%; border: none;"
      title="Chaitanya App"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'ChaitanyaWrapper'
}
</script>
