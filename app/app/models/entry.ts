export interface Entry {
  slug: string;
  title: string;
  body: string;
  created_at: {
    seconds: number;
    _seconds: number;
  };
}