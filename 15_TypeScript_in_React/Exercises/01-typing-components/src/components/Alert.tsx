// components/Alert.tsx
// This component should receive `message` (string) and possible alert are "info", "warn","error"
// If the application is in development mode, output the message to the console as well using the appropriate method

type Error = {
  message: string;
  type: 'info' | 'warn' | 'error';
};

const Alert = ({ message, type }: Error) => {
  // console.log(import.meta.env);

  if (import.meta.env.DEV) {
    // console.log(import.meta.env.VITE_TEST);
    console.log(type, message);
  }

  if (import.meta.env.DEV) {
    switch (type) {
      case 'info': {
        console.info(message);
        break;
      }
      case 'warn': {
        console.warn(message);
        break;
      }
      case 'error': {
        console.error(message);
        break;
      }
      default: {
        break;
      }
    }
  }

  return <div className={`alert ${type}`}>{message}</div>;
};

export default Alert;
