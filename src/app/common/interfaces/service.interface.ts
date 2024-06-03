export interface ISubscription extends IService {}

export interface IAuth extends IService {}

export interface IAuthLogin extends IService {
  user: IUser;
}

export interface IService {
  message: string;
}

export interface INewsletterData {
  id?: number;
  title: string;
  content: string;
  assetfile?: string;
  assetFile?: Blob;
  assetname?: string;
  assettype?: string;
  user?: number;
}

export interface INewsletterSubscription {
  id: number;
  email: string;
  active: boolean;
  newsletters?: INewsletter;
}

export interface INewsletter {
  id: number;
  title: string;
  content: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  role: string;
  createAt: string;
  updateAt: string;
}
