export class ApiReponse<T = unknown> {
    item: T;
    status: number;

    constructor(item: T, status: number) {
        this.item = item;
        this.status = status;
    }
}
