import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import pageView from './views/pageView.js';
import addRecipeView from './views/addRecipeView.js';

/*if (module.hot) {
   module.hot.accept();
} */

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipe = async function () {
  try {
    //GET THE HASH
    const id = window.location.hash.slice(1);

    if (!id) return;

    ///LOADING SPINNER
    recipeView.renderSpinner();

    ///LOADING RECIPE
    await model.loadRecipe(id);

    ///RENDERING RECIPE

    recipeView.render(model.state.recipe);
  } catch (err) {
    return recipeView.renderError();
  }
};

//['hashchange','load'].forEach(ev => window.addEventListener(ev, recipe))

const controlSearch = async function () {
  try {
    ///GETTING THE DATA
    const query = await searchView.getQuery();
    if (!query) return;

    ///RENDERING SPINNER
    resultsView.renderSpinner();

    ///LOADING SEARCH RESULTS
    await model.loadSearch(query);

    resultsView.render(model.getSearchResults());

    ////RENDERING THE PAGINATION
    pageView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPage = function (goToPage) {
  ///LOADING NEW RESULTS
  resultsView.render(model.getSearchResults(goToPage));

  ///RENDERING NEW PAGINATION
  pageView.render(model.state.search);
};

const controlServings = function (servings) {
  ///UPDATING THE SERVINGS
  model.updateServings(servings);

  ///UPDATING THE RECIPE VIEW
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //upload the new recipe
    await model.uploadRecipe(newRecipe);

    //rendering recipe
    recipeView.render(model.state.recipe);

    //close form window
    addRecipeView.toggleWindow();

    //render bookmar view
    //bookmarksView.render(model.state.recipe)

    //change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`)
    //location.reload()

  } catch (err) {
    err.message = 'Fulfill correctly the form'
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);

  recipeView.addHandlerEvent(recipe);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView._addHandlerUpdateServings(controlServings);

  searchView.addHandlerSearch(controlSearch);

  pageView.addHandlerClick(controlPage);

  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();