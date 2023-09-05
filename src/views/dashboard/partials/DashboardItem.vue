<template>
  <div>
    <div class="fw-bold text-secondary">
      <slot name="label" />
    </div>
    <div class="d-flex align-items-center">
      <slot name="text" />
      <slot name="text-subtitle" />
    </div>
    <div class="small text-secondary">
      <slot name="text-secondary" />
    </div>
  </div>
</template>
