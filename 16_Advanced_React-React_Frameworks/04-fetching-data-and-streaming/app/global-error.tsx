'use client';

const GlobalError = ({ error }: { error: Error }) => {
  return (
    <html lang='en'>
      <body>
        <h1>ERROR</h1>
        <p>{error.message}</p>
      </body>
    </html>
  );
};
export default GlobalError;
