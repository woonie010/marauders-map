// Categories

export interface CategoryIndividualsCountProps {
  categories: CategoriesProps[];
}

export interface CategoriesProps {
  name: string;
  num_individuals: number;
}

export interface IndividualCategoryProps {
  individualCategories: CategoriesProps[];
}
