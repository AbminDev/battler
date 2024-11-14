import { CardsAction } from "../../enums/cardsActions";

export interface Item {
    id: number;
    value: string;
    action: CardsAction;
  }

export const cards: Item[] = [
    { id: 1, value: "Item 1", action: CardsAction.shop },
    { id: 2, value: "Item 2", action: CardsAction.shop },
    { id: 3, value: "Item 3", action: CardsAction.shop },
    { id: 4, value: "Item 4", action: CardsAction.heal },
    { id: 5, value: "Item 5", action: CardsAction.loot },
    { id: 6, value: "Item 6", action: CardsAction.loot },
    { id: 7, value: "Item 7", action: CardsAction.loot },
    { id: 8, value: "Item 8", action: CardsAction.loot },
    { id: 9, value: "Item 9", action: CardsAction.heal },
    { id: 10, value: "Item 10", action: CardsAction.shop },
    { id: 11, value: "Item 11", action: CardsAction.fight },
    { id: 12, value: "Item 12", action: CardsAction.fight },
    { id: 13, value: "Item 13", action: CardsAction.fight },
    { id: 14, value: "Item 14", action: CardsAction.fight },
    { id: 15, value: "Item 15", action: CardsAction.fight },
    { id: 16, value: "Item 16", action: CardsAction.fight },
    { id: 17, value: "Item 17", action: CardsAction.fight },
    { id: 18, value: "Item 18", action: CardsAction.fight },
    { id: 19, value: "Item 19", action: CardsAction.fight },
    { id: 20, value: "Item 20", action: CardsAction.fight },
  ];

  export const cards1: Item[] = [
    { id: 1, value: "Item 1.1", action: CardsAction.shop },
    { id: 2, value: "Item 2.1", action: CardsAction.shop },
    { id: 3, value: "Item 3.1", action: CardsAction.shop },
    { id: 4, value: "Item 4.1", action: CardsAction.heal },
    { id: 5, value: "Item 5.1", action: CardsAction.loot },
    // додати ще елементи якщо потрібно
  ];

  export const cards2: Item[] = [
    { id: 1, value: "Item 1.2", action: CardsAction.shop },
    { id: 2, value: "Item 2.2", action: CardsAction.shop },
    { id: 3, value: "Item 3.2", action: CardsAction.shop },
    { id: 4, value: "Item 4.2", action: CardsAction.heal },
    { id: 5, value: "Item 5.2", action: CardsAction.loot },
    // додати ще елементи якщо потрібно
  ];

  export const cards3: Item[] = [
    { id: 1, value: "Item 1.3", action: CardsAction.shop },
    { id: 2, value: "Item 2.3", action: CardsAction.shop },
    { id: 3, value: "Item 3.3", action: CardsAction.shop },
    { id: 4, value: "Item 4.3", action: CardsAction.heal },
    { id: 5, value: "Item 5.3", action: CardsAction.loot },
    // додати ще елементи якщо потрібно
  ];