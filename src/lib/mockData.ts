import { Restaurant } from '@/types/restaurant'

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    slug: 'the-spice-garden',
    name: 'The Spice Garden',
    ownerName: 'Rahul Sharma',
    mobile: '9876543210',
    address: {
      line1: '12, MG Road',
      area: 'Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560038',
    },
    type: 'Fine Dining',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
  },
  {
    id: '2',
    slug: 'brew-and-bites',
    name: 'Brew & Bites',
    ownerName: 'Priya Menon',
    mobile: '9123456780',
    address: {
      line1: '45, Brigade Road',
      area: 'Church Street',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560025',
    },
    type: 'Cafe',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
  },
  {
    id: '3',
    slug: 'burger-barn',
    name: 'Burger Barn',
    ownerName: 'Amit Patel',
    mobile: '9001234567',
    address: {
      line1: '78, FC Road',
      area: 'Shivajinagar',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411005',
    },
    type: 'Fast Food',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800',
  },
]
