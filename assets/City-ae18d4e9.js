var a={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CityParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"City"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"CityStateParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"City"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"state"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"abbreviation"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"CityBranchShippingCompanyParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Branch"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"shipping_company"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"CityBranchParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"City"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"branch"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"city"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CityParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"CityStateParts"},directives:[]}]}},{kind:"FragmentSpread",name:{kind:"Name",value:"CityBranchShippingCompanyParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetCities"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"QueryCitiesOrderByOrderByClause"}}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryCitiesWhereWhereConditions"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cities"},arguments:[{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}},{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CityParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"CityStateParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"CityBranchParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetSimpleCities"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryCitiesWhereWhereConditions"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cities"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"ListValue",values:[{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"column"},value:{kind:"EnumValue",value:"NAME"}},{kind:"ObjectField",name:{kind:"Name",value:"order"},value:{kind:"EnumValue",value:"ASC"}}]}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CityParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"CityStateParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreateCity"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CityInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cityCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateCity"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CityInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cityUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CityParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"CityStateParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"MassUpdateCityState"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"ids"}},type:{kind:"NonNullType",type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"state_id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cityMassUpdateState"},arguments:[{kind:"Argument",name:{kind:"Name",value:"ids"},value:{kind:"Variable",name:{kind:"Name",value:"ids"}}},{kind:"Argument",name:{kind:"Name",value:"state_id"},value:{kind:"Variable",name:{kind:"Name",value:"state_id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CityParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"CityStateParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"DeleteCity"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"city_id"}},type:{kind:"NamedType",name:{kind:"Name",value:"ID"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"replace"}},type:{kind:"NamedType",name:{kind:"Name",value:"CityReplaceOptionsInput"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cityDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"city_id"},value:{kind:"Variable",name:{kind:"Name",value:"city_id"}}},{kind:"Argument",name:{kind:"Name",value:"replace"},value:{kind:"Variable",name:{kind:"Name",value:"replace"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CityParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"CityStateParts"},directives:[]}]}}]}}],loc:{start:0,end:1369}};a.loc.source={body:`
fragment CityParts on City {
  id
  name
}

fragment CityStateParts on City {
  state {
    id
    name
    abbreviation
  }
}

fragment CityBranchShippingCompanyParts on Branch {
  shipping_company {
    id
    name
  }
}

fragment CityBranchParts on City {
  branch {
    id
    city {
      ...CityParts
      ...CityStateParts
    }

    ...CityBranchShippingCompanyParts
  }
}

query GetCities (
  $orderBy: [QueryCitiesOrderByOrderByClause!]
  $where: QueryCitiesWhereWhereConditions
) {
  cities (orderBy: $orderBy where: $where) {
    ...CityParts
    ...CityStateParts
    ...CityBranchParts
  }
}

query GetSimpleCities ($where: QueryCitiesWhereWhereConditions) {
  cities (
    where: $where
    orderBy: [{column: NAME order: ASC}]
  ) {
    ...CityParts
    ...CityStateParts
  }
}

mutation CreateCity ($input: CityInput!) {
  cityCreate (input: $input) {
    id
  }
}

mutation UpdateCity ($id: ID! $input: CityInput!) {
  cityUpdate (id: $id input: $input) {
    ...CityParts
    ...CityStateParts
  }
}

mutation MassUpdateCityState ($ids: [ID!]! $state_id: ID!) {
  cityMassUpdateState(ids: $ids state_id: $state_id) {
    ...CityParts
    ...CityStateParts
  }
}

mutation DeleteCity ($id: ID! $city_id: ID $replace: CityReplaceOptionsInput) {
  cityDelete(id: $id city_id: $city_id replace: $replace) {
    ...CityParts
    ...CityStateParts
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};function s(e,i){if(e.kind==="FragmentSpread")i.add(e.name.value);else if(e.kind==="VariableDefinition"){var n=e.type;n.kind==="NamedType"&&i.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(t){s(t,i)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(t){s(t,i)}),e.definitions&&e.definitions.forEach(function(t){s(t,i)})}var u={};(function(){a.definitions.forEach(function(i){if(i.name){var n=new Set;s(i,n),u[i.name.value]=n}})})();function o(e,i){for(var n=0;n<e.definitions.length;n++){var t=e.definitions[n];if(t.name&&t.name.value==i)return t}}function d(e,i){var n={kind:e.kind,definitions:[o(e,i)]};e.hasOwnProperty("loc")&&(n.loc=e.loc);var t=u[i]||new Set,k=new Set,l=new Set;for(t.forEach(function(r){l.add(r)});l.size>0;){var c=l;l=new Set,c.forEach(function(r){if(!k.has(r)){k.add(r);var m=u[r]||new Set;m.forEach(function(v){l.add(v)})}})}return k.forEach(function(r){var m=o(e,r);m&&n.definitions.push(m)}),n}d(a,"CityParts");d(a,"CityStateParts");d(a,"CityBranchShippingCompanyParts");d(a,"CityBranchParts");const y=d(a,"GetCities"),p=d(a,"GetSimpleCities"),N=d(a,"CreateCity"),S=d(a,"UpdateCity"),C=d(a,"MassUpdateCityState"),f=d(a,"DeleteCity");export{N as C,f as D,y as G,C as M,S as U,p as a};
