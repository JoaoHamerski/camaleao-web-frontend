var m={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"BranchCityParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"City"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"state"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"abbreviation"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"BranchShippingCompanyParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Branch"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"shipping_company"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetBranches"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"branches"},arguments:[{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"ListValue",values:[{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"column"},value:{kind:"EnumValue",value:"CREATED_AT"}},{kind:"ObjectField",name:{kind:"Name",value:"order"},value:{kind:"EnumValue",value:"DESC"}}]}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"BranchShippingCompanyParts"},directives:[]},{kind:"Field",name:{kind:"Name",value:"cities"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"BranchCityParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"city"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"BranchCityParts"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreateBranch"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"BranchInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"branchCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateBranch"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"BranchInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"branchUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"BranchShippingCompanyParts"},directives:[]},{kind:"Field",name:{kind:"Name",value:"cities"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"BranchCityParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"city"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"BranchCityParts"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"DeleteBranch"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"branchDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:803}};m.loc.source={body:`fragment BranchCityParts on City {
  id
  name
  state {
    id
    name
    abbreviation
  }
}

fragment BranchShippingCompanyParts on Branch {
  shipping_company {
    id
    name
  }
}

query GetBranches {
  branches(orderBy: [{ column: CREATED_AT order: DESC }]) {
    id
    ...BranchShippingCompanyParts
    cities {
      ...BranchCityParts
    }
    city {
      ...BranchCityParts
    }
  }
}

mutation CreateBranch ($input: BranchInput!) {
  branchCreate (input: $input) {
    id
  }
}

mutation UpdateBranch ($id: ID! $input: BranchInput!) {
  branchUpdate (id: $id input: $input) {
    id
    ...BranchShippingCompanyParts
    cities {
      ...BranchCityParts
    }
    city {
      ...BranchCityParts
    }
  }
}

mutation DeleteBranch ($id: ID!) {
  branchDelete (id: $id) {
    id
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};function p(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(a){p(a,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(a){p(a,n)}),e.definitions&&e.definitions.forEach(function(a){p(a,n)})}var S={};(function(){m.definitions.forEach(function(n){if(n.name){var i=new Set;p(n,i),S[n.name.value]=i}})})();function f(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function s(e,n){var i={kind:e.kind,definitions:[f(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=S[n]||new Set,l=new Set,d=new Set;for(a.forEach(function(t){d.add(t)});d.size>0;){var k=d;d=new Set,k.forEach(function(t){if(!l.has(t)){l.add(t);var r=S[t]||new Set;r.forEach(function(v){d.add(v)})}})}return l.forEach(function(t){var r=f(e,t);r&&i.definitions.push(r)}),i}s(m,"BranchCityParts");s(m,"BranchShippingCompanyParts");const y=s(m,"GetBranches"),N=s(m,"CreateBranch"),C=s(m,"UpdateBranch"),b=s(m,"DeleteBranch");var o={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ShippingCompanyParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ShippingCompany"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetShippingCompanies"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"shippingCompanies"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ShippingCompanyParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreateShippingCompany"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"name"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"shippingCompanyCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"name"},value:{kind:"Variable",name:{kind:"Name",value:"name"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ShippingCompanyParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateShippingCompany"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"name"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"shippingCompanyUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"name"},value:{kind:"Variable",name:{kind:"Name",value:"name"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ShippingCompanyParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"DeleteShippingCompany"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"shippingCompanyDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ShippingCompanyParts"},directives:[]}]}}]}}],loc:{start:0,end:532}};o.loc.source={body:`fragment ShippingCompanyParts on ShippingCompany {
  id
  name
}

query GetShippingCompanies {
  shippingCompanies {
    ...ShippingCompanyParts
  }
}

mutation CreateShippingCompany ($name: String!) {
  shippingCompanyCreate (name: $name) {
    ...ShippingCompanyParts
  }
}

mutation UpdateShippingCompany ($id: ID! $name: String) {
  shippingCompanyUpdate (id: $id name: $name) {
    ...ShippingCompanyParts
  }
}

mutation DeleteShippingCompany ($id: ID!) {
  shippingCompanyDelete (id: $id) {
    ...ShippingCompanyParts
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};function u(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(a){u(a,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(a){u(a,n)}),e.definitions&&e.definitions.forEach(function(a){u(a,n)})}var h={};(function(){o.definitions.forEach(function(n){if(n.name){var i=new Set;u(n,i),h[n.name.value]=i}})})();function g(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function c(e,n){var i={kind:e.kind,definitions:[g(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=h[n]||new Set,l=new Set,d=new Set;for(a.forEach(function(t){d.add(t)});d.size>0;){var k=d;d=new Set,k.forEach(function(t){if(!l.has(t)){l.add(t);var r=h[t]||new Set;r.forEach(function(v){d.add(v)})}})}return l.forEach(function(t){var r=g(e,t);r&&i.definitions.push(r)}),i}c(o,"ShippingCompanyParts");const D=c(o,"GetShippingCompanies"),F=c(o,"CreateShippingCompany"),B=c(o,"UpdateShippingCompany"),P=c(o,"DeleteShippingCompany");export{N as C,b as D,y as G,C as U,B as a,P as b,F as c,D as d};
