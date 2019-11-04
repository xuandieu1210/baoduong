export class Chitiet_congviec {
    id_dotbd: string;
    id_thietbi: string;
    ghi_chu: string;
    trang_thai: string;
    id_nhanvien: string;
    ten_nhanvien: string;
    ket_qua: string;
    ma_noidung: string;
    noi_dung: string;
    ten_thietbi: string;
    hidden_xacnhan: boolean

    constructor(id_dotbd: string, id_thietbi: string, ghi_chu: string, trang_thai: string, id_nhanvien: string,
        ten_nhanvien: string, ket_qua: string, ma_noidung: string, noi_dung: string, ten_thietbi: string, hidden_xacnhan: boolean) {
        this.id_dotbd = id_dotbd;
        this.id_thietbi = id_thietbi;
        this.ghi_chu = ghi_chu;
        this.trang_thai = trang_thai;
        this.id_nhanvien = id_nhanvien;
        this.ten_nhanvien = ten_nhanvien;
        this.ket_qua = ket_qua;
        this.ma_noidung = ma_noidung;
        this.noi_dung = noi_dung;
        this.ten_thietbi = ten_thietbi;
        this.hidden_xacnhan = hidden_xacnhan;
    }
}