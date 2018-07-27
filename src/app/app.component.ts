import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

import { Table } from 'primeng/components/table/table';
import { DataTable } from 'primeng/components/datatable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [

  ]
})
export class AppComponent {

  public myForm: FormGroup;

  cars = [
    {
      "brand": "VW",
      "startYear": 2012,
      "endYear": 2018,
      "color": "Orange",
      "vin": "dsad231ffd"
    },
    {
      "brand": "Audi",
      "startYear": 2011,
      "endYear": 2013,
      "color": "Black",
      "vin": "gwregre345"
    },
    {
      "brand": "Renault",
      "startYear": 2005,
      "endYear": 2009,
      "color": "Gray",
      "vin": "h354htr"
    }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      vendors: this.formBuilder.array([])
    });
    this.initRowFirst();
    console.log(this.myForm);
  }

  ngOnInit() {

  }

  initRowFirst() {
    const control = <FormArray>this.myForm.controls['vendors'];
    this.cars.forEach(car => {
      control.push(
        this.formBuilder.group({
          uid: [car.vin],
          rangelist: this.formBuilder.array([
            this.initRange()
          ])
        })
      );
    })
  }


  initRange() {
    return this.formBuilder.group({
      startdate: [''],
      enddate: ['']
    });
  }

  onAddRow(i, j, value) {
    console.log('adding....');
    console.log(i);
    console.log(j);
    console.log(value);

    const control = <FormArray>this.myForm.controls['vendors'].controls[i].controls['rangelist'];

    control.push(
      this.initRange()
      // this.formBuilder.group({
      //   uid: [value.vin],
      //   rangelist: this.formBuilder.array([
      //     this.initRange()
      //   ])
      // })
    );

  }

  onRemoveRow(i, j, value) {
    console.log('removing....');
    console.log(i);
    console.log(j);
    console.log(value);
    const control = <FormArray>this.myForm.controls['vendors'].controls[i].controls['rangelist'];
    control.removeAt(j);
  }




}
