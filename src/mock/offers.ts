interface OfferType {
  id: number;
  amount: number;
  bonus?: number;
  price: string;
  stars: number;
  title?: string;
  description?: string;
}

export const offersConfig: OfferType[] = [
  {
    id: 1,
    amount: 2500,
    price: '$2.49',
    stars: 124,
  },
  {
    id: 2,
    amount: 10500,
    price: '$9.99',
    stars: 499,
  },
  {
    id: 3,
    amount: 27500,
    price: '$24.99',
    stars: 1249,
  },
  {
    id: 4,
    amount: 86250,
    price: '$74.99',
    stars: 3749,
  },
  {
    id: 5,
    amount: 240000,
    price: '$199.99',
    stars: 9999,
  },
  {
    id: 6,
    amount: 750000,
    price: '$599.99',
    stars: 29999,
  }
]
