import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ListDetail: { listId: string; listName: string };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ListDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ListDetail'>;
