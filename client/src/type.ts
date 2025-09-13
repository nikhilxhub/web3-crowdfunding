export type Campaign = {
  owner: string;
  title: string;
  description: string;
  target: number;
  deadline: number;
  amountCollected: number;
  image: string;
  donators: string[];
  donations: number[];
};
