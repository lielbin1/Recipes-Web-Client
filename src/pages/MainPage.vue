<template>
  <div class="container">
    <div id="welcome" align="center" justify="center"><img src="..\assets\welcome2.png" width = "900" height = "300" /></div>
    <b-row>
      <b-col  class="RandomRecipesCol">
        <RecipePreviewList route_name="/recipes/random" title="Random Recipes" class="RandomRecipes center" />
        <b-button tag="button" pill @click="new_random_recipes"
          style="
          width:65%;
          padding: 15px 15px;
          background-color: #F19CBB;
          border-color: #F19CBB;
          font-weight: bold;
          color: #080807;
          margin: 15px 50px 50px 100px;"> New Random Recipes 
        </b-button>
      </b-col>
      <b-col  >
        <!-- this is the false above ths title of last viewed -->
        <RecipePreviewList route_name="/users/lastWatched" title="Last Viewed Recipes" class="LastViewedRecipes center"
          :class="{
            // RandomRecipes: true,
            blur: !$root.store.username,
            center: true}"/>
        <b-button v-if="!$root.store.username" to="/login" tag="button" pill 
           style="
            width:65%;
            padding: 15px 15px;
            background-color: #F19CBB;
            border-color: #F19CBB;
            font-weight: bold;
            color: #080807;
            margin: 15px 50px 50px 100px;">Click to log in and see the last viewed recipes </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList,
   
  },
   methods: {
    new_random_recipes(){
      // this.$children.updateRandomRecipes()
      window.location.reload();

    }
    }
};
</script>

<style lang="scss" scoped>

.container {
  border-radius: 25px;
  // border-style: solid;
  // border-color: darkgrey;
  // padding: 20px;
  max-width: 1900px;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
  // opacity: 0;
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
img {
  // border-radius: 1px;
}
.title{
  color:#F2975B;
  font-weight: bolder;

}
.big-title{
  font-family:Georgia, 'Times New Roman', Times, serif;
  font-size: 48px;
  color:#F25360;
}

</style>
