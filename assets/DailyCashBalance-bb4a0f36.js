import{n as l,w as i,a2 as c,bD as o,an as r,ao as d,ap as m,b as p,$ as _,i as f,D as n}from"./index-fae63e1f.js";import{b as u}from"./DailyCash-da8f8b01.js";import"./_PaginatorFragment-c01a3fe7.js";import"./PaymentExpense-9583d97d.js";const C={props:{balance:{type:Object,default:null}},data(){return{icons:{faHandHoldingUsd:i,faFunnelDollar:c}}},computed:{balanceClass(){return this.balance.balance>=0?"text-success":"text-danger"}}};var y=function(){var a=this,e=a._self._c;return a.balance?e("div",[e("div",{staticClass:"fw-bold"},[a._t("default")],2),e("h4",{staticClass:"mb-0",class:a.balanceClass,domProps:{innerHTML:a._s(a.$helpers.toBRL(a.balance.balance,!0))}}),e("div",{staticClass:"small"},[e("div",[e("FontAwesomeIcon",{staticClass:"text-success me-1",attrs:{icon:a.icons.faHandHoldingUsd,"fixed-width":""}}),e("span",{staticClass:"text-dark"},[a._v(a._s(a.$helpers.toBRL(a.balance.entry)))])],1),e("div",[e("FontAwesomeIcon",{staticClass:"text-danger me-1",attrs:{icon:a.icons.faFunnelDollar,"fixed-width":""}}),e("span",{staticClass:"text-dark"},[a._v(a._s(a.$helpers.toBRL(-a.balance.out)))])],1)])]):a._e()},h=[],v=l(C,y,h,!1,null,null,null,null);const b=v.exports,x={components:{DailyCashBalanceItem:b},apollo:{dailyCashBalance:{query:u}},data(){return{dailyCashBalance:{},icons:{faBalanceScale:o,faCalendarDay:r,faCalendarWeek:d,faCalendarAlt:m,faExclamationCircle:p,faBoxes:_}}},computed:{isQueryLoading(){return!!this.$apollo.queries.dailyCashBalance.loading}},methods:{isEmpty:f,onPendencyOfMonthClick(t){if(t==="current"){this.$emit("open-pendency-orders",n.now().toISODate());return}this.$emit("open-pendency-orders",n.now().minus({months:1}).toISODate())}}};var w=function(){var a=this,e=a._self._c;return e("AppContainer",{attrs:{collapsible:"",value:!a.$isMobile},scopedSlots:a._u([{key:"title",fn:function(){return[e("FontAwesomeIcon",{attrs:{icon:a.icons.faBalanceScale}}),a._v(" Balanço ")]},proxy:!0},{key:"body",fn:function(){return[e("AppLoading",{directives:[{name:"show",rawName:"v-show",value:a.isQueryLoading,expression:"isQueryLoading"}]}),a.isEmpty(a.dailyCashBalance)?a._e():e("div",{staticClass:"d-flex justify-content-center justify-content-sm-around flex-column flex-sm-row"},[e("DailyCashBalanceItem",{attrs:{balance:a.dailyCashBalance.balance_of_day}},[e("FontAwesomeIcon",{staticClass:"text-primary me-1",attrs:{"fixed-width":"",icon:a.icons.faCalendarDay}}),e("span",{staticClass:"text-black-50"},[a._v("DIA")])],1),e("DailyCashBalanceItem",{staticClass:"my-3 my-sm-0",attrs:{balance:a.dailyCashBalance.balance_of_week}},[e("FontAwesomeIcon",{staticClass:"text-primary me-1",attrs:{"fixed-width":"",icon:a.icons.faCalendarWeek}}),e("span",{staticClass:"text-black-50"},[a._v("SEMANA")])],1),e("DailyCashBalanceItem",{attrs:{balance:a.dailyCashBalance.balance_of_month}},[e("FontAwesomeIcon",{staticClass:"text-primary me-1",attrs:{"fixed-width":"",icon:a.icons.faCalendarAlt}}),e("span",{staticClass:"text-black-50"},[a._v("MÊS")])],1),e("div",{staticClass:"mt-2 mt-sm-0"},[e("div",{staticClass:"fw-bold text-black-50"},[e("span",{staticClass:"link-primary clickable me-1",on:{click:function(s){return s.preventDefault(),a.onPendencyOfMonthClick("current")}}},[a._v("PENDÊNCIA NO MÊS")]),e("FontAwesomeIcon",{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"text-primary",attrs:{icon:a.icons.faExclamationCircle,"fixed-width":"",content:"Total que falta pagar no mês atual do pedidos, baseado na data de estampa cadastrada"}})],1),e("div",{staticClass:"d-flex align-items-baseline"},[e("h4",{staticClass:"fw-bold text-danger",domProps:{innerHTML:a._s(a.$helpers.toBRL(a.dailyCashBalance.pendency.total_owing_on_month))}}),e("span",{staticClass:"small fw-bold ms-1"},[a._v(" ("+a._s(a.$helpers.plural(a.dailyCashBalance.pendency.total_shirts_on_month,"F","CAMISA",null,!0))+") ")])]),e("div",[e("span",[e("div",{staticClass:"fw-bold link-primary clickable small",on:{click:function(s){return a.onPendencyOfMonthClick("last")}}},[a._v(" MÊS ANTERIOR ")]),e("b",{staticClass:"text-danger"},[a._v(" "+a._s(a.$helpers.toBRL(a.dailyCashBalance.pendency.total_owing_last_month))+" ")]),e("span",{staticClass:"small fw-bold"},[a._v(" ("+a._s(a.$helpers.plural(a.dailyCashBalance.pendency.total_shirts_last_month,"F","CAMISA",null,!0))+") ")])])])])],1)]},proxy:!0}])})},B=[],k=l(x,w,B,!1,null,null,null,null);const g=k.exports;export{g as default};