export interface IWordCard {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  difficult?: boolean | string;
  learned?: boolean;
}

export interface IUserWord {
  id: string;
  difficulty: string | boolean;
  wordId: string;
  optional: {
    game?: {
      sprint?: string;
      audioCall?: string;
    },
    largestSeriesCorAnswS?: string,
    largestSeriesCorAnswAC?: string,
  };
}

export interface IPageResultProps {
  userWordsList: IUserWord[];
  difficulty: string;
  dataWords: IWordCard[] | null;
}

export interface IWordType {
  difficulty: string;
  optional: {
    game?: {
      sprint?: string;
      audioCall?: string;
			
    },
    largestSeriesCorAnswS?: string,
    largestSeriesCorAnswAC?: string,
  };
}

export interface IUserSignUp {
  name?: string;
  email: string;
  password: string;
}

export interface IUserInfo {
  name: string;
  email: string;
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
}

export interface IProps {
  userData?: IUserInfo;
  setUserData?: any;
} 

export type PageSettingsProps = {
  onStart: (difficulty: string, isStart: boolean) => void;
};
