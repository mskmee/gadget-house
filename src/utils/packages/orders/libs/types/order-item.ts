
type OrderItem = {
  id: number;
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  deliveryMethod: string,
  deliveryStatus: string,
  address: {
    addressLine: string,
    city: string,
    postalCode: string,
    countryName: string
  },
  postAddress: {
    city: string,
    department: string
  },
  isPaid: true,
  createdAt: string,
  total: number,
  orderItems: [
    {
      shortProductResponseDto: {
        id: number,
        name: string,
        price: number,
        images: [
          {
            link: string,
            order: number
          }
        ],
        available: true,
        rating: number
      },
      quantity: number,
      price: number
    }
  ],
  user: {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string
  }
};

export { type OrderItem };
