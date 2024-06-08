import ValidationError from "../infrastructure/validationError";
import Order from "../models/order";
import IOrderService from "../services/contracts/orderServiceInterface";

export default class OrderController {
    private readonly _orderService: IOrderService;
    constructor(orderService: IOrderService) {
        this._orderService = orderService;
    }

    create(title: string, description: string): void {
        try {
            this._orderService.create(title, description);
        } catch (error) {
            // обработка ошибки, например запись в лог
            if (error instanceof ValidationError) {
                throw error;
            } else if (error instanceof Error) {
                throw error;
            }
        }
    }

    readyOrder(title: string): void {
        try {
            this._orderService.readyOrder(title);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            } else if (error instanceof Error) {
                throw error;
            }
        }
    }

     deliveryOrder(title: string): void {
        try {
             this._orderService.deliveryOrder(title);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            } else if (error instanceof Error) {
                throw error;
            }
        }
    }

     closeOrder(title: string): void {
        try {
             this._orderService.closeOrder(title);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            } else if (error instanceof Error) {
                throw error;
            }
        }
    }

     get(title: string): Order | null{
        try {
            return this._orderService.get(title);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            } else if (error instanceof Error) {
                throw error;
            }
        }
    }

     getList(): Order[] {
        try {
            return this._orderService.getList();
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            } else if (error instanceof Error) {
                throw error;
            }
        }
    }

     takeOrderInWork(title: string): void {
        try {
             this._orderService.takeOrderInWork(title);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            } else if (error instanceof Error) {
                throw error;
            }
        }
    }

     update(title: string, order: Order): void {
        try {
             this._orderService.update(title, order);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            } else if (error instanceof Error) {
                throw error;
            }
        }
    }

     delete(title: string): Order {
        try {
            return this._orderService.delete(title);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            } else if (error instanceof Error) {
                throw error;
            }
        }
    }

}