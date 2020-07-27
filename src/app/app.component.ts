import { UserActivityComponent } from './user-activity/user-activity.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private jsonURL = 'assets/json/TestJSON.json';
  memberData : Array<any> = [];
  constructor(private http: HttpClient,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getJSON().subscribe(data => {
      this.memberData = data.members;
 });
  }

   getJSON(): Observable<any> {
    return this.http.get(this.jsonURL);
  }
   getUserData(event) {
    const dialogRef = this.dialog.open(UserActivityComponent, {
      data: {
        message: 'User Activities',
        params:  event
      },
      height: '60%',
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
     
  }
}
