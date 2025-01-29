import Card from "../../../domain/entities/card.entity";
import CardSchema from "../../../infrastructure/schemas/card.schema";
import CardMapper from "../../../shared/mappers/card.mapper";
import Category from "../../../shared/value-objects/category";

describe('card mapper',()=>{

  it('should map card schema to card domain',()=>{

    let card : CardSchema = new CardSchema;
    card.id = 'randomID';
    card.category = Category.FIRST;
    card.question = 'question';
    card.answer = 'answer';
    card.tag = 'tag';

    let cardDomain = CardMapper.toDomain(card);

    expect(cardDomain.id).toBe(card.id);
    expect(cardDomain.category).toBe(card.category);
    expect(cardDomain.question).toBe(card.question);
    expect(cardDomain.answer).toBe(card.answer);
    expect(cardDomain.tag).toBe(card.tag);

  });

  it('should map card schema list to card domain list',()=>{
    let cards : CardSchema[] = [];

    let card : CardSchema = new CardSchema;
    card.id = 'randomID';
    card.category = Category.FIRST;
    card.question = 'question';
    card.answer = 'answer';
    card.tag = 'tag';

    cards.push(card);
    card.id = 'randomID2';
    cards.push(card);
    card.id = 'randomID3';
    cards.push(card);

    let cardDomainList = CardMapper.toDomainList(cards);

    expect(cardDomainList.length).toBe(cards.length);
    expect(cardDomainList[0].id).toBe(cards[0].id);
    expect(cardDomainList[1].id).toBe(cards[1].id);
    expect(cardDomainList[2].id).toBe(cards[2].id);

  });
  
  it('should map card domain to card schema',async ()=>{

    let card : Card = {
      id: 'randomID',
      category: Category.FIRST,
      question: 'question',
      answer: 'answer',
      tag: 'tag'
    };

    let cardSchema = await CardMapper.toSchema(card);

    expect(cardSchema.id).toBe(card.id);
    expect(cardSchema.category).toBe(card.category);
    expect(cardSchema.question).toBe(card.question);
    expect(cardSchema.answer).toBe(card.answer);
    expect(cardSchema.tag).toBe(card.tag);

  });

  it('should map card domain list to card schema list',async ()=>{

    let cards : Card[] = [];

    let card : Card = {
      id: 'randomID',
      category: Category.FIRST,
      question: 'question',
      answer: 'answer',
      tag: 'tag'
    };

    cards.push(card);
    card.id = 'randomID2';
    cards.push(card);
    card.id = 'randomID3';
    cards.push(card);

    let cardSchemaList = await CardMapper.toSchemaList(cards);

    expect(cardSchemaList.length).toBe(cards.length);
    expect(cardSchemaList[0].id).toBe(cards[0].id);
    expect(cardSchemaList[1].id).toBe(cards[1].id);
    expect(cardSchemaList[2].id).toBe(cards[2].id);

  });

});