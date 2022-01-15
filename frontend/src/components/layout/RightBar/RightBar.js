import React from 'react';
import { Link } from 'react-router-dom';
import './RightBar.css';
const RightBar = () => {
  return (
    <div className=" Right-bar mt-3">
      <Link to="/">
        <img
          src="https://media.hahalolo.com/2021/12/03/10/09/2ef3b5e68ea8c3730f070a118344e22d-1638526164.jpg"
          className="img-fluid rounded"
          alt="..."
        ></img>
      </Link>
      <Link to="/">
        <img
          src="https://media.hahalolo.com/2021/12/16/04/37/3eb3751da306d09749107c733e28cf51-1639629441.jpg"
          className="img-fluid mt-3 rounded"
          alt="..."
        ></img>
      </Link>
      <div className="card mt-3">
        <div className="card-header">
          <h4 className="card-title card-title-header">Trải nghiệm nổi bật</h4>
          <Link to="/" className="card-header-view">
            Xem tất cả
          </Link>
        </div>
        <div className="card-body">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <Link to="/">
                  <img
                    src="https://cf.bstatic.com/xdata/images/hotel/270x200/281422507.webp?k=e30ba6b547a64601f726816c37a0240e15e168ac209cea6e16f961ec82e2b6ab&o="
                    className="d-block w-100"
                    alt="..."
                  />
                </Link>
                <div className="carousel-caption d-none d-md-block">
                  <p>Note ngay 4 Resort siêu ưu đãi cho kỳ du lịch cuối năm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="row g-0">
            <div className="col-md-2">
              <img
                src="https://media.hahalolo.com/2021/12/08/08/57/288b87c58a6d7e023e5afc7a6d0e21ad-1638953844_40x40_high.jpg.webp"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col">
              <Link to="/" className="voucher">
                SĂN VOUCHER CÙNG HAHALOLO
              </Link>
              <p className="card-text">
                <small className="text-muted">8 ngày trước</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body row">
          <div className="col-md-6 ">
            <Link to="/">
              <img
                src="https://vuta.vn/uploads/blog/2021_07/do.png"
                className="img-fluid rounded-start"
                alt="..."
              />
            </Link>
          </div>
          <div className="col-md-6">
            <Link to="/">
              <img
                src="https://www.hahalolo.com/29ee0ff68f50d4c56881ceefd9c09b4c.png"
                className="img-fluid rounded-start"
                alt="..."
              />
            </Link>
          </div>
          <div className="col-md-6">
            <Link to="/">
              <img
                src="https://ustoa.com/r/ustoa-filemanager/source/history/1997-photo.gif"
                class="img-fluid rounded-start"
                alt="..."
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <Link to="/" className="me-3 link-footer text-muted">
            Giới thiệu
          </Link>
          <Link to="/" className="me-3 link-footer text-muted">
            Quyền riêng tư
          </Link>
          <Link to="/" className="me-3 link-footer text-muted">
            điều khoản
          </Link>
          <Link to="/" className="me-3 link-footer text-muted">
            Cookie
          </Link>
          <Link to="/" className="me-3 link-footer text-muted">
            Tuyển dụng
          </Link>
          <Link to="/" className="me-3 link-footer text-muted">
            Hỗ trợ
          </Link>
          <Link to="/" className="me-3 link-footer text-muted">
            Tiếp thị liên kết
          </Link>
        </div>
        <div className="card-footer border-0">
          <div className="col-md text-center text-muted">
            &copy; Hahalolo 2017. Đã đăng ký bản quyền
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
