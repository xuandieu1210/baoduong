export class Dot_bao_duong {
    id_dotbd: string;
    id_tramvt: string;
    ma_dotbd: string;
    ngay_bd: string;
    ngay_dukien: string;
    ngay_kt: string;
    ngay_kt_dukien: string;
    trang_thai: string;
    truong_nhom: string;
    dia_diem: string;
    check_thuchien: boolean;

    constructor(id_dotbd: string, id_tramvt: string, ma_dotbd: string, ngay_bd: string, ngay_dukien: string,
        ngay_kt: string, ngay_kt_dukien: string, trang_thai: string, truong_nhom: string,
        dia_diem: string, check_thuchien: boolean) {
        this.id_dotbd = id_dotbd;
        this.id_tramvt = id_tramvt;
        this.ma_dotbd = ma_dotbd;
        this.ngay_bd = ngay_bd;
        this.ngay_dukien = ngay_dukien;
        this.ngay_kt = ngay_kt;
        this.ngay_kt_dukien = ngay_kt_dukien;
        this.trang_thai = trang_thai;
        this.truong_nhom = truong_nhom;
        this.dia_diem = dia_diem;
        this.check_thuchien = check_thuchien;
    }
}