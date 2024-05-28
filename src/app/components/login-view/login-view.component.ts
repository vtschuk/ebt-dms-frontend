import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LoginService} from "../../services/login.service";
import {first} from "rxjs";
import {AlertService} from "../../services";


@Component({
  templateUrl: 'login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.loginService.loginas(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe((token) => {
        console.log(token)
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/view';
        this.router.navigateByUrl(returnUrl);
        console.log(returnUrl)
      }, error => {
        this.alertService.error(error)
        this.loading = false;
      })
  }
}
