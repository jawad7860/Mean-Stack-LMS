import { Employee } from './../../model/Employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {

  Learners:any =[];
  Name:string="Null";
  Overview:string="Null";
  Deadline:string="Null";
  constructor(
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
  ){

    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
  }

  ngOnInit() {
    




  }

  getEmployee(id) {
    this.apiService.getEmployee(id).subscribe((data) => {
      
    this.Learners=JSON.parse(JSON.stringify(data['learners']));
    this.Name=data['name'];
    this.Overview=data['overview'];
    this.Deadline=data['deadline'];
    
    //alert(data['learners']);
    
  });
  }

  removeEmployee(employee, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteEmployee(employee._id).subscribe((data) => {
        this.Learners.splice(index, 1);
      });
    }
  }

}
