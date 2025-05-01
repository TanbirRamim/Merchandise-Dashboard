# Create admin user
User.create!(
  name: "Admin User",
  email: "admin@example.com",
  password: "password123",
  role: "admin"
)

# Create regular user
User.create!(
  name: "Regular User",
  email: "user@example.com",
  password: "password123",
  role: "user"
)

# Create manager user
User.create!(
  name: "Manager User",
  email: "manager@example.com",
  password: "password123",
  role: "manager"
)

# Create your user
User.create!(
  email: 'tanbirramim420@gmail.com',
  password: 'password123',
  name: 'Tanbir Ramim',
  role: 'admin'
)

# Create products
Product.create!([
  {
    name: "T-Shirt",
    description: "Comfortable cotton t-shirt",
    price: 19.99,
    stock: 100
  },
  {
    name: "Hoodie",
    description: "Warm and cozy hoodie",
    price: 49.99,
    stock: 50
  },
  {
    name: "Cap",
    description: "Stylish baseball cap",
    price: 14.99,
    stock: 75
  },
  {
    name: 'Water Bottle',
    description: 'Durable aluminum water bottle',
    price: 24.99,
    stock: 60
  },
  {
    name: 'Sticker Pack',
    description: 'Set of 5 vinyl stickers',
    price: 9.99,
    stock: 200
  }
])

# Create some orders
order = Order.create!(
  user: User.find_by(email: "user@example.com"),
  status: "completed",
  total: 74.97
)

OrderItem.create!([
  {
    order: order,
    product: Product.find_by(name: "T-Shirt"),
    quantity: 2,
    price: 19.99
  },
  {
    order: order,
    product: Product.find_by(name: "Cap"),
    quantity: 1,
    price: 14.99
  }
])

# Create default admin user
User.create!(
  email: 'admin@example.com',
  password: 'password123',
  name: 'Admin User',
  role: 'admin'
)

puts "Default admin user created successfully!"

puts "Seeds created successfully!"