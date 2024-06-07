import IOrder from "./contracts/orderInterface";
import { OrderStatus, isNextStatusValid } from "./support/orderStatus";

export default class Order {
    private _title: string;
    private _description: string;
    private _creationTime: Date;
    private _updateTime?: Date;
    private _status: OrderStatus;

    constructor(order: IOrder) {
        this._title = order.title;
        this._description = order.description;
        this._creationTime = order.creationTime ?? new Date();
        this._updateTime = order.updateTime;
        this._status = order.status ?? OrderStatus.Accepted;
    }
    // title
    get title(): string {
        return this._title;
    }
    set title(value: string) {
        if (value && !(value.trim().length > 0)) {
            this._title = value;
        }
    }
    // description
    get description(): string {
        return this._description;
    }
    set description(value: string) {
        if (value && !(value.trim().length > 0)) {
            this._description = value;
        }
    }
    // creation time
    get creationTime(): Date {
        return this._creationTime;
    }
    // update time
    get updateTime(): Date | undefined {
        return this._updateTime;
    }
    // status
    get status(): OrderStatus {
        return this._status;
    }
    set status(value: OrderStatus) {
        if (isNextStatusValid(this._status, value)) {
            this._status = value;
            this._updateTime = new Date();
        }
    }
}