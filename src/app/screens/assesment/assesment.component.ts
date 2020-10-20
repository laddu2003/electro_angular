import { AssignmentService } from "./../../service/assignment/assignment.service";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackbarService } from "app/service/snackbar/snackbar.service";

@Component({
  selector: "app-assesment",
  templateUrl: "./assesment.component.html",
  styleUrls: ["./assesment.component.scss"],
})
export class AssesmentComponent implements OnInit {
  page = 1;
  limit = 5;
  total_pages;
  shwoSpinner = true;
  constructor(
    private _assignMent: AssignmentService,
    public dialog: MatDialog,
    private _snBar: SnackbarService
  ) {}

  assignmentList;
  ngOnInit(): void {
    this.myAssignments(this.page);
  }

  openDialog(item) {
    const dialogRef = this.dialog.open(DialogContentAssignmentDialog, {
      width: "700px",
      data: item,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == "save") {
        this._snBar.shackBarMessage("work process update...");
        this.myAssignments(this.page);
      }
    });
    // dialogRef.afterOpened().subscribe((result) => {
    //   console.log(`Dialog result afterOpened: ${result}`);
    // });
  }
  myAssignments(page: number) {
    this.shwoSpinner = true;
    this._assignMent
      .getAssignMent(`/get?page=${page}&limit=${this.limit}`)
      .subscribe(
        (res: any) => {
          this.shwoSpinner = false;
          this.assignmentList = res.result.data;
          this.total_pages = res.result.total_pages;
          this.page = res.result.current_page;
          this.makeTotalNumberPage(this.total_pages);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  paginationCall(event) {
    let page = event.target.value;
    this.myAssignments(page);
  }
  makeTotalNumberPage(lastPage) {
    this.total_pages = [];
    for (let index = 1; index <= lastPage; index++) {
      this.total_pages.push(index);
    }
  }
}

@Component({
  selector: "dialog-content-assignment-details-dialog",
  templateUrl: "assignment-details-dialog.components.html",
})
export class DialogContentAssignmentDialog implements OnInit {
  selectedDetails;
  updateAssignmentForm: FormGroup;
  formFields = false;
  constructor(
    private dialogRef: MatDialogRef<DialogContentAssignmentDialog>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private _assignService: AssignmentService,
    private _snBar: SnackbarService
  ) {
    this.selectedDetails = data;
  }

  ngOnInit() {
    this.updateAssignmentForm = this.fb.group({
      id: [this.selectedDetails.id, [Validators.required]],
      work_status: ["", [Validators.required]],
    });
  }
  showFormInputField() {
    this.formFields = !this.formFields;
  }
  updateAssignment() {
    this._assignService
      .updateAssignmentWorkStatus(this.updateAssignmentForm.value)
      .subscribe(
        (res) => {
          this.dialogRef.close("save");
        },
        (err) => {
          if (err.status == 0) {
            this._snBar.shackBarMessage(
              "hmm..server errot something went wrogn check your internet connection and try aganin later"
            );
          }
          if (err.status == 401) {
            this._snBar.shackBarMessage(
              "hmm..server errot something went wrogn check your internet connection and try aganin later"
            );
          }
        }
      );
  }
}
