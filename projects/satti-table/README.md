# SattiTable 🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️

🙏🙏🙏

The idea of this component is cloning jquery data table in Angular way, this component is only made for data table with http calls. 🔥🔥🔥

![satti-table example](https://raw.githubusercontent.com/karthisgk/satti-table/master/projects/satti-table-example/src/assets/ex1.png)


## Install

You can get it on NPM installing `satti-table` module as a project dependency.

```shell
npm install satti-table --save
```

## Setup

You'll need to add `SattiTableModule` to your application module. So that, the `<satti-table></satti-table>` components will be accessible in your application. ✍✍✍

```typescript
...
import { SattiTableModule } from 'satti-table';
...

@NgModule({
  declarations: [
    YourAppComponent
  ],
  imports: [
    ...
    SattiTableModule,
    ...
  ],
  providers: [],
  bootstrap: [YourAppComponent]
})

export class YourAppModule {}

```

After that, you can use the `satti-table` components in your templates, passing the configuration data into the component itself.

- `satti-table`: Handle the data table with http of your app;

```html
<div>
  <satti-table [option]="option" (httpCall)="getDataFromApi($event)" (actionCallBack)="actionCallBack($event)"></satti-table>
</div>
```

In Yout Component,

```typescript

export class YourAppComponent {
  option: any = {
    columns: ['name','position', 'office','age']
  }
  getDataFromApi(callBack: () => void){
    let data = {
        offset: this.option.start,
        limit: this.option.length,
        search: this.option.searchText,
        sort: {
            field: this.option.sort.columnId,
            dir: this.option.sort.value == 1 ? 'asc' : 'desc'
        }
    }
    this.httpClient.post('http://api.sample.com/', data).subscribe((resp: any) => {
        this.option.data = resp.data.map(d => {
            d.hideAction = 'view-btn, edit-btn';
            return d;
        });
        this.option.total = 4;
        callBack();
    }, err => alert(err.statusText ? err.statusText :  err.message))
  }
}
```

### Node
** To Hide Action Button **
```typescript
data: [
    {
        ...,
        ...,
        hideAction: 'edit,delete'
    }
]
```



## Options

- `columns`: pass the column id with label;
- `data`: raw data;
- `showEntry`: 'n' records to show;
- `start`: data from the start index;
- `length` - record from filtred data;
- `total`: total records;
- `searchText`: search value of input field;
- `sort`: sorting the columns as Accending and decending;
- `idKey`: pass the column id which is unique to identify;
- `reload`: this is method to re-initialize the component;

### option[columns]

```typescript

export class AppComponent {
    ....
    option: any = {
        columns: [
            {
                _id: 'name',
                label: 'Name',
                sort: true
            },
            {
                _id: 'pos',
                label: 'Position',
                sort: true
            },
            {
                _id: 'branch',
                label: 'Brach',
                sort: false
            },
            {
                _id: 'age',
                label: 'Age',
                sort: true
            },
            {
                _id: 'action',
                label: 'Action',
                action: [
                    {
                        type: 'view-more',
                        className: 'btn btn-warning',
                        returnKey: 'id',
                        iconClassName: 'mdi mdi-eye',
                        btnText: 'View',
                    }
                ]
            }
        ]
    }
    ....

    acactionCallBack(e: any) {
        //e.type, e.data
        alert(e.type + ' button is clicked'); //view-more button is clicked
    }
}
```

### option[sort]
```javascript
sort: {
    columnId: "name",//string
    value: 1,//number (1 = asc,-1 = desc)
}
```

