export enum OrderStatus {
    Accepted = 'Accepted',
    InWork = 'In work',
    Ready = 'Ready',
    Delivery = 'Delivery',
    Closed = 'Closed'
}

type AllowedTransation = { current: OrderStatus, next?: OrderStatus[] }
// Пути из одного статуса в другой
const allowedTransitions: AllowedTransation[] = [
    { current: OrderStatus.Accepted, next: [OrderStatus.InWork] },
    { current: OrderStatus.InWork, next: [OrderStatus.Ready] },
    { current: OrderStatus.Ready, next: [OrderStatus.Delivery, OrderStatus.Closed] },
    { current: OrderStatus.Delivery, next: [OrderStatus.Closed] },
    { current: OrderStatus.Closed }
];

/**
 * Проверяет, можно ли перейти из текущего статуса в новый
 * @param currentStatus Текущий статус заявки
 * @param newStatus Новый статус заявки
 */
export function isNextStatusValid(currentStatus: OrderStatus, newStatus: OrderStatus): boolean {
    const transition = allowedTransitions.find(t => t.current === currentStatus);
    if (!transition) {
        return false;
    }
    if (!transition.next || !transition.next?.includes(newStatus)) {
        return false;
    }
    return true;
}