export function clearStoredAuth(): void {
    localStorage.removeItem('auth');
}

export function getStoredAuth(): any {
    const storedAuth =
        typeof window !== 'undefined' ? localStorage.getItem('auth') : '';

    return storedAuth ? JSON.parse(storedAuth) : null;
}

export function setStoredAuth(auth: any): void {
    localStorage.setItem('auth', JSON.stringify(auth));
}

export function setStoredUserInformation(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getStoredUser(): any {
    const storedUser =
        typeof window !== 'undefined' ? localStorage.getItem('user') : '';

    return storedUser ? JSON.parse(storedUser) : null;
}

export function clearStoredUser(): void {
    localStorage.removeItem('user');
}
