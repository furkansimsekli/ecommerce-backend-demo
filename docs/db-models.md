# Mongo Models
Field names are self-explanatory, that's why I didn't write what they for.
The one thing to notice is that these models can have much more fields. However, for the sake of simplicity I won't keep the list very long. The concept is the key here not details, because this is not a production app.

## User
- id: String
- firstName: String
- lastName: String
- phone: String
- email: String
- passwordHash: String
- favoriteProductIdList: Array[String]
- cardProductIdList: Array[String]
- boughtProducts: Array[String]
- country: String
- city: String
- zip: String
- street: String
- apartment: String

## Product
- id: String
- category: String
- name: String
- image: String
- price: Float

## Order
- id: String
- ownerId: String
- productIdList: Array[String]
- country: String
- city: String
- zip: String
- street: String
- apartment: String

## Review
- id: String
- productId: String
- author: String
- context: String
