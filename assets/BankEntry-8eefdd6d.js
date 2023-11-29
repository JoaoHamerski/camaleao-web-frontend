import{d as p}from"./_PaginatorFragment-c01a3fe7.js";var d={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetBankEntries"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"bankEntries"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"filename"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"LoadBankEntry"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"bankEntryLoad"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UploadBankEntry"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"BankEntryInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"bankEntryUpload"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"filename"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:427}};d.loc.source={body:`#import "./_PaginatorFragment.gql"

query GetBankEntries ($first: Int! $page: Int) {
  bankEntries(first: $first page: $page) {
    paginatorInfo {
      ...PaginatorSimpleParts
    }

    data {
      id
      filename
      created_at
    }
  }
}

query LoadBankEntry ($id: ID!) {
  bankEntryLoad (id: $id)
}

mutation UploadBankEntry ($input: BankEntryInput!) {
  bankEntryUpload (input: $input) {
    id
    filename
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var u={};function N(e){return e.filter(function(n){if(n.kind!=="FragmentDefinition")return!0;var i=n.name.value;return u[i]?!1:(u[i]=!0,!0)})}d.definitions=d.definitions.concat(N(p.definitions));function o(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(a){o(a,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(a){o(a,n)}),e.definitions&&e.definitions.forEach(function(a){o(a,n)})}var m={};(function(){d.definitions.forEach(function(n){if(n.name){var i=new Set;o(n,i),m[n.name.value]=i}})})();function c(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function k(e,n){var i={kind:e.kind,definitions:[c(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=m[n]||new Set,s=new Set,r=new Set;for(a.forEach(function(t){r.add(t)});r.size>0;){var v=r;r=new Set,v.forEach(function(t){if(!s.has(t)){s.add(t);var l=m[t]||new Set;l.forEach(function(f){r.add(f)})}})}return s.forEach(function(t){var l=c(e,t);l&&i.definitions.push(l)}),i}const S=k(d,"GetBankEntries"),g=k(d,"LoadBankEntry"),b=k(d,"UploadBankEntry");export{S as G,g as L,b as U};
