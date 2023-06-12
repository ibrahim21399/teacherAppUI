import { Component } from '@angular/core';
import { admin } from 'src/app/Model/admin';
import { adminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  Admins: admin[]=[];
  selectedAdmin: admin|any;
  constructor(private adminservice: adminService) { }

  ngOnInit(): void {
    this.getadmins();
  }

  getadmins(): void {
    this.adminservice.getAdminss()
      .subscribe(  (a: admin[])=>{
        console.log(a)
        this.Admins=a;
      });
      }

  onSelect(admin: admin): void {
    this.selectedAdmin = admin;
  }

  add(name: string,email:string,password:string): void {
    name = name.trim();
    if (!name) { return; }
    this.adminservice.addAdmin({ name ,email,password } as admin)
      .subscribe(field => {
        this.getadmins();
      });
  }

  delete(admin: admin): void {
    this.Admins = this.Admins.filter(f => f !== admin);
    this.adminservice.deleteField(admin._id).subscribe();
  }

}