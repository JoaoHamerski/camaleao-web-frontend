import{d as g}from"./_PaginatorFragment-c01a3fe7.js";var a={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetSalesAmount"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dashboardSalesAmount"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"current"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"day"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"week"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"month"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"previous"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"day"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"week"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"month"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetAmountSalesChart"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dashboardSalesAmountChart"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"current"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"day"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"amount"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"previous"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"day"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"amount"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetCitiesSalesAmount"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"date"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dashboardSalesAmountCities"},arguments:[{kind:"Argument",name:{kind:"Name",value:"date"},value:{kind:"Variable",name:{kind:"Name",value:"date"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"city"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"state"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"abbreviation"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"amount"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"shirts_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"orders_count"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetModelsSalesAmount"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"date"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"SalesAmountModelDates"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dashboardSalesAmountModels"},arguments:[{kind:"Argument",name:{kind:"Name",value:"date"},value:{kind:"Variable",name:{kind:"Name",value:"date"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"model"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"amount"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"shirts_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"sales_percentage"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetClientsSegmentation"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"date"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ClientSegmentationDates"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dashboardClientsSegmentation"},arguments:[{kind:"Argument",name:{kind:"Name",value:"date"},value:{kind:"Variable",name:{kind:"Name",value:"date"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"new_clients"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"amount"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"amount_pre_registered"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"shirts_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"orders_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"orders_count_pre_registered"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"recurrent_clients"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"amount"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"amount_pre_registered"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"shirts_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"orders_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"orders_count_pre_registered"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetDashboardMonthSalesUsers"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dashboardMonthSalesUsers"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"direct_cost_items"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"percentage"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"products"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"percentage"},arguments:[],directives:[]}]}}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"DashboardProductionDataParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"DashboardProductionData"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orders_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"shirts_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"receipt"},arguments:[],directives:[]}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"DashboardProductionOfDayParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"DashboardProductionOfDay"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"day"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DashboardProductionDataParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"week"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DashboardProductionDataParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"last_week"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DashboardProductionDataParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetDashboardProduction"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"production_date"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dashboardProduction"},arguments:[{kind:"Argument",name:{kind:"Name",value:"production_date"},value:{kind:"Variable",name:{kind:"Name",value:"production_date"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"estampados"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DashboardProductionOfDayParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"costurados"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DashboardProductionOfDayParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"month_production"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DashboardProductionDataParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"late_orders"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DashboardProductionDataParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"waiting_for_withdrawal_orders"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DashboardProductionDataParts"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"ChangeDashboardProductionSettings"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"settings"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"DashboardProductionSettings"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dashboardProductionSettings"},arguments:[{kind:"Argument",name:{kind:"Name",value:"settings"},value:{kind:"Variable",name:{kind:"Name",value:"settings"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetDashboardProductionOrders"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"type"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"DashboardProductionOrdersTypes"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"production_date"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dashboardProductionOrders"},arguments:[{kind:"Argument",name:{kind:"Name",value:"type"},value:{kind:"Variable",name:{kind:"Name",value:"type"}}},{kind:"Argument",name:{kind:"Name",value:"production_date"},value:{kind:"Variable",name:{kind:"Name",value:"production_date"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"delivery_date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"linked_status"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"pivot"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"confirmed_at"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}]}}]}}],loc:{start:0,end:2922}};a.loc.source={body:`#import "./_PaginatorFragment.gql"
query GetSalesAmount {
  dashboardSalesAmount {
    current {
      day
      week
      month
    }

    previous {
      day
      week
      month
    }
  }
}

query GetAmountSalesChart {
  dashboardSalesAmountChart {
    current {
      day
      amount
    }

    previous {
      day
      amount
    }
  }
}

query GetCitiesSalesAmount($date: String) {
  dashboardSalesAmountCities(date: $date) {
    city {
      id
      name
      state {
        id
        abbreviation
      }
    }

    amount
    shirts_count
    orders_count
  }
}

query GetModelsSalesAmount($date: SalesAmountModelDates!) {
  dashboardSalesAmountModels(date: $date) {
    model {
      id
      name
    }

    amount
    shirts_count
    sales_percentage
  }
}

query GetClientsSegmentation($date: ClientSegmentationDates!) {
  dashboardClientsSegmentation(date: $date) {
    new_clients {
      amount
      amount_pre_registered
      shirts_count
      orders_count
      orders_count_pre_registered
    }

    recurrent_clients {
      amount
      amount_pre_registered
      shirts_count
      orders_count
      orders_count_pre_registered
    }
  }
}

query GetDashboardMonthSalesUsers {
  dashboardMonthSalesUsers {
    user {
      id
      name
    }
    direct_cost_items {
      total
      percentage
    }
    products {
      total
      percentage
    }
  }
}

fragment DashboardProductionDataParts on DashboardProductionData {
  orders_count
  shirts_count
  receipt
}

fragment DashboardProductionOfDayParts on DashboardProductionOfDay {
  day {
    ...DashboardProductionDataParts
  }

  week {
    ...DashboardProductionDataParts
  }

  last_week {
    ...DashboardProductionDataParts
  }
}

query GetDashboardProduction($production_date: String!) {
  dashboardProduction(production_date: $production_date) {
    estampados {
      ...DashboardProductionOfDayParts
    }

    costurados {
      ...DashboardProductionOfDayParts
    }

    month_production {
      ...DashboardProductionDataParts
    }

    late_orders {
      ...DashboardProductionDataParts
    }

    waiting_for_withdrawal_orders {
      ...DashboardProductionDataParts
    }
  }
}

mutation ChangeDashboardProductionSettings(
  $settings: DashboardProductionSettings!
) {
  dashboardProductionSettings(settings: $settings)
}

query GetDashboardProductionOrders(
  $type: DashboardProductionOrdersTypes!
  $production_date: String
  $first: Int!
  $page: Int
) {
  dashboardProductionOrders(
    type: $type
    production_date: $production_date
    first: $first
    page: $page
  ) {
    paginatorInfo {
      ...PaginatorSimpleParts
    }

    data {
      id
      code
      price
      quantity
      delivery_date
      created_at
      linked_status {
        id
        text
        pivot {
          is_confirmed
          confirmed_at
        }
      }

      client {
        id
      }
    }
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var c={};function N(e){return e.filter(function(n){if(n.kind!=="FragmentDefinition")return!0;var i=n.name.value;return c[i]?!1:(c[i]=!0,!0)})}a.definitions=a.definitions.concat(N(g.definitions));function l(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(t){l(t,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(t){l(t,n)}),e.definitions&&e.definitions.forEach(function(t){l(t,n)})}var u={};(function(){a.definitions.forEach(function(n){if(n.name){var i=new Set;l(n,i),u[n.name.value]=i}})})();function k(e,n){for(var i=0;i<e.definitions.length;i++){var t=e.definitions[i];if(t.name&&t.name.value==n)return t}}function d(e,n){var i={kind:e.kind,definitions:[k(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var t=u[n]||new Set,m=new Set,s=new Set;for(t.forEach(function(r){s.add(r)});s.size>0;){var v=s;s=new Set,v.forEach(function(r){if(!m.has(r)){m.add(r);var o=u[r]||new Set;o.forEach(function(S){s.add(S)})}})}return m.forEach(function(r){var o=k(e,r);o&&i.definitions.push(o)}),i}const b=d(a,"GetSalesAmount"),h=d(a,"GetAmountSalesChart");d(a,"GetCitiesSalesAmount");d(a,"GetModelsSalesAmount");d(a,"GetClientsSegmentation");const D=d(a,"GetDashboardMonthSalesUsers");d(a,"DashboardProductionDataParts");d(a,"DashboardProductionOfDayParts");d(a,"GetDashboardProduction");const f=d(a,"ChangeDashboardProductionSettings");d(a,"GetDashboardProductionOrders");export{f as C,h as G,b as a,D as b};
