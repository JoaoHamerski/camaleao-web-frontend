<template>
  <div>
    <div class="fw-bold text-secondary">
      <slot name="label" />
    </div>
    <div>
      <h5 class="text-success fw-bold mb-0">
        <slot name="text" />
      </h5>
    </div>
    <div class="small text-secondary">
      <slot name="text-secondary" />
    </div>
  </div>
</template>
