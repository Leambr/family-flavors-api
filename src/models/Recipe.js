export class Recipe {
    constructor(
        id,
        title,
        category,
        diet_type,
        serving,
        prep_time,
        cook_time,
        method,
        image_url,
        season_id
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.diet_type = diet_type;
        this.serving = serving;
        this.prep_time = prep_time;
        this.cook_time = cook_time;
        this.method = method;
        this.image_url = image_url;
        this.season_id = season_id;
    }
}
