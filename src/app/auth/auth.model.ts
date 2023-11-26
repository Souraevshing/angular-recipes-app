export class AuthSignIn {
  constructor(
    public displayName?: string,
    public email?: string,
    public idToken?: string,
    public kind?: string,
    public localId?: string,
    public registered?: boolean
  ) {}
}

export class AuthSignUp {
  constructor(
    public email?: string,
    public expiresIn?: string,
    public idToken?: string,
    public kind?: string,
    public localId?: string,
    public refreshToken?: string
  ) {}
}
