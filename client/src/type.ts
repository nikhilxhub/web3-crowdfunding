// export type Campaign = {
//   owner: string;
//   title: string;
//   description: string;
//   target: number;
//   deadline: number;
//   amountCollected: number;
//   image: string;
//   donators: string[];
//   donations: number[];
// };

export type Campaign = [
  string,        // owner
  string,        // title
  string,        // description
  bigint,        // target
  bigint,        // deadline
  bigint,        // amountCollected
  string,        // image
  string[],      // donators
  bigint[]       // donations
];