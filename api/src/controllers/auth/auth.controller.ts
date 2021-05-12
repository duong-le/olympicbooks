import { Body, Controller, ForbiddenException, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from 'src/shared/Enums/users.enum';
import { Repository } from 'typeorm';

import { Admin } from '../../entities/admins.entity';
import { Customer } from '../../entities/customers.entity';
import { Seller } from '../../entities/sellers.entity';
import { AuthService } from '../../services/auth.service';
import { AuthDto } from './auth.dto';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Seller) private sellerRepository: Repository<Seller>
  ) {}

  @Post('auth')
  async authenticateCustomer(@Body() { email, password }: AuthDto): Promise<{ accessToken: string }> {
    const customer = await this.customerRepository.findOne({ email });
    this.validateUser(customer, password);

    const accessToken = this.authService.createAccessToken({ name: customer.name, email, type: UserType.CUSTOMER });
    return { accessToken };
  }

  @Post('admin/auth')
  async authenticationAdmin(@Body() { email, password }: AuthDto): Promise<{ accessToken: string }> {
    const admin = await this.adminRepository.findOne({ email });
    this.validateUser(admin, password);

    const accessToken = this.authService.createAccessToken({ name: admin.name, email, type: UserType.ADMIN });
    return { accessToken };
  }

  @Post('seller/auth')
  async authenticationSeller(@Body() { email, password }: AuthDto): Promise<{ accessToken: string }> {
    const seller = await this.sellerRepository.findOne({ email });
    this.validateUser(seller, password);

    const accessToken = this.authService.createAccessToken({ name: seller.name, email, type: UserType.SELLER });
    return { accessToken };
  }

  validateUser(user: Customer | Admin | Seller, password: string) {
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    if (user?.isBlock) throw new ForbiddenException('User has been banned!');

    if (!this.authService.comparePassword(password, user.hashedPassword)) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
