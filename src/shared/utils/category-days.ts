import Category from "../../domain/value-objects/category";

const getDaysForCategory = (category: Category): number | undefined => {
  switch (category) {
    case Category.FIRST: {
      return 1;
    }
    case Category.SECOND: {
      return 2;
    }
    case Category.THIRD: {
      return 4;
    }
    case Category.FOURTH: {
      return 8;
    }
    case Category.FIFTH: {
      return 16;
    }
    case Category.SIXTH: {
      return 32;
    }
    case Category.SEVENTH: {
      return 64;
    }
    case Category.DONE: {
      return undefined;
    }
  }
};

export default getDaysForCategory;
