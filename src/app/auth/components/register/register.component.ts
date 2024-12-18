import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  
    this.registerForm.get('confirmPassword')?.setValidators([
      Validators.required,
      this.passwordMatchValidator.bind(this)
    ]);
  }
  
  passwordMatchValidator(control: any) {
    if (this.registerForm) {
      const password = this.registerForm.get('password')?.value;
      return password && control.value !== password ? { mismatch: true } : null;
    }
    return null;
  }  

  submit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Formulario de registro válido:', formData);
      this.authService.registroConNest(formData).subscribe({
        next: (response) => {
          alert("Registrado con Exito");
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 300);
        },
        error: (err) => {
          alert("No se pudo registrar al usuario")
          console.error('Error al registrar el usuario:', err);
        }
      });
    } else {
      console.log('Formulario de registro inválido');
    }
  }
  
}
