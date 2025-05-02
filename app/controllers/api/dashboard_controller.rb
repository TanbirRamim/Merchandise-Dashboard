module Api
  class DashboardController < ApplicationController
    def stats
      stats = {
        "total_products" => Product.count,
        "total_sales" => Order.completed.sum(:total_amount),
        "total_revenue" => Order.completed.sum(:total_amount),
        "total_customers" => User.where(role: "customer").count
      }
      render json: stats
    end
  end
end
