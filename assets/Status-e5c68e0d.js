var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetStatus"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"status"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_available"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"sector"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreateStatus"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"StatusInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"statusCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateStatus"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"StatusInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"statusUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_available"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"DeleteStatus"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"StatusDeleteInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"statusDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"SetAvailableStatus"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"ids"}},type:{kind:"ListType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"statusSetAvailable"},arguments:[{kind:"Argument",name:{kind:"Name",value:"ids"},value:{kind:"Variable",name:{kind:"Name",value:"ids"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_available"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"ReorderStatus"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"ListType",type:{kind:"NamedType",name:{kind:"Name",value:"StatusReorderInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"statusReorder"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:681}};t.loc.source={body:`query GetStatus {
  status {
    id
    text
    is_available
    order
    sector {
      id
      name
    }
  }
}

mutation CreateStatus($input: StatusInput!) {
  statusCreate(input: $input) {
    id
  }
}

mutation UpdateStatus($id: ID!, $input: StatusInput!) {
  statusUpdate(id: $id, input: $input) {
    id
    text
    is_available
  }
}

mutation DeleteStatus($id: ID!, $input: StatusDeleteInput!) {
  statusDelete(id: $id, input: $input) {
    id
  }
}

mutation SetAvailableStatus($ids: [ID]) {
  statusSetAvailable(ids: $ids) {
    id
    text
    is_available
  }
}

mutation ReorderStatus($input: [StatusReorderInput]) {
  statusReorder(input: $input) {
    id
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};function r(e,i){if(e.kind==="FragmentSpread")i.add(e.name.value);else if(e.kind==="VariableDefinition"){var n=e.type;n.kind==="NamedType"&&i.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(a){r(a,i)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(a){r(a,i)}),e.definitions&&e.definitions.forEach(function(a){r(a,i)})}var o={};(function(){t.definitions.forEach(function(i){if(i.name){var n=new Set;r(i,n),o[i.name.value]=n}})})();function k(e,i){for(var n=0;n<e.definitions.length;n++){var a=e.definitions[n];if(a.name&&a.name.value==i)return a}}function l(e,i){var n={kind:e.kind,definitions:[k(e,i)]};e.hasOwnProperty("loc")&&(n.loc=e.loc);var a=o[i]||new Set,m=new Set,s=new Set;for(a.forEach(function(d){s.add(d)});s.size>0;){var v=s;s=new Set,v.forEach(function(d){if(!m.has(d)){m.add(d);var u=o[d]||new Set;u.forEach(function(c){s.add(c)})}})}return m.forEach(function(d){var u=k(e,d);u&&n.definitions.push(u)}),n}const S=l(t,"GetStatus"),p=l(t,"CreateStatus"),N=l(t,"UpdateStatus"),f=l(t,"DeleteStatus"),b=l(t,"SetAvailableStatus"),D=l(t,"ReorderStatus");export{p as C,f as D,S as G,D as R,b as S,N as U};
