import { GetModels, CreateModel, UpdateModel } from '@/graphql/Model.gql'
import { GetMaterials, CreateMaterial, UpdateMaterial } from '@/graphql/Material.gql'
import { GetNeckTypes, CreateNeckType, UpdateNeckType } from '@/graphql/NeckType.gql'
import { GetSleeveTypes, CreateSleeveType, UpdateSleeveType } from '@/graphql/SleeveType.gql'
import { GetGarmentSizes, CreateGarmentSize, UpdateGarmentSize } from '@/graphql/GarmentSize.gql'

import { getQueryName } from '@/utils/helpers'

export const TYPES_ENUM = {
  MODELS: 'MODELS',
  MATERIALS: 'MATERIALS',
  NECK_TYPES: 'NECK_TYPES',
  SLEEVE_TYPES: 'SLEEVE_TYPES',
  SIZES: 'SIZES',
}

export const TYPES_MAP = {
  MODELS: {
    name: 'Modelos',
    query: GetModels,
    createMutation: CreateModel,
    updateMutation: UpdateModel,
    get queryName () {
      return getQueryName(this.query)
    }
  },
  MATERIALS: {
    name: 'Materiais',
    query: GetMaterials,
    createMutation: CreateMaterial,
    updateMutation: UpdateMaterial,
    get queryName () {
      return getQueryName(this.query)
    }
  },
  NECK_TYPES: {
    name: 'Tipos de gola',
    query: GetNeckTypes,
    createMutation: CreateNeckType,
    updateMutation: UpdateNeckType,
    get queryName () {
      return getQueryName(this.query)
    }
  },
  SLEEVE_TYPES: {
    name: 'Tipos de manga',
    query: GetSleeveTypes,
    createMutation: CreateSleeveType,
    updateMutation: UpdateSleeveType,
    get queryName () {
      return getQueryName(this.query)
    }
  },
  SIZES: {
    name: 'Tamanhos',
    query: GetGarmentSizes,
    createMutation: CreateGarmentSize,
    updateMutation: UpdateGarmentSize,
    get queryName () {
      return getQueryName(this.query)
    }
  }
}
