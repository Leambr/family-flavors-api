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
