export interface ICardProps {
  name: string;
  price: number;
  image: string;
  onClick: () => void;
  counter?: number;
}
