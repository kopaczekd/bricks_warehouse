import { Component, Input } from '@angular/core';
import { Supply } from '../models/supply';


@Component({
  selector: 'app-warehouse-info',
  templateUrl: './warehouse-info.component.html',
  styleUrls: ['./warehouse-info.component.css']
})
export class WarehouseInfoComponent {

  @Input()
  supplies: Supply[] = [];

}
