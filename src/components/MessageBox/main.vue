<template>
  <div class="messagebox-container" :class="{active: isActive}">{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      duration: 2000,
      message: ''
    }
  },
  created() {
    setTimeout(() => {
      this.isActive = true
      setTimeout(() => {
        this.isActive = false
        setTimeout(() => {
          this.$destroy(true)
          this.$el.parentNode.removeChild(this.$el)
        }, 2000)
      }, this.duration)
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
.messagebox-container {
  position: fixed;
  z-index: 10000;
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
  top: -5.7rem;
  left: 1rem;
  right: 1rem;
  border-radius: 1rem;
  transition: all 0.5s;
  text-align: center;
  font-size: 1.5rem;
  padding: 2rem;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.active {
  top: 1rem;
}
</style>
