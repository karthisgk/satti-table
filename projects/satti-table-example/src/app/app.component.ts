import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sattiTableOption: any = {
    columns: [
      {_id: 'name', label: 'Name',action: [
        {
          type: 'view',
          className: 'btn btn-primary',
          btnText: false
        }
      ]},
      {_id: 'position', label: 'Position'},
      {_id: 'office', label: 'Office'},
      {_id: 'age', label: 'age'},
      {_id: 'option', label: 'Action', action: [
        {
          type: 'view',
          className: 'btn btn-warning',
          btnText: 'View'
        },
        {
          type: 'edit',
          className: 'btn btn-primary',
          btnText: 'Edit'
        },
        {
          type: 'delete',
          className: 'btn btn-danger',
          btnText: 'Del'
        }
      ] }
    ]
  }
  data: any[] = [
    {name: 'sandu 1', position: 'pos A', office: 'line1', age: '20'},
    {name: 'sandu 2', position: 'pos b', office: 'line2', age: '23', hideAction: 'view,delete'},
    {name: 'sandu 3', position: 'pos c', office: 'line1', age: '26', hideAction: 'view,edit'},
    {name: 'sandu 4', position: 'pos A', office: 'line2', age: '25', hideAction: 'view'}
  ]
  availableOption: string
  constructor(){}

  httpCall(callBack: () => void){
    if(this.sattiTableOption.searchText.length > 3){
      this.data = this.data.filter(d => d.name === this.sattiTableOption.searchText);
    }
    this.sattiTableOption.data = this.data;
    this.sattiTableOption.total = 4;
    this.availableOption = JSON.stringify(this.sattiTableOption, null, 3);
    callBack();
  }

  actionCallBack(e: any){
    alert(e.type + ' button is clicked');
  }
}
