var r={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserCauser"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"User"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"role"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"OrderSubject"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"ClientSubject"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Client"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}],loc:{start:0,end:179}};r.loc.source={body:`fragment UserCauser on User {
  id
  name
  role {
    id
    name
  }
}

fragment OrderSubject on Order {
  id
  client {
    id
  }
}

fragment ClientSubject on Client {
  id
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};function c(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(t){c(t,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(t){c(t,n)}),e.definitions&&e.definitions.forEach(function(t){c(t,n)})}var s={};(function(){r.definitions.forEach(function(n){if(n.name){var i=new Set;c(n,i),s[n.name.value]=i}})})();function u(e,n){for(var i=0;i<e.definitions.length;i++){var t=e.definitions[i];if(t.name&&t.name.value==n)return t}}function m(e,n){var i={kind:e.kind,definitions:[u(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var t=s[n]||new Set,o=new Set,d=new Set;for(t.forEach(function(a){d.add(a)});d.size>0;){var f=d;d=new Set,f.forEach(function(a){if(!o.has(a)){o.add(a);var l=s[a]||new Set;l.forEach(function(v){d.add(v)})}})}return o.forEach(function(a){var l=u(e,a);l&&i.definitions.push(l)}),i}m(r,"UserCauser");m(r,"OrderSubject");m(r,"ClientSubject");export{r as d};
