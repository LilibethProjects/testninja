import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  @Input()
  public user: User;
  public formUser: FormGroup;

  constructor(private serviceUser: UserService,
              private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              ) { }

   public ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      id: [null],
      name: [null],
      email: [null],
    });

    if (this.user) {
      this.formUser.patchValue(this.user);
    }
  }

  public save(): void {
    console.log(this.user);
    console.log(this.formUser.value);

    if (this.user) {
      this.serviceUser.updateUser(this.formUser.value).toPromise().then(
        (data: any) => {
          this.activeModal.close(data);
        },
        (error: HttpErrorResponse) => {
        });
    } else {
      this.serviceUser.createUser(this.formUser.value).toPromise().then(
        (data: any) => {
          this.activeModal.close(data);
        },
        (error: HttpErrorResponse) => {
        });
    }
  }
}
