import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/Model/Field';
import { FieldService } from 'src/app/services/field.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  fields: Field[]=[];
  selectedField: Field|any;
  constructor(private fieldService: FieldService) { }

  ngOnInit(): void {
    this.getFields();
  }

  getFields(): void {
    this.fieldService.getFields()
      .subscribe(fields => {
        this.fields = Object.values(fields);
       console.log(this.fields);}
        );
  }

  onSelect(field: Field): void {
    this.selectedField = field;
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.fieldService.addField({ name } as Field)
      .subscribe(field => {
        this.fields.push(field);
      });
  }

  update(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const field = { ...this.selectedField, name };
    this.fieldService.updateField(field)
      .subscribe(() => {
        this.getFields();
      });
  }

  delete(field: Field): void {
    this.fields = this.fields.filter(f => f !== field);
    this.fieldService.deleteField(field._id).subscribe();
  }

}