import{n as s}from"./index-fae63e1f.js";const r={props:{value:{type:String,required:!0},status:{type:Array,required:!0}},computed:{statusWithConfirmedDates(){return this.status.filter(a=>a.pivot.confirmed_at)},radioOptions(){return[{label:"Atualizá-los para agora",value:"UPDATE"},{label:"Mantê-los com a data que está",value:"KEEP"}]},tableHeaders(){return[{text:"Status",value:"text"},{text:"Confirmado em",value:"pivot.confirmed_at",format:"datetime",formatting:"dd/MM/y HH:mm:ss"}]}},methods:{onInputChange(a){this.$emit("input",a)}}};var o=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"fw-bold small"},[t._v(" Os seguintes status já possuem uma data de confirmação: ")]),e("AppTable",{attrs:{"row-class":()=>"small","table-class":"table-sm",items:t.statusWithConfirmedDates,headers:t.tableHeaders}}),e("div",{staticClass:"small text-secondary mb-3"},[t._v(" É possível que eles tenham sido auto-cancelados devido a alterações gerais nos status do sistema. ")]),e("div",{staticClass:"small"},[e("AppRadio",{attrs:{value:t.value,name:"override-option",options:t.radioOptions},on:{input:t.onInputChange}},[t._v(" O que você gostaria de fazer: ")])],1)],1)},i=[],n=s(r,o,i,!1,null,null,null,null);const u=n.exports;export{u as M};