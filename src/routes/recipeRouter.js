import { Router } from 'express';
import { recipeController } from '../controllers/RecipeController.js';

const router = Router();

router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipe/:id', recipeController.getRecipeById);
// router.post('/recipes', controller);
// router.put('/recipes/:id', controller);
// router.delete('/recipes/:id', controller);

export default router;
