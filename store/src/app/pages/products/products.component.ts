import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { formatDistance, addDays } from 'date-fns';
import { mergeMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductsService } from './products.service';
import { Product } from 'src/app/shared/Interfaces/product.interface';
import { AuthenticationService } from '../authentication/authentication.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: Product;
  relatedProducts: Product[];

  isProductLoading = false;
  isRelatedProductsLoading = false;
  isBtnLoading = { addToCart: false, buyNow: false, comment: false };
  quantity = 1;
  minQty = 1;
  maxQty = 100;
  likes = 0;
  dislikes = 0;
  limit = 6;
  relatedProductStyle = null;

  commentValue = '';
  commentData = [
    {
      content: 'Sản phẩm chất lượng',
      datetime: formatDistance(new Date(), addDays(new Date(), 1))
    }
  ];
  commentator = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.render(Number(paramsId.id));
    });
  }

  render(productId: number) {
    if (this.product) {
      this.product.images = null;
      this.relatedProductStyle = null;
      this.quantity = 1;
    }
    this.isProductLoading = true;
    this.productsService
      .getOneProduct(productId)
      .pipe(
        mergeMap((response) => {
          this.product = response;
          this.titleService.setTitle(`${this.product.title} | OlympicBooks`);
          if (!this.product.images.length) this.isProductLoading = false;
          this.isRelatedProductsLoading = true;
          return this.productsService.getManyProducts({
            filter: [`categoryId||$eq||${this.product.category.id}`, `id||$ne||${this.product.id}`],
            limit: this.limit
          });
        })
      )
      .subscribe(
        (response) => {
          this.relatedProducts = response;
          this.isRelatedProductsLoading = false;
          this.relatedProductStyle = { padding: '1px' };
        },
        (error) => this.router.navigate(['/'])
      );
  }

  onLoadImage(event) {
    if (event && event.target) this.isProductLoading = false;
  }

  addItemToCart(btn: string) {
    if (!this.authenticationService.userValue) {
      this.router.navigate(['signin'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    this.isBtnLoading[btn] = true;
    const exist = this.cartService.cartValue.cartItems.find((el) => el.product.id === this.product.id);

    this.cartService[exist ? 'updateCartItem' : 'createCartItem'](
      exist ? exist.id : this.product.id,
      exist ? this.quantity + exist.quantity : this.quantity
    )
      .pipe(mergeMap((response) => this.cartService.getCart()))
      .subscribe(
        (response) => {
          this.cartService.setCart(response);
          this.isBtnLoading[btn] = false;
          this.messageService.success('Thêm vào giỏ hàng thành công!');
          if (btn === 'buyNow') this.router.navigate(['cart']);
        },
        (error) => {
          this.isBtnLoading[btn] = false;
          this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
      );
  }

  submitComment(): void {
    this.isBtnLoading.comment = true;
    setTimeout(() => {
      this.commentData = [
        ...this.commentData,
        { content: this.commentValue, datetime: formatDistance(new Date(), addDays(new Date(), 1)) }
      ];
      this.isBtnLoading.comment = false;
      this.commentValue = '';
    }, 1000);
  }

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }
}
