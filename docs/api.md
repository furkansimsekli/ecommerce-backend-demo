# API

## User
___
Register a new user: `POST /api/v1/users/register`

- Auth: **NO**
 
```json
{
    "firstName": "",
    "lastName": "",
    "password": "",
    "phone": "",
    "email": "",
    "country": "",
    "city": "",
    "zip": "",
    "street": "",
    "apartment": ""
}
```
___
Login with user credentials: `POST /api/v1/users/login`

- Auth: **NO**
```json
{
    "email": "",
    "password": ""
}
```
or
```json
{
    "phone": "",
    "password": ""
}
```
___
Get user's favorite list: `GET /api/v1/users/:id/favorites`

- Auth: **YES** (Bearer Token)
```json
{

}
```
___
Add product to favorites: `PUT /api/v1/users/:id/favorites`

- Auth: **YES** (Bearer Token)
```json
{
    "productId": ""
}
```
___
Delete all favorite products: `DELETE /api/v1/users/:id/favorites`

- Auth: **YES** (Bearer Token)
```json
{

}
```
___
Delete favorite product: `DELETE /api/v1/users/:id/favorites/:productId`

- Auth: **YES** (Bearer Token)
```json
{

}
```
___
Get user's card: `GET /api/v1/users/:id/card`

- Auth: **YES** (Bearer Token)
```json
{

}
```
___
Add product to the card: `PUT /api/v1/users/:id/card`

- Auth: **YES** (Bearer Token)
```json
{
    "productId": ""
}
```
___
Delete product from the card: `DELETE /api/v1/users/:id/card/:productId`

- Auth: **YES** (Bearer Token)
```json
{

}
```
___
Delete all products from the card: `DELETE /api/v1/users/:id/card`

- Auth: **YES** (Bearer Token)
```json
{

}
```
___
## Product
Get all the products: `GET /api/v1/products`

- Auth: **NO**
```json
{

}
```
___
Get a specific product: `GET /api/v1/products/:id`

- Auth: **NO**
```json
{

}
```
___
## Order
Get all the orders: `GET /api/v1/orders`

- Auth: **YES** (Bearer Token)
```json
{

}
```
___
Get a specific order: `GET /api/v1/orders/:id`

- Auth: **YES** (Bearer Token)
```json
{

}
```
___
Buy the card: `POST /api/v1/orders/:userId`

- Auth: **YES** (Bearer Token)
```json
{

}
```
___
## Review
Get all reviews: `GET /api/v1/reviews`
```json
{

}
```
___
Get all reviews for specific product: `GET /api/v1/reviews/:productId`
```json
{

}
```
___
Leave a review to specific product: `POST /api/v1/reviews/:productId`
```json
{
    "author": "",
    "context": ""
}
```
___