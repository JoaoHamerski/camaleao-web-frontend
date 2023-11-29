var d={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"GarmentMatchParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"GarmentMatch"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"model"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"material"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"neck_type"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"sleeve_type"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"neck_type"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"values"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"start"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"end"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"sizes"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"pivot"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"InlineFragment",typeCondition:{kind:"NamedType",name:{kind:"Name",value:"GarmentMatchGarmentSize"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]}]}}]}}]}},{kind:"Field",name:{kind:"Name",value:"unique_value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"deleted_at"},arguments:[],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetGarmentMatches"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"order_id"}},type:{kind:"NamedType",name:{kind:"Name",value:"ID"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"garmentMatches"},arguments:[{kind:"Argument",name:{kind:"Name",value:"order_id"},value:{kind:"Variable",name:{kind:"Name",value:"order_id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"GarmentMatchParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreateGarmentMatch"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NamedType",name:{kind:"Name",value:"GarmentMatchInput"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"garmentMatchCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"GarmentMatchParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateGarmentMatch"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NamedType",name:{kind:"Name",value:"GarmentMatchInput"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"garmentMatchUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"GarmentMatchParts"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"DeleteGarmentMatch"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"garmentMatchDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:896}};d.loc.source={body:`fragment GarmentMatchParts on GarmentMatch {
  id
  model {
    id
    name
  }

  material {
    id
    name
  }

  neck_type {
    id
    name
  }

  sleeve_type {
    id
    name
  }

  neck_type {
    id
    name
  }

  values {
    id
    value
    start
    end
  }

  sizes {
    id
    name
    pivot {
      ... on GarmentMatchGarmentSize {
        id
        value
      }
    }
  }

  unique_value
  deleted_at
}

query GetGarmentMatches($order_id: ID) {
  garmentMatches(order_id: $order_id) {
    ...GarmentMatchParts
  }
}

mutation CreateGarmentMatch($input: GarmentMatchInput) {
  garmentMatchCreate(input: $input) {
    ...GarmentMatchParts
  }
}

mutation UpdateGarmentMatch($id: ID!, $input: GarmentMatchInput) {
  garmentMatchUpdate(id: $id, input: $input) {
    ...GarmentMatchParts
  }
}

mutation DeleteGarmentMatch($id: ID!) {
  garmentMatchDelete(id: $id) {
    id
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};function s(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(a){s(a,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(a){s(a,n)}),e.definitions&&e.definitions.forEach(function(a){s(a,n)})}var u={};(function(){d.definitions.forEach(function(n){if(n.name){var i=new Set;s(n,i),u[n.name.value]=i}})})();function k(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function r(e,n){var i={kind:e.kind,definitions:[k(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=u[n]||new Set,c=new Set,m=new Set;for(a.forEach(function(t){m.add(t)});m.size>0;){var v=m;m=new Set,v.forEach(function(t){if(!c.has(t)){c.add(t);var l=u[t]||new Set;l.forEach(function(o){m.add(o)})}})}return c.forEach(function(t){var l=k(e,t);l&&i.definitions.push(l)}),i}r(d,"GarmentMatchParts");const N=r(d,"GetGarmentMatches"),S=r(d,"CreateGarmentMatch"),p=r(d,"UpdateGarmentMatch"),f=r(d,"DeleteGarmentMatch");export{S as C,f as D,N as G,p as U};
