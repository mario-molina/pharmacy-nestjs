import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { userInfo } from 'os';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';

@Injectable()
export class OwnersGuard implements CanActivate {
    private readonly productService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    async canActivate(
        context: ExecutionContext,
    ) {

        const requestObj = context.switchToHttp().getRequest();
        const qryParams = requestObj.params;
        const idProduct = qryParams.id;
        const serviceReponse = await this.getProduct(idProduct);
        const product = serviceReponse.data;
        if (product != null) {
            return product.owner == requestObj.user.id
        }else{
            return false
        }
    }

    async getProduct(id) {
        return this.productService.findOne(id);
    }
}