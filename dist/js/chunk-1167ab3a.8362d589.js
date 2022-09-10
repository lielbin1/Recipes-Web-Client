(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1167ab3a"],{37906:function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"container"},[t("br"),t("br"),t("h1",{staticClass:"big-title text-center"},[e._v("Search Recipes")]),t("b-form",{on:{submit:function(r){return r.preventDefault(),e.onSearch(r)},reset:function(r){return r.preventDefault(),e.onReset(r)}}},[t("b-form-group",{staticClass:"search-field",attrs:{id:"input-group-query","label-cols-sm":"2",label:"query:","label-for":"query"}},[t("b-form-input",{attrs:{id:"query",type:"text"},model:{value:e.form.query,callback:function(r){e.$set(e.form,"query",r)},expression:"form.query"}})],1),t("b-row",{attrs:{"align-h":"around"}},[t("b-col",{attrs:{cols:"4",md:"4"}},[t("b-form-group",{staticClass:"search-field",attrs:{id:"input-group-cuisine","label-cols-sm":"3",label:"cuisine:","label-for":"cuisine"}},[t("b-form-select",{attrs:{id:"cuisine",options:e.cuisines},model:{value:e.form.cuisine,callback:function(r){e.$set(e.form,"cuisine",r)},expression:"form.cuisine"}})],1)],1),t("b-col",{attrs:{cols:"4",md:"4"}},[t("b-form-group",{staticClass:"search-field",attrs:{id:"input-group-diet","label-cols-sm":"2",label:"diet:","label-for":"diet"}},[t("b-form-select",{staticClass:"search-field",attrs:{id:"diet",options:e.diet},model:{value:e.form.diet,callback:function(r){e.$set(e.form,"diet",r)},expression:"form.diet"}})],1)],1),t("b-col",{attrs:{cols:"10",md:"4"}},[t("b-form-group",{staticClass:"search-field",attrs:{id:"input-group-intolerances","label-cols-sm":"4",label:"intolerances:","label-for":"intolerances"}},[t("b-form-select",{attrs:{id:"intolerances",options:e.intolerances},model:{value:e.form.intolerances,callback:function(r){e.$set(e.form,"intolerances",r)},expression:"form.intolerances"}})],1)],1)],1),t("b-row",{staticClass:"sort-num"},[t("b-col",[t("b-form-group",{staticClass:"search-field",attrs:{label:"number of results:"},scopedSlots:e._u([{key:"default",fn:function(r){var s=r.ariaDescribedby;return[t("b-form-radio",{attrs:{"aria-describedby":s,name:"some-radios",value:"5"},model:{value:e.form.selected_num,callback:function(r){e.$set(e.form,"selected_num",r)},expression:"form.selected_num"}},[e._v("5")]),t("b-form-radio",{attrs:{"aria-describedby":s,name:"some-radios",value:"10"},model:{value:e.form.selected_num,callback:function(r){e.$set(e.form,"selected_num",r)},expression:"form.selected_num"}},[e._v("10")]),t("b-form-radio",{attrs:{"aria-describedby":s,name:"some-radios",value:"15"},model:{value:e.form.selected_num,callback:function(r){e.$set(e.form,"selected_num",r)},expression:"form.selected_num"}},[e._v("15")])]}}])})],1),t("b-col",[t("b-form-group",{staticClass:"search-field",attrs:{label:"sort results by:"},scopedSlots:e._u([{key:"default",fn:function(r){var s=r.ariaDescribedby;return[t("b-form-radio",{attrs:{"aria-describedby":s,name:"some-radios2",value:"popularity"},model:{value:e.form.selected_sort,callback:function(r){e.$set(e.form,"selected_sort",r)},expression:"form.selected_sort"}},[e._v("popularity")]),t("b-form-radio",{attrs:{"aria-describedby":s,name:"some-radios2",value:"time"},model:{value:e.form.selected_sort,callback:function(r){e.$set(e.form,"selected_sort",r)},expression:"form.selected_sort"}},[e._v("time")])]}}])})],1),t("b-col",{attrs:{cols:"2",md:"5"}},[t("b-button",{staticClass:"btn-warning",attrs:{id:"button-search",pill:"",type:"submit"}},[e._v("search")])],1),t("b-col",{attrs:{cols:"2",md:"2"}},[t("b-button",{staticClass:"btn-primary",attrs:{pill:"",type:"reset"}},[e._v("Reset")])],1)],1)],1),e.form.submitError?t("b-alert",{staticClass:"mt-2",attrs:{squared:"",variant:"primary",dismissible:"",show:""}},[e._v(" Search failed: "+e._s(e.form.submitError)+" ")]):e._e(),t("br"),t("br"),t("br"),e.searchClicked?t("RecipePreviewList",{staticClass:"SearchResults center",attrs:{route_name:e.search_url_,title:"Search Results"}}):e._e(),t("br"),t("br")],1)},a=[],i=(t("96cf"),t("1da1")),o=t("2909"),n=["","African","American","British","Cajun","Caribbean","Chinese","Eastern European","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"],c=["","Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Low FODMAP","Whole30"],l=["","Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut","Wheat"],u=t("99d8"),d={name:"Search",components:{RecipePreviewList:u["a"]},data:function(){return{form:{query:"",cuisine:"",selected_sort:"",selected_num:"",diet:"",intolerance:"",submitError:void 0},cuisines:[{value:null,text:"",disabled:!0}],diet:[{value:null,text:"",disabled:!0}],intolerances:[{value:null,text:"",disabled:!0}],searchClicked:!1,errors:[],search_url_:""}},mounted:function(){var e,r,t;(e=this.cuisines).push.apply(e,Object(o["a"])(n)),(r=this.diet).push.apply(r,Object(o["a"])(c)),(t=this.intolerances).push.apply(t,Object(o["a"])(l)),this.check_local_storage()},methods:{url_Search:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var t;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t="",t=e.$root.store.username?"/users/search/?":"/recipes/guest/search/?",""!==e.form.query&&(t=t+"&query="+e.form.query),""!==e.form.cuisine&&(t=t+"&cuisine="+e.form.cuisine),""!==e.form.diet&&(t=t+"&diet="+e.form.diet),""!==e.form.intolerance&&(t=t+"&intolerance="+e.form.intolerance),""!==e.form.selected_sort&&(t=t+"&sort="+e.form.selected_sort),t+="&instructionsRequired=true&addRecipeInformation=true",""!==e.form.selected_num&&(t=t+"&number="+e.form.selected_num),r.abrupt("return",t);case 10:case"end":return r.stop()}}),r)})))()},Search:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,e.searchClicked&&(e.searchClicked=!1),r.next=4,e.url_Search();case 4:e.search_url_=r.sent,e.searchClicked=!0,e.$root.store.last_search(e.search_url_),r.next=12;break;case 9:r.prev=9,r.t0=r["catch"](0),console.log(r.t0.response);case 12:case"end":return r.stop()}}),r,null,[[0,9]])})))()},onSearch:function(){this.Search(),this.clearOnSearch()},clearOnSearch:function(){this.searchClicked=!1,this.search_url_=""},onReset:function(){this.search_url_="",this.searchClicked=!1,this.form={query:"",cuisine:"",selected_sort:"",selected_num:"",diet:"",intolerance:"",submitError:void 0}},check_local_storage:function(){this.$root.store.search_url_&&(this.search_url_=this.$root.store.search_url_,this.searchClicked=!0)}}},m=d,f=(t("5d7c"),t("2877")),b=Object(f["a"])(m,s,a,!1,null,"4c5af314",null);r["default"]=b.exports},"5d7c":function(e,r,t){"use strict";var s=t("cb51"),a=t.n(s);a.a},cb51:function(e,r,t){}}]);
//# sourceMappingURL=chunk-1167ab3a.8362d589.js.map