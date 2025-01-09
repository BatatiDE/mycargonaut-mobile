// Refactored authTypes.ts for React Native/Expo

export interface User {
    id: number;
    email: string;
    name: string;
    phone?: string;
    roles?: string[];
    token: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
}

export interface ProfilePayload {
    name: string;
    phone?: string;
}