import { isNullOrEmpty } from "../infrastructure/stringFunc";
import IOrder from "./contracts/orderInterface";
import { OrderStatus, isNextStatusValid } from "./support/orderStatus";

export default class Order {
    private title: string;
    private description: string;
    private creationTime: Date;
    private updateTime?: Date;
    private status: OrderStatus;

    constructor(order: IOrder) {
        this.title = order.title;
        this.description = order.description;
        this.creationTime = order.creationTime ?? new Date();
        this.updateTime = order.updateTime;
        this.status = order.status ?? OrderStatus.Accepted;
    }

    equals(order: Order): boolean {
        return this.title === order.title 
            && this.description === order.description
            && this.status === order.status
            && this.creationTime.getTime() === order.creationTime.getTime()
            && this.updateTime?.getTime() === order.updateTime?.getTime();
    }

    // title
    getTitle(): string {
        return this.title;
    }
    setTitle(value: string) {
        if (!isNullOrEmpty(value)) {
            this.title = value;
        }
    }
    // description
    getDescription(): string {
        return this.description;
    }
    setDescription(value: string) {
        if (!isNullOrEmpty(value)) {
            this.description = value;
        }
    }
    // creation time
    getCreationTime(): Date {
        return this.creationTime;
    }
    // update time
    getUpdateTime(): Date | undefined {
        return this.updateTime;
    }
    // status
    getStatus(): OrderStatus {
        return this.status;
    }
    setStatus(value: OrderStatus) {
        if (isNextStatusValid(this.status, value)) {
            this.status = value;
            this.updateTime = new Date();
        }
    }
}