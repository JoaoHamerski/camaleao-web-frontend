import{d as g}from"./_PaginatorFragment-c01a3fe7.js";import{d as p}from"./PaymentExpense-9583d97d.js";var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetDailyCash"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"QueryDailyCashOrderByOrderByClause"}}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryDailyCashWhereWhereConditions"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"created_at"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dailyCash"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}},{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}},{kind:"Argument",name:{kind:"Name",value:"created_at"},value:{kind:"Variable",name:{kind:"Name",value:"created_at"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseBasicParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseProductTypeParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseEmployeeParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseViaParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseTypeParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseOrderParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseUserParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseSponsorshipClientParts"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetDailyCashPendencies"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dailyCashPendencies"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"created_at_entry"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"BalanceParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"BalanceData"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"entry"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"out"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"balance"},arguments:[],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetDailyCashBalance"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dailyCashBalance"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"balance_of_day"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"BalanceParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"balance_of_week"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"BalanceParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"balance_of_month"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"BalanceParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"pendency"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"total_owing_on_month"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing_last_month"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_shirts_on_month"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_shirts_last_month"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetDailyCashBalancePendenciesOrders"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"date"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dailyCashBalancePendenciesOrders"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"date"},value:{kind:"Variable",name:{kind:"Name",value:"date"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"column"},value:{kind:"EnumValue",value:"PRINT_DATE"}},{kind:"ObjectField",name:{kind:"Name",value:"order"},value:{kind:"EnumValue",value:"DESC"}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"print_date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"delivery_date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"art_paths"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"states"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"status"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_available"},arguments:[],directives:[]}]}}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetDailyCashDetailedFlow"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"date"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dailyCashDetailedFlow"},arguments:[{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"date"},value:{kind:"Variable",name:{kind:"Name",value:"date"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"shirts_total"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"entry"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"orders_price_avg"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"unities_avg"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"out"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"expense_types"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"shirts_details"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"less_than_five"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"count"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"between_five_and_ten"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"count"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"more_than_ten"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"count"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"pendency"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:2387}};i.loc.source={body:`#import "./_PaginatorFragment.gql"
#import "./PaymentExpense.gql"

query GetDailyCash(
  $first: Int!
  $page: Int
  $orderBy: [QueryDailyCashOrderByOrderByClause!]
  $where: QueryDailyCashWhereWhereConditions
  $created_at: String
) {
  dailyCash(
    first: $first
    page: $page
    orderBy: $orderBy
    where: $where
    created_at: $created_at
  ) {
    paginatorInfo {
      ...PaginatorSimpleParts
    }

    data {
      ...PaymentExpenseBasicParts
      ...PaymentExpenseProductTypeParts
      ...PaymentExpenseEmployeeParts
      ...PaymentExpenseViaParts
      ...PaymentExpenseTypeParts
      ...PaymentExpenseOrderParts
      ...PaymentExpenseUserParts
      ...PaymentExpenseSponsorshipClientParts
    }
  }
}

query GetDailyCashPendencies {
  dailyCashPendencies {
    created_at_entry
    total
  }
}

fragment BalanceParts on BalanceData {
  entry
  out
  balance
}

query GetDailyCashBalance {
  dailyCashBalance {
    balance_of_day {
      ...BalanceParts
    }

    balance_of_week {
      ...BalanceParts
    }

    balance_of_month {
      ...BalanceParts
    }

    pendency {
      total_owing_on_month
      total_owing_last_month
      total_shirts_on_month
      total_shirts_last_month
    }
  }
}

query GetDailyCashBalancePendenciesOrders(
  $first: Int!
  $page: Int
  $date: String!
) {
  dailyCashBalancePendenciesOrders(
    first: $first
    page: $page
    date: $date
    orderBy: { column: PRINT_DATE, order: DESC }
  ) {
    paginatorInfo {
      ...PaginatorSimpleParts
    }

    data {
      id
      code
      quantity
      price
      total_owing
      print_date
      delivery_date
      art_paths
      states

      client {
        id
        name
      }

      status {
        id
        text
        is_available
      }
    }
  }
}

query GetDailyCashDetailedFlow($page: Int!, $date: String) {
  dailyCashDetailedFlow(page: $page, date: $date) {
    date
    total_price
    shirts_total
    entry {
      total
      orders_price_avg
      unities_avg
    }

    out {
      total
      expense_types {
        name
        total
      }
    }

    shirts_details {
      less_than_five {
        value
        quantity
        count
      }

      between_five_and_ten {
        value
        quantity
        count
      }

      more_than_ten {
        value
        quantity
        count
      }
    }

    pendency
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var c={};function v(e){return e.filter(function(n){if(n.kind!=="FragmentDefinition")return!0;var a=n.name.value;return c[a]?!1:(c[a]=!0,!0)})}i.definitions=i.definitions.concat(v(g.definitions));i.definitions=i.definitions.concat(v(p.definitions));function m(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var a=e.type;a.kind==="NamedType"&&n.add(a.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(t){m(t,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(t){m(t,n)}),e.definitions&&e.definitions.forEach(function(t){m(t,n)})}var k={};(function(){i.definitions.forEach(function(n){if(n.name){var a=new Set;m(n,a),k[n.name.value]=a}})})();function o(e,n){for(var a=0;a<e.definitions.length;a++){var t=e.definitions[a];if(t.name&&t.name.value==n)return t}}function l(e,n){var a={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(a.loc=e.loc);var t=k[n]||new Set,u=new Set,r=new Set;for(t.forEach(function(d){r.add(d)});r.size>0;){var N=r;r=new Set,N.forEach(function(d){if(!u.has(d)){u.add(d);var s=k[d]||new Set;s.forEach(function(y){r.add(y)})}})}return u.forEach(function(d){var s=o(e,d);s&&a.definitions.push(s)}),a}const F=l(i,"GetDailyCash"),_=l(i,"GetDailyCashPendencies");l(i,"BalanceParts");const h=l(i,"GetDailyCashBalance"),P=l(i,"GetDailyCashBalancePendenciesOrders"),b=l(i,"GetDailyCashDetailedFlow");export{_ as G,F as a,h as b,b as c,P as d};
