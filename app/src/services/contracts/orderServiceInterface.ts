import Order from "../../models/order";

export default interface IOrderService {
    create(order: Order): void;
    get(title: string): Order | null;
    getList(): Order[];
    update(title: string, order: Order): void;
    delete(title: string): Order | null;
}