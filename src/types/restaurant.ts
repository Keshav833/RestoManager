export type RestaurantType = 'Cafe' | 'Fine Dining' | 'Fast Food' | 'Cloud Kitchen'

export type Restaurant = {
  id: string
  slug: string
  name: string
  ownerName: string
  mobile: string
  address: {
    line1: string
    area: string
    city: string
    state: string
    pincode: string
  }
  type: RestaurantType
  imageUrl: string
}
