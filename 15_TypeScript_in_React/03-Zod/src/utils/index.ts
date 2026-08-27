type ErrorFields = {
  name: string;
  email: string;
  message: string;
};

const validate = ({ name, email, message }: ErrorFields) => {
  const newErrors: Partial<ErrorFields> = {};
  if (!name.trim()) {
    newErrors.name = 'Name is required.';
  }
  if (!email.trim()) {
    newErrors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/u.test(email)) {
    newErrors.email = 'Invalid email format.';
  }
  if (!message.trim()) {
    newErrors.message = 'Message is required.';
  }
  return newErrors;
};

// oxlint-disable-next-line promise/avoid-new no-promise-executor-return typescript/strict-void-return promise/param-names
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export { validate, sleep };
