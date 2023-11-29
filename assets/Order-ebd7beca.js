import{d as g}from"./_PaginatorFragment-c01a3fe7.js";import{d as S}from"./ActivityFragments-a3df58d3.js";var e={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OrderParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"original_price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"states"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"discount"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"shipping_value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"has_sponsor"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_paid"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_paid_sponsor"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_paid_non_sponsor"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_clothings_value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"delivery_date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"closed_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"art_paths"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"size_paths"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"payment_voucher_paths"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"has_order_control"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"final_status"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"reminder"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"has_individual_names"},arguments:[],directives:[]}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"OrderSimplifiedParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_paid"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"delivery_date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"states"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"OrderClientShippingCompanyParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Client"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"shipping_company"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"OrderClientBranchParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Client"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"branch"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"city"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"OrderClientCityParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Client"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"city"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"state"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"abbreviation"},arguments:[],directives:[]}]}}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"OrderClientParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"phone"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"balance"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"has_balance"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_owing_as_sponsorship"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_sponsor"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"client_recommended"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"phone"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"bonus"},arguments:[],directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"OrderClientBranchParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"OrderClientCityParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"OrderClientShippingCompanyParts"},directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"OrderLinkedStatus"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"linked_status"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"sector"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"pivot"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"confirmed_at"},arguments:[],directives:[]}]}}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"StatusParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"status"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_available"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"ClothingTypesParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"clothing_types"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"key"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_hidden"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"total_value"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"GarmentsParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"garments"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"match"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"model"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"material"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"neck_type"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"sleeve_type"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"sizes"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"pivot"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"InlineFragment",typeCondition:{kind:"NamedType",name:{kind:"Name",value:"GarmentGarmentSize"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]}]}}]}}]}},{kind:"Field",name:{kind:"Name",value:"individual_names"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"number"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"size"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"size_id"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"sizes_value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value_per_unit"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"PaymentsPart"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"payments"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"note"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"confirmed_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_confirmed"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_sponsor"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_shipping"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_bonus"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"clientBalances"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"sponsorship_client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"total_owing"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"via"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"NotesParts"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"notes"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"text"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]}]}}]}},{kind:"FragmentDefinition",name:{kind:"Name",value:"OrderType"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Order"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrderParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"OrderClientParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"StatusParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ClothingTypesParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"PaymentsPart"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"NotesParts"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"OrderLinkedStatus"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"GarmentsParts"},directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetOrdersSimplified"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"page"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"hasClient"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryOrdersHasClientWhereHasConditions"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"hasPayments"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryOrdersHasPaymentsWhereHasConditions"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"QueryOrdersOrderByOrderByClause"}}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryOrdersWhereWhereConditions"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orders"},arguments:[{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"IntValue",value:"10"}},{kind:"Argument",name:{kind:"Name",value:"page"},value:{kind:"Variable",name:{kind:"Name",value:"page"}}},{kind:"Argument",name:{kind:"Name",value:"hasClient"},value:{kind:"Variable",name:{kind:"Name",value:"hasClient"}}},{kind:"Argument",name:{kind:"Name",value:"hasPayments"},value:{kind:"Variable",name:{kind:"Name",value:"hasPayments"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}},{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paginatorInfo"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PaginatorSimpleParts"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrderSimplifiedParts"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetOrder"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"client_id"}},type:{kind:"NamedType",name:{kind:"Name",value:"ID"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"order"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"client_id"},value:{kind:"Variable",name:{kind:"Name",value:"client_id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrderType"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetOrderReport"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orderReport"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetOrdersReport"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrdersReportInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"ordersReport"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetOrdersByPrintDate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrdersReportPrintDateInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"ordersReportPrintDate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetOrdersWeeklyCalendarReport"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrdersWeeklyCalendarReport"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"ordersWeeklyCalendarReport"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetOrderActivities"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"ordersActivities"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"log_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"subject"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrderSubject"},directives:[]},{kind:"FragmentSpread",name:{kind:"Name",value:"ClientSubject"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"causer"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserCauser"},directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"properties"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetOrderByPaymentUid"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"where"}},type:{kind:"NamedType",name:{kind:"Name",value:"QueryPaymentWhereWhereConditions"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"payment"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"Variable",name:{kind:"Name",value:"where"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"order"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"client"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"GetOrderSizesReportUrl"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrdersSizesReportInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"ordersSizesReport"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateOrder"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrderInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orderUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrderType"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"UpdateOrderStatus"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"status_id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"override_option"}},type:{kind:"NamedType",name:{kind:"Name",value:"OrderUpdateStatusOverrideOptions"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orderUpdateStatus"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"status_id"},value:{kind:"Variable",name:{kind:"Name",value:"status_id"}}},{kind:"Argument",name:{kind:"Name",value:"override_option"},value:{kind:"Variable",name:{kind:"Name",value:"override_option"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrderType"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"ToggleOrder"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orderToggle"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrderType"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"DeleteOrder"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orderDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrderType"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreateOrder"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"client_id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrderInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"orderCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"client_id"},value:{kind:"Variable",name:{kind:"Name",value:"client_id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrderType"},directives:[]}]}}]}}],loc:{start:0,end:5136}};e.loc.source={body:`#import "./_PaginatorFragment.gql"
#import "./ActivityFragments.gql"

fragment OrderParts on Order {
  id
  code
  name
  price
  original_price
  states
  discount
  shipping_value
  quantity
  has_sponsor
  total_paid
  total_paid_sponsor
  total_paid_non_sponsor
  total_owing
  total_clothings_value
  delivery_date
  created_at
  closed_at
  art_paths
  size_paths
  payment_voucher_paths
  has_order_control
  final_status
  reminder
  has_individual_names
}

fragment OrderSimplifiedParts on Order {
  id
  code
  quantity
  price
  total_paid
  delivery_date
  states
  total_owing
  client {
    id
    name
  }
}

fragment OrderClientShippingCompanyParts on Client {
  shipping_company {
    id
    name
  }
}

fragment OrderClientBranchParts on Client {
  branch {
    id
    city {
      id
      name
    }
  }
}

fragment OrderClientCityParts on Client {
  city {
    id
    name
    state {
      id
      name
      abbreviation
    }
  }
}

fragment OrderClientParts on Order {
  client {
    id
    name
    phone
    balance
    has_balance
    total_owing
    total_owing_as_sponsorship
    is_sponsor
    client_recommended {
      id
      name
      phone
    }
    bonus
    ...OrderClientBranchParts
    ...OrderClientCityParts
    ...OrderClientShippingCompanyParts
  }
}

fragment OrderLinkedStatus on Order {
  linked_status {
    id
    text
    order
    sector {
      id
      name
    }

    pivot {
      user {
        id
        name
      }
      is_confirmed
      confirmed_at
    }
  }
}

fragment StatusParts on Order {
  status {
    id
    text
    order
    is_available
  }
}

fragment ClothingTypesParts on Order {
  clothing_types {
    id
    key
    name
    is_hidden
    quantity
    value
    total_value
  }
}

fragment GarmentsParts on Order {
  garments {
    id
    match {
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
    }

    sizes {
      id
      name
      pivot {
        ... on GarmentGarmentSize {
          id
          quantity
          value
        }
      }
    }

    individual_names {
      id
      name
      number
      size
      size_id
    }

    quantity
    value
    sizes_value
    value_per_unit
  }
}

fragment PaymentsPart on Order {
  payments {
    id
    value
    date
    note
    confirmed_at
    is_confirmed
    created_at
    is_sponsor
    is_shipping
    is_bonus

    clientBalances {
      id
      value
    }

    sponsorship_client {
      id
      name
    }

    order {
      total_owing
    }

    via {
      id
      name
    }
  }
}

fragment NotesParts on Order {
  notes {
    id
    text
    created_at
  }
}

fragment OrderType on Order {
  ...OrderParts
  ...OrderClientParts
  ...StatusParts
  ...ClothingTypesParts
  ...PaymentsPart
  ...NotesParts
  ...OrderLinkedStatus
  ...GarmentsParts
}

query GetOrdersSimplified(
  $page: Int
  $hasClient: QueryOrdersHasClientWhereHasConditions
  $hasPayments: QueryOrdersHasPaymentsWhereHasConditions
  $orderBy: [QueryOrdersOrderByOrderByClause!]
  $where: QueryOrdersWhereWhereConditions
) {
  orders(
    first: 10
    page: $page
    hasClient: $hasClient
    hasPayments: $hasPayments
    orderBy: $orderBy
    where: $where
  ) {
    paginatorInfo {
      ...PaginatorSimpleParts
    }

    data {
      ...OrderSimplifiedParts
    }
  }
}

query GetOrder($id: ID!, $client_id: ID) {
  order(id: $id, client_id: $client_id) {
    ...OrderType
  }
}

query GetOrderReport($id: ID!) {
  orderReport(id: $id)
}

query GetOrdersReport($input: OrdersReportInput!) {
  ordersReport(input: $input)
}

query GetOrdersByPrintDate($input: OrdersReportPrintDateInput!) {
  ordersReportPrintDate(input: $input)
}

query GetOrdersWeeklyCalendarReport($input: OrdersWeeklyCalendarReport!) {
  ordersWeeklyCalendarReport(input: $input)
}

query GetOrderActivities($id: ID!) {
  ordersActivities(id: $id) {
    id
    log_name
    description
    subject {
      ...OrderSubject
      ...ClientSubject
    }
    causer {
      ...UserCauser
    }
    properties
    created_at
  }
}

query GetOrderByPaymentUid($where: QueryPaymentWhereWhereConditions) {
  payment(where: $where) {
    id
    order {
      id
      client {
        id
      }
    }
  }
}

query GetOrderSizesReportUrl($input: OrdersSizesReportInput!) {
  ordersSizesReport(input: $input)
}

mutation UpdateOrder($id: ID!, $input: OrderInput!) {
  orderUpdate(id: $id, input: $input) {
    ...OrderType
  }
}

mutation UpdateOrderStatus(
  $id: ID!
  $status_id: ID!
  $override_option: OrderUpdateStatusOverrideOptions
) {
  orderUpdateStatus(
    id: $id
    status_id: $status_id
    override_option: $override_option
  ) {
    ...OrderType
  }
}

mutation ToggleOrder($id: ID!) {
  orderToggle(id: $id) {
    ...OrderType
  }
}

mutation DeleteOrder($id: ID!) {
  orderDelete(id: $id) {
    ...OrderType
  }
}

mutation CreateOrder($client_id: ID!, $input: OrderInput!) {
  orderCreate(client_id: $client_id, input: $input) {
    ...OrderType
  }
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var v={};function c(i){return i.filter(function(a){if(a.kind!=="FragmentDefinition")return!0;var d=a.name.value;return v[d]?!1:(v[d]=!0,!0)})}e.definitions=e.definitions.concat(c(g.definitions));e.definitions=e.definitions.concat(c(S.definitions));function s(i,a){if(i.kind==="FragmentSpread")a.add(i.name.value);else if(i.kind==="VariableDefinition"){var d=i.type;d.kind==="NamedType"&&a.add(d.name.value)}i.selectionSet&&i.selectionSet.selections.forEach(function(t){s(t,a)}),i.variableDefinitions&&i.variableDefinitions.forEach(function(t){s(t,a)}),i.definitions&&i.definitions.forEach(function(t){s(t,a)})}var u={};(function(){e.definitions.forEach(function(a){if(a.name){var d=new Set;s(a,d),u[a.name.value]=d}})})();function o(i,a){for(var d=0;d<i.definitions.length;d++){var t=i.definitions[d];if(t.name&&t.name.value==a)return t}}function n(i,a){var d={kind:i.kind,definitions:[o(i,a)]};i.hasOwnProperty("loc")&&(d.loc=i.loc);var t=u[a]||new Set,k=new Set,l=new Set;for(t.forEach(function(r){l.add(r)});l.size>0;){var p=l;l=new Set,p.forEach(function(r){if(!k.has(r)){k.add(r);var m=u[r]||new Set;m.forEach(function(N){l.add(N)})}})}return k.forEach(function(r){var m=o(i,r);m&&d.definitions.push(m)}),d}n(e,"OrderParts");n(e,"OrderSimplifiedParts");n(e,"OrderClientShippingCompanyParts");n(e,"OrderClientBranchParts");n(e,"OrderClientCityParts");n(e,"OrderClientParts");n(e,"OrderLinkedStatus");n(e,"StatusParts");n(e,"ClothingTypesParts");n(e,"GarmentsParts");n(e,"PaymentsPart");n(e,"NotesParts");n(e,"OrderType");const O=n(e,"GetOrdersSimplified"),f=n(e,"GetOrder"),_=n(e,"GetOrderReport"),b=n(e,"GetOrdersReport");n(e,"GetOrdersByPrintDate");const h=n(e,"GetOrdersWeeklyCalendarReport"),D=n(e,"GetOrderActivities"),C=n(e,"GetOrderByPaymentUid"),P=n(e,"GetOrderSizesReportUrl"),T=n(e,"UpdateOrder"),V=n(e,"UpdateOrderStatus"),$=n(e,"ToggleOrder"),G=n(e,"DeleteOrder"),R=n(e,"CreateOrder");export{R as C,G as D,C as G,$ as T,V as U,b as a,P as b,O as c,f as d,D as e,_ as f,T as g,h};
