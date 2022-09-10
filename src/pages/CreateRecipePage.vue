<template>
  <div>  
    <b-modal id="modal-1"  ref="my-modal" title="Create New Recipe" hide-footer>
    <b-form @submit.prevent="onCreate" @reset.prevent="onResetCreate" >
        <b-form-group>
        <b-form-input
            id="input-1"
            v-model="form.recipename"
            type="text"
            placeholder="Enter recipe name"
            required
        ></b-form-input>
        </b-form-group> 

        <b-form-group>
        <b-form-input
            id="input-2"
            v-model="form.servings"
            type="number"
            placeholder="Enter servings number"
            required
        ></b-form-input>
        </b-form-group> 

        <b-form-group>
        <b-form-input
            id="input-3"
            v-model="form.readyInMinutes"
            type="number"
            placeholder="Enter preparation time in minutes "
            required
        ></b-form-input>
        </b-form-group> 

        <b-form-group>
        <b-form-input
            id="input-4"
            v-model="form.image"
            type="url"
            placeholder="Enter the URL image of the recipe "
            required
        ></b-form-input>
        </b-form-group>

        <b-form @submit.prevent="add_ingredient">
          <b-row>
            <b-col>
          <b-form-group>
          <b-form-input v-model="form2.ingredient" style="width:220px;" type="text"  placeholder="Enter ingredient" required></b-form-input>
          </b-form-group>

          <b-form-group>
          <b-form-input v-model="form2.amount" style="width:220px;" type="number"  placeholder="Enter amount" required ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-button class="btn-info" pill type="submit" style="background-color: #0d9488;border-color: #0d9488;font-weight: bold;color: #080807;" @click="add_ingredient">ADD</b-button>

          </b-form-group>
          </b-col>
          <b-col>
          <p><b>ingredients that you already added:</b>
          <br/>
          {{this.display_ingredients}}
          </p>
          </b-col>
          </b-row>
        </b-form>

        <b-form-group>
          <b-form-textarea
          id="textarea"
          v-model="form.insrtaction"
          placeholder="Enter insrtaction of recipe..."
          rows="4"
          required
          ></b-form-textarea>
        </b-form-group>
    <b-form-checkbox v-model="form.checked_gluten" name="check-button1" switch>
        gluten free 
    </b-form-checkbox>       
    <b-form-checkbox v-model="form.checked_vegan" name="check-button2" switch>
        vegan 
    </b-form-checkbox>
    <b-form-checkbox v-model="form.checked_vegetarian" name="check-button3" switch>
        vegetarian 
    </b-form-checkbox>                  
    <b-row>

      <b-col lg="3" class="pb-2"><b-button pill style="background-color: #5D6166;border-color: #5D6166;font-weight: bold;color: #080807;" class="btn-warning" type="reset">Reset</b-button></b-col>
      <b-col lg="3" class="pb-2"><b-button pill type="submit" style="background-color: #F19CBB;border-color: #F19CBB;width:350%;font-weight: bold;color: #080807;" class="btn-primary">Create</b-button></b-col>
              
    </b-row>
    <!-- <b-button @click="Register" -->
    </b-form>            
    </b-modal>    
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        recipename: '',
        servings: '',
        readyInMinutes:'',
        image:'',
        checked_gluten: false,
        checked_vegetarian: false,
        checked_vegan: false,
        insrtaction:'',

        },
      form2: {
        ingredient:'',
        amount:''
      },
        ingredients:[],
        display_ingredients:""
      }
    },
  mounted() {
      this.onResetCreate();
  },
  methods: {
    async Create() {
      try {
        // console.log("chack")
        const user_id = await this.axios.get(
          this.$root.store.server_domain + "/users/userid"
        );
        // console.log(user_id.data)
        console.log(this.ingredients)
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          this.$root.store.server_domain + "/users/CreateRecipe",
        {
          user_id: user_id.data,
          image: this.form.image,
          title: this.form.recipename,
          readyInMinutes: this.form.readyInMinutes ,
          glutenFree: this.form.checked_gluten & 1,
          aggregateLikes: 0,
          instructions: this.form.insrtaction,
          servings: this.form.servings,
          vegan: this.form.checked_vegan & 1,
          vegetarian: this.form.checked_vegetarian & 1,
          
          // ingredients: req.body.ingredients -> "ingredients": [{"name": ,"amount":},{"name": ,"amount":}...]
          ingredients: this.ingredients
        }
        );
        // console.log(response)

        await this.onResetCreate();
        this.$refs['my-modal'].hide()
        // moves to login rout right after registration 
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onCreate(){   
      if(this.ingredients.length > 0){
        this.Create()
        this.$root.toast("Create", "Recipes created successfully", "success");
      }     
      else{
        this.$root.toast("error", "there is no ingredients", "error");
      }
      onResetCreate()
      window.location.reload();

    },
    async onResetCreate(){
     
      this.form={
        recipename: '',
        servings: '',
        readyInMinutes:'',
        image:'',
        checked_gluten: false,
        checked_vegetarian: false,
        checked_vegan: false,
        insrtaction:'',

      },
      this.form2={
        ingredient:'',
        amount:''
      }
      this.ingredients=[],
      this.display_ingredients=""
      
    },
    add_ingredient(){
      if(this.form2.ingredient !== "" && this.form2.amount !=="")
      {      
        let obj = {
        "name": this.form2.ingredient,
        "amount": this.form2.amount
        }   
       
      this.ingredients.push(obj);
      // console.log(this.form2.ingredient + ":" + this.form2.amount)
      this.display_ingredients = this.display_ingredients + this.form2.ingredient + ":" + this.form2.amount + ", "
      // this.display_ingredients.push(this.form2.ingredient + ":" + this.form2.amount)
      // const myJSON = JSON.stringify(this.ingredients);
      // document.getElementById("ing") = myJSON
      this.reset_ingredient();
      // console.log(obj);
      }
      else{
      }
    },
    reset_ingredient(){
      this.form2={
        ingredient:'',
        amount:''
      }
    }    
  }

}
</script>

<style>

</style>