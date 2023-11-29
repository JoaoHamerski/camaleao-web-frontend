import{d as N}from"./_PaginatorFragment-c01a3fe7.js";var a={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ClientShippingCompanyParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Client"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"shipping_company"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"BranchParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Client"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"branch"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"city"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"ClientCityParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Client"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"city"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"state"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"abbreviation"},arguments:[],directives:[]}]}}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"ClientSimpleParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Client"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"phone"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing_as_sponsorship"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_sponsor"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"has_balance"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"balance"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"bonus"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"client_recommended"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"phone"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"ClientParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Client"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ClientSimpleParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ClientShippingCompanyParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"BranchParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ClientCityParts"},directives:[]}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"ClientOrdersSimplePart"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_paid"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"delivery_date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"states"},arguments:[],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetClients"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryClientsWhereWhereConditions"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"hasCity"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryClientsHasCityWhereHasConditions"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"QueryClientsOrderByOrderByClause"}}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"clients"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"IntValue",value:"10"}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}},{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}},{kind:"Argument",name:{kind:"Name",value:"hasCity"},value:{kind:"Variable",name:{kind:"Name",value:"hasCity"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ClientSimpleParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ClientCityParts"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetClient"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"client"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ClientSimpleParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetClientWithOrders"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderPage"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderWhere"}},type:{kind:"NamedType",name:{kind:"Name",value:"ClientOrdersWhereWhereConditions"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"client"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ClientParts"},directives:[]},{kind:"Field",name:{kind:"Name",value:"orders"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"IntValue",value:"10"}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"orderPage"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"ListValue",values:[{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"column"},value:{kind:"EnumValue",value:"CREATED_AT"}},{kind:"ObjectField",name:{kind:"Name",value:"order"},value:{kind:"EnumValue",value:"DESC"}}]}]}},{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"orderWhere"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ClientOrdersSimplePart"},directives:[]}]}}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreateClient"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ClientInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"clientCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ClientParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateClient"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ClientInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"clientUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ClientParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"DeleteClient"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"password"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"clientDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"password"},value:{kind:"Variable",name:{kind:"Name",value:"password"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ClientParts"},directives:[]}]}}]}}],loc:{start:0,end:2086}};a.loc.source={body:`#import "./_PaginatorFragment.gql"

fragment ClientShippingCompanyParts on Client {
  shipping_company {
    id
    name
  }
}

fragment BranchParts on Client {
  branch {
    id
    city {
      id
      name
    }
  }
}

fragment ClientCityParts on Client {
  city {
    id
    name
    state {
      id
      name
      abbreviation
    }
  }
}

fragment ClientSimpleParts on Client {
  id
  name
  phone
  total_owing
  total_owing_as_sponsorship
  is_sponsor
  has_balance
  balance
  bonus
  client_recommended {
    id
    name
    phone
  }
}

fragment ClientParts on Client {
  ...ClientSimpleParts
  ...ClientShippingCompanyParts
  ...BranchParts
  ...ClientCityParts
}

fragment ClientOrdersSimplePart on Order {
  client {
    id
  }

  id
  code
  price
  total_paid
  quantity
  delivery_date
  states
}

query GetClients(
  $page: Int
  $where: QueryClientsWhereWhereConditions
  $hasCity: QueryClientsHasCityWhereHasConditions
  $orderBy: [QueryClientsOrderByOrderByClause!]
) {
  clients(
    first: 10
    page: $page
    orderBy: $orderBy
    where: $where
    hasCity: $hasCity
  ) {
    paginatorInfo {
      ...PaginatorSimpleParts
    }

    data {
      ...ClientSimpleParts
      ...ClientCityParts
    }
  }
}

query GetClient($id: ID!) {
  client(id: $id) {
    ...ClientSimpleParts
  }
}

query GetClientWithOrders(
  $id: ID!
  $orderPage: Int
  $orderWhere: ClientOrdersWhereWhereConditions
) {
  client(id: $id) {
    ...ClientParts

    orders(
      first: 10
      page: $orderPage
      orderBy: [{ column: CREATED_AT, order: DESC }]
      where: $orderWhere
    ) {
      paginatorInfo {
        ...PaginatorSimpleParts
      }

      data {
        ...ClientOrdersSimplePart
      }
    }
  }
}

mutation CreateClient($input: ClientInput!) {
  clientCreate(input: $input) {
    ...ClientParts
  }
}

mutation UpdateClient($id: ID!, $input: ClientInput!) {
  clientUpdate(id: $id, input: $input) {
    ...ClientParts
  }
}

mutation DeleteClient($id: ID!, $password: String!) {
  clientDelete(id: $id, password: $password) {
    ...ClientParts
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var u={};function S(e){return e.filter(function(n){if(n.kind!=="FragmentDefinition")return!0;var i=n.name.value;return u[i]?!1:(u[i]=!0,!0)})}a.definitions=a.definitions.concat(S(N.definitions));function s(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(d){s(d,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(d){s(d,n)}),e.definitions&&e.definitions.forEach(function(d){s(d,n)})}var o={};(function(){a.definitions.forEach(function(n){if(n.name){var i=new Set;s(n,i),o[n.name.value]=i}})})();function v(e,n){for(var i=0;i<e.definitions.length;i++){var d=e.definitions[i];if(d.name&&d.name.value==n)return d}}function t(e,n){var i={kind:e.kind,definitions:[v(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var d=o[n]||new Set,k=new Set,r=new Set;for(d.forEach(function(l){r.add(l)});r.size>0;){var c=r;r=new Set,c.forEach(function(l){if(!k.has(l)){k.add(l);var m=o[l]||new Set;m.forEach(function(p){r.add(p)})}})}return k.forEach(function(l){var m=v(e,l);m&&i.definitions.push(m)}),i}t(a,"ClientShippingCompanyParts");t(a,"BranchParts");t(a,"ClientCityParts");t(a,"ClientSimpleParts");t(a,"ClientParts");t(a,"ClientOrdersSimplePart");const C=t(a,"GetClients"),y=t(a,"GetClient"),f=t(a,"GetClientWithOrders"),b=t(a,"CreateClient"),F=t(a,"UpdateClient"),h=t(a,"DeleteClient");export{b as C,h as D,C as G,F as U,f as a,y as b};
