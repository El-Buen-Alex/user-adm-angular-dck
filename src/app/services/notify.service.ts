import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackMessageComponent } from '../shared/snack-message/snack-message.component';
import { SnackLoadingComponent } from '../shared/snack-loading/snack-loading.component';
import IApiResponse from '../interface/apiResponse.interface';

@Injectable({
	providedIn: 'root'
})
export class NotifyService {
	snackLoading!:MatSnackBarRef<any>;
	dialogLoading:any;
	dialogRole:any;
	constructor(
		private snackBar: MatSnackBar,
	) { }
	showSnackAlert(message:string, type:string="success", duration:number=2000, 
		position:MatSnackBarHorizontalPosition ='end' , 
		vertical : MatSnackBarVerticalPosition = 'bottom' ){
		this.snackBar.openFromComponent(SnackMessageComponent, {
			data: {
				message: message,
				type: type
			},
			duration: duration,
			horizontalPosition: position ,
			verticalPosition: vertical 
		});
	}

	showSingleMessage(data:IApiResponse<any>, time = 2000) {
		
		setTimeout(() => {

			this.snackBar.openFromComponent(SnackMessageComponent, {
				data: {
					message: data.message,
					type: data.type
				},
				duration: time,
				horizontalPosition: 'end'
			});
		}, 125)
		
	}
	
	showSnackLoading() {
		setTimeout(() => {
			this.snackLoading = this.snackBar.openFromComponent(SnackLoadingComponent, {
				horizontalPosition: 'end',
			})
		}, 125)
	}
	hideSnackLoading() {
		setTimeout(() => {
			this.snackLoading.dismiss()
		}, 125)
	}

	

	closeModalRole() {
		this.dialogRole.close();
	}
}
