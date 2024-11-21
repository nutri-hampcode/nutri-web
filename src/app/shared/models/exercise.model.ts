export interface Goal {
  id: number;
  goalType: string;
}

export interface Tip {
  id: number;
  content: string;
}

export interface Exercise {
  id: number;
  linkVideo: string;
  image: string;
  description: string;
  goalId: number;
  tips: Tip[];
}
