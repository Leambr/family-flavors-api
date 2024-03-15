import { RecipeBody } from '../Recipe/recipe.interface';

export interface DishTypeBody {
    id?: number;
    name: string;
    recipes?: RecipeBody[];
}
