module Api
  class DashboardController < ApplicationController
    def stats
      render json: {
        totalProducts: Product.count,
        totalSales: OrderItem.sum(:quantity),
        totalRevenue: Order.where(status: "completed").sum(:total),
        totalCustomers: User.where(role: "user").count,
        recentOrders: Order.where(status: "completed").order(created_at: :desc).limit(5).map do |order|
          {
            id: order.id,
            total: order.total,
            date: order.created_at.strftime("%Y-%m-%d"),
            items: order.order_items.count
          }
        end,
        topProducts: Product.joins(:order_items)
          .group('products.id')
          .order('SUM(order_items.quantity) DESC')
          .limit(5)
          .select('products.*, SUM(order_items.quantity) as total_sold')
          .map do |product|
            {
              id: product.id,
              name: product.name,
              total_sold: product.total_sold,
              revenue: product.order_items.sum('order_items.quantity * order_items.price')
            }
          end,
        monthlyRevenue: Order.where(status: "completed")
          .where('created_at >= ?', 1.month.ago)
          .sum(:total),
        monthlySales: OrderItem.joins(:order)
          .where(orders: { status: "completed" })
          .where('orders.created_at >= ?', 1.month.ago)
          .sum(:quantity)
      }
    end
  end
end
