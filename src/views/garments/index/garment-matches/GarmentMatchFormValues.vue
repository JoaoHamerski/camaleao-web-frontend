<script>
import { form } from './GarmentMatchForm.vue'
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
    form
  }),
  watch: {
    'form.values': {
      handler () {
        debounce(this.validateAll, 500, {trailing: true})()
      },
      deep: true
    }
  },
  methods: {
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
    onDeleteClick (index) {
      if (this.isDeleteItemDisabled(index)) {
        return
      }

      this.form.values.splice(index, 1)
    },
    onNewIntervalClick () {
      const indexToInsert = this.form.values.length - 1

      this.form.values.splice(indexToInsert, 0, {
        start: '', end: '', value: ''
      })
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

    <div class="row small fw-bold mt-2">
      <div class="col-2">
        Unid.
      </div>
      <div class="col-1" />
      <div class="col-2">
        Unid.
      </div>
      <div class="col-1" />
      <div class="col">
        Valor
      </div>
    </div>

    <template v-for="(value, index) in form.values">
      <div
        v-if="index === form.values.length - 1"
        :key="`last-item-${index}`"
        class="row align-items-baseline"
      >
        <div class="col-2">
          <hr class="pb-0 mb-1">
        </div>
        <div class="col-1 small text-nowrap">
          mais de
        </div>
        <div class="col-2">
          <AppInput
            :id="`values.${index}.start`"
            :value="getEndValue()"
            :name="`values.${index}.start`"
            :mask="maskInteger"
            disabled
          />
        </div>
        <div class="col-1 text-center">
          =
        </div>
        <div class="col">
          <AppInput
            :id="`values.${index}.value.`"
            v-model="form.values[index].value"
            :name="`values.${index}.value`"
            :mask="maskCurrencyBRL"
            :error="form.errors.get(`values.${index}.value`)"
          />
        </div>
      </div>

      <div
        v-else
        :key="index"
        class="row align-items-baseline"
      >
        <div class="col-2">
          <AppInput
            :id="`values.${index}.start`"
            :value="getStartValue(index)"
            :name="`values.${index}.start`"
            disabled
            :mask="maskInteger"
          />
        </div>
        <div class="col-1 small text-center">
          até
        </div>
        <div class="col-2">
          <AppInput
            :id="`values.${index}.end`"
            v-model="form.values[index].end"
            :name="`values.${index}.end`"
            :mask="maskInteger"
            :error="form.errors.get(`values.${index}.end`)"
            :auto-clear-error="false"
          />
        </div>
        <div class="col-1 text-center">
          =
        </div>
        <div class="col">
          <AppInput
            :id="`values.${index}.value`"
            v-model="form.values[index].value"
            :name="`values.${index}.value`"
            :mask="maskCurrencyBRL"
            :error="form.errors.get(`values.${index}.value`)"
          />
        </div>
        <div
          class="col-1"
        >
          <AppButton
            btn-class="btn-sm"
            outlined
            color="danger"
            :icon="icons.faTrashAlt"
            :disabled="isDeleteItemDisabled(index)"
            @click.prevent="onDeleteClick(index)"
          />
        </div>
      </div>
    </template>
  </div>
</template>
