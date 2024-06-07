import { isNullOrEmpty } from "../infrastructure/stringFunc";
import ValidationError from "../infrastructure/validationError";
import IOrder from "../models/contracts/orderInterface";
import Order from "../models/order";
import IOrderRepository from "../repositories/contracts/orderRepositoryInterface";
import IOrderService from "./contracts/orderServiceInterface";

export default class OrderService implements IOrderService {
    private readonly _orderRepository: IOrderRepository;
    constructor(orderRepository: IOrderRepository) {
        this._orderRepository = orderRepository;
    }

    create(order: Order): void {
        if (isNullOrEmpty(order.getTitle())) {
            throw new ValidationError("Заголовок не может быть пустым");
        }
        if (isNullOrEmpty(order.getDescription())) {
            throw new ValidationError("Описание не может быть пустым");
        }
        let oldOrder = this._orderRepository.get(order.getTitle());
        if (oldOrder) {
            throw new ValidationError("Запись с таким заголовком уже существует");
        }
        
        this._orderRepository.create(order);
    }

    get(title: string): Order | null {
        if (isNullOrEmpty(title)) {
            throw new ValidationError("Заголовок не может быть пустым");
        }
        return this._orderRepository.get(title);
    }
    
    getList(): Order[] {
        return this._orderRepository.getList();
    }
    
    update(title: string, order: Order): void {
        if (isNullOrEmpty(title)) {
            throw new ValidationError("Заголовок не может быть пустым");
        }
        let oldOrder = this._orderRepository.get(title);
        if (!oldOrder) {
            throw new ValidationError("Запись с таким заголовком не существует");
        }
        
        // Если нет изменений, то ничего не делаем
        if (oldOrder.equals(order)) {
            return;
        }
        this._orderRepository.update(title, order);
    }
    
    delete(title: string): Order | null {
        if (isNullOrEmpty(title)) {
            throw new ValidationError("Заголовок не может быть пустым");
        }
        let oldOrder = this._orderRepository.get(title);
        if (!oldOrder) {
            throw new ValidationError("Запись с таким заголовком не существует");
        }
        return this._orderRepository.delete(title);
    }

}