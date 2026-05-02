export interface ListItem {
  id: string;
  text: string;
  completed: boolean;
  quantity?: number;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  items: ListItem[];
}

export interface List {
  id: string;
  name: string;
  categories: Category[];
  createdAt: number;
  updatedAt: number;
}
