export class Tram_Item {
    stt: number;
    id_tram: string;
    ma_tram: string;
    ten_tram: string;
    dia_diem: string;
    kinh_do: string;
    vi_do: string;
    id_dai: string;
    id_nhanvien: string;

    constructor(stt: number, id_tram: string, ma_tram: string,ten_tram: string, dia_diem: string, kinh_do: string, vi_do: string,
        id_dai: string, id_nhanvien: string) {
        this.stt = stt;
        this.id_tram = id_tram;
        this.ma_tram = ma_tram;
        this.ten_tram=ten_tram;
        this.dia_diem = dia_diem;
        this.kinh_do = kinh_do;
        this.vi_do = vi_do;
        this.id_dai = id_dai;
        this.id_nhanvien = id_nhanvien;
    }
}