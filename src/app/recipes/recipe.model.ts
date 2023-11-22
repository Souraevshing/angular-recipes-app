import { Ingredient } from '../shared/ingredient.model';

class Recipe {
  constructor(
    public name: string,
    public description: string,
    public image: string,
    public ingredients: Ingredient[]
  ) {}
}

export { Recipe };
