<script>
import 'viewerjs/dist/viewer.css'
import { directive as viewer } from 'v-viewer'
// import { component as Viewer } from 'v-viewer'

export const config = {
  inline: false,
  button: true,
  navbar: false,
  title: true,
  toolbar: {},
  tooltip: true,
  movable: true,
  zoomable: true,
  rotatable: false,
  scalable: true,
  transition: true,
  fullscreen: true,
  keyboard: true
}

export default {
  // components: {
  //   Viewer
  // },
  directives: {
    viewer: viewer()
  },
  props: {
    image: {
      type: Object,
      default: () => ({src: '', alt: ''})
    },
    extraToolbar: {
      type: Array,
      default: () => [],
    }
  },
  data () {
    return {
      config
    }
  },
  methods: {

  }
}
</script>

<template>
  <div
    ref="viewer"
    v-viewer="config"
    class="viewer"
  >
    <slot />
  </div>
</template>

<style>
.viewer-transition {
  transition: all .2s !important;
}

.viewer-print {
  border-radius: .2rem !important;
  width: 100px !important;
  height: 40px !important;
  padding: .5rem 1rem;
}

.viewer-print::before {
  content: "print";
  display: block;
  font-size: 0;
  height: 20px;
  line-height: 0;
  width: 20px;
  margin-left: auto !important;
  margin-right: auto !important;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMy4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIzIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTI4IDBDOTIuNyAwIDY0IDI4LjcgNjQgNjR2OTZoNjRWNjRIMzU0LjdMMzg0IDkzLjNWMTYwaDY0VjkzLjNjMC0xNy02LjctMzMuMy0xOC43LTQ1LjNMNDAwIDE4LjdDMzg4IDYuNyAzNzEuNyAwIDM1NC43IDBIMTI4ek0zODQgMzUydjMyIDY0SDEyOFYzODQgMzY4IDM1MkgzODR6bTY0IDMyaDMyYzE3LjcgMCAzMi0xNC4zIDMyLTMyVjI1NmMwLTM1LjMtMjguNy02NC02NC02NEg2NGMtMzUuMyAwLTY0IDI4LjctNjQgNjR2OTZjMCAxNy43IDE0LjMgMzIgMzIgMzJINjR2NjRjMCAzNS4zIDI4LjcgNjQgNjQgNjRIMzg0YzM1LjMgMCA2NC0yOC43IDY0LTY0VjM4NHpNNDMyIDI0OGEyNCAyNCAwIDEgMSAwIDQ4IDI0IDI0IDAgMSAxIDAtNDh6Ii8+PC9zdmc+Cg==);
  background-position: 50% 50%;
}
</style>
