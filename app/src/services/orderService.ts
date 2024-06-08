import { isNullOrEmpty } from "../infrastructure/stringFunc";
import ValidationError from "../infrastructure/validationError";
import Order from "../models/order";
import { OrderStatus } from "../models/support/orderStatus";
import IOrderRepository from "../repositories/contracts/orderRepositoryInterface";
import IOrderService from "./contracts/orderServiceInterface";

export default class OrderService implements IOrderService {
    private readonly _orderRepository: IOrderRepository;
    constructor(orderRepository: IOrderRepository) {
        this._orderRepository = orderRepository;
    }
    takeOrderInWork(title: string): void {
        this.changeStatus(title, OrderStatus.InWork);
    }
    readyOrder(title: string): void {
        this.changeStatus(title, OrderStatus.Ready);
    }
    deliveryOrder(title: string): void {
        this.changeStatus(title, OrderStatus.Delivery);
    }
    closeOrder(title: string): void {
        this.changeStatus(title, OrderStatus.Closed);
    }

    create(title: string, description: string): void {
        if (isNullOrEmpty(title)) {
            throw new ValidationError("Заголовок не может быть пустым");
        }
        if (isNullOrEmpty(description)) {
            throw new ValidationError("Описание не может быть пустым");
        }
        let oldOrder = this._orderRepository.get(title);
        if (oldOrder) {
            throw new ValidationError("Запись с таким заголовком уже существует");
        }
        let order = new Order({title, description});
        this._orderRepository.create(order);
    }

    get(title: string): Order | null{
        if (isNullOrEmpty(title)) {
            throw new ValidationError("Заголовок не может быть пустым");
        }
        return this._orderRepository.get(title);
    }
    
    getList(): Order[] {
        return this._orderRepository.getList();
    }
    
    update(title: string, order: Order): void {
        let oldOrder: Order = this.check(title);
        
        // Если нет изменений, то ничего не делаем
        if (oldOrder.equals(order)) {
            return;
        }
        this._orderRepository.update(title, order);
    }
    
    delete(title: string): Order {
        if (isNullOrEmpty(title)) {
            throw new ValidationError("Заголовок не может быть пустым");
        }
        let oldOrder = this._orderRepository.get(title);
        if (!oldOrder) {
            throw new ValidationError("Запись с таким заголовком не существует");
        }
        let result = this._orderRepository.delete(title);
        if (!result) {
            throw new Error("Не удалось удалить запись");
        }
        return result;
    }

    private check(title: string): Order {
        if (isNullOrEmpty(title)) {
            throw new ValidationError("Заголовок не может быть пустым");
        }
        let oldOrder = this._orderRepository.get(title);
        if (!oldOrder) {
            throw new ValidationError("Запись с таким заголовком не существует");
        }
        return oldOrder;
    }
    private changeStatus(title: string, status: OrderStatus): void {
        let order: Order = this.check(title);
        let oldStatus = order.getStatus();
        order.setStatus(status);
        if (oldStatus === order.getStatus()) {
            throw new ValidationError(`Нельзя перейти из статуса ${oldStatus} в ${status}`);
        }

        this._orderRepository.update(title, order);
    }

}