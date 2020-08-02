import { Component, Input} from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent{

    @Input() title: string = 'sin nombre';

    // tslint:disable-next-line:no-input-rename
    @Input('labels') doughnutChartLabels: Label[] = ['sin valor', 'sin valor', 'sin valor'];

    // tslint:disable-next-line:no-input-rename
    @Input('data') doughnutChartData: MultiDataSet = [
      [1, 2, 3]
    ];

    public colors: Color[] = [
      {backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
    ];

}
