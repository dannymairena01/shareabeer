export type FeedUser = {
  name: string;
  handle: string;
  avatar: string;
  avatarTone: number;
};

export type Beer = {
  name: string;
  brewery: string;
  style: string;
  abv: number;
  rating: number;
  ratings: number;
  score?: number;
};

export type PhotoKind = 'hazy' | 'pilsner' | 'lambic';

export type FeedPost =
  | {
      id: string;
      kind: 'photo';
      user: FeedUser;
      where: string;
      when: string;
      photo: PhotoKind;
      beer: Beer;
      likes: number;
      comments: number;
      liked: boolean;
    }
  | {
      id: string;
      kind: 'checkin';
      user: FeedUser;
      where: string;
      when: string;
      beer: Beer & { score: number };
      note: string;
      likes: number;
      comments: number;
      liked: boolean;
    }
  | {
      id: string;
      kind: 'session';
      user: FeedUser;
      where: string;
      when: string;
      session: { duration: string; beers: number; friends: number; miles: number };
      likes: number;
      comments: number;
      liked: boolean;
    };

export const FEED: FeedPost[] = [
  {
    id: 'p1',
    kind: 'photo',
    user: { name: 'Lena Park', handle: '@lenapk', avatar: 'L', avatarTone: 220 },
    where: 'Other Half · Brooklyn',
    when: '12m',
    photo: 'hazy',
    beer: {
      name: 'Green Diamonds',
      brewery: 'Other Half',
      style: 'DIPA · Hazy',
      abv: 8.5,
      rating: 4.4,
      ratings: 1284,
    },
    likes: 248,
    comments: 31,
    liked: false,
  },
  {
    id: 'p2',
    kind: 'checkin',
    user: { name: 'Marcus Vale', handle: '@mvale', avatar: 'M', avatarTone: 30 },
    where: 'Trillium · Fenway',
    when: '1h',
    beer: {
      name: 'Fort Point Pale',
      brewery: 'Trillium',
      style: 'Pale Ale',
      abv: 6.6,
      rating: 4.1,
      ratings: 8420,
      score: 4.5,
    },
    note: 'Crisp. Best with the wood-fired pizza.',
    likes: 64,
    comments: 8,
    liked: true,
  },
  {
    id: 'p3',
    kind: 'photo',
    user: { name: 'Aiko Tanaka', handle: '@aiko', avatar: 'A', avatarTone: 340 },
    where: 'Sapporo Beer Garden',
    when: '3h',
    photo: 'pilsner',
    beer: {
      name: 'Yebisu Premium',
      brewery: 'Sapporo',
      style: 'Lager',
      abv: 5.0,
      rating: 3.9,
      ratings: 22014,
    },
    likes: 1820,
    comments: 142,
    liked: false,
  },
  {
    id: 'p4',
    kind: 'session',
    user: { name: 'Diego Reyes', handle: '@dreyes', avatar: 'D', avatarTone: 110 },
    where: 'Mission District Crawl',
    when: '5h',
    session: { duration: '3h 14m', beers: 4, friends: 5, miles: 2.1 },
    likes: 91,
    comments: 12,
    liked: false,
  },
  {
    id: 'p5',
    kind: 'photo',
    user: { name: 'Sasha Volkov', handle: '@svol', avatar: 'S', avatarTone: 280 },
    where: 'Cantillon · Brussels',
    when: '8h',
    photo: 'lambic',
    beer: {
      name: 'Gueuze 100% Lambic',
      brewery: 'Cantillon',
      style: 'Lambic',
      abv: 5.5,
      rating: 4.7,
      ratings: 9821,
    },
    likes: 612,
    comments: 88,
    liked: false,
  },
];

export const PHOTO_GRADIENTS: Record<
  PhotoKind,
  { colors: readonly [string, string, ...string[]]; locations?: number[] }
> = {
  hazy: { colors: ['#F4D687', '#E8B45A', '#A6701F', '#5A3A12'], locations: [0, 0.3, 0.75, 1] },
  pilsner: { colors: ['#FFF1B8', '#F2C95A', '#C99129', '#7A5310'], locations: [0, 0.35, 0.75, 1] },
  lambic: { colors: ['#F2E2C1', '#C9A567', '#8C6526', '#3F2A0E'], locations: [0, 0.35, 0.75, 1] },
};
