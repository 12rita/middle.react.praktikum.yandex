export interface IToasterContext {
  setError: (error: string) => void;
}

export interface IToasterProps {
  errors: string[];
}
