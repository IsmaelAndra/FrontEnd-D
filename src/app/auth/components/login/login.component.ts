import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  funIngresar(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.loginConNest(loginData).subscribe(
        data => {
          if (data.token) {
            this.tokenService.setToken(data.token);
            alert('Iniciado sesión con éxito');
            
            if (loginData.rememberMe) {
              localStorage.setItem('rememberMe', 'true');
            }

            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 300);
          } else {
            alert('Error al iniciar sesión');
          }
        },
        error => {
          console.error('Error de login:', error);
          alert('Usuario o contraseña incorrectos');
        }
      );
    } else {
      alert('Por favor, complete todos los campos');
    }
  }
}
