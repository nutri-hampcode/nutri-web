import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userId: number | null = null;

    constructor() {
        const storedUserId = localStorage.getItem('userId');
        this.userId = storedUserId ? Number(storedUserId) : null;
    }

    setUserId(id: number): void {
        this.userId = id;
        localStorage.setItem('userId', id.toString());
    }

    getUserId(): number | null {
        if (this.userId === null) {
            const storedUserId = localStorage.getItem('userId');
            this.userId = storedUserId ? Number(storedUserId) : null;
        }
        return this.userId;
    }

    clearUserId(): void {
        this.userId = null;
        localStorage.removeItem('userId');
    }
}
