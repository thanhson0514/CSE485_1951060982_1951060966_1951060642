# Nhóm 1 - BÀI TẬP LỚN

## **Information**

_**Note:**_
<font size="3">

> Source code này được clone từ source code private của nhóm nên mọi **hoạt động** và **người tham gia** làm project không được hiện thị ở đây

</font>

**Thành viên**:

- Lê Thanh Sơn
- Nguyễn Văn Dũng
- Vương Thị Quyên

<font size="4">

> **Đề tài**: Làm giao diện và các chức năng của trang "Bảng tin" của website: https://hahalolo.com/

</font>

## **Frontend**

### **Tech Stack**

Sử dụng library: ReactJS, Material UI

### **Install**

```bash
> git clone https://github.com/thanhson0514/CSE485_1951060982_1951060966_1951060642.git
```

Tạo file `.env` ở mục `frontent/` và paste code dưới đây vào:

```dotenv
REACT_APP_BASE_URL_IMG=http://localhost:8000/images/
REACT_APP_BASE_URL=http://localhost:8000
```

### **Run**

> Yêu cầu: Đã cài đặt npm

```bash
> cd frontend
> npm install
> npm start
```

Truy cập:

```
http://localhost:3000
```

### **References**

- ReactJS: https://reactjs.org/
- Material UI: https://mui.com/

## **Backend**

### **Tech Stack**

- Sử dụng framework: Slim

### **Install**

Nếu đã clone rồi thì không cần clone lại:

```bash
> git clone https://github.com/thanhson0514/CSE485_1951060982_1951060966_1951060642.git
```

Tạo file __`.env`__ cùng cấp với file __`.env.example`__ và copy tất cả từ file __`.env.example`__ sang file __`.env`__:

```dotenv
JWT_SECRET_KEY=103739a6a67a572fea5f5b730bf3fc09681824daadf6dd66c7e2620e48c6a130cd403be92f2eae4d2a8185065e35e69e

DB_DSN=mysql:host=localhost;port=3306;dbname=btl_n1
DB_DRIVER=mysql
DB_HOST=127.0.0.1
DB_NAME=btl_n1
DB_USER=root
DB_PASSWORD=
DB_CHARSET=utf8
DB_COLLATION=utf8_unicode_ci
DB_PREFIX=
```

Thay đổi 1 vài thông số (Hầu như không thay đổi gì ngoài `JWT_SECRET_KEY`)

### **Run**

> Yêu cầu: Đã cài đặt composer và php 7.\*

```bash
> cd backend
> composer install
> php -S localhost:8000 -t public
```



>*__Note:__* Trước khi chạy server cần phải tạo 1 database có tên là __`btl_n1`__. Sau đó chạy file __migrations.php__ để import các bảng vào database:

```bash
> php migrations.php
```

_Sử dụng Postman để test dữ liệu_

**Truy cập**:

Link Postman:
https://documenter.getpostman.com/view/9223681/UVRAHmoD

### **References**

- Slim Framework: https://www.slimframework.com/
- API of team: https://documenter.getpostman.com/view/9223681/UVRAHmoD

### Conclusion

Public Website:

> http://btl-n1.tk/
