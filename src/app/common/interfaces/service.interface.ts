export interface ISubscription {
  message: string;
}

export interface INewsletterSubscription {
  id: number;
  email: string;
  active: boolean;
  newsletters: INewsletter;
}

export interface INewsletter {
  id: number;
  title: string;
  content: string;
}
