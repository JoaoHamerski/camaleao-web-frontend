import{n as r,B as l,X as i,W as c,Z as o,U as u,_ as p}from"./index-fae63e1f.js";import{G as m}from"./Client-cfdef3aa.js";import{C as d}from"./ClientForm-2fc68fde.js";import"./_PaginatorFragment-c01a3fe7.js";import"./City-ae18d4e9.js";import"./Resources-b591129f.js";import"./ShippingCompany-204ada3f.js";import"./Order-7b0e72c5.js";import"./ActivityFragments-a3df58d3.js";import"./masks-168ccaff.js";const f={props:{items:{type:Array,default:()=>[]}},computed:{headers(){return[{text:"Nome",value:"name"},{text:"Telefone",value:"phone",format:"phone"},{text:"Cidade",value:"city.name"}]}},methods:{get:l,tableRowRoute(s){return{name:i.show,params:this.$helpers.getRouteParams({client:s})}}}};var h=function(){var e=this,t=e._self._c;return t("AppTable",{attrs:{headers:e.headers,items:e.items,route:e.tableRowRoute},scopedSlots:e._u([{key:"items.city.name",fn:function({item:n}){return[e._v(" "+e._s(e.get(n,"city.name","N/A"))+" "),n.city?[e._v(" - "+e._s(e.get(n,"city.state.abbreviation","N/A"))+" ")]:e._e()]}}],null,!0)})},_=[],C=r(f,h,_,!1,null,null,null,null);const v=C.exports,y={components:{TheClientsCardTable:v},props:{clients:{type:Array,default:()=>[]},isLoading:{type:Boolean,default:!1}},data(){return{icons:{faUsers:c}}}};var g=function(){var e=this,t=e._self._c;return t("AppCard",{staticClass:"mt-2",attrs:{"is-loading":e.isLoading,"has-body-padding":!1,color:"primary"},scopedSlots:e._u([{key:"header",fn:function(){return[t("h6",{staticClass:"fw-bold mb-0"},[t("FontAwesomeIcon",{staticClass:"me-1",attrs:{icon:e.icons.faUsers,"fixed-width":""}}),e._v(" Clientes ")],1)]},proxy:!0},{key:"body",fn:function(){return[t("TheClientsCardTable",{attrs:{items:e.clients}})]},proxy:!0}])})},w=[],S=r(y,g,w,!1,null,null,null,null);const b=S.exports,x={components:{ClientForm:d},props:{value:{type:Boolean,default:!1}},data(){return{icons:{faUserPlus:o}}},methods:{onSuccess(){this.$emit("success")}}};var N=function(){var e=this,t=e._self._c;return t("div",[t("AppModal",e._g({attrs:{id:"clientModalNew",value:e.value,color:"success",centered:""},scopedSlots:e._u([{key:"title",fn:function(){return[t("FontAwesomeIcon",{staticClass:"me-1",attrs:{icon:e.icons.faUserPlus,"fixed-width":""}}),e._v("Novo cliente ")]},proxy:!0},{key:"body",fn:function(){return[e.value?t("ClientForm",{on:{success:e.onSuccess}}):e._e()]},proxy:!0}])},e.$listeners))],1)},$=[],k=r(x,N,$,!1,null,null,null,null);const A=k.exports,T={components:{ClientModalNew:A},data(){return{newClientModal:!1,form:{option:a.NAME,search:""},icons:{faUserPlus:o,faSearch:u}}},computed:{selectOptions(){return[{name:"Nome",value:a.NAME},{name:"Cidade",value:a.CITY},{name:"Telefone",value:a.PHONE}]}},methods:{onNewClientClick(){this.newClientModal=!0},onNewClientSuccess(){this.newClientModal=!1},getFormattedSearch(){return this.form.option===a.PHONE&&this.form.search.startsWith("(")?this.getSearchByDDD():`%${this.form.search}%`},getSearchByDDD(){return`${this.$helpers.stripNonDigits(this.form.search)}%`},getColumnOption(){return this.form.option===a.CITY?"NAME":this.form.option},getQueryToSearch(s){const e=this.form.option===a.CITY;return{hasCity:e?s:null,where:e?null:s}},handleSearch(){const s=this.getFormattedSearch(),e=this.getColumnOption(),t={value:s,operator:"LIKE",column:e},n=this.getQueryToSearch(t);this.$emit("search",n)},clearSearch(){this.form.search="",this.$emit("search-clear")}}};var M=function(){var e=this,t=e._self._c;return t("div",[t("ClientModalNew",{on:{success:e.onNewClientSuccess},model:{value:e.newClientModal,callback:function(n){e.newClientModal=n},expression:"newClientModal"}}),t("div",{staticClass:"d-flex flex-column flex-sm-row justify-content-between"},[t("AppButton",{staticClass:"fw-bold mb-3 mb-sm-0",attrs:{color:"success"},on:{click:function(n){return n.preventDefault(),e.onNewClientClick.apply(null,arguments)}}},[t("FontAwesomeIcon",{attrs:{"fixed-width":"",icon:e.icons.faUserPlus}}),e._v(" Novo cliente ")],1),t("div",{staticClass:"col-12 col-sm-5"},[t("AppInput",{attrs:{name:"search","default-margin":!1,placeholder:"Digite a busca..."},on:{keypress:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.handleSearch.apply(null,arguments)}},scopedSlots:e._u([{key:"append",fn:function(){return[t("AppSimpleSelect",{attrs:{"remove-default-margin":"",name:"option","hide-default-option":"","value-prop":"value","label-prop":"name",options:e.selectOptions},model:{value:e.form.option,callback:function(n){e.$set(e.form,"option",n)},expression:"form.option"}}),t("AppButton",{attrs:{icon:e.icons.faSearch,outlined:""},on:{click:function(n){return n.preventDefault(),e.handleSearch.apply(null,arguments)}}})]},proxy:!0}]),model:{value:e.form.search,callback:function(n){e.$set(e.form,"search",n)},expression:"form.search"}})],1)],1),t("div",{directives:[{name:"show",rawName:"v-show",value:e.form.search,expression:"form.search"}],staticClass:"text-end"},[t("span",{staticClass:"clickable link-primary small",on:{click:e.clearSearch}},[e._v(" Limpar busca ")])])],1)},E=[],I=r(T,M,E,!1,null,null,null,null);const D=I.exports,a={NAME:"NAME",CITY:"CITY",PHONE:"PHONE"},F={components:{TheClientsCard:b,TheClientsHeader:D},metaInfo:{title:"Clientes"},apollo:{clients:{query:m,variables(){return{...this.clientsVariables,orderBy:[{column:"CREATED_AT",order:"DESC"}],page:this.page}}}},data(){return{page:1,clientsVariables:{where:{},hasCity:null},clients:{data:[],paginatorInfo:{}},icons:{faUserPlus:o}}},computed:{isLoading(){return!!this.$apollo.queries.clients.loading}},methods:{formatPhone:p,onSearch(s){this.page=1,this.clientsVariables=s},onSearchClear(){this.page=1,this.clientsVariables={hasCity:null,where:{}}}}};var O=function(){var e=this,t=e._self._c;return t("div",{staticClass:"col col-sm-10 mx-auto py-5"},[t("TheClientsHeader",{on:{search:e.onSearch,"search-clear":e.onSearchClear}}),t("TheClientsCard",{attrs:{clients:e.clients.data,"is-loading":e.isLoading}}),t("AppPaginator",{staticClass:"mt-2",attrs:{"is-loading":e.isLoading,pagination:e.clients.paginatorInfo},model:{value:e.page,callback:function(n){e.page=n},expression:"page"}})],1)},R=[],P=r(F,O,R,!1,null,null,null,null);const j=P.exports;export{a as COLUMNS,j as default};