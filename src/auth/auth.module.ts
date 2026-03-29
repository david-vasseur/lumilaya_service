import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepositoryService } from './auth-repository/auth-repository.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaDbNestService } from 'src/prisma/prisma-db-nest.service';

@Module({

	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET, 
			signOptions: { expiresIn: '1h' },
		}),
		
	],

	controllers: [AuthController],
	providers: [AuthService, AuthRepositoryService, JwtStrategy, PrismaDbNestService],
	exports: [AuthRepositoryService]
})
export class AuthModule {}
