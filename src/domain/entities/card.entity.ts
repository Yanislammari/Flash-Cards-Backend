import Category from "../../shared/value-objects/category";

interface Card {
  id: string;
  category: Category;
  question: string;
  answer: string;
}

export default Card;
