<script>
import classNames from 'classnames'
import { TippyComponent } from 'vue-tippy'
import { Collapse } from 'bootstrap'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

function renderTitleArrow (h, context) {
  if (!context.collapsible) {
    return
  }

  return (
    <FontAwesomeIcon
      size="lg"
      class="icon"
      fixed-width
      icon={faAngleLeft}
    />
  )
}
function renderTippy (h, context, uniqueId) {
  if (context.disabled) {
    return (
      <TippyComponent
        to={uniqueId}
      >
        { context.disabledTooltip }
      </TippyComponent>
    )
  }
}

function renderTitle (h, context) {
  const uniqueId = +new Date()

  return (
    <div
      class="container-title d-flex align-items-center"
    >
      { renderTippy(h, context, uniqueId) }

      <span
        name={uniqueId}
        class={classNames([{
          'bg-muted no-select': context.disabled,
          [`bg-${context.color}`]: !context.collapsible,
          [`bg-link-${context.color} clickable`]: context.collapsible
        }])}
        vOn:click={context.onTitleClick}
      >
        { context.$slots.title }
        { renderTitleArrow(h, context) }
      </span>
    </div>
  )
}

function renderBody (h, context) {
  return (
    <div
      ref="body"
      class={classNames('container-body', {
        collapse: context.collapsible
      })}
    >
      <div class={classNames(['py-3', {
        'px-3': context.bodyPadding
      }])}
      >
        { context.$slots.body }
      </div>
    </div>
  )
}

function renderContainer (h, context) {
  return (
    <div
      class={classNames({
        collapsible: context.collapsible,
        active: context.isActive,
        disable: context.disabled
      })}
    >
      { renderTitle(h, context) }
      { renderBody(h, context) }
    </div>
  )
}

export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    value: {
      type: Boolean,
      default: null
    },
    collapsible: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledTooltip: {
      type: String,
      default: null
    },
    bodyPadding: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      collapse: null,
      state: this.value !== null ? this.value : false
    }
  },
  computed: {
    isActive () {
      return this.hasVModel
        ? this.value
        : this.state
    },
    hasVModel () {
      return !!this.$listeners.input
    }
  },
  watch: {
    value (val) {
      if (val === null) {
        return
      }

      if (this.disabled) {
        return
      }

      if (val) {
        this.collapse.show()
        return
      }

      this.collapse.hide()
    },
    collapsible (val) {
      if (val) {
        this.setupCollapsible()
        return
      }

      this.destroyCollapsible()
    }
  },
  mounted () {
    if (this.collapsible) {
      this.setupCollapsible()
    }
  },
  methods: {
    onTitleClick () {
      if (this.collapse === null) {
        return
      }

      if (this.disabled) {
        return
      }

      if (this.hasVModel) {
        this.$emit('input', !this.value)
        return
      }

      this.state = !this.state
      this.collapse.toggle()
    },
    setupCollapsible () {
      const collapseEl = this.$refs.body

      this.collapse = new Collapse(collapseEl, {
        toggle: this.hasVModel ? this.value : this.state
      })
    },
    destroyCollapsible () {
      this.collapse = null
      this.state = false
      this.$emit('input', null)
    }
  },
  render (h) {
    return (
      <div>
        { renderContainer(h, this) }
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import "@/sass/variables/_colors";
@import "@/sass/variables/_bootstrap";

$transition-time: .15s ease;
$container-border-radius: .25rem;

.collapsing {
  transition: height $transition-time;
}

.collapsible {
  &.disabled {
    .container-title {
      cursor: default;
    }
  }

  &.active {
    .icon {
      transform: rotate(-90deg);
    }

    > .container-title > span {
      box-shadow: 0 0 5px transparent !important;
    }
  }

  > .container-title {
    & > span {
      transition: background-color $transition-time, box-shadow $transition-time;
      padding-right: .15rem;
      box-shadow: 0 0 5px transparent,
        0 3px 4px rgba($secondary, .5);
    }
  }

  .icon {
    transition: $transition-time;
  }
}

.container-title > span {
  box-shadow: 0 0 5px transparent,
              0 0 5px rgba($secondary, .5);
  margin-left: 20px;
  margin-bottom: 0;
  display: inline-block;
  z-index: 10;
  color: $white;
  padding: .25rem .75rem;
  font-weight: bold;
  border-top-right-radius: $container-border-radius;
  border-top-left-radius: $container-border-radius;
}

.container-body {
  z-index: 15;
  background-color: $white;
  box-shadow: 0 1px 5px rgba($secondary, .3);
  border-radius: $container-border-radius;
}
</style>
