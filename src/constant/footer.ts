type IconList = {
  name: string;
  link: string;
};

const iconList: IconList[] = [
  {
    name: 'facebook-icon',
    link: '/icon/footer-icon-1.svg',
  },
  {
    name: 'instagram-icon',
    link: '/icon/footer-icon-2.svg',
  },
  {
    name: 'linkedin-icon',
    link: '/icon/footer-icon-3.svg',
  },
  {
    name: 'tiktok-icon',
    link: '/icon/footer-icon-4.svg',
  },
];

type ExploreList = {
  display: string;
  link: string;
};

const exploreList: ExploreList[] = [
  { display: 'All Food', link: '/filter' },
  { display: 'Nearby', link: '/filter' },
  { display: 'Discount', link: '/filter' },
  { display: 'Best Seller', link: '/filter' },
  { display: 'Delivery', link: '/filter' },
  { display: 'Lunch', link: '/filter' },
];

const helpList: string[] = [
  'How to Order',
  'Payment Methods',
  'Track My Order',
  'FAQ',
  'Contact Us',
];

export { iconList, exploreList, helpList };
