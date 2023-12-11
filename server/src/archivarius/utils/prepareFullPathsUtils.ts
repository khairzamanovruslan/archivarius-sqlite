export const prepareFullPathsUtils = async ($) => {
  const res1 = $(".filesizecolor a").text();
  const res2 = res1.split("ПросмотретьСкачать");
  const res22 = res2.map((item) => {
    if (item.indexOf("Открыть путь", 0) === 0) {
      return item.replace("Открыть путь", "");
    } else {
      return item;
    }
  });
  const fullPaths = res22.filter((item, index) => index !== res2.length - 1);
  return fullPaths;
};
