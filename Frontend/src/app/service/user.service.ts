import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  addUser(user: User) {
    let users = [];
    const storedUsers = localStorage.getItem('Users');
    if (storedUsers !== null) {
      users = JSON.parse(storedUsers);
    }
    if (Array.isArray(users)) {
      users.push(user);
      localStorage.setItem('Users', JSON.stringify(users));
    } else {
      console.error('Invalid user data in localStorage:', storedUsers);
    }
  }
  
}
