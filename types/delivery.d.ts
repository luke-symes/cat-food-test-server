export interface Delivery {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: PouchSize;
}

type PouchSize = 'A' | 'B' | 'C' | 'D' | 'E';
