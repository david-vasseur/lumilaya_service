import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepositoryService } from './auth-repository/auth-repository.service';

@Injectable()
export class FingerprintGuard implements CanActivate {

    constructor(private readonly authRepository: AuthRepositoryService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        // 1️⃣ JWT doit déjà avoir été validé
        const user = request.user; 
        if (!user) {
        throw new UnauthorizedException('Utilisateur non authorisé');
        }

        // 2️⃣ Récupérer le fingerprint envoyé par le client (ex: header)
        const fingerprint = request.headers['x-fingerprint'];
        if (!fingerprint) {
        throw new UnauthorizedException('Utilisateur non authorisé');
        }

        // 3️⃣ Comparer avec le fingerprint stocké côté serveur

        const userFingerprint = await this.authRepository.getFingerprintByUser(user);

        if (user.fingerprint !== userFingerprint) {
        throw new UnauthorizedException('Utilisateur non authorisé');
        }

        return true;
    }
}