import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';
@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserActivityComponent implements OnInit {

  message: any;
  cpeHistoryList: Array<any> = [];
  strDate: string;
  selectedDate: any;
  activeDates = [];
  isDisabled = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<UserActivityComponent>) {
      if (data){
        this.message = data.message;
        this.cpeHistoryList = data.params;
      }
  }


  // getMonthNum(tempmonth: string) {
  //   if (tempmonth ==="Jan"){
  //     return 1;
  //   } else if (tempmonth ==="Feb"){
  //     return 2;
  //   }
  // }

  


  ngOnInit(): void {

  }

  onSelect(event) {
    this.isDisabled = false;
    
  }

  dateClass() {
    for(let i=0;i<this.cpeHistoryList.length;i++) {
      const setDob = this.datePipe.transform(this.cpeHistoryList[i].start_time, 'dd-MMM-yy') ;
      this.activeDates.push(setDob);
    }
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.activeDates
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      return highlightDate ? 'special-date' : '';
    };
  }

}
