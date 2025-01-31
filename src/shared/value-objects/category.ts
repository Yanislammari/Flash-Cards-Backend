enum Category {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
  FOURTH = "FOURTH",
  FIFTH = "FIFTH",
  SIXTH = "SIXTH",
  SEVENTH = "SEVENTH",
  DONE = "DONE",
}

export const incrementCategory = (category: Category): Category => {
  if(category === Category.DONE) {
    return Category.DONE;
  }
  const index: number = Object.values(Category).findIndex((categoryCard) => categoryCard === category);
  category = Object.values(Category)[index + 1];
  return category;
}

export default Category;
