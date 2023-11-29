var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetWeeklyCalendarOrders"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"date"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"field"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"QueryFromDateColumns"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"weeklyCalendar"},arguments:[{kind:"Argument",name:{kind:"Name",value:"date"},value:{kind:"Variable",name:{kind:"Name",value:"date"}}},{kind:"Argument",name:{kind:"Name",value:"field"},value:{kind:"Variable",name:{kind:"Name",value:"field"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"orders"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"states"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"art_paths"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"reminder"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_concluded"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"can_be_concluded"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"status"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_available"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreatePreRegisteredOrder"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrderPreRegisteredInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orderCreatePreRegistered"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"ConcludeOrderStatus"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"field"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"QueryFromDateColumns"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orderConcludeStatus"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"field"},value:{kind:"Variable",name:{kind:"Name",value:"field"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"is_concluded"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"can_be_concluded"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"status"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_available"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateConcludeStatusFromWeeklyCalendar"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrderDatesFieldsConcludeStatus"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"statusUpdateConcludeWeeklyCalendar"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateUpdatableStatusFromWeeklyCalendar"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrderDatesFieldsUpdatableStatus"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"statusUpdateUpdatableWeeklyCalendar"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"ReorderWeeklyCalendar"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"ListType",type:{kind:"NamedType",name:{kind:"Name",value:"ReorderWeeklyCalendarOrdersInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"weeklyCalendarReorder"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:1264}};t.loc.source={body:`
query GetWeeklyCalendarOrders ($date: String! $field: QueryFromDateColumns!) {
  weeklyCalendar (date: $date field: $field) {
    date
    total_quantity
    orders {
      id
      code
      price
      quantity
      total_owing
      states
      art_paths
      created_at
      reminder
      is_concluded
      can_be_concluded
      order

      status {
        id
        text
        is_available
      }

      client {
        id
        name
      }
    }
  }
}

mutation CreatePreRegisteredOrder ($input: OrderPreRegisteredInput!) {
  orderCreatePreRegistered (input: $input) {
    id
  }
}

mutation ConcludeOrderStatus ($id: ID! $field: QueryFromDateColumns!) {
  orderConcludeStatus (id: $id field: $field) {
    is_concluded
    can_be_concluded

    status {
      id
      text
      is_available
    }
  }
}

mutation UpdateConcludeStatusFromWeeklyCalendar ($input: OrderDatesFieldsConcludeStatus!) {
  statusUpdateConcludeWeeklyCalendar (input: $input)
}

mutation UpdateUpdatableStatusFromWeeklyCalendar ($input: OrderDatesFieldsUpdatableStatus!) {
  statusUpdateUpdatableWeeklyCalendar (input: $input)
}

mutation ReorderWeeklyCalendar ($input: [ReorderWeeklyCalendarOrdersInput]) {
  weeklyCalendarReorder (input: $input) {
    id
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};function s(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(a){s(a,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(a){s(a,n)}),e.definitions&&e.definitions.forEach(function(a){s(a,n)})}var k={};(function(){t.definitions.forEach(function(n){if(n.name){var i=new Set;s(n,i),k[n.name.value]=i}})})();function o(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function l(e,n){var i={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=k[n]||new Set,m=new Set,r=new Set;for(a.forEach(function(d){r.add(d)});r.size>0;){var c=r;r=new Set,c.forEach(function(d){if(!m.has(d)){m.add(d);var u=k[d]||new Set;u.forEach(function(v){r.add(v)})}})}return m.forEach(function(d){var u=o(e,d);u&&i.definitions.push(u)}),i}const p=l(t,"GetWeeklyCalendarOrders"),N=l(t,"CreatePreRegisteredOrder"),f=l(t,"ConcludeOrderStatus"),y=l(t,"UpdateConcludeStatusFromWeeklyCalendar"),S=l(t,"UpdateUpdatableStatusFromWeeklyCalendar"),b=l(t,"ReorderWeeklyCalendar");export{f as C,p as G,b as R,y as U,S as a,N as b};
