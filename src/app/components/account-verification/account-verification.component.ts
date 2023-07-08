import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent implements OnInit{
  formCode:FormGroup;
  mostrarFormularioCodigo:boolean=false;
  errorMessage : string = '';

  constructor(private router: Router, private formBuilder: FormBuilder,private userService : UserService,private snackBar : MatSnackBar) {}
  
  ngOnInit(): void {
    this.formCode = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9.!#\\$%&\'\\*+/=?\\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]], 
      code:['',[Validators.required,Validators.pattern('^[0-9]{6}$'),Validators.maxLength(6)]]
    })
  }
  IrAInicio() {
    this.router.navigate(['/home']);
  }
  validarCodigo() {
    if (this.formCode.invalid) {
      return;
    }
    const code = this.formCode.get('code').value;
    const email = this.formCode.get('email').value;

    this.userService.verifyCodeWithEmail(code,email).subscribe(
      () => {
        this.userService.deleteDataUser();

        let snackBarRef = this.snackBar.open('Usuario verificado exitosamente. Serás redirigido al home.', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.mostrarFormularioCodigo = false;
          this.IrAInicio();
        });
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
