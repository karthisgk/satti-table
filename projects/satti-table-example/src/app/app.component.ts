import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sattiTableOption: any = {
    columns: ['name','position', 'office','age']
  }
  data: any[] = [
    {name: 'sandu 1', position: 'pos A', office: 'line1', age: '20'},
    {name: 'sandu 2', position: 'pos b', office: 'line2', age: '23'},
    {name: 'sandu 3', position: 'pos c', office: 'line1', age: '26'},
    {name: 'sandu 4', position: 'pos A', office: 'line2', age: '25'}
  ]
  availableOption: string
  constructor(){}

  httpCall(callBack: () => void){
    console.log(this.sattiTableOption);
    this.availableOption = JSON.stringify(this.sattiTableOption, null, 3);
    if(this.sattiTableOption.searchText.length > 3){
      this.data = this.data.filter(d => d.name === this.sattiTableOption.searchText);
    }
    this.sattiTableOption.data = this.data;
    this.sattiTableOption.total = 4;
    callBack();
  }
}
