import { compare } from 'bcryptjs';
import Cookies from 'js-cookie';

export interface AuthCredentials {
  username: string;
  password: string;
}

export class AuthService {
  static async login(credentials: AuthCredentials): Promise<boolean> {
    try {
      const validUsername = process.env.NEXT_PUBLIC_ADMIN_USER;
      const encodedPasswordHash = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

      if (!validUsername || !encodedPasswordHash) {
        throw new Error('Authentication configuration missing');
      }

      // Decode the base64 hash
      const validPasswordHash = Buffer.from(
        encodedPasswordHash,
        'base64'
      ).toString();

      const isValidUsername = credentials.username === validUsername;
      const isValidPassword = await compare(
        credentials.password,
        validPasswordHash
      );

      const isValid = isValidUsername && isValidPassword;

      if (isValid) {
        Cookies.set('auth', 'true', { expires: 1 });
      }

      return isValid;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  static logout(): void {
    Cookies.remove('auth');
  }

  static isAuthenticated(): boolean {
    return !!Cookies.get('auth');
  }
}
