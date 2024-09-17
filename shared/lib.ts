const idGenerator = () => {
  let lastId = 0;

  return () => {
    return Date.now() + lastId++;
  };
};

export const generateId = idGenerator();
