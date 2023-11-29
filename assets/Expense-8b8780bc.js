import{d as N}from"./_PaginatorFragment-c01a3fe7.js";var n={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ExpenseParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Expense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"receipt_path"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"confirmed_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"employee"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"product_type"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"ExpenseUserSimpleParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Expense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"role"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"ExpenseTypeSimpleParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Expense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"type"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"ExpenseViaSimpleParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Expense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"via"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetExpenses"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"descriptionLike"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"expenses"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"IntValue",value:"10"}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"descriptionLike"},value:{kind:"Variable",name:{kind:"Name",value:"descriptionLike"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"ListValue",values:[{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"column"},value:{kind:"EnumValue",value:"CREATED_AT"}},{kind:"ObjectField",name:{kind:"Name",value:"order"},value:{kind:"EnumValue",value:"DESC"}}]}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseUserSimpleParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseTypeSimpleParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseViaSimpleParts"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetExpensesReportUrl"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"start_date"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"final_date"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"expensesReport"},arguments:[{kind:"Argument",name:{kind:"Name",value:"start_date"},value:{kind:"Variable",name:{kind:"Name",value:"start_date"}}},{kind:"Argument",name:{kind:"Name",value:"final_date"},value:{kind:"Variable",name:{kind:"Name",value:"final_date"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetProductTypeExpensesByMonth"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"date"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"productTypesExpensesByMonth"},arguments:[{kind:"Argument",name:{kind:"Name",value:"date"},value:{kind:"Variable",name:{kind:"Name",value:"date"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"subtypes"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"expense"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetEmployeeExpensesByMonth"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"date"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"employeeExpensesByMonth"},arguments:[{kind:"Argument",name:{kind:"Name",value:"date"},value:{kind:"Variable",name:{kind:"Name",value:"date"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"subtypes"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"expense"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreateExpense"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ExpenseInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"expenseCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseUserSimpleParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseTypeSimpleParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseViaSimpleParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateExpense"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ExpenseInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"expenseUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseUserSimpleParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseTypeSimpleParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseViaSimpleParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"DeleteExpense"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"password"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"expenseDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"password"},value:{kind:"Variable",name:{kind:"Name",value:"password"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"AssignExpenseConfirmation"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"confirmation"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"expenseAssignConfirmation"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"confirmation"},value:{kind:"Variable",name:{kind:"Name",value:"confirmation"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseUserSimpleParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseTypeSimpleParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ExpenseViaSimpleParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"ChangeProductTypesExpenseField"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"changeProductTypesExpenseField"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"ChangeEmployeeExpenseField"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"changeEmployeeExpenseField"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:2366}};n.loc.source={body:`#import "./_PaginatorFragment.gql"

fragment ExpenseParts on Expense {
  id
  value
  date
  description
  receipt_path
  is_confirmed
  confirmed_at
  created_at

  employee {
    id
    name
  }
  product_type {
    id
    name
  }
}

fragment ExpenseUserSimpleParts on Expense {
  user {
    name
    role {
      name
    }
  }
}

fragment ExpenseTypeSimpleParts on Expense {
  type {
    id
    name
  }
}

fragment ExpenseViaSimpleParts on Expense {
  via {
    id
    name
  }
}

query GetExpenses (
  $page: Int
  $descriptionLike: String
) {
  expenses (
    first: 10
    page: $page
    descriptionLike: $descriptionLike
    orderBy: [{column: CREATED_AT order: DESC}]
  ) {
    paginatorInfo {
      ...PaginatorSimpleParts
    }

    data {
      ...ExpenseParts
      ...ExpenseUserSimpleParts
      ...ExpenseTypeSimpleParts
      ...ExpenseViaSimpleParts
    }
  }
}

query GetExpensesReportUrl ($start_date: String! $final_date: String) {
  expensesReport(start_date: $start_date final_date: $final_date)
}

query GetProductTypeExpensesByMonth ($date: String!) {
  productTypesExpensesByMonth (date: $date) {
    total
    subtypes {
      name
      expense
    }
  }
}

query GetEmployeeExpensesByMonth ($date: String!) {
  employeeExpensesByMonth (date: $date) {
    total
    subtypes {
      name
      expense
    }
  }
}

mutation CreateExpense ($input: ExpenseInput!) {
  expenseCreate (input: $input) {
    ...ExpenseParts
    ...ExpenseUserSimpleParts
    ...ExpenseTypeSimpleParts
    ...ExpenseViaSimpleParts
  }
}

mutation UpdateExpense ($id: ID! $input: ExpenseInput!) {
  expenseUpdate(id: $id input: $input) {
    ...ExpenseParts
    ...ExpenseUserSimpleParts
    ...ExpenseTypeSimpleParts
    ...ExpenseViaSimpleParts
  }
}

mutation DeleteExpense ($id: ID! $password: String!) {
  expenseDelete (id: $id password: $password) {
    id
  }
}

mutation AssignExpenseConfirmation ($id: ID! $confirmation: Boolean!) {
  expenseAssignConfirmation (id: $id confirmation: $confirmation) {
    ...ExpenseParts
    ...ExpenseUserSimpleParts
    ...ExpenseTypeSimpleParts
    ...ExpenseViaSimpleParts
  }
}

mutation ChangeProductTypesExpenseField ($id: ID!) {
  changeProductTypesExpenseField (id: $id) {
    id
    name
  }
}

mutation ChangeEmployeeExpenseField ($id: ID!) {
  changeEmployeeExpenseField (id: $id) {
    id
    name
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var p={};function S(e){return e.filter(function(i){if(i.kind!=="FragmentDefinition")return!0;var a=i.name.value;return p[a]?!1:(p[a]=!0,!0)})}n.definitions=n.definitions.concat(S(N.definitions));function r(e,i){if(e.kind==="FragmentSpread")i.add(e.name.value);else if(e.kind==="VariableDefinition"){var a=e.type;a.kind==="NamedType"&&i.add(a.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(d){r(d,i)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(d){r(d,i)}),e.definitions&&e.definitions.forEach(function(d){r(d,i)})}var k={};(function(){n.definitions.forEach(function(i){if(i.name){var a=new Set;r(i,a),k[i.name.value]=a}})})();function u(e,i){for(var a=0;a<e.definitions.length;a++){var d=e.definitions[a];if(d.name&&d.name.value==i)return d}}function t(e,i){var a={kind:e.kind,definitions:[u(e,i)]};e.hasOwnProperty("loc")&&(a.loc=e.loc);var d=k[i]||new Set,o=new Set,l=new Set;for(d.forEach(function(s){l.add(s)});l.size>0;){var v=l;l=new Set,v.forEach(function(s){if(!o.has(s)){o.add(s);var m=k[s]||new Set;m.forEach(function(c){l.add(c)})}})}return o.forEach(function(s){var m=u(e,s);m&&a.definitions.push(m)}),a}t(n,"ExpenseParts");t(n,"ExpenseUserSimpleParts");t(n,"ExpenseTypeSimpleParts");t(n,"ExpenseViaSimpleParts");const y=t(n,"GetExpenses"),E=t(n,"GetExpensesReportUrl"),f=t(n,"GetProductTypeExpensesByMonth"),x=t(n,"GetEmployeeExpensesByMonth"),F=t(n,"CreateExpense"),b=t(n,"UpdateExpense"),D=t(n,"DeleteExpense"),V=t(n,"AssignExpenseConfirmation"),P=t(n,"ChangeProductTypesExpenseField"),T=t(n,"ChangeEmployeeExpenseField");export{V as A,F as C,D,E as G,b as U,y as a,f as b,x as c,T as d,P as e};
