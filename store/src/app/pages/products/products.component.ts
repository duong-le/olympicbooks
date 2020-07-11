import { Component, OnInit } from '@angular/core';
import { formatDistance, addDays } from 'date-fns';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './products.service';
import { mergeMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/Interfaces/product.interface';
import { AuthenticationService } from '../authentication/authentication.service';
import { CartService } from '../cart/cart.service';
import { MessageService } from 'src/app/shared/Services/message.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  isLoading = true;
  btnLoading = { addToCart: false, buyNow: false };
  product: Product;
  relatedProducts: Product[];
  quantity = 1;
  minQty = 1;
  maxQty = 100;
  likes = 0;
  dislikes = 0;
  limit = 6;

  commentData: any = [
    {
      content: 'Sản phẩm chất lượng',
      datetime: formatDistance(new Date(), addDays(new Date(), 1))
    }
  ];

  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.render(Number(paramsId.id));
    });
  }

  render(productId: number) {
    this.productsService
      .getOneProduct(productId)
      .pipe(
        mergeMap((response) => {
          this.product = response;
          this.titleService.setTitle(`${this.product.title} | Olymbooks`);
          return this.productsService.getManyProducts({
            filter: [`categoryId||$eq||${this.product.category.id}`, `id||$ne||${this.product.id}`],
            limit: this.limit
          });
        })
      )
      .subscribe(
        (response) => (this.relatedProducts = response),
        (error) => this.router.navigate(['/'])
      );
  }

  onLoadImage(event) {
    if (event && event.target) this.isLoading = false;
  }

  addItemToCart(btn: string) {
    if (!this.authenticationService.userValue)
      this.router.navigate(['signin'], {
        queryParams: { returnUrl: this.router.url }
      });
    else {
      this.btnLoading[btn] = true;

      const exist = this.cartService.cartValue.cartItems.find(
        (el) => el.product.id === this.product.id
      );

      this.cartService[exist ? 'updateCartItem' : 'createCartItem'](
        exist ? exist.id : this.product.id,
        exist ? this.quantity + exist.quantity : this.quantity
      )
        .pipe(mergeMap((response) => this.cartService.getCart()))
        .subscribe(
          (response) => {
            this.cartService.setCart(response);
            this.btnLoading[btn] = false;
            this.messageService.createMessage(
              'success',
              'Thêm vào giỏ hàng thành công!'
            );
            if (btn === 'buyNow') this.router.navigate(['cart']);
          },
          (error) => {
            this.btnLoading[btn] = false;
            this.messageService.createMessage(
              'error',
              'Có lỗi xảy ra, vui lòng thử lại sau!'
            );
          }
        );
    }
  }

  submitComment(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.commentData = [
        ...this.commentData,
        {
          content,
          datetime: formatDistance(new Date(), addDays(new Date(), 1))
        }
      ];
    }, 800);
  }

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }
}
