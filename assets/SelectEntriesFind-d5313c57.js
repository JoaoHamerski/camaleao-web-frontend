import{d as N}from"./_PaginatorFragment-c01a3fe7.js";import{n as y,r as k}from"./index-4e05606f.js";var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetEntries"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryEntriesWhereWhereConditions"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"entries"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"bank_uid"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_canceled"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"via_id"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetEntriesMonthlyBalance"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"entriesMonthlyBalance"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"current"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"previous"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetBankMirrorEntriesNavs"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"entriesBankMirrorNavs"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"via"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"count"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetBankMirrorEntries"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryEntriesBankMirrorWhereWhereConditions"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"entriesBankMirror"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"bank_uid"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"via_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_tied"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CancelEntry"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"uid"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"entryCancel"},arguments:[{kind:"Argument",name:{kind:"Name",value:"uid"},value:{kind:"Variable",name:{kind:"Name",value:"uid"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"ConfirmBankMirrorEntry"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"bankMirrorEntryConfirm"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"TieBankMirrorPayment"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"DailyCashInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"bankMirrorTiePayment"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_tied"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"TieBankMirrorExpense"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ExpenseInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"bankMirrorTieExpense"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_tied"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:1356}};t.loc.source={body:`#import ./_PaginatorFragment.gql

query GetEntries(
  $first: Int!
  $page: Int
  $where: QueryEntriesWhereWhereConditions
) {
  entries(first: $first, page: $page, where: $where) {
    data {
      id
      bank_uid
      value
      date
      description
      is_canceled
      via_id
    }
  }
}

query GetEntriesMonthlyBalance {
  entriesMonthlyBalance {
    current
    previous
  }
}

query GetBankMirrorEntriesNavs {
  entriesBankMirrorNavs {
    via {
      id
      name
    }

    count
  }
}

query GetBankMirrorEntries(
  $first: Int!
  $page: Int
  $where: QueryEntriesBankMirrorWhereWhereConditions
) {
  entriesBankMirror(first: $first, page: $page, where: $where) {
    paginatorInfo {
      ...PaginatorSimpleParts
    }

    data {
      id
      bank_uid
      value
      description
      date
      via_id
      is_confirmed
      is_tied
      created_at
    }
  }
}

mutation CancelEntry($uid: ID!) {
  entryCancel(uid: $uid) {
    id
  }
}

mutation ConfirmBankMirrorEntry($id: ID!) {
  bankMirrorEntryConfirm(id: $id) {
    id
    is_confirmed
  }
}

mutation TieBankMirrorPayment($input: DailyCashInput!) {
  bankMirrorTiePayment(input: $input) {
    id
    is_tied
    is_confirmed
  }
}

mutation TieBankMirrorExpense($input: ExpenseInput!) {
  bankMirrorTieExpense(input: $input) {
    id
    is_tied
    is_confirmed
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var v={};function g(n){return n.filter(function(e){if(e.kind!=="FragmentDefinition")return!0;var i=e.name.value;return v[i]?!1:(v[i]=!0,!0)})}t.definitions=t.definitions.concat(g(N.definitions));function m(n,e){if(n.kind==="FragmentSpread")e.add(n.name.value);else if(n.kind==="VariableDefinition"){var i=n.type;i.kind==="NamedType"&&e.add(i.name.value)}n.selectionSet&&n.selectionSet.selections.forEach(function(a){m(a,e)}),n.variableDefinitions&&n.variableDefinitions.forEach(function(a){m(a,e)}),n.definitions&&n.definitions.forEach(function(a){m(a,e)})}var u={};(function(){t.definitions.forEach(function(e){if(e.name){var i=new Set;m(e,i),u[e.name.value]=i}})})();function c(n,e){for(var i=0;i<n.definitions.length;i++){var a=n.definitions[i];if(a.name&&a.name.value==e)return a}}function r(n,e){var i={kind:n.kind,definitions:[c(n,e)]};n.hasOwnProperty("loc")&&(i.loc=n.loc);var a=u[e]||new Set,o=new Set,s=new Set;for(a.forEach(function(d){s.add(d)});s.size>0;){var p=s;s=new Set,p.forEach(function(d){if(!o.has(d)){o.add(d);var l=u[d]||new Set;l.forEach(function(f){s.add(f)})}})}return o.forEach(function(d){var l=c(n,d);l&&i.definitions.push(l)}),i}const S=r(t,"GetEntries"),M=r(t,"GetEntriesMonthlyBalance"),B=r(t,"GetBankMirrorEntriesNavs"),V=r(t,"GetBankMirrorEntries"),T=r(t,"CancelEntry"),C=r(t,"ConfirmBankMirrorEntry"),w=r(t,"TieBankMirrorPayment"),$=r(t,"TieBankMirrorExpense"),b={props:{value:void 0,isExpense:{type:Boolean,default:!1}},data(){return{entries:{items:[],isLoading:!1}}},methods:{async asyncFindEntry(n){if(!n.length){this.entries.items=[];return}this.entries.isLoading=!0;const{data:{entries:{data:e}}}=await this.$apollo.query({query:S,variables:{first:10,where:{AND:[{column:"IS_CANCELED",operator:"EQ",value:0},{column:"VALUE",operator:this.isExpense?"LT":"GT",value:0},{column:"DESCRIPTION",operator:"LIKE",value:`%${n}%`}]}}});this.entries.isLoading=!1,this.entries.items=e},getValue(n){return this.isExpense?k(Math.abs(n)):k(n)}}};var h=function(){var e=this,i=e._self._c;return i("AppSelect",e._g({attrs:{id:"entryPayment",value:e.value,name:"entryPayment",searchable:"","internal-search":!1,options:e.entries.items,loading:e.entries.isLoading,placeholder:"Busque pela descrição...",optional:""},on:{"search-change":e.asyncFindEntry},scopedSlots:e._u([{key:"option",fn:function({props:a}){return[i("div",{staticClass:"small"},[i("div",[i("b",[e._v("Valor")]),e._v(": "+e._s(e.getValue(a.option.value)))]),i("div",[i("b",[e._v("Descrição")]),e._v(": "+e._s(a.option.description))]),i("div",[i("b",[e._v("Data")]),e._v(": "+e._s(a.option.date))])])]}},{key:"hint",fn:function(){return[e._v(" Selecione um pagamento pelas entradas bancárias ")]},proxy:!0}],null,!0)},e.$listeners),[e._v(" Entradas bancárias ")])},E=[],_=y(b,h,E,!1,null,null,null,null);const I=_.exports;export{C,V as G,I as S,w as T,$ as a,B as b,T as c,M as d,S as e};
