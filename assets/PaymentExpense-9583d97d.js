var t={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentExpenseBasicParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PaymentExpense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"note"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"confirmed_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_expense"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"receipt_path"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"employee_name"},arguments:[],directives:[]}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentExpenseSponsorshipClientParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PaymentExpense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"sponsorship_client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentExpenseProductTypeParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PaymentExpense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"product_type"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentExpenseEmployeeParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PaymentExpense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"employee"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentExpenseViaParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PaymentExpense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"via"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentExpenseTypeParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PaymentExpense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"type"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentExpenseOrderParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PaymentExpense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"payment_voucher_paths"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentExpenseUserParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PaymentExpense"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:894}};t.loc.source={body:`fragment PaymentExpenseBasicParts on PaymentExpense {
  id
  value
  description
  note
  confirmed_at
  is_confirmed
  created_at
  is_expense
  receipt_path
  date
  employee_name
}

fragment PaymentExpenseSponsorshipClientParts on PaymentExpense {
  sponsorship_client {
    id
    name
  }
}

fragment PaymentExpenseProductTypeParts on PaymentExpense {
  product_type {
    id
    name
  }
}

fragment PaymentExpenseEmployeeParts on PaymentExpense {
  employee {
    id
    name
  }
}

fragment PaymentExpenseViaParts on PaymentExpense {
  via {
    id
    name
  }
}

fragment PaymentExpenseTypeParts on PaymentExpense {
  type {
    id
    name
  }
}

fragment PaymentExpenseOrderParts on PaymentExpense {
  order {
    id
    code
    payment_voucher_paths
    client {
      id
      name
    }
  }
}

fragment PaymentExpenseUserParts on PaymentExpense {
  user {
    id
    name
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};function l(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(a){l(a,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(a){l(a,n)}),e.definitions&&e.definitions.forEach(function(a){l(a,n)})}var c={};(function(){t.definitions.forEach(function(n){if(n.name){var i=new Set;l(n,i),c[n.name.value]=i}})})();function k(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function d(e,n){var i={kind:e.kind,definitions:[k(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=c[n]||new Set,o=new Set,m=new Set;for(a.forEach(function(s){m.add(s)});m.size>0;){var u=m;m=new Set,u.forEach(function(s){if(!o.has(s)){o.add(s);var r=c[s]||new Set;r.forEach(function(v){m.add(v)})}})}return o.forEach(function(s){var r=k(e,s);r&&i.definitions.push(r)}),i}d(t,"PaymentExpenseBasicParts");d(t,"PaymentExpenseSponsorshipClientParts");d(t,"PaymentExpenseProductTypeParts");d(t,"PaymentExpenseEmployeeParts");d(t,"PaymentExpenseViaParts");d(t,"PaymentExpenseTypeParts");d(t,"PaymentExpenseOrderParts");d(t,"PaymentExpenseUserParts");export{t as d};
