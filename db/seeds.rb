# Create admin user
admin = User.create!(
  email: 'admin@example.com',
  password: 'password123',
  name: 'Admin User',
  role: 'admin'
)

# Create regular user
user = User.create!(
  email: 'user@example.com',
  password: 'password123',
  name: 'Regular User',
  role: 'user'
)

# Create your user
User.create!(
  email: 'tanbirramim420@gmail.com',
  password: 'password123',
  name: 'Tanbir Ramim',
  role: 'admin'
)

# Create products
products = [
  {
    name: 'T-Shirt',
    description: 'Comfortable cotton t-shirt',
    price: 19.99,
    stock: 100
  },
  {
    name: 'Hoodie',
    description: 'Warm hoodie for cold weather',
    price: 39.99,
    stock: 50
  },
  {
    name: 'Cap',
    description: 'Stylish cap with embroidered logo',
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
]

products.each do |product_data|
  Product.create!(product_data)
end

# Create some orders
order = Order.create!(
  user: user,
  total: 74.97,
  status: 'completed'
)

OrderItem.create!(
  order: order,
  product: Product.find_by(name: 'T-Shirt'),
  quantity: 2,
  price: 19.99
)

OrderItem.create!(
  order: order,
  product: Product.find_by(name: 'Cap'),
  quantity: 1,
  price: 14.99
)

# Create default admin user
User.create!(
  email: 'admin@example.com',
  password: 'password123',
  name: 'Admin User',
  role: 'admin'
)

puts "Default admin user created successfully!"

puts "Seeds created successfully!"