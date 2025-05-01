class Api::DashboardController < ApplicationController
  def stats
    render json: {
      totalProducts: Product.count,
      totalSales: OrderItem.sum(:quantity),
      totalRevenue: Order.where(status: "completed").sum(:total),
      totalCustomers: User.where(role: "user").count
    }
  end
end
