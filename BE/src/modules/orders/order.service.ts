import sequelize from "../../DB/connection";
import { Book, Order } from "../../DB/index"; 
import {
  BadRequestError,
  ResourceNotFoundError,
} from "../../ExceptionHandler/customError";
import { OrderResponseDTO, OrderStatus } from "./order.dto";

export class OrderService {
  async placeOrder(
    userId: number,
    items: { bookId: number; quantity: number }[],
  ): Promise<OrderResponseDTO[]> {
    // Return array of orders

    // create transaction
    const transaction = await sequelize.transaction();

    try {
      const orders: OrderResponseDTO[] = [];

      for (const item of items) {
        const book = await Book.findByPk(item.bookId, { transaction });

        if (!book) {
          throw new ResourceNotFoundError(`Book: ${item.bookId} not found!`);
        }

        const currentStock = book.getDataValue("stock");

        if (currentStock < item.quantity) {
          throw new BadRequestError(
            `Insufficient stock for book ${item.bookId}`,
          );
        }

        const bookPrice = book.getDataValue("price");
        const additionalPrice = item.quantity * bookPrice;

        // Update stock
        await book.update(
          { stock: currentStock - item.quantity },
          { transaction },
        );

        // Check if user already has a PENDING order for this book
        const existingOrder = await Order.findOne({
          where: {
            user_id: userId,
            book_id: item.bookId,
            status: OrderStatus.PENDING,
          },
          transaction,
        });

        if (existingOrder) {
          // Update existing order - increase quantity and price
          const existingQuantity = existingOrder.getDataValue("quantity");
          const existingPrice = existingOrder.getDataValue("price_at_purchase");
          const newQuantity = existingQuantity + item.quantity;
          const newPrice = existingPrice + additionalPrice;

          await existingOrder.update(
            {
              quantity: newQuantity,
              price_at_purchase: newPrice,
            },
            { transaction },
          );

          orders.push({
            user_id: userId,
            book_id: item.bookId,
            status: OrderStatus.PENDING,
            quantity: newQuantity,
            price_at_purchase: newPrice,
          });
        } else {
          // Create new order
          const order = await Order.create(
            {
              user_id: userId,
              book_id: item.bookId,
              status: OrderStatus.PENDING,
              quantity: item.quantity,
              price_at_purchase: additionalPrice,
            },
            { transaction },
          );

          orders.push({
            user_id: userId,
            book_id: item.bookId,
            status: OrderStatus.PENDING,
            quantity: item.quantity,
            price_at_purchase: additionalPrice,
          });
        }
      }

      // Commit transaction - all succeeded
      await transaction.commit();

      return orders;
    } catch (error) {
      // Rollback - something failed
      await transaction.rollback();
      throw error;
    }
  }

  async deleteOrder(id: number): Promise<number> {
    const existingOrder = await Order.findByPk(id);

    if (!existingOrder) throw new ResourceNotFoundError("Order doesn't exist!");

    existingOrder.destroy();

    return id;
  }

  async getAllOrders(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
      limit: limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    if (rows.length === 0) {
      throw new ResourceNotFoundError("No orders found in database");
    }

    return {
      data: rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(count / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  async getOrdersByUserId(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
      where: { user_id: userId },
      include: [
        {
          model: Book,
          as: "book",
          attributes: ["id", "book_name", "price", "description"],
        },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    if (rows.length === 0) {
      throw new ResourceNotFoundError("No orders found for this user");
    }

    return {
      data: rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(count / limit),
        hasPrevPage: page > 1,
      },
    };
  }
}

export const orderService = new OrderService();
