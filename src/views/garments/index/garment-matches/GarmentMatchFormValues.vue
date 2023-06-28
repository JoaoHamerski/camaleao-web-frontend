<script>
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { maskCurrencyBRL, maskInteger } from '@/utils/masks';
import { debounce } from 'lodash-es';

const isFirstItem = (index) => index === 0
const isLastItem = (values, index) => index === values.length - 1

const getPreviousValue = (values, index) => index > 0
  ? values[index - 1]
  : null

const getSecondLastValue = (values) => values.length >= 2
  ? values[values.length - 2]
  : null

const isValueEndValid = (previousItem, value) => {
  if (!previousItem) {
    return true
  }

  return +value.end > +previousItem.end + 1
}

const isFirstItemValid = (value, index) => {
  if (index !== 0) {
    return true
  }

  return +value.end > 0
}

export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    match: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    maskCurrencyBRL: maskCurrencyBRL({numeralPositiveOnly: true}),
    maskInteger: maskInteger({
      numeralIntegerScale: 3,
      numeralDecimalScale: 0,
      numeralPositiveOnly: true
    }),
    icons: {
      faTrashAlt,
      faPlus
    },
  }),
  watch: {
    'form.values': {
      handler () {
        debounce(this.validateAll, 500, {trailing: true})()
      },
      deep: true
    }
  },
  mounted () {
    if (this.isEdit) {
      this.populateForm()
    }
  },
  methods: {
    populateForm() {
      const values = this.match.values

      if (this.match.unique_value) {
        return
      }

      const formattedValues = values.map(({start, end, value}) => ({
        start,
        end,
        value: this.$helpers.toBRL(value)
      }))

      this.form.set({values: formattedValues})
    },
    getStartValue(index) {
      const previousValue = getPreviousValue(this.form.values, index)

      if (isFirstItem(index)) {
        return '0'
      }

      if (!previousValue?.end) {
        return ''
      }

      return +previousValue.end + 1
    },
    getEndValue () {
      const secondLastValue = getSecondLastValue(this.form.values)

      return secondLastValue?.end
        ? +secondLastValue.end + 1
        : ''
    },
    isDeleteItemDisabled (index) {
      return isFirstItem(index) || isLastItem(this.form.values, index)
    },
    onDeleteIntervalClick (index) {
      if (this.isDeleteItemDisabled(index)) {
        return
      }

      this.$emit('delete-interval', index)
    },
    onNewIntervalClick () {
      this.$emit('new-interval')
    },
    validate (value, index) {
      const previousItem = getPreviousValue(this.form.values, index)

      if (!value.end) {
        return false
      }

      if (!isFirstItemValid(value, index)) {
        this.form.errors.record({
          [`values.${index}.end`]: [`Mín.: 0`]
        })

        return
      }

      if (!isValueEndValid(previousItem, value)) {
        this.form.errors.record({
          [`values.${index}.end`]: [`Mín.: ${+previousItem.end + 2}`]
        })

        return
      }

      this.form.errors.clear(`values.${index}.end`)

      return false
    },
    validateAll () {
      this.form.values.forEach((value, index) => {
        this.validate(value, index)
      })
    },
    onBlur () {
      if (this.form.errors.any()) {
        this.validateAll()
      }
    }
  }
}
</script>

<template>
  <div @blur.capture="onBlur">
    <div class="text-secondary small mb-2">
      Selecione o intervalo de unidades por pedido para aplicar os valores
    </div>

    <a
      href=""
      class="small text-decoration-none mb-2"
      @click.prevent="onNewIntervalClick"
    >
      <FontAwesomeIcon
        :icon="icons.faPlus"
        fixed-width
      />
      Novo intervalo
    </a>

    <div class="row d-none d-lg-flex small fw-bold mt-2">
      <div class="col-2">
        Unid.
      </div>
      <div class="col-1" />

      <div class="col-2 ms-2">
        Unid.
      </div>

      <div class="col-1" />

      <div class="col ms-2">
        Valor
      </div>
    </div>

    <template v-for="(value, index) in form.values">
      <div
        v-if="index === form.values.length - 1"
        :key="`last-item-${index}`"
        class="row flex-column flex-lg-row align-items-baseline g-0"
      >
        <div class="horizontal-line d-block d-lg-none">
          <span class="small text-secondary fw-bold text-center">
            Intervalo final
          </span>
        </div>
        <div class="row col align-items-baseline g-0">
          <div class="col-4 col-lg-5 g-0">
            <hr class="pb-0 mb-1">
          </div>
          <div class="col-3 col-lg-2 small text-nowrap text-center">
            mais de
          </div>
          <div class="col-5">
            <AppInput
              :id="`values.${index}.start`"
              :value="getEndValue()"
              :name="`values.${index}.start`"
              :mask="maskInteger"
              disabled
            />
          </div>
        </div>
        <div class="col-1 text-center d-none d-lg-block">
          =
        </div>
        <div class="col">
          <AppInput
            :id="`values.${index}.value.`"
            :value="form.values[index].value"
            :name="`values.${index}.value`"
            :mask="maskCurrencyBRL"
            :error="form.errors.get(`values.${index}.value`)"
            @input="form.set({
              [`values.${index}.value`]: $event
            })"
          />
        </div>
      </div>
      <div
        v-else
        :key="index"
        class="row flex-column flex-lg-row align-items-baseline g-0"
      >
        <div class="horizontal-line d-block d-lg-none">
          <span class="small text-secondary fw-bold text-center">Intervalo {{ index + 1 }}</span>
        </div>
        <div class="row col align-items-baseline g-0">
          <div class="col-5">
            <AppInput
              :id="`values.${index}.start`"
              :value="getStartValue(index)"
              :name="`values.${index}.start`"
              disabled
              :mask="maskInteger"
            />
          </div>
          <div class="col-2 small text-center">
            até
          </div>
          <div class="col-5">
            <AppInput
              :id="`values.${index}.end`"
              :value="form.values[index].end"
              :name="`values.${index}.end`"
              :mask="maskInteger"
              :error="form.errors.get(`values.${index}.end`)"
              :auto-clear-error="false"
              @input="form.set({
                [`values.${index}.end`]: $event
              })"
            />
          </div>
        </div>
        <div class="col-1 d-none d-lg-block text-center">
          =
        </div>
        <div class="row col g-0">
          <div class="col">
            <AppInput
              :id="`values.${index}.value`"
              :value="form.values[index].value"
              :name="`values.${index}.value`"
              :mask="maskCurrencyBRL"
              :error="form.errors.get(`values.${index}.value`)"
              @input="form.set({
                [`values.${index}.value`]: $event
              })"
            />
          </div>
          <div class="col-2 col-lg-1 text-end ms-0 ms-lg-2">
            <AppButton
              btn-class="btn-sm"
              outlined
              color="danger"
              :icon="icons.faTrashAlt"
              :disabled="isDeleteItemDisabled(index)"
              @click.prevent="onDeleteIntervalClick(index)"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
