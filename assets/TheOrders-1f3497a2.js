import{n as i,a0 as c,U as v,b as h,F as p,au as m,m as g,H as C,u as b,a5 as y,$ as E,D as R}from"./index-fae63e1f.js";import{a as S,b as x,c as A}from"./Order-7b0e72c5.js";import{m as L}from"./masks-168ccaff.js";import{G as D}from"./City-ae18d4e9.js";import{G as _}from"./Status-e5c68e0d.js";import{O as $}from"./OrdersQuestionIconTippy-6e13a69f.js";import"./_PaginatorFragment-c01a3fe7.js";import"./ActivityFragments-a3df58d3.js";const u={PRIORITY:{orderBy:[{column:"CREATED_AT",order:"ASC"}],where:{column:"CLOSED_AT",operator:"IS_NULL"}},OLDER:{orderBy:[{column:"CREATED_AT",order:"ASC"}],where:null},NEWER:{orderBy:[{column:"CREATED_AT",order:"DESC"}],where:null},DELIVERY_DATE:{orderBy:[{column:"DELIVERY_DATE",order:"DESC"}],where:{column:"CLOSED_AT",operator:"IS_NULL"}},PRE_REGISTER:{where:{OR:[{column:"QUANTITY",operator:"IS_NULL"},{column:"CLIENT_ID",operator:"IS_NULL"}]}}},I={props:{items:{type:Array,default:()=>[]}},computed:{headers(){return[{text:"Cliente",value:"client.name"},{text:"Cód. pedido",value:"code"},{text:"Quantidade",value:"quantity"},{text:"Valor total",value:"price",format:"currencyBRL"},{text:"Total pago",value:"total_paid",format:"currencyBRL"},{text:"Estampa",value:"print_date",format:"datetime",align:"center"},{text:"Costura",value:"seam_date",format:"datetime",align:"center"},{text:"Entrega",value:"delivery_date",format:"datetime",align:"center"}]}},methods:{tableRowRoute(a){return a.client?{name:c.show,params:this.$helpers.getRouteParams({order:a,client:a.client})}:{name:c.showPreRegistered,params:this.$helpers.getRouteParams({order:a})}},orderClass(a){return a.states.includes("PRE-REGISTERED")?"table-warning":a.states.includes("CLOSED")?"table-secondary":a.states.includes("PAID")?"table-success":""}}};var k=function(){var e=this,t=e._self._c;return t("AppTable",{attrs:{headers:e.headers,items:e.items,"row-class":e.orderClass,route:e.tableRowRoute}})},w=[],O=i(I,k,w,!1,null,null,null,null);const T=O.exports,F={props:{value:{type:String,default:""}},data(){return{icons:{faSearch:v}}},methods:{onSearchClick(){this.$emit("search")},onClearSearchClick(){this.$emit("clear-search")}}};var P=function(){var e=this,t=e._self._c;return t("div",{staticClass:"col-12 col-sm-6"},[t("AppInput",{attrs:{id:"code",value:e.value,name:"code",placeholder:"Por código...","default-margin":!1},on:{input:function(r){return e.$emit("input",r)},keypress:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.onSearchClick.apply(null,arguments)}},scopedSlots:e._u([{key:"append",fn:function(){return[t("AppButton",{attrs:{outlined:"",icon:e.icons.faSearch},on:{click:e.onSearchClick}})]},proxy:!0}])}),e.value!==""?t("a",{staticClass:"text-decoration-none small",attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),e.onClearSearchClick.apply(null,arguments)}}},[e._v("Limpar busca")]):e._e()],1)},N=[],M=i(F,P,N,!1,null,null,null,null);const B=M.exports,G={props:{value:{type:String,required:!0}},data(){return{radios:{priority:"Prioritários",older:"Mais antigos",newer:"Mais recentes",delivery_date:"Data de entrega",pre_register:"Pré-registro"},icons:{faExclamationCircle:h}}},computed:{messagesOfFilters(){return{priority:"<strong>Ordem de cadastro mais antigo primeiro</strong>, apenas pedidos em aberto",older:"<strong>Ordem de cadastro mais antigos primeiros</strong>, incluindo pedidos fechados",newer:"<strong>Ordem de cadastro mais recente primeiros</strong>, incluindo pedidos fechados",delivery_date:`
          <strong>Ordem de data de entrega mais antiga primeiro</strong>, apenas pedidos em aberto
          <br/>(pedidos sem data de entrega informada ficam por último).
        `,pre_register:"<strong>Pedidos que precisam ter seus dados completados.</strong>"}}},methods:{onOptionChange(){this.$emit("filter-changed",this.value)}}};var q=function(){var e=this,t=e._self._c;return t("div",{staticClass:"table-responsive-sm"},[t("div",{staticClass:"btn-group mb-1",attrs:{role:"group","aria-label":"Filtro geral de pedidos"}},[e._l(e.radios,function(r,s){return[t("input",{key:s+"__input",staticClass:"btn-check",attrs:{id:`${s}__sort`,type:"radio",name:"sort_buttons",autocomplete:"off"},domProps:{value:s,checked:e.value===s},on:{input:function(o){return e.$emit("input",o.target.value)},change:e.onOptionChange}}),t("label",{key:s+"__label",staticClass:"btn btn-outline-primary text-nowrap",class:e.value===s&&"fw-bold",attrs:{for:`${s}__sort`}},[e._v(" "+e._s(r)+" ")])]})],2),t("div",{directives:[{name:"show",rawName:"v-show",value:e.value!=="",expression:"value !== ''"}],staticClass:"text-secondary small mb-2 mb-sm-0",class:e.value==="pre_register"&&"text-danger"},[t("FontAwesomeIcon",{staticClass:"me-1",attrs:{"fixed-width":"",icon:e.icons.faExclamationCircle}}),t("span",{domProps:{innerHTML:e._s(e.messagesOfFilters[e.value])}})],1)])},U=[],Y=i(G,q,U,!1,null,null,null,null);const V=Y.exports,z={apollo:{cities:{query:D},status:{query:_}},data(){return{maskDate:L,cities:[],status:[],isLoading:!1,form:new p({city_id:"",status_id:"",closed_at:"",delivery_date:"",state:"OPEN",order:"OLDER",payment_pending:!1,payment_paid:!1,display_filter_info:!1}),icons:{faClipboardList:m}}},computed:{stateOptions(){return[{id:"OPEN",label:"Em aberto",value:"OPEN"},{id:"ALL",label:"Todos",value:"ALL"}]},orderOptions(){return[{id:"OLDER",label:"Mais antigo",value:"OLDER"},{id:"NEWER",label:"Mais recente",value:"NEWER"},{id:"DELIVERY_DATE",label:"Data de enterga",value:"DELIVERY_DATE"}]}},methods:{getFormattedData(){var e;const a=this.form.data();return a.city_id=((e=a.city_id)==null?void 0:e.id)??"",a.status_id=a.status_id?g(a.status_id,"id"):"",a},filterOrders(){const a=this.getFormattedData();this.$emit("filter-orders",a)},async generateReport(){const a=this.getFormattedData();this.isLoading=!0;const{data:e}=await this.$apollo.query({query:S,variables:{input:a},fetchPolicy:"network-only"});this.isLoading=!1,this.$emit("report-generated",{title:"Relatório geral de pedidos",src:e.ordersReport})},onModalHidden(){this.src=""},customLabelCity(a){return a.state?`${a.name} - ${a.state.abbreviation}`:a.name},customLabelStatus({id:a,text:e}){return`${a}. ${e}`}}};var Q=function(){var e=this,t=e._self._c;return t("AppCard",{attrs:{id:"generalReportCard",color:"success",collapsible:!0,collapsed:!0},scopedSlots:e._u([{key:"header",fn:function(){return[t("h6",{staticClass:"fw-bold mb-0"},[t("FontAwesomeIcon",{attrs:{icon:e.icons.faClipboardList,"fixed-width":""}}),e._v(" Relatório e filtro ")],1)]},proxy:!0},{key:"body",fn:function(){return[t("h6",{staticClass:"fw-bold"},[e._v(" Filtros ")]),t("div",{staticClass:"small text-secondary"},[e._v(" Filtre por "),t("b",[e._v("um")]),e._v(" ou "),t("b",[e._v("vários campos")]),e._v(" combinados. ")]),t("div",{staticClass:"small text-secondary"},[e._v(" Pedidos pré-registrados não são incluídos no relatório. ")]),t("AppForm",{attrs:{form:e.form,"on-submit":e.generateReport}},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-12 col-sm-6"},[t("AppSelect",{attrs:{id:"city_id",name:"city_id",placeholder:"Selecione uma cidade",options:e.cities,"custom-label":e.customLabelCity},model:{value:e.form.city_id,callback:function(r){e.$set(e.form,"city_id",r)},expression:"form.city_id"}},[e._v(" Cidade ")])],1),t("div",{staticClass:"col-12 col-sm-6"},[t("AppSelect",{attrs:{id:"status_id",name:"status_id",options:e.status,"custom-label":({text:r})=>r,"tags-as-block":!1,multiple:"","close-on-select":!1,"track-by":"id",placeholder:"Selecione uma ou mais opções"},model:{value:e.form.status_id,callback:function(r){e.$set(e.form,"status_id",r)},expression:"form.status_id"}},[e._v(" Status ")])],1)]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-12 col-sm-6"},[t("AppInput",{attrs:{id:"closed_at",mask:e.maskDate,name:"closed_at",placeholder:"dd/mm/aaaa",type:"date",numeric:""},model:{value:e.form.closed_at,callback:function(r){e.$set(e.form,"closed_at",r)},expression:"form.closed_at"}},[e._v(" Data de fechamento ")])],1),t("div",{staticClass:"col-12 col-sm-6"},[t("AppInput",{attrs:{id:"delivery_date",mask:e.maskDate,name:"delivery_date",placeholder:"dd/mm/aaaa",type:"date",numeric:""},model:{value:e.form.delivery_date,callback:function(r){e.$set(e.form,"delivery_date",r)},expression:"form.delivery_date"}},[e._v(" Data de entrega ")])],1)]),t("AppRadio",{attrs:{name:"state",options:e.stateOptions},model:{value:e.form.state,callback:function(r){e.$set(e.form,"state",r)},expression:"form.state"}},[e._v(" Pedidos: ")]),t("AppRadio",{attrs:{name:"order",options:e.orderOptions,align:e.$isMobile?"vertical":"horizontal"},scopedSlots:e._u([{key:"hint",fn:function(){return[e._v(" Ordem dos pedidos que deve aparecer primeiro ")]},proxy:!0}]),model:{value:e.form.order,callback:function(r){e.$set(e.form,"order",r)},expression:"form.order"}},[e._v(" Ordem: ")]),t("div",[t("div",[t("label",{staticClass:"form-label fw-bold"},[e._v("Com pagamentos")]),t("small",{staticClass:"text-secondary"},[e._v(" (apenas filtro, indisponível para relatório) ")])]),t("div",{staticClass:"d-flex"},[t("AppCheckbox",{staticClass:"me-2",attrs:{id:"payment-pending"},model:{value:e.form.payment_pending,callback:function(r){e.$set(e.form,"payment_pending",r)},expression:"form.payment_pending"}},[e._v(" Pendentes ")]),t("AppCheckbox",{attrs:{id:"payment-paid"},model:{value:e.form.payment_paid,callback:function(r){e.$set(e.form,"payment_paid",r)},expression:"form.payment_paid"}},[e._v(" Algum valor já pago ")])],1)]),t("AppCheckboxSwitch",{attrs:{id:"displayFilterInfo"},model:{value:e.form.display_filter_info,callback:function(r){e.$set(e.form,"display_filter_info",r)},expression:"form.display_filter_info"}},[e._v(" Exibir informações do filtro no relatório ")]),t("div",{staticClass:"mt-3"},[t("AppButton",{staticClass:"me-2",attrs:{outlined:""},on:{click:function(r){return r.preventDefault(),e.filterOrders.apply(null,arguments)}}},[e._v(" Filtrar pedidos ")]),t("AppButton",{attrs:{outlined:"",loading:e.isLoading},on:{click:function(r){return r.preventDefault(),e.generateReport.apply(null,arguments)}}},[e._v(" Gerar relatório ")])],1)],1)]},proxy:!0}])})},H=[],W=i(z,Q,H,!1,null,null,null,null);const j=W.exports,K=[{name:"Modelo",value:"MODEL"},{name:"Material",value:"MATERIAL"},{name:"Tipo de gola",value:"NECK_TYPE"},{name:"Tipo de manga",value:"SLEEVE_TYPE"}],J={apollo:{status:{query:_,result({data:{status:a}}){const e=a.find(t=>t.text.toLowerCase().includes("estampado"));this.$nextTick(()=>{this.form.start_status_to_ignore=e.id})}}},data:()=>({FIELDS:K,isLoading:!1,icons:{faQuestionCircle:C},form:new p({initial_date:"",final_date:"",groups:["MODEL"],indicators:!1,start_status_to_ignore:""})}),computed:{isStatusLoading(){return!!this.$apollo.queries.status.loading}},methods:{async onSubmit(){const a=this.form.data();this.isLoading=!0;try{const{data:{ordersSizesReport:e}}=await this.$apollo.query({query:x,variables:{input:a}});this.$helpers.openInNewTab(e)}catch(e){b(this,e)}this.isLoading=!1}}};var X=function(){var e=this,t=e._self._c;return t("div",{staticClass:"position-relative"},[t("AppLoading",{directives:[{name:"show",rawName:"v-show",value:e.isStatusLoading,expression:"isStatusLoading"}]}),t("AppForm",{attrs:{"on-submit":e.onSubmit,form:e.form}},[t("div",{staticClass:"row"},[t("div",{staticClass:"col"},[t("AppInput",{attrs:{id:"initial_date",name:"initial_date",placeholder:"dd/mm/aaaa",type:"date",error:e.form.errors.get("initial_date"),hint:"Informe apenas a data inicial para filtra por uma data específica."},model:{value:e.form.initial_date,callback:function(r){e.$set(e.form,"initial_date",r)},expression:"form.initial_date"}},[e._v(" Data inicial ")])],1),t("div",{staticClass:"col"},[t("AppInput",{attrs:{id:"final_date",name:"final_date",placeholder:"dd/mm/aaaa",type:"date",error:e.form.errors.get("final_date")},model:{value:e.form.final_date,callback:function(r){e.$set(e.form,"final_date",r)},expression:"form.final_date"}},[e._v(" Data final ")])],1)]),t("div",{staticClass:"col mb-3"},[t("AppCheckbox",{attrs:{id:"indicator",value:!0},model:{value:e.form.indicators,callback:function(r){e.$set(e.form,"indicators",r)},expression:"form.indicators"}},[e._v(" Indicadores "),t("FontAwesomeIcon",{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"text-secondary small",attrs:{icon:e.icons.faQuestionCircle,"fixed-width":"",content:"Exibe indicadores para ajudar a localizar um pedido quando ele se encontra em mais de uma tabela"}})],1)],1),t("div",{staticClass:"row"},[t("div",{staticClass:"col mb-3",on:{"!focus":function(r){return e.form.errors.clear("groups")}}},[t("div",{staticClass:"fw-bold form-label"},[e._v(" Incluir grupos: ")]),e._l(e.FIELDS,function(r){return[t("div",{key:r.value,staticClass:"col form-check"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.groups,expression:"form.groups"}],staticClass:"form-check-input me-2",attrs:{id:r.value,type:"checkbox"},domProps:{value:r.value,checked:Array.isArray(e.form.groups)?e._i(e.form.groups,r.value)>-1:e.form.groups},on:{change:function(s){var o=e.form.groups,l=s.target,f=!!l.checked;if(Array.isArray(o)){var d=r.value,n=e._i(o,d);l.checked?n<0&&e.$set(e.form,"groups",o.concat([d])):n>-1&&e.$set(e.form,"groups",o.slice(0,n).concat(o.slice(n+1)))}else e.$set(e.form,"groups",f)}}}),t("label",{staticClass:"form-check-label",attrs:{for:r.value}},[e._v(e._s(r.name))])])]}),e.form.errors.has("groups")?t("div",{staticClass:"small text-danger"},[e._v(" "+e._s(e.form.errors.get("groups"))+" ")]):e._e()],2),t("div",{staticClass:"col"},[t("AppSimpleSelect",{attrs:{id:"status",name:"status",options:e.status,"label-prop":"text","value-prop":"id"},model:{value:e.form.start_status_to_ignore,callback:function(r){e.$set(e.form,"start_status_to_ignore",r)},expression:"form.start_status_to_ignore"}},[e._v(" Status acima deste para ignorar (incluindo) ")])],1)]),t("div",[t("AppButton",{attrs:{type:"submit",outlined:"",loading:e.isLoading}},[e._v(" Gerar relatório ")])],1)])],1)},Z=[],ee=i(J,X,Z,!1,null,null,null,null);const te=ee.exports,ae={components:{OrdersSizesReportCardForm:te},data:()=>({icons:{faClipboardList:m}})};var re=function(){var e=this,t=e._self._c;return t("AppCard",{attrs:{id:"orderSizesReportCard",color:"success",collapsible:"",collapsed:!0},scopedSlots:e._u([{key:"header",fn:function(){return[t("h6",{staticClass:"fw-bold mb-0"},[t("FontAwesomeIcon",{attrs:{"fixed-width":"",icon:e.icons.faClipboardList}}),e._v(" Relatório de tamanhos ")],1)]},proxy:!0},{key:"body",fn:function(){return[t("h6",{staticClass:"fw-bold"},[e._v(" Intervalo de datas ")]),t("OrdersSizesReportCardForm")]},proxy:!0}])})},se=[],oe=i(ae,re,se,!1,null,null,null,null);const ie=oe.exports,ne={components:{GeneralFilterCard:j,OrderSizesReportCard:ie,SortButtons:V,SearchInput:B,TheOrdersTable:T,OrdersQuestionIconTippy:$},metaInfo(){return{title:"Pedidos"}},apollo:{orders:{query:A,variables(){return{...this.params}},deep:!0}},data(){return{code:"",roles:y,buttonSelected:"priority",params:{page:1,...u.PRIORITY},modalReport:{value:!1,src:"",title:"Relatório"},orders:{data:[],paginatorInfo:{}},icons:{faBoxes:E}}},computed:{isLoading(){return!!this.$apollo.queries.orders.loading},hasSearchMade(){return this.buttonSelected===""}},methods:{getHasPaymentsParams({payment_paid:a,payment_pending:e}){const t=[];return a&&t.push({column:"VALUE",operator:"GT",value:0}),e&&t.push({column:"IS_CONFIRMED",operator:"IS_NULL"}),a||e?{OR:t}:null},getHasClientParams({city_id:a}){return a?{column:"CITY_ID",operator:"EQ",value:a}:null},getWhereConditions(a){const e=[];return a.state==="OPEN"&&!a.closed_at&&e.push({column:"CLOSED_AT",operator:"IS_NULL"}),a.status_id&&e.push({column:"STATUS_ID",operator:"IN",value:a.status_id}),a.closed_at&&e.push({column:"CLOSED_AT",operator:"EQ",value:R.fromFormat(a.closed_at,"dd/MM/y").toFormat("y-MM-d")}),a.delivery_date&&e.push({column:"DELIVERY_DATE",operator:"EQ",value:a.delivery_date}),e},getOrderBy({order:a}){return a==="NEWER"?{column:"CREATED_AT",order:"DESC"}:a==="DELIVERY_DATE"?{column:"DELIVERY_DATE",order:"DESC"}:{column:"CREATED_AT",order:"ASC"}},onFilterOrders(a){this.params={page:1,hasPayments:this.getHasPaymentsParams(a),hasClient:this.getHasClientParams(a),where:{AND:this.getWhereConditions(a)},orderBy:[this.getOrderBy(a)]}},onFilterButtonsChanged(a){const e=u[a.toUpperCase()];this.code="",this.params={...this.params,...e,page:1}},onCodeSearch(){this.buttonSelected="",this.params={page:1,orderBy:[{column:"CREATED_AT",order:"DESC"}],where:{column:"CODE",operator:"LIKE",value:`%${this.code}%`}}},restartFilter(){this.buttonSelected="priority",this.code=""},onSearchClear(){this.hasSearchMade&&this.restartFilter(),this.onFilterButtonsChanged(this.buttonSelected)},onReportGenerated({src:a,title:e}){this.modalReport.title=e,this.modalReport.src=a,this.modalReport.value=!0},onCloseModalReport(){this.modalReport.src=""}}};var le=function(){var e=this,t=e._self._c;return t("div",{staticClass:"mx-auto py-5"},[t("GeneralFilterCard",{staticClass:"mb-2",on:{"report-generated":e.onReportGenerated,"filter-orders":e.onFilterOrders}}),e.$helpers.canView(e.roles.GERENCIA,e.roles.ATENDIMENTO)?t("OrderSizesReportCard",{staticClass:"mb-3"}):e._e(),t("SortButtons",{staticClass:"mb-3",on:{"filter-changed":e.onFilterButtonsChanged},model:{value:e.buttonSelected,callback:function(r){e.buttonSelected=r},expression:"buttonSelected"}}),t("SearchInput",{staticClass:"mb-3",on:{search:e.onCodeSearch,"clear-search":e.onSearchClear},model:{value:e.code,callback:function(r){e.code=r},expression:"code"}}),t("AppFileModal",{attrs:{id:"orderReport",src:e.modalReport.src,title:e.modalReport.title},on:{hidden:e.onCloseModalReport},model:{value:e.modalReport.value,callback:function(r){e.$set(e.modalReport,"value",r)},expression:"modalReport.value"}}),t("AppCard",{attrs:{"has-body-padding":!1},scopedSlots:e._u([{key:"header",fn:function(){return[t("div",{staticClass:"d-flex justify-content-between align-items-baseline"},[t("h6",{staticClass:"fw-bold mb-0"},[t("FontAwesomeIcon",{attrs:{icon:e.icons.faBoxes,"fixed-width":""}}),e._v(" Todos os pedidos ")],1),t("OrdersQuestionIconTippy")],1)]},proxy:!0},{key:"body",fn:function(){return[e.isLoading?t("AppLoading"):e._e(),t("TheOrdersTable",{attrs:{items:e.orders.data}})]},proxy:!0}])}),t("AppPaginator",{staticClass:"mt-2",attrs:{"is-loading":e.isLoading,pagination:e.orders.paginatorInfo},model:{value:e.params.page,callback:function(r){e.$set(e.params,"page",r)},expression:"params.page"}})],1)},de=[],ce=i(ne,le,de,!1,null,null,null,null);const Ce=ce.exports;export{Ce as default};