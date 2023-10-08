import { Router } from 'express';
import { recipeController } from '../controllers/RecipeController.js';

const router = Router();

router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipeById);
router.post('/recipes', recipeController.createRecipe);
router.put('/recipes/:id', recipeController.editRecipe);
router.delete('/recipes/:id', recipeController.deleteRecipeById);

export default router;
