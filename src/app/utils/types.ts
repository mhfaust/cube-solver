export type Stringables = { toString: () => string }[]
export type Logger = (...strs: Stringables) => void