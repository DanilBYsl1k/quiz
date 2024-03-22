
export interface ITest {
  _id: number;
  nameTest: string;
  finish?: boolean;
  mark?: number;
}

export interface IBaseTest extends ITest {
  questions: ITestQuestion[];
}

export interface ITestQuestion extends ITest {
  title: string;
  answers: (string | number)[];
  correct: string | number;
}

export interface ITestResult {
  answer: {answer: string | number, id: number }[];
  id: number;
}