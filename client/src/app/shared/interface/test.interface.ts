
export interface ITest {
  _id: string;
  nameTest: string;
  finish?: boolean;
}

export interface IBaseTest extends ITest {
  questions: ITestQuestion[];
}

export interface ITestQuestion extends ITest {
  title: string;
  answers: (string | number)[];
  correct: string | number;
}

export interface testResult {
  answer: (string | number)[];
  id: string;
}