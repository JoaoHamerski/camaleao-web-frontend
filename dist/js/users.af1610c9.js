(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[681],{7307:function(e){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"roles"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"roles"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:45}};n.loc.source={body:"query roles {\n  roles {\n    id\n    name\n  }\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function t(e,n){if("FragmentSpread"===e.kind)n.add(e.name.value);else if("VariableDefinition"===e.kind){var a=e.type;"NamedType"===a.kind&&n.add(a.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){t(e,n)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){t(e,n)})),e.definitions&&e.definitions.forEach((function(e){t(e,n)}))}var a={};function i(e,n){for(var t=0;t<e.definitions.length;t++){var a=e.definitions[t];if(a.name&&a.name.value==n)return a}}function s(e,n){var t={kind:e.kind,definitions:[i(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var s=a[n]||new Set,r=new Set,o=new Set;s.forEach((function(e){o.add(e)}));while(o.size>0){var l=o;o=new Set,l.forEach((function(e){if(!r.has(e)){r.add(e);var n=a[e]||new Set;n.forEach((function(e){o.add(e)}))}}))}return r.forEach((function(n){var a=i(e,n);a&&t.definitions.push(a)})),t}(function(){n.definitions.forEach((function(e){if(e.name){var n=new Set;t(e,n),a[e.name.value]=n}}))})(),e.exports=n,e.exports.roles=s(n,"roles")},2077:function(e){var n={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"User"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"User"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"email"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"role"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"users"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"users"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"UserInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userChangeRole"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"new_role_id"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userChangeRole"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"new_role_id"},value:{kind:"Variable",name:{kind:"Name",value:"new_role_id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"auth_password"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"auth_password"},value:{kind:"Variable",name:{kind:"Name",value:"auth_password"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"},directives:[]}]}}]}}],loc:{start:0,end:478}};n.loc.source={body:"fragment User on User {\n  id\n  name\n  email\n  created_at\n  role {\n    id\n    name\n  }\n}\n\nquery users {\n  users {\n    ...User\n  }\n}\n\nmutation userCreate($input: UserInput!) {\n  userCreate(input: $input) {\n    ...User\n  }\n}\n\nmutation userChangeRole ($id: ID! $new_role_id: Int) {\n  userChangeRole(id: $id new_role_id: $new_role_id){\n    ...User\n  }\n}\n\nmutation userDelete($id: ID! $auth_password: String!) {\n  userDelete(id: $id auth_password: $auth_password) {\n    ...User\n  }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};function t(e,n){if("FragmentSpread"===e.kind)n.add(e.name.value);else if("VariableDefinition"===e.kind){var a=e.type;"NamedType"===a.kind&&n.add(a.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){t(e,n)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){t(e,n)})),e.definitions&&e.definitions.forEach((function(e){t(e,n)}))}var a={};function i(e,n){for(var t=0;t<e.definitions.length;t++){var a=e.definitions[t];if(a.name&&a.name.value==n)return a}}function s(e,n){var t={kind:e.kind,definitions:[i(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var s=a[n]||new Set,r=new Set,o=new Set;s.forEach((function(e){o.add(e)}));while(o.size>0){var l=o;o=new Set,l.forEach((function(e){if(!r.has(e)){r.add(e);var n=a[e]||new Set;n.forEach((function(e){o.add(e)}))}}))}return r.forEach((function(n){var a=i(e,n);a&&t.definitions.push(a)})),t}(function(){n.definitions.forEach((function(e){if(e.name){var n=new Set;t(e,n),a[e.name.value]=n}}))})(),e.exports=n,e.exports.User=s(n,"User"),e.exports.users=s(n,"users"),e.exports.userCreate=s(n,"userCreate"),e.exports.userChangeRole=s(n,"userChangeRole"),e.exports.userDelete=s(n,"userDelete")},5141:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return W}});var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"py-5"},[t("div",{staticClass:"mb-2"},[t("AppButton",{attrs:{icon:e.icons.faUserPlus,color:"success","btn-class":"fw-bold"},on:{click:function(n){return n.preventDefault(),e.onNewUserClick.apply(null,arguments)}}},[e._v(" Novo usuário ")])],1),t("NewUserModal",{attrs:{roles:e.roles},on:{success:e.onNewUserSuccess},model:{value:e.newUserModal,callback:function(n){e.newUserModal=n},expression:"newUserModal"}}),t("TheUsersCard",{attrs:{users:e.users,roles:e.roles,"is-loading":e.isLoading}})],1)},i=[],s=t(2077),r=t(7307),o=t(1436),l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("AppCard",{attrs:{color:"camaleao"},scopedSlots:e._u([{key:"header",fn:function(){return[t("h6",{staticClass:"fw-bold mb-0"},[t("FontAwesomeIcon",{attrs:{icon:e.icons.faUsers,"fixed-width":""}}),e._v(" Gerenciamento de usuários do sistema ")],1)]},proxy:!0},{key:"body",fn:function(){return[t("ChangeUserRoleModal",{attrs:{user:e.changeUserRole.user,roles:e.roles},on:{hidden:e.onChangeUserModalHidden,success:e.onChangeUserRoleSuccess},model:{value:e.changeUserRole.modal,callback:function(n){e.$set(e.changeUserRole,"modal",n)},expression:"changeUserRole.modal"}}),t("DeleteUserModal",{attrs:{user:e.deleteUser.user},on:{hidden:e.onDeleteUserModalHidden,success:e.onDeleteUserSuccess},model:{value:e.deleteUser.modal,callback:function(n){e.$set(e.deleteUser,"modal",n)},expression:"deleteUser.modal"}}),t("AppLoading",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}]}),t("TheUsersCardTable",{attrs:{items:e.users},on:{"action-button-clicked":e.onActionButtonClicked}})]},proxy:!0}])})},d=[],u=(t(1703),function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("AppTable",{attrs:{headers:e.headers,items:e.items},scopedSlots:e._u([{key:"items.change_role",fn:function(n){var a=n.item;return[t("AppButton",{attrs:{"disabled-message":e.isAuthUser(a)&&e.cantChangeOwnLevelMessage,"btn-class":"btn-sm",icon:e.icons.faUserEdit,outlined:""},on:{click:function(n){return n.preventDefault(),e.onChangeUserRoleClick(a)}}})]}},{key:"items.delete",fn:function(n){var a=n.item;return[t("AppButton",{attrs:{"disabled-message":e.isAuthUser(a)&&e.cantDeleteOwnAccountMessage,"btn-class":"btn-sm",color:"danger",icon:e.icons.faTrashAlt,outlined:""},on:{click:function(n){return n.preventDefault(),e.onDeleteUserClick(a)}}})]}}],null,!0)})}),c=[],m={props:{items:{type:Array,default:()=>[]}},data(){return{icons:{faUserEdit:o.yXf,faTrashAlt:o.I7k}}},computed:{authUser(){return this.$store.getters["auth/authUser"]},headers(){return[{text:"Nome",value:"name"},{text:"E-mail",value:"email"},{text:"Nível de usuário",value:"role.name"},{text:"Alterar nível",value:"change_role",align:"center"},{text:"Deletar",value:"delete",align:"center"}]},cantChangeOwnLevelMessage(){return"Não é possível alterar o próprio nível de usuário"},cantDeleteOwnAccountMessage(){return"Use o menu Minha conta para deletar a própria conta"}},methods:{onChangeUserRoleClick(e){this.$emit("action-button-clicked",{user:e,action:"change_role"})},onDeleteUserClick(e){this.$emit("action-button-clicked",{user:e,action:"delete_user"})},isAuthUser(e){return e.id===this.authUser.id}}},p=m,f=t(1001),v=(0,f.Z)(p,u,c,!1,null,null,null),h=v.exports,k=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("AppModal",e._g({attrs:{id:"changeUserRoleModal",value:e.value,centered:""},on:{show:e.onModalShow},scopedSlots:e._u([{key:"title",fn:function(){return[t("FontAwesomeIcon",{attrs:{icon:e.icons.faUserEdit,"fixed-width":""}}),e._v(" Alterar privilégio de usuário ")]},proxy:!0},{key:"body",fn:function(){return[e.isEmpty(e.user)?e._e():t("div",[t("div",{staticClass:"text-center text-primary mb-3"},[t("FontAwesomeIcon",{attrs:{icon:e.icons.faUserCircle,size:"4x"}})],1),t("h5",{staticClass:"text-center fw-bold mb-2"},[e._v(" "+e._s(e.user.name)+" ")]),t("div",{staticClass:"text-center"},[t("small",[e._v(e._s(e.user.email))])]),t("hr"),t("label",{staticClass:"form-label fw-bold"},[e._v("Selecione o privilégio: ")]),t("div",{staticClass:"ms-2"},[t("AppRadio",{attrs:{options:e.roles,name:"selectedRole","label-prop":"name","value-prop":"id",align:"vertical"},model:{value:e.selectedRole,callback:function(n){e.selectedRole=n},expression:"selectedRole"}})],1),t("AppButton",{staticClass:"mt-4",attrs:{"btn-class":"fw-bold",color:"success",block:"",loading:e.isLoading},on:{click:function(n){return n.preventDefault(),e.onChangeClick.apply(null,arguments)}}},[e._v(" ALTERAR ")])],1)]},proxy:!0}])},e.$listeners))},g=[],w=t(9697),_=t(1594),b={props:{value:{type:Boolean,default:!1},user:{type:Object,default:()=>({})},roles:{type:Array,default:()=>[]}},data(){return{selectedRole:"",isLoading:!1,icons:{faUserEdit:o.yXf,faUserCircle:o.m08}}},methods:{isEmpty:w.Z,async onChangeClick(){this.isLoading=!0;try{await this.$apollo.mutate({mutation:s.userChangeRole,variables:{id:this.user.id,new_role_id:+this.selectedRole}}),(0,_.s)(this,{message:"Privilégio alterado!"})}catch(e){this.$toast.error("Ops! Algo deu errrado, tente novamente!")}this.isLoading=!1},onModalShow(){try{this.selectedRole=this.user.role.id}catch(e){this.$toast.error("Ops! Algo deu errado, tente novamente!")}}}},y=b,U=(0,f.Z)(y,k,g,!1,null,null,null),S=U.exports,C=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("AppModal",e._g({attrs:{id:"deleteUserModal",value:e.value,color:"danger",centered:""},scopedSlots:e._u([{key:"title",fn:function(){return[t("FontAwesomeIcon",{attrs:{icon:e.icons.faTrashAlt,"fixed-width":""}}),e._v(" Deletar usuário ")]},proxy:!0},e.isEmpty(e.user)?null:{key:"body",fn:function(){return[t("div",{staticClass:"text-center"},[t("FontAwesomeIcon",{staticClass:"text-danger",attrs:{icon:e.icons.faTrashAlt,size:"4x"}})],1),t("div",{staticClass:"text-danger text-center mt-3 fw-bold"},[e._v(" Você está deletando o seguinte usuário: ")]),t("h5",{staticClass:"text-center fw-bold mt-3"},[e._v(" "+e._s(e.user.name)+" ")]),t("ul",{staticClass:"list-group list-group-flush"},[t("li",{staticClass:"list-group-item"},[t("b",[e._v("Email:")]),e._v(" "+e._s(e.user.email)+" ")]),t("li",{staticClass:"list-group-item"},[t("b",[e._v("Privilégio:")]),e._v(" "+e._s(e.user.role.name)+" ")]),t("li",{staticClass:"list-group-item"},[t("b",[e._v("Criado em:")]),e._v(" "+e._s(e.formatDatetime(e.user.created_at))+" ")])]),t("div",{staticClass:"text-secondary small mt-3"},[e._v(" A exclusão deste usuário não afeta nenhum dado no sistema. ")]),t("div",{staticClass:"mt-3"},[t("AppForm",{attrs:{form:e.form,"on-submit":e.onDeleteClick}},[t("input",{attrs:{type:"text",hidden:"",name:"email",autocomplete:"new-email"}}),t("AppInput",{attrs:{type:"password",name:"auth_password",autocomplete:"new-password",error:e.form.errors.get("auth_password")},model:{value:e.form.auth_password,callback:function(n){e.$set(e.form,"auth_password",n)},expression:"form.auth_password"}},[e._v(" Digite sua senha para confirmar: ")])],1)],1),t("div",{staticClass:"mt-4"},[t("AppButton",{attrs:{"btn-class":"fw-bold",color:"success",block:"",loading:e.isLoading},on:{click:function(n){return n.preventDefault(),e.onDeleteClick.apply(null,arguments)}}},[e._v(" Confirmar ")])],1)]},proxy:!0}],null,!0)},e.$listeners))},N=[],D=t(7859),A=t(5539),x={props:{value:{type:Boolean,default:!1},user:{type:Object,default:()=>({})}},data(){return{form:new A.Z({auth_password:""}),icons:{faTrashAlt:o.I7k},isLoading:!1}},methods:{isEmpty:w.Z,formatDatetime:D.DZ,async onDeleteClick(){this.isLoading=!0;try{await this.$apollo.mutate({mutation:s.userDelete,variables:{id:this.user.id,auth_password:this.form.auth_password}}),this.$helpers.clearCacheFrom({fieldName:"users"}),(0,_.s)(this,{message:"Usuário deletado!",resetForm:!0})}catch(e){(0,_.S)(this,e)}this.isLoading=!1}}},$=x,F=(0,f.Z)($,C,N,!1,null,null,null),E=F.exports,R={components:{TheUsersCardTable:h,ChangeUserRoleModal:S,DeleteUserModal:E},props:{isLoading:{type:Boolean,default:!1},users:{type:Array,default:()=>[]},roles:{type:Array,default:()=>[]}},data(){return{changeUserRole:{modal:!1,user:{}},deleteUser:{modal:!1,user:{}},icons:{faUsers:o.FVb}}},methods:{onDeleteUserSuccess(){this.deleteUser.modal=!1,this.deleteUser.user={}},onDeleteUserModalHidden(){this.deleteUser.user={}},onChangeUserRoleSuccess(){this.changeUserRole.modal=!1,this.changeUserRole.user={}},onChangeUserModalHidden(){this.changeUserRole.user={}},onActionButtonClicked({user:e,action:n}){if("change_role"===n)return this.changeUserRole.user=e,void(this.changeUserRole.modal=!0);if("delete_user"===n)return this.deleteUser.user=e,void(this.deleteUser.modal=!0);throw new Error("Nenhuma action foi identificada no evento")}}},M=R,T=(0,f.Z)(M,l,d,!1,null,null,null),L=T.exports,I=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("AppModal",e._g({attrs:{id:"newUserModal",color:"success",value:e.value,centered:""},scopedSlots:e._u([{key:"title",fn:function(){return[t("FontAwesomeIcon",{attrs:{icon:e.icons.faUserPlus,"fixed-width":""}}),e._v(" Novo usuário ")]},proxy:!0},{key:"body",fn:function(){return[t("NewUserForm",{attrs:{roles:e.roles},on:{success:e.onSuccess}})]},proxy:!0}])},e.$listeners))},V=[],O=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("AppForm",{attrs:{form:e.form,"on-submit":e.onSubmit}},[t("AppInput",{attrs:{id:"name",name:"name",placeholder:"Digite o nome...",autocomplete:"off",error:e.form.errors.get("name")},model:{value:e.form.name,callback:function(n){e.$set(e.form,"name",n)},expression:"form.name"}},[e._v(" Nome ")]),t("AppInput",{attrs:{id:"email",name:"email",autocomplete:"off",placeholder:"Digite o email...",error:e.form.errors.get("email")},model:{value:e.form.email,callback:function(n){e.$set(e.form,"email",n)},expression:"form.email"}},[e._v(" Email ")]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-12 col-sm"},[t("AppInput",{attrs:{id:"password",name:"password",type:"password",placeholder:"Digite uma senha...",autocomplete:"new-password",error:e.form.errors.get("password")},model:{value:e.form.password,callback:function(n){e.$set(e.form,"password",n)},expression:"form.password"}},[e._v(" Senha ")])],1),t("div",{staticClass:"col-12 col-sm"},[t("AppInput",{attrs:{id:"password_confirmation",name:"password_confirmation",type:"password",placeholder:"Repita a senha...",autocomplete:"new-password",error:e.form.errors.get("password_confirmation")},model:{value:e.form.password_confirmation,callback:function(n){e.$set(e.form,"password_confirmation",n)},expression:"form.password_confirmation"}},[e._v(" Confirme a senha ")])],1)]),t("AppSimpleSelect",{attrs:{id:"role_id",name:"role_id","label-prop":"name",options:e.roles,placeholder:"Selecione o privilégio",error:e.form.errors.get("role_id")},model:{value:e.form.role_id,callback:function(n){e.$set(e.form,"role_id",n)},expression:"form.role_id"}},[e._v(" Privilégio de usuário ")]),t("div",{staticClass:"row mt-4"},[t("div",{staticClass:"col"},[t("AppButton",{attrs:{"btn-class":"fw-bold",color:"success",block:"",loading:e.isLoading},on:{click:function(n){return n.preventDefault(),e.onSubmit.apply(null,arguments)}}},[e._v(" Cadastrar ")])],1),t("div",{staticClass:"col"},[t("AppButton",{attrs:{type:"button","data-bs-dismiss":"modal",block:"",color:"light"}},[e._v(" Cancelar ")])],1)])],1)},B=[],Z={props:{roles:{type:Array,default:()=>[]}},data(){return{isLoading:!1,form:new A.Z({name:"",email:"",password:"",password_confirmation:"",role_id:""})}},methods:{async onSubmit(){const e=this.form.data();this.isLoading=!0;try{await this.$apollo.mutate({mutation:s.userCreate,variables:{input:e}}),this.$helpers.clearCacheFrom({fieldName:"users"}),(0,_.s)(this,{message:"Usuário cadastrado!",resetForm:!0})}catch(n){(0,_.S)(this,n)}this.isLoading=!1}}},q=Z,P=(0,f.Z)(q,O,B,!1,null,null,null),z=P.exports,H={components:{NewUserForm:z},props:{value:{type:Boolean,default:!1},roles:{type:Array,default:()=>[]}},data(){return{icons:{faUserPlus:o.FKd}}},methods:{onSuccess(){this.$emit("success")}}},G=H,j=(0,f.Z)(G,I,V,!1,null,null,null),K=j.exports,Q={metaInfo:{title(){return"Usuários"}},components:{TheUsersCard:L,NewUserModal:K},apollo:{users:{query:s.users},roles:{query:r.roles}},data(){return{users:[],roles:[],icons:{faUserPlus:o.FKd},newUserModal:!1}},computed:{isLoading(){return!!this.$apollo.queries.users.loading}},methods:{onNewUserSuccess(){this.newUserModal=!1},onNewUserClick(){this.newUserModal=!0}}},X=Q,J=(0,f.Z)(X,a,i,!1,null,null,null),W=J.exports}}]);
//# sourceMappingURL=users.af1610c9.js.map