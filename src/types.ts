export type Column = {
  id: number;
  name: string;
  jobs: Job[];
  created_at: string;
};

export type Job = {
  id: number;
  company: string;
  title: string;
  description: string;
  created_at: string;
};
