// Type declarations for Next.js server middleware compatibility
declare module 'next/server' {
  export interface NextURL {
    pathname: string;
    search: string;
    searchParams: URLSearchParams;
    href: string;
    origin: string;
    protocol: string;
    host: string;
    hostname: string;
    port: string;
  }

  export interface RequestCookie {
    name: string;
    value: string;
    path?: string;
    maxAge?: number;
    domain?: string;
    sameSite?: 'lax' | 'strict' | 'none';
  }

  export interface RequestCookies {
    get(name: string): RequestCookie | undefined;
    getAll(): RequestCookie[];
    has(name: string): boolean;
    set(name: string, value: string, options?: any): this;
    delete(name: string): boolean;
  }

  export interface ResponseCookies {
    get(name: string): RequestCookie | undefined;
    getAll(): RequestCookie[];
    set(name: string, value: string, options?: any): this;
    delete(name: string): boolean;
  }

  export class NextRequest extends Request {
    readonly nextUrl: NextURL;
    readonly cookies: RequestCookies;
    readonly ip?: string;
    readonly geo?: {
      city?: string;
      country?: string;
      region?: string;
      latitude?: string;
      longitude?: string;
    };
    constructor(input: RequestInfo | URL, init?: RequestInit);
  }

  export class NextResponse extends Response {
    readonly cookies: ResponseCookies;
    static next(init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, init?: number | ResponseInit): NextResponse;
    static rewrite(destination: string | URL, init?: ResponseInit): NextResponse;
    static json(body: any, init?: ResponseInit): NextResponse;
  }
}
