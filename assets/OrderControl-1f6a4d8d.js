import{d as N}from"./_PaginatorFragment-c01a3fe7.js";var t={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OrdersBySectorParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"art_paths"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"delivery_date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"states"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"linked_status"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"pivot"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"confirmed_at"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"status"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetAuthUserSectors"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"authUserSectors"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orders_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"pendency_total"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"sector"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"can_close_sector_orders"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"status"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"next_status"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetOrdersBySector"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"sectorId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"order_by"}},type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"QueryOrdersBySectorOrderByOrderByClause"}}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"ordersBySector"},arguments:[{kind:"Argument",name:{kind:"Name",value:"sector_id"},value:{kind:"Variable",name:{kind:"Name",value:"sectorId"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"order_by"},value:{kind:"Variable",name:{kind:"Name",value:"order_by"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrdersBySectorParts"},directives:[]}]}}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"SectorOrdersPart"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SectorOrders"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"current_orders"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}]}},{kind:"Field",name:{kind:"Name",value:"current_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"previous_count"},arguments:[],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetProductionPanel"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"productionPanel"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"sector"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"alias"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"orders_on_periods"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"day"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SectorOrdersPart"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"week"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SectorOrdersPart"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"month"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SectorOrdersPart"},directives:[]}]}}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"StepToStatus"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"statusId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"overrideOption"}},type:{kind:"NamedType",name:{kind:"Name",value:"OrderUpdateStatusOverrideOptions"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"stepToStatus"},arguments:[{kind:"Argument",name:{kind:"Name",value:"order_id"},value:{kind:"Variable",name:{kind:"Name",value:"orderId"}}},{kind:"Argument",name:{kind:"Name",value:"status_id"},value:{kind:"Variable",name:{kind:"Name",value:"statusId"}}},{kind:"Argument",name:{kind:"Name",value:"override_option"},value:{kind:"Variable",name:{kind:"Name",value:"overrideOption"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrdersBySectorParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"GetDuplicatedEntries"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"bank_uids"}},type:{kind:"NonNullType",type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"bankCheckDuplicatedEntries"},arguments:[{kind:"Argument",name:{kind:"Name",value:"bank_uid"},value:{kind:"Variable",name:{kind:"Name",value:"bank_uids"}}}],directives:[]}]}}],loc:{start:0,end:1983}};t.loc.source={body:`#import "./_PaginatorFragment.gql"

fragment OrdersBySectorParts on Order {
  id
  code
  name
  price
  art_paths
  created_at
  delivery_date
  states
  total_owing
  linked_status {
    id
    text
    order
    pivot {
      user {
        id
        name
      }

      is_confirmed
      confirmed_at
    }
  }

  status {
    id
    text
    order
  }

  client {
    id
    name
  }
}

query GetAuthUserSectors {
  authUserSectors {
    orders_count
    quantity_count
    pendency_total

    sector {
      id
      name
      can_close_sector_orders
      status {
        id
        text
        order
      }
    }
    next_status {
      id
      text
      order
    }
  }
}

query GetOrdersBySector(
  $sectorId: ID!
  $first: Int!
  $page: Int
  $order_by: [QueryOrdersBySectorOrderByOrderByClause!]
) {
  ordersBySector(
    sector_id: $sectorId
    first: $first
    page: $page
    order_by: $order_by
  ) {
    paginatorInfo {
      ...PaginatorSimpleParts
    }

    data {
      ...OrdersBySectorParts
    }
  }
}

fragment SectorOrdersPart on SectorOrders {
  current_orders(first: $first, page: $page) {
    paginatorInfo {
      ...PaginatorSimpleParts
    }

    data {
      id
      code
      quantity
      client {
        id
      }
    }
  }

  current_count
  previous_count
}

query GetProductionPanel($first: Int!, $page: Int) {
  productionPanel {
    sector {
      id
      name
      alias
    }

    orders_on_periods {
      day {
        ...SectorOrdersPart
      }
      week {
        ...SectorOrdersPart
      }
      month {
        ...SectorOrdersPart
      }
    }
  }
}

mutation StepToStatus(
  $orderId: ID!
  $statusId: ID!
  $overrideOption: OrderUpdateStatusOverrideOptions
) {
  stepToStatus(
    order_id: $orderId
    status_id: $statusId
    override_option: $overrideOption
  ) {
    ...OrdersBySectorParts
  }
}

mutation GetDuplicatedEntries($bank_uids: [String!]!) {
  bankCheckDuplicatedEntries(bank_uid: $bank_uids)
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var c={};function p(e){return e.filter(function(n){if(n.kind!=="FragmentDefinition")return!0;var i=n.name.value;return c[i]?!1:(c[i]=!0,!0)})}t.definitions=t.definitions.concat(p(N.definitions));function m(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(a){m(a,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(a){m(a,n)}),e.definitions&&e.definitions.forEach(function(a){m(a,n)})}var u={};(function(){t.definitions.forEach(function(n){if(n.name){var i=new Set;m(n,i),u[n.name.value]=i}})})();function k(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function r(e,n){var i={kind:e.kind,definitions:[k(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=u[n]||new Set,o=new Set,s=new Set;for(a.forEach(function(d){s.add(d)});s.size>0;){var v=s;s=new Set,v.forEach(function(d){if(!o.has(d)){o.add(d);var l=u[d]||new Set;l.forEach(function(S){s.add(S)})}})}return o.forEach(function(d){var l=k(e,d);l&&i.definitions.push(l)}),i}r(t,"OrdersBySectorParts");const f=r(t,"GetAuthUserSectors"),y=r(t,"GetOrdersBySector");r(t,"SectorOrdersPart");const F=r(t,"GetProductionPanel"),b=r(t,"StepToStatus"),_=r(t,"GetDuplicatedEntries");export{_ as G,b as S,f as a,y as b,F as c};
