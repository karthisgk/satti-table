import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdtColumn, MdtOption, Pagination, ActionButtons, ActionReturn } from '../models/satti-table-model';

@Component({
  selector: 'satti-table',
  templateUrl: './satti-table.component.html',
  styleUrls: ['./satti-table.component.sass']
})
export class SattiTableComponent implements OnInit {
  @Input('option') mdtOption: MdtOption
  @Output('httpCall') more = new EventEmitter<() => void>()
  @Output('actionCallBack') actionClicked = new EventEmitter<ActionReturn>()
  pagination: Pagination[] = []
  columns: MdtColumn[] = []
  constructor() { }

  ngOnInit(): void {
    this.setConfig();
    this.more.emit(this.dataChanged.bind(this));
  }

  setConfig() {
    if (this.mdtOption && this.mdtOption.columns && this.mdtOption.columns.length) {
      this.mdtOption.columns = this.mdtOption.columns.map(c => {
        if (typeof c == 'string') {
          return { _id: c, label: c };
        }
        return c;
      })
    }
    if (typeof this.mdtOption == 'undefined' || this.mdtOption == null) return;
    if (typeof this.mdtOption.sort == 'undefined' || this.mdtOption.sort == null) {
      this.mdtOption.sort = { columnId: '', value: -1 };
    }
    if (typeof this.mdtOption.data == 'undefined' || this.mdtOption.data == null) this.mdtOption.data = [];
    if (typeof this.mdtOption.showEntry == 'undefined') this.mdtOption.showEntry = 10;
    if (typeof this.mdtOption.start == 'undefined') this.mdtOption.start = 0;
    if (typeof this.mdtOption.length == 'undefined') this.mdtOption.length = 10;
    if (typeof this.mdtOption.total == 'undefined') this.mdtOption.total = 0;
    if (typeof this.mdtOption.searchText == 'undefined') this.mdtOption.searchText = "";
    this.mdtOption.reload = this.reload.bind(this);
    this.columns = this.mdtOption.columns;
  }

  reload() {
    this.mdtOption.showEntry = 10; this.mdtOption.length = 10;
    this.mdtOption.start = 0; this.mdtOption.total = 0;
    this.mdtOption.searchText = "";
    this.mdtOption.data = [];
    this.more.emit(this.dataChanged.bind(this));
  }

  paginate(p: Pagination) {
    if (p.disabled || p.action == null || p.active) return;
    let { showEntry, start, total } = this.mdtOption;
    if (['prev', 'next'].indexOf(p.action) == -1) {
      this.mdtOption.start = p.action != '1' ? (false ?(parseInt(p.action) * showEntry) : ((parseInt(p.action) - 1) * showEntry)) : 0;
    } else {
      var activePageAction = start != 0 ? parseInt(((start + 1) / showEntry).toString()) : 1;
      if (p.action == 'prev' && activePageAction > 0) {
        this.mdtOption.start = (activePageAction - 1) * showEntry;
      }
      else if(p.action == 'next' && total > showEntry){
        let max = total % showEntry == 0 ? total / showEntry : parseInt((total / showEntry).toString()) + 1;
        if (activePageAction < max) {
          this.mdtOption.start = (activePageAction + 1) * showEntry;
        }
      }
    }
    this.mdtOption.length = this.mdtOption.showEntry;
    this.more.emit(this.dataChanged.bind(this));
  }

  dataChanged() {
    let { showEntry, total, start, data } = this.mdtOption;
    this.mdtOption.length = data.length;
    var activePageAction = parseInt(((start + 1) / showEntry).toString()) + 1;
    this.pagination = [
      {
        action: 'prev',
        disabled: false,
        active: false
      },
    ];
    if (total <= showEntry) {
      this.pagination.push({
        action: '1',
        disabled: true,
        active: true
      });
    }
    else if (total > showEntry) {
      let max = total % showEntry == 0 ? (total / showEntry) : parseInt((total / showEntry).toString()) + 1;
      if (max <= 7) {
        for (var i = 1; i <= max; i++)
          this.pagination.push({ action: i.toString(), disabled: false, active: false });
      }
      else {
        if (activePageAction == null || activePageAction < 5) {
          for (var i = 1; i <= 5; i++)
            this.pagination.push({ action: i.toString(), disabled: false, active: false });
          this.pagination.push({
            action: null,
            disabled: true,
            active: false
          });
          this.pagination.push({
            action: max.toString(),
            disabled: false,
            active: false
          });
        }
        else if (activePageAction >= 5) {
          this.pagination.push({
            action: '1',
            disabled: false,
            active: false
          })
          this.pagination.push({
            action: null,
            disabled: false,
            active: false
          })
          if ((max - activePageAction) < 4) {
            for (var i = max - 4; i < max; i++)
              this.pagination.push({ action: i.toString(), disabled: false, active: false });
          } else {
            this.pagination.push({
              action: (activePageAction - 1).toString(),
              disabled: false,
              active: false
            })
            this.pagination.push({
              action: activePageAction.toString(),
              disabled: false,
              active: false
            })
            this.pagination.push({
              action: (activePageAction + 1).toString(),
              disabled: false,
              active: false
            });
            this.pagination.push({
              action: null,
              disabled: false,
              active: false
            })
          }
          this.pagination.push({
            action: max.toString(),
            disabled: false,
            active: false
          });
        }
      }
    }
    this.pagination.push({
      action: 'next',
      disabled: false,
      active: false
    });
    this.pagination = this.pagination.map(p => {
      if (p.action ==  (activePageAction).toString())
        p.active = true;
      else {
        p.active = false;
      }
      return p;
    })
  }

  actionPerform(type: string, e: any) {
    if (!type || !e) return;
    this.actionClicked.emit({ type, data: e });
  }

  onSort(c: MdtColumn) {
    if (!c.sort) return;
    if (this.mdtOption.sort && this.mdtOption.sort.columnId && this.mdtOption.sort.columnId == c._id)
      this.mdtOption.sort.value = this.mdtOption.sort.value == 1 ? -1 : 1;
    else
      this.mdtOption.sort = { columnId: c._id, value: 1 };
    this.more.emit(this.dataChanged.bind(this));
  }

  onChangeShowEntry() {
    this.mdtOption.start = 0;
    this.mdtOption.length = this.mdtOption.showEntry;
    this.more.emit(this.dataChanged.bind(this));
  }

  onKeyUpSearchText() {
    if (this.mdtOption.searchText.length > 3 || this.mdtOption.searchText.length == 0) {
      this.mdtOption.start = 0;
      this.mdtOption.length = this.mdtOption.showEntry = 10;
      this.more.emit(this.dataChanged.bind(this));
    }
  }

  checkDisable(options: string, type):boolean {
    return options.split(',').indexOf(type) > -1;
  }

}
