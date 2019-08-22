import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'filteredYears'
})
export class FilteredYearsPipe implements PipeTransform {

  transform(projetList:any,value1: string,value2: string) {

    if (projetList && projetList.length)
    {
      var datePipe = new DatePipe("en-US");
      value1= datePipe.transform(value1, 'yyyy-MM-dd');
      value2= datePipe.transform(value2, 'yyyy-MM-dd');

      projetList.forEach(proj => {
        if (value1 >= value2)
        {
          return proj.v;
        }
      });
    }
    else
    {
      return projetList;
    }


  }


}
