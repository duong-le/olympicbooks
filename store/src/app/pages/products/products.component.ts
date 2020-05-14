import { Component, OnInit } from '@angular/core';
import { formatDistance, addDays } from 'date-fns';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  loading = true;
  likes = 0;
  dislikes = 0;

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  product: any = {
    title: 'Nhà Giả Kim',
    new: true,
    price: 137000,
    originalPrice: 150000,
    author: 'Paulo Coelho',
    publisher: 'Nhà Xuất Bản Văn Học',
    cover: 'Bìa mềm',
    description:
      '<p style="text-align: justify;"><span style="font-size: medium;"><strong>Nhà Giả Kim</strong></span></p>\r\n<p style="text-align: justify;">Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người.</p>\r\n<p style="text-align: justify;">Tiểu thuyết <strong>Nhà giả kim </strong>của <strong>Paulo Coelho </strong>như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, <strong>Nhà giả kim </strong>đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.</p>\r\n<p style="text-align: justify;">“Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. ‘Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,’ ông nghĩ.”</p>\r\n<p style="text-align: justify;">- <strong>Trích Nhà giả kim</strong></p>'
  };

  specifications = [
    {
      name: 'Công ty phát hành',
      value: 'Nhã Nam'
    },
    {
      name: 'Ngày xuất bản',
      value: '10-2013'
    },
    {
      name: 'Kích thước',
      value: '13 x 20.5 cm'
    },
    {
      name: 'Dịch Giả',
      value: 'Lê Chu Cầu'
    },
    {
      name: 'Loại bìa',
      value: 'Bìa mềm'
    },
    {
      name: 'Số trang',
      value: 228
    },
    {
      name: 'SKU',
      value: 2518407786529
    },
    {
      name: 'Nhà xuất bản',
      value: 'Nhà Xuất Bản Văn Học'
    }
  ];

  products;
  bookData = [
    { title: 'Chiến tranh và hòa bình', price: 1500000 },
    { title: 'Thần Thoại Bắc Âu', price: 1500000, new: true },
    { title: 'Không gia đình', price: 1500000 },
    {
      title:
        'Lập trình hướng đối tượng dành cho người mới bắt đầu học lập trình',
      salePrice: 1000000,
      price: 1500000,
      sale: true
    },
    {
      title: 'Vi Điều Khiển Và Ứng Dụng - Arduino Dành Cho Người Tự Học',
      price: 1500000
    },
    { title: 'Khi Hơi Thở Hóa Thinh Không ', price: 1500000, hot: true }
  ];

  commentData: any = [
    {
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 1))
    }
  ];

  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';

  ngOnInit(): void {
    this.product.images = new Array(4)
      .fill({})
      .map(
        (_) =>
          `https://picsum.photos/seed/${Math.floor(
            Math.random() * 1000
          )}/385/550`
      );

    this.products = this.bookData.map((el, idx) => ({
      ...el,
      id: idx + 1,
      img: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/460`
    }));
  }

  onLoadImage(event) {
    if (event && event.target) {
      this.loading = false;
    }
  }

  handleSubmit(): void {
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
}
