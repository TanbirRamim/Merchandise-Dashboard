# Create admin user if it doesn't exist
User.find_or_create_by!(email: "admin@example.com") do |user|
  user.name = "Admin User"
  user.password = "password123"
  user.role = "admin"
end

# Create regular user if it doesn't exist
User.find_or_create_by!(email: "user@example.com") do |user|
  user.name = "Regular User"
  user.password = "password123"
  user.role = "user"
end

# Create manager user if it doesn't exist
User.find_or_create_by!(email: "manager@example.com") do |user|
  user.name = "Manager User"
  user.password = "password123"
  user.role = "manager"
end

# Create your user if it doesn't exist
User.find_or_create_by!(email: 'tanbirramim420@gmail.com') do |user|
  user.name = 'Tanbir Ramim'
  user.password = 'password123'
  user.role = 'admin'
end

# Create products if they don't exist
products_data = [
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
]

products_data.each do |product_data|
  Product.find_or_create_by!(name: product_data[:name]) do |product|
    product.description = product_data[:description]
    product.price = product_data[:price]
    product.stock = product_data[:stock]
  end
end

# Create order if it doesn't exist
order = Order.find_or_create_by!(
  user: User.find_by(email: "user@example.com"),
  status: "completed",
  total: 74.97
)

# Create order items if they don't exist
order_items_data = [
  {
    product: Product.find_by(name: "T-Shirt"),
    quantity: 2,
    price: 19.99
  },
  {
    product: Product.find_by(name: "Cap"),
    quantity: 1,
    price: 14.99
  }
]

order_items_data.each do |item_data|
  OrderItem.find_or_create_by!(
    order: order,
    product: item_data[:product]
  ) do |order_item|
    order_item.quantity = item_data[:quantity]
    order_item.price = item_data[:price]
  end
end

puts "Seeds created/updated successfully!"