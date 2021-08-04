import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "../app.component";

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(posts:Post[], searchVal:string, type: string): Post[] {
    // @ts-ignore
    return posts.filter(post => post[type].toLowerCase().includes(searchVal.toLowerCase()));
  }

}
