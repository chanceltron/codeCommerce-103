# React 103 - Code Commerce

I am buidling a full-stack project using React with TypeScript. This is a project meant as an educational and portfolio piece only and not for retail shopping.

### 🔍 This project focuses on a few major principles:

> - Working with APIs
> - Understanding and implementing TypeScript
> - Converting class components and implementing functional components
> - State management using React Context API
> - Using and understanding form and input management with React-Hook-Form
> - Implementing UI/UX with "Mobile-First" design principles

## 🛠 Requirements:

### Front-end

- [x] Build a homepage that shows product images, titles, and prices
- [x] Each item should have an Add to Cart button
- [x] There should be a navigation bar with a cart icon
- [x] The cart icon should update based on how many items are in it (ie 3, 5, 10)
- [x] Menu item for Login/Signup
- [x] User can sign up and log in
- [x] Each item should have a details page that has an Image, Title, Description, and Price. A user can add to the cart as well as change the quantity.

### Back-end

For the backend, you will use the open-source Node API [CommerceJS](https://commercejs.com/docs/sdk/getting-started)

Get started [HERE](https://commercejs.com/docs/sdk/getting-started/#account-setup) (Follow the 3 steps in Account Setup)
From your Dashboard you will need to:

- [x] Create 5 different product categories
- [x] Create 5 different products in each of those categories
- [x] Each product needs an image, title, description, quantity and price

```
**Note: You are using this pre-built back-end API to give your front-end
the data you need. You will not need to write any backend code.
```

### Full-Stack

- [x] You must get your front-end to "talk" to [CommerceJS's](https://commercejs.com/docs/sdk/getting-started) API. This means fetching products, parsing the JSON, and displaying those items in the UI of the app.
- [x] You CANNOT use their SDK or CDN. You must use a standard HTTP library such as Fetch or Axios and you must parse the JSON yourself. All HTTP request examples can be found in the [documentation](https://commercejs.com/docs/sdk/getting-started).
- [x] Use [Postman](https://www.postman.com/) or a similar tool to test that your API calls are working.
- [x] You will only need to fetch (GET request) data from CommerceJS to display the products in your website. You will not need to make any "POST", "UPDATE", "DELETE" requests.

### End result

A user should be able to use your front end just as they might use Amazon.com. i.e.:

- [x] Display items
- [x] Sort by category
- [ ] Product search
- [x] Add items to cart
- [x] Update cart item quantity
- [x] Remove items from cart
- [ ] Proceed to checkout (price summary + your local tax zone rate).
  - [x] Price Summary
  - [x] Cart Summary Page
  - [x] Shipping Form Page
  - [ ] Payment Form Page
  - [ ] Confirmation Page
- [ ] HTTP and UI error handling. (i.e. UI handling for: user entered quantity that exceeds quantity in DB. Products failed to load. Error adding item to cart, etc)
- [x] All API actions are found in the CommerceJS API documentation and the data is saved on the backend.
