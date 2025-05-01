class Api::ProductsController < ApplicationController
  before_action :set_product, only: [ :show, :update, :destroy ]
  before_action :admin_only, only: [ :create, :update, :destroy ]

  # GET /api/products
  def index
    @products = Product.all
    render json: @products
  end

  # GET /api/products/1
  def show
    render json: @product
  end

  # POST /api/products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/products/1
  def destroy
    @product.destroy
  end

  private
    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.require(:product).permit(:name, :description, :price, :stock)
    end

    def admin_only
      unless @current_user.role == "admin"
        render json: { error: "Unauthorized" }, status: :forbidden
      end
    end
end
