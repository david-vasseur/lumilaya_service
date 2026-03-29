import { Controller, Get, Headers, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthRepositoryService } from 'src/auth/auth-repository/auth-repository.service';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
        private readonly authRepositoryService: AuthRepositoryService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('all')
    async getAllOrders(
        @Headers('x-fingerprint') fingerprint: string,
        @Req() req
    ) {
        console.log('CONTROLLER HIT');
        
        const username = req.user?.username;

        if (!username) {
            throw new UnauthorizedException('Utilisateur non authentifié');
        }

        const user = await this.authRepositoryService.findUserByUsername(username);
        console.log(user);
        
        if (!user) {
            throw new UnauthorizedException('Utilisateur introuvable');
        }

        if (fingerprint !== user.fingerprint) {
            throw new UnauthorizedException('Device non reconnu');
        }

        return this.orderService.getAllOrders();
    }
}