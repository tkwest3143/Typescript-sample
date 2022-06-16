export interface Setting {
  id: number;
  title: string;
  url: string;
  method: string;
  parameters: { key: string; value: string }[];
}
