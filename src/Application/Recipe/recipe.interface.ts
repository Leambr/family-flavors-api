import { DishTypeBody } from '../DishType/dishType.interface';
import { SeasonBody } from '../Season/season.interface';

export interface RecipeBody {
    id?: number;
    title: string;
    dietType: string;
    serving: number;
    prepTime: number;
    cookTime: number;
    instruction: string;
    imageUrl: string;
    seasonId: number;
    dishTypeId: number;
}
