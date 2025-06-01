import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  allUsers: User[] = [];
  batchSize = 10;
  currentIndex = 0;
  isLoading = false;

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.allUsers = Array(10).fill(users).flat();
      this.loadBatch();
    });
  }
  

  loadBatch() {
    if (this.isLoading || this.currentIndex >= this.allUsers.length) {
      return;
    }
  
    this.isLoading = true;
  
    const nextIndex = this.currentIndex + this.batchSize;
    const nextBatch = this.allUsers.slice(this.currentIndex, nextIndex);
    this.users = [...this.users, ...nextBatch];
    this.currentIndex = nextIndex;
  
    this.isLoading = false;
  }
  

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition >= threshold) {
      this.loadBatch();
    }
  }

  logout() {
    localStorage.removeItem('authToken'); 
    this.router.navigate(['/login']);
  }
  
}
