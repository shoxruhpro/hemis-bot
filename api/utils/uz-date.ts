export default (
  milliseconds: number,
  config?: { year?: boolean; weekday?: boolean }
) => {
  let options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  if (config?.year) options.year = "numeric";
  else if (config?.weekday) options = { weekday: "long" };

  return new Date(milliseconds * 1000).toLocaleDateString("UZ", options);
};
