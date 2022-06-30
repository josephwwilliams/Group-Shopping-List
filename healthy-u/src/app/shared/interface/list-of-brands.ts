export interface listOfBrands {
  count: number;
  tags: [
    {
      id: string;
      known: number;
      name: string;
      products: number;
      url: string;
    }
  ];
}
