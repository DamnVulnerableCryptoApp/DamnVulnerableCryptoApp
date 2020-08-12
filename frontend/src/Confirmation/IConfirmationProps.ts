
export default interface IConfirmationProps {
  title: string;
  message: string;
  positiveButton: string;
  negativeButton: string;
  onPositiveButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onNegativeButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  isOpen: boolean;
}
