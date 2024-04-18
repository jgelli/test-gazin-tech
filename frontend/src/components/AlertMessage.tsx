import React from "react";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  Spacer,
} from "@chakra-ui/react";

interface AlertMessageProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export interface Message {
  type?: "success" | "error";
  message: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  type = "success",
  message,
  onClose,
}) => {
  return (
    <Alert
      w={["fit-content", "50%"]}
      className="alert__message"
      m={3}
      status={type}
    >
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
      <Spacer />
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  );
};

export default AlertMessage;
