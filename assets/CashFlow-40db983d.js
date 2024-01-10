import{d as y}from"./_PaginatorFragment-c01a3fe7.js";import{d as h}from"./PaymentExpense-9583d97d.js";var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetCashFlowEntries"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},defaultValue:{kind:"IntValue",value:"10"},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryCashFlowEntriesWhereWhereConditions"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"QueryCashFlowEntriesOrderByOrderByClause"}}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cashFlowEntries"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseBasicParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseProductTypeParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseEmployeeParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseViaParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseTypeParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseOrderParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseUserParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentExpenseSponsorshipClientParts"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetCashFlowBalance"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CashFlowFilterDatesInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cashFlowBalance"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[]}]}}],loc:{start:0,end:805}};t.loc.source={body:`#import "./_PaginatorFragment.gql"
#import "./PaymentExpense.gql"

query GetCashFlowEntries (
  $first: Int = 10
  $page: Int
  $where: QueryCashFlowEntriesWhereWhereConditions
  $orderBy: [QueryCashFlowEntriesOrderByOrderByClause!]
) {
  cashFlowEntries (
    first: $first
    page: $page
    where: $where
    orderBy: $orderBy
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

query GetCashFlowBalance ($input: CashFlowFilterDatesInput!) {
  cashFlowBalance(input: $input)
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var u={};function k(e){return e.filter(function(n){if(n.kind!=="FragmentDefinition")return!0;var a=n.name.value;return u[a]?!1:(u[a]=!0,!0)})}t.definitions=t.definitions.concat(k(y.definitions));t.definitions=t.definitions.concat(k(h.definitions));function l(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var a=e.type;a.kind==="NamedType"&&n.add(a.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(i){l(i,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(i){l(i,n)}),e.definitions&&e.definitions.forEach(function(i){l(i,n)})}var m={};(function(){t.definitions.forEach(function(n){if(n.name){var a=new Set;l(n,a),m[n.name.value]=a}})})();function c(e,n){for(var a=0;a<e.definitions.length;a++){var i=e.definitions[a];if(i.name&&i.name.value==n)return i}}function v(e,n){var a={kind:e.kind,definitions:[c(e,n)]};e.hasOwnProperty("loc")&&(a.loc=e.loc);var i=m[n]||new Set,o=new Set,d=new Set;for(i.forEach(function(r){d.add(r)});d.size>0;){var p=d;d=new Set,p.forEach(function(r){if(!o.has(r)){o.add(r);var s=m[r]||new Set;s.forEach(function(f){d.add(f)})}})}return o.forEach(function(r){var s=c(e,r);s&&a.definitions.push(s)}),a}const E=v(t,"GetCashFlowEntries"),F=v(t,"GetCashFlowBalance");export{E as G,F as a};
