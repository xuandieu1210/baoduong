export class Ttvt_Item {
    stt: number;
    id_dai: string;
    ma_dai: string;
    ten_dai: string;
    dia_chi: string;
    id_donvi: string;
   
    constructor(stt: number, id_dai: string, ma_dai: string,ten_dai: string, dia_chi: string,
        id_donvi: string) {
        this.stt = stt;
        this.id_dai = id_dai;
        this.ma_dai = ma_dai;
        this.ten_dai=ten_dai;
        this.dia_chi = dia_chi;
        this.id_donvi = id_donvi;
        
    }
}