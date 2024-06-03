export type ICalender = {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sunday: string;
};
export type IProduct = {
  _id?: string;
  title: string;
  image: string;
  description: string;
};

export type ILinkOption = {
  _id: string;
  title: string;
  category: string;
  createdBy: string;
  icon: string;
  isActive: boolean;
  isMaster: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ILink = {
  type: string;
  link: string;
  _id?: string;
};

export type IBusinessCard = {
  _id: string;
  name: string;
  title: string;
  logo: string;
  coverImage: string;
  linkId: string;
  isActive: boolean;
};
export type IBusinessForm = {
  //BASIC INFO (active step-1)
  _id?: string;
  name: string;
  logo: string;
  coverImage: string;
  category: string;
  title: string;
  description: string;
  email: string;
  phone: number | null;
  linkId: string;
  alternatePhone: number | null;
  gallery: string[];

  //ADDRESS (active step-2)
  address: string;
  country: string;
  city: string;
  state: string;
  zipCode: number;
  googleMapLink: string;

  //LINKS (active step-3)
  links: ILink[];

  //PRODUCTS (active step-4)
  products: IProduct[];

  //CALENDER (active step-5)
  calender: string;

  //SUMMART (active step-6)
  enableEnquiryForm: boolean;
  enableAppointmentForm: boolean;

  isActive: boolean;
  theme: string;
};

export type FormKey = keyof IBusinessForm;

export type BusinessEnquiry = {
  _id: string;
  name: string;
  email: string;
  business: string;
  message: string;
  contact: number;
  createdAt: string;
  updatedAt: string;
  isSolved: boolean;
};

export type Offer = {
  _id?: string;
  title: string;
  description: string;
  image: string;
  business: string;
  startsOn: string;
  endsOn: string;
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
};

export type Visit = {
  ip: string;
  userAgent: string;
  url: string;
  visitedOn: string;
};

export type Query = {
  startDate: string;
  endDate: string;
  business: string;
};

export type GraphData = {
  x: number;
  y: number;
  label: string;
};
