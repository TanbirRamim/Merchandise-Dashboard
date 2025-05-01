# Merchandise Dashboard

A full-stack web application for managing merchandise inventory, tracking sales, and monitoring business metrics. Built with Ruby on Rails and React.js.

## Features

- **User Authentication**
  - Secure login system with role-based access control
  - Admin and regular user roles
  - Protected routes and API endpoints

- **Product Management**
  - Create, read, update, and delete products
  - Track product inventory and pricing
  - Search and sort products
  - Responsive product listing with pagination

- **Dashboard Statistics**
  - Real-time overview of key business metrics
  - Total products count
  - Total sales volume
  - Total revenue from completed orders
  - Customer count tracking

- **Order Management**
  - Track order status
  - View order details
  - Monitor completed orders

## Tech Stack

### Backend
- **Ruby on Rails 8.0**
  - RESTful API architecture
  - ActiveRecord for database management
  - JWT authentication
  - PostgreSQL database

### Frontend
- **React.js**
  - Modern, component-based architecture
  - React Router for navigation
  - Context API for state management
  - Axios for API communication

### UI/UX
- **Tailwind CSS**
  - Responsive design
  - Modern UI components
  - Custom animations and transitions
  - Dark mode support

### Development Tools
- Webpack for asset bundling
- ESLint for code linting
- Prettier for code formatting
- Git for version control

## Getting Started

### Prerequisites
- Ruby 3.2.2 or higher
- Node.js 16.x or higher
- PostgreSQL 14.x or higher
- Yarn or npm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/merchandise-dashboard.git
cd merchandise-dashboard
```

2. Install backend dependencies:
```bash
bundle install
```

3. Install frontend dependencies:
```bash
cd client
yarn install
```

4. Set up the database:
```bash
rails db:create
rails db:migrate
rails db:seed
```

5. Start the development servers:

Backend (from root directory):
```bash
rails server
```

Frontend (from client directory):
```bash
yarn start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Default Admin Credentials
- Email: admin@example.com
- Password: password123

## Project Structure

```
merchandise-dashboard/
├── app/                    # Rails application code
│   ├── controllers/       # API controllers
│   ├── models/           # Database models
│   └── serializers/      # JSON serializers
├── client/                # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   ├── pages/        # Page components
│   │   └── services/     # API services
├── config/                # Configuration files
├── db/                    # Database migrations and seeds
└── spec/                  # RSpec tests
```

## API Documentation

### Authentication
- `POST /api/login` - User login
- `GET /api/me` - Get current user info

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Ruby on Rails team for the amazing framework
- React team for the frontend library
- Tailwind CSS team for the utility-first CSS framework
