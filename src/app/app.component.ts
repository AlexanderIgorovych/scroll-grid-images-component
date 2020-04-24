import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GetService } from './services/get.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';
import { ListOfObjects } from './model/object.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Test';
  listOfObjects;
  lengthOfShowedObjects = 30;
  displayOrientation = 'vertical';

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  constructor(private getService: GetService) {
  }


  ngOnInit(): void {
    this.listOfObjects = this.getService.getList().pipe(map((data: ListOfObjects[]) => {
      const increasedList = data;
      let additionalTitleNumber = 1;
      for (let i = increasedList.length; i < 400; i++, additionalTitleNumber++ ) {
        const additionalObj = {
          entry_id: data[0].entry_id,
          title: data[0].title + additionalTitleNumber,
          di_image: data[0].di_image,
        };
        increasedList.push(additionalObj);
      }
      return increasedList;
    }));
  }

  changeOrientation() {
   if (this.displayOrientation === 'vertical') {
    this.displayOrientation = 'horizontal';
    this.lengthOfShowedObjects = 30;
   } else {
     this.displayOrientation = 'vertical';
     this.lengthOfShowedObjects = 30;
   }
  }
  getMoreObj() {
    if ( this.displayOrientation === 'vertical' && this.virtualScroll.measureScrollOffset('bottom') < 10) {
      this.lengthOfShowedObjects += 30;
    }
    if (this.displayOrientation === 'horizontal' && this.virtualScroll.measureScrollOffset('right') < 10) {
      this.lengthOfShowedObjects += 30;
    }
  }

  parseUrl(val) {
    return `url(${val})`;
  }

  ngOnDestroy(): void {
    this.listOfObjects.unsubscribe();
  }
}

