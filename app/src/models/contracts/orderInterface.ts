import { OrderStatus } from "../support/orderStatus";

export default interface IOrder {
    title: string;
    description: string;
    creationTime?: Date;
    updateTime?: Date;
    status?: OrderStatus;
}