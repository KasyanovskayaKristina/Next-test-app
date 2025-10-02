export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type SubmitResponse = {
  success: boolean;
  message: string;
  receivedData?: {
    text: string;
    fileName: string;
    fileSize: string;
    fileType: string;
    timestamp: string;
  };
  error?: string;
};

