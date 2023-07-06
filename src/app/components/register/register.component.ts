import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { UserService } from 'src/service/user.service';
import { User } from 'src/models/User';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  formRegistro:FormGroup;
  formCode:FormGroup;
  mostrarFormularioCodigo:boolean=false;

  constructor(private router: Router, 
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private snackBar : MatSnackBar) {
  }
  
  ngOnInit(): void {
    this.formRegistro =this.formBuilder.group({
    name: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9.!#\\$%&\'\\*+/=?\\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]], 
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\-\.$!%*?&])([A-Za-z\d\-\.$!%*?&]|[^ ]){8,15}$/)]]
  })
    this.formCode = this.formBuilder.group({
      code:['',[Validators.required,Validators.pattern('^[0-9]{6}$'),Validators.maxLength(6)]]
    })
  }

  IrAInicio() {
    this.router.navigate(['/home']);
  }
  registrarUsuario():void{
    if (this.formRegistro.invalid) {
      return;
    }
    const user: User ={
      username : this.formRegistro.get('email').value,
      password : this.formRegistro.get('password').value,
      email : this.formRegistro.get('email').value,
      name : this.formRegistro.get('name').value
    }
    this.userService.register(user);
    this.formRegistro.reset();
    this.mostrarFormularioCodigo=true;
    
  }
  validarCodigo() {
    if (this.formCode.invalid) {
      return;
    }
    const code = this.formCode.get('code').value;
    this.userService.verifyCode(code);
    // Realizar las acciones necesarias para validar el código de validación
    // ...
    // Reiniciar el formulario del código de validación y ocultarlo
    this.userService.deleteDataUser();
    // Mostrar el aviso con un tiempo de espera de 3 segundos
    let snackBarRef = this.snackBar.open('Usuario verificado exitosamente. Serás redirigido al home.', '', {
      duration : 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.mostrarFormularioCodigo = false;
      this.IrAInicio();
    });
  }
  
}

