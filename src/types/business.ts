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
  _id: string;
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
};

export type FormKey = keyof IBusinessForm;
