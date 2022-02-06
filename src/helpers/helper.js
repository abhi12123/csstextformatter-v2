const cssToInline = (property) => {
  let convertedPropertyArray = [];
  [...property].map((char, i) => {
    if (char == "-") {
      convertedPropertyArray.push([...property][i + 1].toUpperCase());
    } else {
      [...property][i - 1] !== "-" && convertedPropertyArray.push(char);
    }
  });
  return convertedPropertyArray.join("");
};

export { cssToInline };
