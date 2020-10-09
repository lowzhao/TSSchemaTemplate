export const btoa = (s) => Buffer.from(s).toString('base64')
export const atob = (s: string | undefined) => s? Buffer.from(s, 'base64').toString(): ''