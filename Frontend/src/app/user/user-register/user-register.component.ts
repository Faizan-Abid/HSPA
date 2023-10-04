import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/service/alertify.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  registrationForm: FormGroup = new FormGroup({});
  user: User = {} as User;
  userSubmitted: boolean = false;
  constructor(private fb: FormBuilder, private userService: UserService, 
    private alertify: AlertifyService){
  }
  
  ngOnInit() {
    this.createRegistrationForm();
  }
  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(11)]],

    }, {validators: this.passwordMatchingValidator})
  }
  
  passwordMatchingValidator(fg: FormGroup): void {
    const password = fg.get('password')!.value; 
    const confirmPassword = fg.get('confirmPassword')!.value;
    if (password === confirmPassword) {
      fg.get('confirmPassword')!.setErrors(null);
    } else {
      fg.get('confirmPassword')!.setErrors({ notmatched: true });
    }
  }

  get userName(){
    return  this.registrationForm?.get('userName') as FormControl;
  }
  get email(){
    return  this.registrationForm?.get('email') as FormControl;
  }
  get password(){
    return  this.registrationForm?.get('password') as FormControl;
  }
  get confirmPassword(){
    return  this.registrationForm?.get('confirmPassword') as FormControl;
  }
  get mobile(){
    return  this.registrationForm?.get('mobile') as FormControl;
  }
  onSubmit() {
    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmitted = false;
      this.alertify.success('Congrats, you are successfully registered');
    } else {
      this.alertify.error('Kindly provide required field');   }
  }
  userData(): User{
      return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value,
}
  }
}
