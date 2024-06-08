import Order from "../../models/order";

export default interface IOrderService {
    create(title: string, description: string): void;
    get(title: string): Order | null;
    getList(): Order[];
    update(title: string, order: Order): void;
    delete(title: string): Order;
    takeOrderInWork(title: string): void;
    readyOrder(title: string): void;
    deliveryOrder(title: string): void;
    closeOrder(title: string): void;
}