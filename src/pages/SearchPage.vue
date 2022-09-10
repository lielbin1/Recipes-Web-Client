<template>
  <div class="container">
    <br/>
    <br/>
    <h1 class="big-title text-center">Search Recipes</h1>
    <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
      <b-form-group
        id="input-group-query"
        label-cols-sm="2"
        label="query:"
        label-for="query"
        class="search-field"
      >
        <b-form-input
          id="query"
          v-model="form.query"
          type="text"
        ></b-form-input>
      </b-form-group>
      <b-row align-h="around">
        <b-col cols="4" md="4">
          <b-form-group
            id="input-group-cuisine"
            label-cols-sm="3"
            label="cuisine:"
            label-for="cuisine"
            class="search-field">
            <b-form-select
              id="cuisine"
              v-model="form.cuisine"
              :options="cuisines"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="4" md="4">
          <b-form-group
          id="input-group-diet"
          label-cols-sm="2"
          label="diet:"
          label-for="diet"
          class="search-field" >
          <b-form-select
            id="diet"
            v-model="form.diet"
            :options="diet"
            class="search-field"
          ></b-form-select>
        </b-form-group>
        </b-col>
        <b-col cols="10" md="4" >
          <b-form-group
          id="input-group-intolerances"
          label-cols-sm="4"
          label="intolerances:"
          label-for="intolerances"
          class="search-field" >
          <b-form-select
            id="intolerances"
            v-model="form.intolerances"
            :options="intolerances"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row> 

    <b-row class="sort-num">
      <b-col >
      <b-form-group label="number of results:" class="search-field" v-slot="{ ariaDescribedby }">
        <b-form-radio v-model="form.selected_num" :aria-describedby="ariaDescribedby" name="some-radios" value="5">5</b-form-radio>
        <b-form-radio v-model="form.selected_num" :aria-describedby="ariaDescribedby" name="some-radios" value="10">10</b-form-radio>
        <b-form-radio v-model="form.selected_num" :aria-describedby="ariaDescribedby" name="some-radios" value="15">15</b-form-radio>
      </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="sort results by:" class="search-field" v-slot="{ ariaDescribedby }">
          <b-form-radio v-model="form.selected_sort" :aria-describedby="ariaDescribedby" name="some-radios2" value="popularity">popularity</b-form-radio>
          <b-form-radio v-model="form.selected_sort" :aria-describedby="ariaDescribedby" name="some-radios2" value="time">time</b-form-radio>
        </b-form-group>
     </b-col>  
      <!-- <b-button @click="Register" -->
      <b-col cols="2" md="5">
        <b-button
          id="button-search"
          pill type="submit"
          class="btn-warning"
          >search</b-button >
      </b-col>      
      <b-col  cols="2" md="2">
        <b-button class="btn-primary" pill type="reset" >Reset</b-button>
        </b-col >
      </b-row>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      squared variant="primary"
      dismissible
      show
    >
      Search failed: {{ form.submitError }}
    </b-alert>
    
    <!-- <RecipePreviewList v-else="$!root.store.username && searchClicked " route_name="/guest{{search_url}}" title="Search Results" class="SearchResults center" /> -->
<!-- v-if="$root.store.username && searchClicked" -->
 <!-- v-bind:class="{ route_name: search_url_ }" -->
 <!-- v-if="searchClicked"  -->
    <br/>
    <br/>   
    <br/>
    <RecipePreviewList v-if="searchClicked" v-bind:route_name="search_url_" title="Search Results" class="SearchResults center" />
    <br/>
    <br/>

  </div>
</template>

<script>
import cuisines from "../assets/cuisines";
import diet from "../assets/diet";
import intolerances from "../assets/intolerances";
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "Search",
    components: {
    RecipePreviewList
  },
  data() {
    return {
      form: {
        query: "",
        cuisine: "",
        selected_sort: "", 
        selected_num :"",
        diet: "",
        intolerance:"",
        submitError: undefined,     
      },
      cuisines: [{ value: null, text: "", disabled: true }],
      diet: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],
      searchClicked: false,
      errors: [],
      search_url_:"",

    };
  },
  mounted() {
    // console.log("mounted");
    this.cuisines.push(...cuisines);
    this.diet.push(...diet);
    this.intolerances.push(...intolerances);
    this.check_local_storage();
    // console.log($v);
  },
  methods: {
    // validateState(param) {
    //   const { $dirty, $error } = this.$v.form[param];
    //   return $dirty ? !$error : null;
    // },    
    async url_Search(){
      let search_url="";
      
      if(this.$root.store.username){ //is user
        search_url = "/users/search/?"
      }
      else{
        search_url= "/recipes/guest/search/?"
      }
      if(this.form.query !== ""){
          search_url = search_url + "&query=" + this.form.query
      }
      if(this.form.cuisine !== ""){
          search_url = search_url + "&cuisine=" + this.form.cuisine
      }
      if(this.form.diet !== ""){
          search_url = search_url + "&diet=" + this.form.diet
      }
      if(this.form.intolerance !== ""){
          search_url = search_url + "&intolerance=" + this.form.intolerance
      }
      //TODO: check if instructions not emty
      if(this.form.selected_sort !== ""){
          search_url = search_url + "&sort=" + this.form.selected_sort
      }
      search_url = search_url + "&instructionsRequired=true&addRecipeInformation=true"
      if(this.form.selected_num !== ""){
          search_url = search_url + "&number=" + this.form.selected_num
      }

      return search_url
    },
    // return extractPreviewRecipeDetails(response.data.results,user_id);

    async Search() {
        try {
        if(this.searchClicked){
           this.searchClicked = false;
        }
        this.search_url_ = await this.url_Search();
        this.searchClicked = true;
        this.$root.store.last_search(this.search_url_);
        // console.log(this.search_url_)
        

        // moves to login rout right after registration 
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        // this.form.submitError = err.response.data.message;
      }
      // console.log("register method called");
      // this.$v.form.$touch();
      // if (this.$v.form.$anyError) {
      //   return;
      // }
      // console.log("register method go");
    },
    onSearch(){
      this.Search()
      this.clearOnSearch()
  
    },
    clearOnSearch(){
      this.searchClicked= false,
      this.search_url_= ""
    },

    onReset() {
      this.search_url_= "",
      this.searchClicked= false,
      this.form = {
        query: "",
        cuisine: "",
        selected_sort: "", 
        selected_num :"",
        diet: "",
        intolerance:"",
        submitError: undefined,
      }; 
    },
    check_local_storage(){      
      if(this.$root.store.search_url_){
        this.search_url_=this.$root.store.search_url_;
        this.searchClicked = true;
        // this.onSearch();
         
        }
    },
  }
};
</script>


<style lang="scss" scoped>

.sort-num{
  max-width: 900px;
  border-radius: 45px;
}
.container {

  
  // background-color: #EFEFEF;
  border-radius: 25px;
  // border-style: solid;
  // border-color: darkgrey;
  // padding: 20px;
  max-width: 900px;
}


.btn-warning{
  width:65%;
  padding: 15px 15px;
  background-color: #F19CBB;
  border-color: #F19CBB;
  font-weight: bold;
  color: #080807;
  margin: 15px 15px 20px 90px;
}
.btn-primary{
  width:95%;
  padding: 15px 15px;
  font-weight: bold;
  color: #080807;
  margin: 15px 5px 20px 15px;
}
.search-field {
  color: black;
  // font-weight: bolder;
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-size: 15px;
    letter-spacing: 0.4px;
    word-spacing: -0.4px;
    color: #000000;
    font-weight: 700;
    text-decoration: none solid rgb(68, 68, 68);
    font-style: normal;
    font-variant: normal;
    text-transform: none;
}
.big-title{
  font-family: "Comic Sans MS", cursive, sans-serif;
  color:#F25360; 
  text-shadow: -1px 0 black, 0 3px black, 1px 0 black, 0 -1px black;
  font-size: 48px;
}
</style>

