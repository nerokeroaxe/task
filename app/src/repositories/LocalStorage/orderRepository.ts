import Order from "../../models/order";
import IOrderRepository from "../contracts/orderRepositoryInterface";

export namespace LocalStorage {
    export class OrderRepository implements IOrderRepository {
        private readonly _prefix: string = "order_";
        create(order: Order): void {
            let orderJSON: string = JSON.stringify(order);
            localStorage.setItem(this._prefix + order.title, orderJSON);
        }
        get(title: string): Order | null {
            const orderJSON = localStorage.getItem(this._prefix + title);
            return orderJSON ? JSON.parse(orderJSON) as Order : null;
        }
        getList(): Order[] {
            let orders: Order[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                // проверяем, что ключ начинается с префикса
                if (!key || !key.startsWith(this._prefix)) {
                    continue;
                }

                let orderJSON = localStorage.getItem(key);
                if (orderJSON) {
                    orders.push(JSON.parse(orderJSON) as Order);
                }
            }
            return orders;
        }
        update(title: string, order: Order): void {
            let orderJSON: string = JSON.stringify(order);
            if (order.title == title) {
                localStorage.setItem(this._prefix + title, orderJSON);
            } else {
                // если заголовок изменился, то удаляем старую запись
                // и создаем новую
                localStorage.removeItem(this._prefix + title);
                localStorage.setItem(this._prefix + order.title, orderJSON);
            }
        }
        delete(title: string): Order | null {
            let order = localStorage.getItem(this._prefix + title);
            if (order) {
                localStorage.removeItem(this._prefix + title);
                return JSON.parse(order) as Order;
            }
            return null;
        }
        
    }
}