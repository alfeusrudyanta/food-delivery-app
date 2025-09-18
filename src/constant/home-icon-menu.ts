type IconMenuItem = {
  name: string;
  image: string;
  link: string;
};

const iconMenu: IconMenuItem[] = [
  {
    name: 'All Restaurant',
    image: '/icon/home-all-food.svg',
    link: '/filter',
  },
  {
    name: 'Nearby',
    image: '/icon/home-location.svg',
    link: '/filter',
  },
  {
    name: 'Discount',
    image: '/icon/home-discount.svg',
    link: '/filter',
  },
  {
    name: 'Best Seller',
    image: '/icon/home-best-seller.svg',
    link: '/filter',
  },
  {
    name: 'Delivery',
    image: '/icon/home-delivery.svg',
    link: '/filter',
  },
  {
    name: 'Lunch',
    image: '/icon/home-lunch.svg',
    link: '/filter',
  },
];

export default iconMenu;
