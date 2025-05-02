# Merchandise Dashboard

A full-stack application for managing merchandise inventory and orders.

## Live Demo

- Frontend: https://merchandise-dashboard-frontend.onrender.com
- Backend API: https://merchandise-dashboard.onrender.com

## Features

- User authentication and authorization
- Product management
- Order tracking
- Dashboard with statistics
- Responsive design

## Tech Stack

### Frontend
- React
- Material-UI
- Axios
- React Router
- Context API

### Backend
- Ruby on Rails
- PostgreSQL
- JWT Authentication
- Rack CORS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Ruby (v3.0 or higher)
- PostgreSQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/merchandise-dashboard.git
cd merchandise-dashboard
```

2. Install backend dependencies
```bash
bundle install
```

3. Set up the database
```bash
rails db:create
rails db:migrate
rails db:seed
```

4. Install frontend dependencies
```bash
cd client
npm install
```

5. Start the development servers

Backend:
```bash
rails server -p 3001
```

Frontend:
```bash
cd client
npm start
```

## Deployment

The application is deployed on:
- Frontend: Render
- Backend: Render

## License

This project is licensed under the MIT License.

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

## Acknowledgments

- Ruby on Rails team for the amazing framework
- React team for the frontend library
- Tailwind CSS team for the utility-first CSS framework
