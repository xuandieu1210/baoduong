import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'data_bdtb.db';
/*
  Generated class for the SqliteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteProvider {
  private db: SQLiteObject;
  private isOpen: boolean;
  sqlite;
  
  constructor() {
   this.sqlite=new SQLite()
    setTimeout(() => {
      this.createDatabase();
      //this.do_insert('1', 'https://10.51.188.9/spsm', 'dia chi host');
    }, 500);
  }

  public createDatabase(): void {
    if (!this.isOpen) {
      this.sqlite = new SQLite();
      this.sqlite.create({
        name: DATABASE_FILE_NAME,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;
          this.createTables();
          this.isOpen = true;
        })
        .catch(e => console.log(e));
    }

  }

 private createTables(): void {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `tbl_settings` ( `id` TEXT NOT NULL, `gia_tri` TEXT NOT NULL,`mo_ta` TEXT,  PRIMARY KEY(`id`) )', [])
      .then(() => {
        console.log("Create settings ok");
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `tbl_account` ( `id` TEXT NOT NULL, `user` TEXT NOT NULL, `pass` TEXT NOT NULL,  `save_pass` TEXT, PRIMARY KEY(`id`) )', [])
          .then(() => console.log("Create account ok"))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  public do_insert(id: string,user: string, pass: string, save_pass: string): void {
    this.db.executeSql('INSERT INTO tbl_account ( id,user, pass, save_pass ) VALUES (\'' + id + '\',\'' + user + '\',\'' + pass + '\',\'' + save_pass + '\')', [])
      .then(() => console.log("Insert ok"))
      .catch(e => console.log(e));
  }

  public do_update(id:string,user: string, pass: string, save_pass: string) {
    //this.db.executeSql('UPDATE tbl_account SET id = \'' + id + '\', user = \'' + user + '\', pass = \'' + pass + '\', save_pass = \'' + save_pass + '\'', {})
      this.db.executeSql('UPDATE tbl_account SET user = \'' + user + '\', pass = \'' + pass + '\', save_pass = \'' + save_pass + '\' where id = \'' + id + '\'', [])
      .then(() => console.log("Update ok"))
      .catch(e => console.log(e));
  }

  public do_insert_setting(id: string, gia_tri: string, mo_ta: string): void {
    this.db.executeSql('INSERT INTO tbl_settings ( id, gia_tri, mo_ta ) VALUES (\'' + id + '\',\'' + gia_tri + '\',\'' + mo_ta + '\')', [])
      .then(() => console.log("Insert ok"))
      .catch(e => console.log(e));
  }

  do_update_setting(id: string, gia_tri: string, mo_ta: string) {
    this.db.executeSql('UPDATE tbl_settings SET gia_tri = \'' + gia_tri + '\', mo_ta = \'' + mo_ta + '\' where id = \'' + id + '\'', [])
      .then(() => console.log("Update ok"))
      .catch(e => console.log(e));
  }

  // public check_isRow(): boolean {
  //   let isRow = false;
  //   var acc = [];
  //   this.db.executeSql('SELECT * FROM `account`', {})
  //     .then((data) => {
  //       if (data == null) {
  //         isRow = false;
  //       }
  //       if (data.rows) {
  //         if (data.rows.length > 0) {
  //           isRow = true;
  //         }
  //       }
  //     })
  //   return isRow;
  // }

  public do_select_item() {
    let acc = [];
    this.db.executeSql('SELECT * FROM `tbl_settings`', [])
      .then((data) => {
        if (data == null) {
          return;
        }
        if (data.rows) {
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              acc.push({
                id: data.rows.item(i).id,
                gia_tri: data.rows.item(i).gia_tri,
                mo_ta: data.rows.item(i).mo_ta
              });
            }
          }
        }

      })
    return acc;
  }

  public get_all_user() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM tbl_account", []).then((data) => {
        let arrayUser = [];
        if (data.rows.length > 0) {
          for (var j = 0; j < data.rows.length; j++) {
            arrayUser.push({
              user: data.rows.item(j).user,
              pass: data.rows.item(j).pass,
              save_pass: data.rows.item(j).save_pass
            });
          }
        }
        resolve(arrayUser);
      }, (error) => {
        reject(error);
      })
    })
  }

  public do_get_account_from_id(id: string) {
    return new Promise((resolve, reject) => {
      this.db.executeSql('SELECT * FROM tbl_account where id = \'' + id + '\'', []).then((data) => {
        let arraySetting = [];
        if (data.rows.length > 0) {
          for (var j = 0; j < data.rows.length; j++) {
            arraySetting.push({
              user: data.rows.item(0).user,
              pass: data.rows.item(0).pass,
              save_pass: data.rows.item(0).save_pass
            });
          }
        }
        resolve(arraySetting);
      }, (error) => {
        reject(error);
      })
    })
  }

  public get_setting() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM tbl_settings", []).then((data) => {
        let arraySetting = [];
        if (data.rows.length > 0) {
          for (var j = 0; j < data.rows.length; j++) {
            arraySetting.push({
              id: data.rows.item(j).id,
              gia_tri: data.rows.item(j).gia_tri,
              mo_ta: data.rows.item(j).mo_ta
            });
          }
        }
        resolve(arraySetting);
      }, (error) => {
        reject(error);
      })
    })
  }

  public do_get_setting_from_id(id: string) {
    return new Promise((resolve, reject) => {
      this.db.executeSql('SELECT * FROM tbl_settings where id = \'' + id + '\'', []).then((data) => {
        let arraySetting = [];
        if (data.rows.length > 0) {
          for (var j = 0; j < data.rows.length; j++) {
            arraySetting.push({
              id: data.rows.item(0).id,
              gia_tri: data.rows.item(0).gia_tri,
              mo_ta: data.rows.item(0).mo_ta
            });
          }
        }
        resolve(arraySetting);
      }, (error) => {
        reject(error);
      })
    })
  }

}
