import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {

    getAllOrders() {
        return [
            {
                order : 3,
                qty: 4,
                price: 1990
            },
            {
                order : 4,
                qty: 6,
                price: 3200
            },
            {
                order : 5,
                qty: 6,
                price: 6500
            },
        ]
    }

}
