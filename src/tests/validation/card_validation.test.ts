import cardValidation from "../../domain/validations/card.validation";
import Category from "../../domain/value-objects/category";


describe('cardValidation tests', () => {

  it('should validate a valid card', () => {
    const card = {
      category: Category.FIRST,
      question: "What is 2 + 2?",
      answer: "4",
      tag: "math"
    };

    const { error, value } = cardValidation.validate(card);

    expect(error).toBeUndefined();
    expect(value.category).toBe(Category.FIRST);
    expect(value.question).toBe("What is 2 + 2?");
    expect(value.answer).toBe("4");
    expect(value.tag).toBe("math");
  });


  it('should set the default category if not provided', () => {

    const card = {
      question: "What is 2 + 2?",
      answer: "4",
      tag: "math"
    };

    const { error, value } = cardValidation.validate(card);

    expect(error).toBeUndefined();
    expect(value.category).toBe(Category.FIRST);
  });

  it('should accept all categories values', () => {
    const validCategories = Object.values(Category);

    validCategories.forEach(category => {
      const card = {
        category,
        question: "What is 2 + 2?",
        answer: "4",
        tag: "math"
      };

      const { error } = cardValidation.validate(card);
      expect(error).toBeUndefined();
    });
  });

  it('should return an error if question is missing', () => {
    const card = {
      Category: Category.FIRST,
      answer: "4",
      tag: "math"
    };

    const { error } = cardValidation.validate(card);

    expect(error).toBeDefined();
    expect(error!.details[0].message).toBe('"question" is required');
  });

  it('should not validate a valid card with question empty', () => {
    const card = {
      category: Category.FIRST,
      question: "",
      answer: "aaaa",
      tag: "math"
    };

    const { error } = cardValidation.validate(card);

    expect(error).toBeDefined();
    expect(error!.message).toBe('"question" is not allowed to be empty');
  });

  it('should return an error if answer is missing', () => {
    const card = {
      category: Category.SECOND,
      question: "What is 2 + 2?",
      tag: "math"
    };

    const { error } = cardValidation.validate(card);

    expect(error).toBeDefined();
    expect(error!.details[0].message).toBe('"answer" is required');
  });

  it('should not validate a valid card with answer empty', () => {
    const card = {
      category: Category.FIRST,
      question: "Add of question",
      answer: "",
      tag: "tag"
    };

    const { error } = cardValidation.validate(card);

    expect(error).toBeDefined();
    expect(error!.message).toBe('"answer" is not allowed to be empty');
  });

  it('should return an error if tag is missing', () => {
    const card = {
      category: Category.FIRST,
      question: "What is 2 + 2?",
      answer: "4",
    };

    const { error } = cardValidation.validate(card);

    expect(error).toBeDefined();
    expect(error!.details[0].message).toBe('"tag" is required');
  });

  it('should not validate a valid card with tag empty', () => {
    const card = {
      category: Category.FIRST,
      question: "Add of question",
      answer: "answer",
      tag: ""
    };

    const { error } = cardValidation.validate(card);

    expect(error).toBeDefined();
    expect(error!.message).toBe('"tag" is not allowed to be empty');
  });

  it('should return an error if category is invalid', () => {
    const card = {
      category: "invalid_category",
      question: "What is 2 + 2?",
      answer: "4",
      tag: "math"
    };

    const { error } = cardValidation.validate(card);

    expect(error).toBeDefined();
    expect(error!.details[0].message).toContain("must be one of [FIRST, SECOND");
  });
});
