import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../Services/crud.service';
import { crudObj } from '../crud_modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
addshow!:boolean;
showupdate!:boolean;
formValue:any;
datta:any;
crudData: crudObj = new crudObj;
constructor(private http:CrudService){
   this.getdata()

}
form=new FormGroup({
  name:new FormControl('',Validators.required),
  email:new FormControl('',Validators.required),
  mobile:new FormControl('',Validators.required),
  city:new FormControl('',Validators.required),
})

getdata(){
  
  this.http.getData().subscribe(res =>{
    this.formValue=res
  })
}
add(){
    this.addshow=true;
    this.showupdate=false;
}
submit(){
  this.http.adddata(this.form.value).subscribe(res =>{
  })
  this.form.reset()
  this.getdata()
}
edit(data:any){
  this.addshow=false;
  this.showupdate=true;
    

  this.form.patchValue({
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    city: data.city
  });
  // Store the current data for update
  this.crudData = data;
}

deleteData(data:any){
     this.http.deleteData(data.id).subscribe()
     this.getdata();
}
updateData(){
  this.crudData.name = this.form.value.name
  this.crudData.email = this.form.value.email
  this.crudData.mobile = this.form.value.mobile
  this.crudData.city = this.form.value.city

  this.http.updateData(this.crudData, this.crudData.id).subscribe(
    (response) => {
      console.log('Update Successful', response);

      // Reset the form and update data after successful update
      this.form.reset();
      this.getdata();

      // Toggle the flags to show the add view again
     
    },
    (error) => {
      console.error('Update Failed', error);
    }
  );
}
}


