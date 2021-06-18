import { Component, Input, OnInit } from '@angular/core';
import { CoreApi } from '../../interfaces/core-api.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardDetails = <CoreApi>{};

  constructor() { }

  ngOnInit(): void {
  }

}
