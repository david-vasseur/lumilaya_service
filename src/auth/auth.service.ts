import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepositoryService } from './auth-repository/auth-repository.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    private readonly PEPPER = process.env.PASSWORD_PEPPER ?? '';

    constructor(
        private readonly authRepository: AuthRepositoryService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {

        const verifiedUser = await this.authRepository.findUserByUsername(loginDto.username);

        /// ON VERIFIE QUE L'USER EXISTE
        if (!verifiedUser) {
            return {
                success: false,
                message: "mot de passe / login incorrect"
            }
        }

        /// ON VERIFIE QUE LE MOT DE PASSE EST CORRECT
        const verifiedPassword = await bcrypt.compare(loginDto.password + this.PEPPER, verifiedUser.password)

        /// ON MET A JOUR LE FINGERPRINT DE L'USER SI LE MOT DE PASSE EST CONFORME
        if (verifiedPassword) {
            await this.authRepository.updateFingerPrint(loginDto.username, loginDto.fingerprint)
        } else {
            return {
                success: false,
                message: "mot de passe / login incorrect"
            }
        }

        /// ON PREPARE LE JWT TOKEN 
        const payload = { username: loginDto.username };
        const access_token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET
        })

        /// ON ENVOIE LA REPONSE 
        if (verifiedUser && verifiedPassword) {
            return {
                success: true,
                message: `Bienvenue ${verifiedUser.firstname}`,
                access_token
            };
        }
        return { 
            success: false,
            message: "mot de passe / login incorrect" 
        };
    }

    async signup(signupDto: SignupDto) {

        const SALT = 10;
        const hashedPassword = await bcrypt.hash(signupDto.password + this.PEPPER, SALT);

        const newUser = {
            ...signupDto,
            password: hashedPassword
        }

        const createNewUser = await this.authRepository.createUser(newUser); 

        if (createNewUser) {
            return {
                success: true,
                message: "Inscription reussi"
            }
        } else {
            return {
                success: false,
                message: "Une erreur est survenue"
            }
        }

    }
}

