<template>
    <center>
      <br/>
      <br/>
    <div class="recipe-footer">
      <h4 id="big-title" :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </h4>
      <br/>
      <div pill class="recipe-body">
          <!-- <img v-if="image_load" :src="recipe.image" class="recipe-image" /> -->
          <img :src="recipe.image" style="height:500px; width:600px;" class="recipe-image" />
      </div>
      <br/>
      <ul class="recipe-overview">
        <b-list-group >
          <dt><img src="../assets/clock.png" style="width: 30px"/>     {{ recipe.readyInMinutes }} minutes to prepare</dt>
          <dt><img src="../assets/servings.png" style="width: 30px"/>   {{ recipe.servings }} servings</dt>
          <dt>{{ recipe.aggregateLikes }} <img src="../assets/like.png" style="width: 30px"/> this recipe</dt>
          <dt v-if="recipe.vegan"><img src="../assets/vegan.png" style="width: 30px"/>   Vegan</dt>
          <dt v-if="recipe.vegetarian"><img src="../assets/vegetarian.png" style="width: 30px"/> Vegeterian</dt>
          <dt v-if="recipe.glutenFree"><img src="../assets/gluten-free.png" style="width: 30px"/> Gluten Free</dt>
          <dt v-if="recipe.is_favorite"><img src="../assets/star.png" style="width: 30px"/>  Favorite Recipe</dt>
          <dt v-if="recipe.is_watched"><img src="../assets/check.png" style="width: 25px"/>   Viewed Recipe</dt>
          <br/>
         <center>
             <b-button pill v-if="API_route" id="favoritesButton" size="sm" @click="AddToFavorites" class="btn-warning w-15 h-20"> add to favorites</b-button>
          </center>
        </b-list-group >
        <!-- extendedIngredients -->
         <br/>
        <h5 id="IngredientsTitle">Ingredients</h5> <br/>
        <b-col>
        <center>
        <div v-for="ing in recipe.extendedIngredients" :key="ing.name">
          {{ing.amount }} {{ing.name }}
        </div>
        </center>
        <br/>
        <div id="instructions" > <h5 id="InstructionsTitle">Instructions</h5> <br/>
           {{ instructions }}</div>
           </b-col>
      </ul>
  </div>
  </center>
</template>

<script>
// import RecipePreview from "./RecipePreview.vue";
export default {
  name: "Recipeview",
  data() {
    return {
      recipe: {},
      instructions:"",
      recipe_id:"",
      API_route: false,
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {

      try {
        let split_route = (((this.$route.path).split("/")[2]).split("%2F"))[2]
        let split_recipe_id = ((this.$route.path).split("/"))[4]
                console.log(split_route)

         if(split_route == "lastWatched" || split_route =="random" || split_route =="favorites" || split_route =="search"){
          this.API_route = true;
          const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/FullRecipeDetailsAPI/" + split_recipe_id)
          let array_steps = response.data.instructions
          // console.log(response.data.instructions);
          for (const analyze of array_steps){
            for(const ste of analyze.steps){
              this.instructions = this.instructions + ste.step
            }
          }
        // console.log(response);
        this.recipe= response.data;
        this.recipe_id= response.data.id;    
        //add to last watch table
        if(this.$root.store.username){ //is user
          const response = await this.axios.post( 
          this.$root.store.server_domain + "/users/lastWatched/",
          {
            recipe_id: this.recipe_id,
          }
          );
          // console.log(response)
        }    
        }
        else{
          // console.log("else:")
          const response = await this.axios.get(
          this.$root.store.server_domain + "/users/FullRecipeDetailsDB/" + split_recipe_id)
          // console.log(response);

          this.recipe= response.data[0];
          if(split_route=="familyRecipes"){
            console.log(this.recipe.title.replace('family-',''))
            this.recipe.title = this.recipe.title.replace('family-','')
          }
          this.instructions = response.data[0].instructions;
          this.recipe_id= response.data[0].id;
        }
     
      } catch (error) {
        console.log(error);
      }
    },
    async AddToFavorites(){
       const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          this.$root.store.server_domain + "/users/favorites",
          {
            recipe_id: this.recipe_id
          }
        );
        window.location.reload();

    }
  }
};
</script>

<style scoped>
.favoritesButton{
  background-color:  #F19CBB;
  color: #0ad8d8;
}
 .recipe-title{
    color: #2f4f4f;
  font-weight: bolder;
 font-size: 32px;

 }
.recipe-overview{
  font-size: 20px;
}
#InstructionsTitle{
  font-family: "Comic Sans MS", cursive, sans-serif;
  color:#F25360; 
  text-shadow: -1px 0 black, 0 3px black, 1px 0 black, 0 -1px black;
  font-size: 48px;
  font-weight: bolder;
}
#IngredientsTitle{
  font-family: "Comic Sans MS", cursive, sans-serif;
  color:#F25360; 
  text-shadow: -1px 0 black, 0 3px black, 1px 0 black, 0 -1px black;
  font-size: 48px;
  font-weight: bolder;
}
 #instructions{
  max-width: 800px; 
  width:800px; 
 }
.btn-warning{
   background-color: #F19CBB;
   border-color: #F19CBB;
   width:200px;font-weight: bold;color: #080807;
}
 .recipe-footer{
background: #F19CBB;
background: -moz-linear-gradient(-45deg, #F19CBB 0%, #F9CB95 53%, #F19CBB 100%);
background: -webkit-linear-gradient(-45deg, #F19CBB 0%, #F9CB95 53%, #F19CBB 100%);
background: linear-gradient(135deg, #F19CBB 0%, #F9CB95 53%, #F19CBB 100%);
   max-width: 1000px; 
  width:1000px; 
  padding: 1em;
 }
#big-title{
  font-family: "Comic Sans MS", cursive, sans-serif;
  color:#F25360; 
  text-shadow: -1px 0 black, 0 3px black, 1px 0 black, 0 -1px black;
  font-size: 48px;
  font-weight: bolder;
}


</style>
