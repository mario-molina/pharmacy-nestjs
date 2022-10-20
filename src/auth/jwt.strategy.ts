import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from './helper/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly authService;

    constructor(authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'VUyFDkIGMx4wfOP6', // process.env.SECRETKEY,
        });
        this.authService = authService;
    }
    
    async validate(payload: JwtPayload): Promise<UserDto> {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }
}
