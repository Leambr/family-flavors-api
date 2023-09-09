export class RecipeIngredient {
    constructor(id, recipe_id, ingredient_id, quantity, measurement_unit) {
        this.id = id; // Identifiant de la liaison (auto-incrémenté)
        this.recipe_id = recipe_id; // Identifiant de la recette associée
        this.ingredient_id = ingredient_id; // Identifiant de l'ingrédient associé
        this.quantity = quantity; // Quantité de l'ingrédient dans la recette
        this.measurement_unit = measurement_unit; // Unité de mesure de la quantité
    }
}
