import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './helper/jwt-payload';
import { LoginStatus } from './helper/login-status.interface';
import { RegistrationStatus } from './helper/registration-status';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
    private readonly usersService;
    private readonly jwtService
    private readonly logger: Logger

    constructor(usersService: UserService, jwtService: JwtService, @Inject('winston') logger: Logger ) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.logger = logger;
    }

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'user registered',
        };
        try {
            await this.usersService.create(userDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    
        }
        return status;  
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        // find user in db    
        const today = new Date();
        this.logger.info('User:'+loginUserDto.username+' tryed to log in '+today);
        const user = await this.usersService.findByLogin(loginUserDto);
        
        // generate and sign token    
        const token = this._createToken(user);
        
        return {
            username: user.username, ...token,    
        };  
    }
    
    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };    
        const accessToken = this.jwtService.sign(user);    
        return {
            expiresIn: '2m', // process.env.EXPIRESIN,
            accessToken,    
        };  
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);    
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }

}
