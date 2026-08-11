// oxlint-disable promise/avoid-new
export const starsLoader = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  const res = await fetch('/stars.json');
  if (res.status !== 200) {
    throw new Error('something went wrong');
  }
  const data = await res.json();
  return data;
};
