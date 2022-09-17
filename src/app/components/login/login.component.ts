import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login () {
    console.log('user', this.user);
    this.auth.login(this.user).subscribe(
      res => {
        if (res.token){
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        }else{
          console.error('error:', res.msg);
        }
      },
      err => console.error(err)
    );
  }

}
