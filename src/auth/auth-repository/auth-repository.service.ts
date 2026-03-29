import { Injectable } from '@nestjs/common';
import { PrismaDbNestService } from 'src/prisma/prisma-db-nest.service';
import { RoleType } from 'prisma/generated/dbNest/prisma/enums';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class AuthRepositoryService {

    constructor(private readonly prisma: PrismaDbNestService) {}

    findUserByUsername(username: string) {
        return this.prisma.user.findFirst({
            where: {
                username
            }
        })
    }

    async createUser(data: SignupDto) {
        return this.prisma.user.create({
            data: {
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                db: "LUMILAYA",
                role: RoleType.USER,
                password: data.password,
                fingerprint: ""
            }
        })
    }

    async updateFingerPrint(username: string, fingerprint: string) {
        return this.prisma.user.update({
            where: {
                username,
            },
            data: {
                fingerprint
            }
        })
    }

}
