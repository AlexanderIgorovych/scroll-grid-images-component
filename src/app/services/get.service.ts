import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http: HttpClient) {

   }

  getList() {
    return this.http.get('http://localhost:3000/items').pipe(map((data: any ) => {
        const arr = [];
        data.forEach(element => {
         const el = {
          entry_id: element.entry_id,
          title: element.title,
          di_image: element.di_image,
         };
         arr.push(el);
       });
        return arr;
    }));
  }
}
