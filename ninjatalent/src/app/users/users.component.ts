import { HttpErrorResponse } from '@angular/common/http';
import { Component,  OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
   public listUsers: Array<User>;
   public user: User;
   public modalRef: NgbModalRef;
  constructor(private userService: UserService,
              private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private serviceUser: UserService,
              ) {
              this.listUsers = [];
                }

  public ngOnInit(): void {
    this.search();
  }

  public search() {
    this.userService.getUser().subscribe((data: any) => {
      this.listUsers = data;
      console.log(data);
      console.log(this.listUsers);
    });
  }

  public showEditUser(user: User): void {
    const modalRef = this.modalService.open(EditUserComponent,
      {
        backdrop: 'static',
        centered: true,
        keyboard: false,
        windowClass: 'newModal',
      });
    modalRef.componentInstance.user = user;
    modalRef.result.then(
      (result: User) => {
        this.search();
      },
      (reason) => {

      });
  }

  public addUser() {
    const modalRef = this.modalService.open(EditUserComponent,
      {
        backdrop: 'static',
        centered: true,
        keyboard: false,
        windowClass: 'newModal',
      });
    modalRef.result.then(
      (result: User) => {
        this.search();
      },
      (reason) => {
      });
  }
  public deleteUser(): void {
    this.serviceUser.delete(this.user).subscribe(
      (data: any) => {
        this.listUsers.splice(this.listUsers.indexOf(this.user), 1);
        this.modalRef.close();
      },
      (error: HttpErrorResponse) => {
      });
  }
  public cerrarModalConfirm() {
    this.modalRef.close();
  }
  public openConfirm(modal: TemplateRef<any>, user?: User): void {
    if (user) {
      this.user = user;
    }
    this.modalRef = this.modalService.open(modal, {
      centered: true,
      windowClass: 'newModal',
    });
  }
}
