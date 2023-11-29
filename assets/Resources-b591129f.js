var t={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ClientsForCityModalParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Client"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"phone"},arguments:[],directives:[]}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"ClientsForFormsParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Client"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"phone"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"balance"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"bonus"},arguments:[],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetClientsForCityModal"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryClientsWhereWhereConditions"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"QueryClientsOrderByOrderByClause"}}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"clients"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"IntValue",value:"10"}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"currentPage"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"perPage"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ClientsForCityModalParts"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetClientsForForm"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryClientsWhereWhereConditions"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"QueryClientsOrderByOrderByClause"}}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"clients"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"IntValue",value:"10"}},{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"currentPage"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"perPage"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ClientsForFormsParts"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetOrdersForForm"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"QueryOrdersOrderByOrderByClause"}}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryOrdersWhereWhereConditions"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orders"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"IntValue",value:"10"}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}},{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"currentPage"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"perPage"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]}]}}]}}]}}],loc:{start:0,end:1119}};t.loc.source={body:`fragment ClientsForCityModalParts on Client {
  id
  name
  phone
}

fragment ClientsForFormsParts on Client {
  id
  name
  phone
  balance
  bonus
}

query GetClientsForCityModal(
  $page: Int
  $where: QueryClientsWhereWhereConditions
  $orderBy: [QueryClientsOrderByOrderByClause!]
) {
  clients(first: 10, page: $page, where: $where, orderBy: $orderBy) {
    paginatorInfo {
      currentPage
      perPage
      total
    }

    data {
      ...ClientsForCityModalParts
    }
  }
}

query GetClientsForForm(
  $where: QueryClientsWhereWhereConditions
  $orderBy: [QueryClientsOrderByOrderByClause!]
) {
  clients(first: 10, where: $where, orderBy: $orderBy) {
    paginatorInfo {
      currentPage
      perPage
      total
    }

    data {
      ...ClientsForFormsParts
    }
  }
}

query GetOrdersForForm(
  $orderBy: [QueryOrdersOrderByOrderByClause!]
  $where: QueryOrdersWhereWhereConditions
) {
  orders(first: 10, orderBy: $orderBy, where: $where) {
    paginatorInfo {
      currentPage
      perPage
      total
    }

    data {
      id
      name
      code
      price
      total_owing
    }
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};function m(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(a){m(a,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(a){m(a,n)}),e.definitions&&e.definitions.forEach(function(a){m(a,n)})}var u={};(function(){t.definitions.forEach(function(n){if(n.name){var i=new Set;m(n,i),u[n.name.value]=i}})})();function k(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function l(e,n){var i={kind:e.kind,definitions:[k(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=u[n]||new Set,o=new Set,d=new Set;for(a.forEach(function(r){d.add(r)});d.size>0;){var v=d;d=new Set,v.forEach(function(r){if(!o.has(r)){o.add(r);var s=u[r]||new Set;s.forEach(function(c){d.add(c)})}})}return o.forEach(function(r){var s=k(e,r);s&&i.definitions.push(s)}),i}l(t,"ClientsForCityModalParts");l(t,"ClientsForFormsParts");const y=l(t,"GetClientsForCityModal"),N=l(t,"GetClientsForForm"),g=l(t,"GetOrdersForForm");export{y as G,g as a,N as b};
