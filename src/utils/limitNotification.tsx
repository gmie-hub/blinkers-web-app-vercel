import { notification } from "antd";
import Button from "../customs/button/button";

type NotifyWithActionParams = {
  message: string;
  description: string;
  buttonText?: string;
  onClick: () => void;
};

export const LimitNotification = ({
  message,
  description,
  buttonText = "Change Plan",
  onClick,
}: NotifyWithActionParams) => {
  notification.error({
    message,
    description: (
      <div>
        {description}
      
        <div style={{marginBlockEnd:'2rem'}}>
        <Button
        variant="green"
        className={"buttonStyle"}
          onClick={() => {
            notification.destroy();
            onClick();
          }}
        >
          {buttonText}
        </Button>
        </div>
      
      </div>
    ),
    duration: 0,
  });
};
