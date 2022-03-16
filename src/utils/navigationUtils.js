export const capitalizeWord = (word) => {
  if (!word) {
    return console.error("No word provided!!");
  }
  const result = word.slice(0, 1).toUpperCase() + word.slice(1);

  return result;
};

export const generateSubNav = (pageName, route, disableUpload) => {
  const routes = ["all", "add", "upload"];
  const navItem = [];

  if (!pageName || !route) {
    return console.error("No pageName or route provided");
  }

  for (let i = 0; i < routes.length; i += 1) {
    const currentItem = routes[i];
    const label = `${capitalizeWord(currentItem)} ${capitalizeWord(route)}`;

    const item = {
      url: `/${route}/${currentItem}-${route}`,
      disabled: false,
      selected: pageName === label,
      label,
    };

    navItem.push(item);
  }

  if (disableUpload) {
    navItem.pop();
  }

  return navItem;
};
