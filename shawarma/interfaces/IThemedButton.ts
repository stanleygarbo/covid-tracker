export interface IThemedButton {
  onClick: () => void;
  children: React.ReactChild;
  style?: React.CSSProperties;
}
