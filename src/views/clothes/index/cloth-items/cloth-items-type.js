import { GetModels, CreateModel } from '@/graphql/Model.gql'
import { GetMaterials, CreateMaterial } from '@/graphql/Material.gql'
import { GetNeckTypes, CreateNeckType } from '@/graphql/NeckType.gql'
import { GetSleeveTypes, CreateSleeveType } from '@/graphql/SleeveType.gql'
import { GetClothSizes, CreateClothSize } from '@/graphql/ClothSize.gql'

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
    get queryName () {
      return getQueryName(this.query)
    }
  },
  MATERIALS: {
    name: 'Materiais',
    query: GetMaterials,
    createMutation: CreateMaterial,
    get queryName () {
      return getQueryName(this.query)
    }
  },
  NECK_TYPES: {
    name: 'Tipos de gola',
    query: GetNeckTypes,
    createMutation: CreateNeckType,
    get queryName () {
      return getQueryName(this.query)
    }
  },
  SLEEVE_TYPES: {
    name: 'Tipos de manga',
    query: GetSleeveTypes,
    createMutation: CreateSleeveType,
    get queryName () {
      return getQueryName(this.query)
    }
  },
  SIZES: {
    name: 'Tamanhos',
    query: GetClothSizes,
    createMutation: CreateClothSize,
    get queryName () {
      return getQueryName(this.query)
    }
  }
}
