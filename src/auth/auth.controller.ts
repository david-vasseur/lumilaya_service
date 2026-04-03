import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FingerprintGuard } from './fingerprint-auth.guard';

@Controller('auth')

export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
        login(@Body() loginDto: LoginDto) {
            return this.authService.login(loginDto);
        }
    @UseGuards(JwtAuthGuard, FingerprintGuard)
    @Get('verify')
        verifyToken() {
            return { authorized: true }; 
        }
}


