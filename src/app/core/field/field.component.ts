import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/Model/Field';
import { FieldService } from 'src/app/services/field.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  fields: Field[] =[];
  selectedField: Field|any ;
  addingField = false;

  constructor(private fieldService: FieldService) { }

  ngOnInit() {
   this.getFields();
  }

  getFields(): void {
    this.fieldService.getFields().subscribe(fields => {
console.log(fields)  
this.fields=fields 
console.log(this.fields)  
   });
  }
  
  onSelect(field: Field): void {
    this.selectedField = field;
  }

  addField(): void {
    this.addingField = true;
    this.selectedField = null;
  }

  saveField(field: Field): void {
    if (field._id) {
      this.fieldService.updateField(field._id, field)
        .subscribe(() => this.getFields());
    } else {
      this.fieldService.addField(field)
        .subscribe(() => this.getFields());
    }
    this.cancel();
  }

  deleteField(field: Field): void {
    this.fieldService.deleteField(field._id)
      .subscribe(() => {
        this.fields = this.fields.filter( f => f !== field);
        if (this.selectedField === field) {
          this.selectedField = null;
        }
      });
  }

  cancel(): void {
    this.addingField = false;
    this.selectedField = null;
  }

}
