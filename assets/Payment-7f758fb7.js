import{d as N}from"./_PaginatorFragment-c01a3fe7.js";var a={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentsParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Payment"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"note"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"confirmed_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_bonus"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentsViaParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Via"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentsOrderParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_paid"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"states"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"payment_voucher_paths"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_paid_sponsor"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetSponsoredPayments"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"sponsorship_client_id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"payments"},arguments:[{kind:"Argument",name:{kind:"Name",value:"sponsorship_client_id"},value:{kind:"Variable",name:{kind:"Name",value:"sponsorship_client_id"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"ListValue",values:[{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"column"},value:{kind:"EnumValue",value:"CREATED_AT"}},{kind:"ObjectField",name:{kind:"Name",value:"order"},value:{kind:"EnumValue",value:"DESC"}}]}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_paid"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetPaymentsPendencies"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paymentsPendencies"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"created_at_payment"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreatePayment"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"PaymentInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paymentCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsOrderParts"},directives:[]},{kind:"Field",name:{kind:"Name",value:"payments"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsParts"},directives:[]},{kind:"Field",name:{kind:"Name",value:"via"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsViaParts"},directives:[]}]}}]}}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdatePayment"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"PaymentInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paymentUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsParts"},directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsOrderParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"via"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsViaParts"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"DeletePayment"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"password"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paymentDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"password"},value:{kind:"Variable",name:{kind:"Name",value:"password"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"AssignPaymentConfirmation"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"confirmation"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paymentAssignConfirmation"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"confirmation"},value:{kind:"Variable",name:{kind:"Name",value:"confirmation"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsOrderParts"},directives:[]},{kind:"Field",name:{kind:"Name",value:"payments"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsParts"},directives:[]},{kind:"Field",name:{kind:"Name",value:"via"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsViaParts"},directives:[]}]}}]}}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreateDailyPayment"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"DailyCashInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dailyCashEntry"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"InlineFragment",typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Payment"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsParts"},directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsOrderParts"},directives:[]},{kind:"Field",name:{kind:"Name",value:"payments"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsParts"},directives:[]},{kind:"Field",name:{kind:"Name",value:"via"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsViaParts"},directives:[]}]}}]}}]}},{kind:"Field",name:{kind:"Name",value:"via"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsViaParts"},directives:[]}]}}]}},{kind:"InlineFragment",typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Entry"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}]}}],loc:{start:0,end:2315}};a.loc.source={body:`#import "./_PaginatorFragment.gql"

fragment PaymentsParts on Payment {
  id
  value
  date
  note
  confirmed_at
  is_confirmed
  is_bonus
  created_at
}

fragment PaymentsViaParts on Via {
  id
  name
}

fragment PaymentsOrderParts on Order {
  id
  code
  name
  total_owing
  total_paid
  states
  payment_voucher_paths
  total_paid_sponsor

  client {
    id
    name
    total_owing
  }
}

query GetSponsoredPayments(
  $sponsorship_client_id: ID!
  $first: Int!
  $page: Int
) {
  payments(
    sponsorship_client_id: $sponsorship_client_id
    first: $first
    page: $page
    orderBy: [{ column: CREATED_AT, order: DESC }]
  ) {
    paginatorInfo {
      ...PaginatorSimpleParts
    }

    data {
      id
      value
      is_confirmed
      created_at

      order {
        id
        code
        price
        total_paid
        total_owing

        client {
          id
          name
        }
      }
    }
  }
}

query GetPaymentsPendencies {
  paymentsPendencies {
    created_at_payment
    total
  }
}

mutation CreatePayment($input: PaymentInput!) {
  paymentCreate(input: $input) {
    id

    order {
      ...PaymentsOrderParts

      payments {
        ...PaymentsParts

        via {
          ...PaymentsViaParts
        }
      }
    }
  }
}

mutation UpdatePayment($id: ID!, $input: PaymentInput!) {
  paymentUpdate(id: $id, input: $input) {
    ...PaymentsParts

    order {
      ...PaymentsOrderParts
    }

    via {
      ...PaymentsViaParts
    }
  }
}

mutation DeletePayment($id: ID!, $password: String!) {
  paymentDelete(id: $id, password: $password) {
    id
  }
}

mutation AssignPaymentConfirmation($id: ID!, $confirmation: Boolean!) {
  paymentAssignConfirmation(id: $id, confirmation: $confirmation) {
    id
    order {
      ...PaymentsOrderParts

      payments {
        ...PaymentsParts

        via {
          ...PaymentsViaParts
        }
      }
    }
  }
}

mutation CreateDailyPayment($input: DailyCashInput!) {
  dailyCashEntry(input: $input) {
    ... on Payment {
      ...PaymentsParts

      order {
        ...PaymentsOrderParts

        payments {
          ...PaymentsParts

          via {
            ...PaymentsViaParts
          }
        }
      }

      via {
        ...PaymentsViaParts
      }
    }

    ... on Entry {
      id
    }
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var u={};function y(e){return e.filter(function(n){if(n.kind!=="FragmentDefinition")return!0;var i=n.name.value;return u[i]?!1:(u[i]=!0,!0)})}a.definitions=a.definitions.concat(y(N.definitions));function l(e,n){if(e.kind==="FragmentSpread")n.add(e.name.value);else if(e.kind==="VariableDefinition"){var i=e.type;i.kind==="NamedType"&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(t){l(t,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(t){l(t,n)}),e.definitions&&e.definitions.forEach(function(t){l(t,n)})}var k={};(function(){a.definitions.forEach(function(n){if(n.name){var i=new Set;l(n,i),k[n.name.value]=i}})})();function v(e,n){for(var i=0;i<e.definitions.length;i++){var t=e.definitions[i];if(t.name&&t.name.value==n)return t}}function d(e,n){var i={kind:e.kind,definitions:[v(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var t=k[n]||new Set,o=new Set,r=new Set;for(t.forEach(function(m){r.add(m)});r.size>0;){var c=r;r=new Set,c.forEach(function(m){if(!o.has(m)){o.add(m);var s=k[m]||new Set;s.forEach(function(p){r.add(p)})}})}return o.forEach(function(m){var s=v(e,m);s&&i.definitions.push(s)}),i}d(a,"PaymentsParts");d(a,"PaymentsViaParts");d(a,"PaymentsOrderParts");const g=d(a,"GetSponsoredPayments");d(a,"GetPaymentsPendencies");const P=d(a,"CreatePayment"),f=d(a,"UpdatePayment"),F=d(a,"DeletePayment"),b=d(a,"AssignPaymentConfirmation"),D=d(a,"CreateDailyPayment");export{b as A,D as C,F as D,g as G,f as U,P as a};
