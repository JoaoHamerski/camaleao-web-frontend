var d={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"User"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"User"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"email"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"role"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetUsers"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"users"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"UserInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"EditUser"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"UserEditInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userEdit"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"auth_password"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"auth_password"},value:{kind:"Variable",name:{kind:"Name",value:"auth_password"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"},directives:[]}]}}]}}],loc:{start:0,end:463}};d.loc.source={body:`fragment User on User {
  id
  name
  email
  created_at
  role {
    id
    name
  }
}

query GetUsers {
  users {
    ...User
  }
}

mutation userCreate($input: UserInput!) {
  userCreate(input: $input) {
    ...User
  }
}

mutation EditUser ($id: ID! $input: UserEditInput!) {
  userEdit(id: $id input: $input) {
    ...User
  }
}

mutation userDelete($id: ID! $auth_password: String!) {
  userDelete(id: $id auth_password: $auth_password) {
    ...User
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};function u(e,i){if(e.kind==="FragmentSpread")i.add(e.name.value);else if(e.kind==="VariableDefinition"){var n=e.type;n.kind==="NamedType"&&i.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(a){u(a,i)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(a){u(a,i)}),e.definitions&&e.definitions.forEach(function(a){u(a,i)})}var o={};(function(){d.definitions.forEach(function(i){if(i.name){var n=new Set;u(i,n),o[i.name.value]=n}})})();function k(e,i){for(var n=0;n<e.definitions.length;n++){var a=e.definitions[n];if(a.name&&a.name.value==i)return a}}function s(e,i){var n={kind:e.kind,definitions:[k(e,i)]};e.hasOwnProperty("loc")&&(n.loc=e.loc);var a=o[i]||new Set,m=new Set,r=new Set;for(a.forEach(function(t){r.add(t)});r.size>0;){var v=r;r=new Set,v.forEach(function(t){if(!m.has(t)){m.add(t);var l=o[t]||new Set;l.forEach(function(c){r.add(c)})}})}return m.forEach(function(t){var l=k(e,t);l&&n.definitions.push(l)}),n}s(d,"User");const p=s(d,"GetUsers"),f=s(d,"userCreate"),N=s(d,"EditUser"),S=s(d,"userDelete");export{N as E,p as G,f as a,S as u};
