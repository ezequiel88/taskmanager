<template>
  <div class="loading-container">
    <div class="loading"></div>
  </div>
</template>

<style scoped>
.loading-container {
  width: 100%;
  height: 10px;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: 200;
  background-color: #ffc5c5;
}

.loading {
  height: 100%;
  background-color: #ef4444;
  animation: indeterminateAnimation 3s infinite;
  transform-origin: center;
  opacity: 0.5;
}

@keyframes indeterminateAnimation {
  0% {
    transform: scaleX(0);
    opacity: 0.25;
  }
  25% {
    opacity: 1;
  }
  50% {
    transform: scaleX(2);
    opacity: 0.5;
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: scaleX(0);
    opacity: 0.25;
  }
}
</style>
