import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, map, tap, BehaviorSubject, EMPTY, catchError } from 'rxjs';

import { IRegisterFormData } from 'src/app/interfaces/register-form-data.interface';
import { ILoginFormData } from 'src/app/interfaces/login-form-data.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { StorageService } from '../storage/storage.service';
import { User } from 'src/app/interfaces/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private readonly http: HttpClient,
		private storageService: StorageService,
		private readonly router: Router,
	) {}

	private _user$ = new BehaviorSubject<User | null>(null);
	public user$ = this._user$.asObservable();

	public init(): Observable<User> {
		return this.http.get<User>('https://tv-shows.infinum.academy/users/me').pipe(
			catchError(() => {
				console.log('init failed');
				return EMPTY;
			}),
			tap((user) => {
				console.log('init success');
				this._user$.next(user);
			}),
		);
	}

	public registerUser(userData: IRegisterFormData): Observable<User> {
		return this.http.post<User>('https://tv-shows.infinum.academy/users', userData, { observe: 'response' }).pipe(
			map((response) => {
				const token = response.headers.get('access-token') || '';
				const client = response.headers.get('client') || '';
				const uid = response.headers.get('uid') || '';

				localStorage.setItem('access-token', token);
				localStorage.setItem('client', client);
				localStorage.setItem('uid', uid);

				return response.body as User;
			}),
			tap((user) => {
				this._user$.next(user);
			}),
		);
	}

	public loginUser(userData: ILoginFormData): Observable<User> {
		return this.http
			.post<User>('https://tv-shows.infinum.academy/users/sign_in', userData, { observe: 'response' })
			.pipe(
				map((response) => {
					console.log('---------------------');
					console.log('response');
					console.log(response);
					console.log('---------------------');

					const token = response.headers.get('access-token') || '';
					const client = response.headers.get('client') || '';
					const uid = response.headers.get('uid') || '';

					localStorage.setItem('access-token', token);
					localStorage.setItem('client', client);
					localStorage.setItem('uid', uid);

					return response.body as User;
				}),
				tap((user) => {
					console.log('---------------------');
					console.log('user');
					console.log(user);
					console.log('---------------------');
					this._user$.next(user);
				}),
			);
	}

	public logoutUser(): void {
		localStorage.removeItem('access-token');
		localStorage.removeItem('client');
		localStorage.removeItem('uid');
		this.router.navigate(['auth', 'login']);
	}
}
