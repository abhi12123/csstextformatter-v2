const cssToInline = (property) => {
    const index = property.indexOf("-");
    let convertedPropertyName = property;
    if (index > -1) {
      let propertyValue = property[index + 1].toUpperCase();
      convertedPropertyName =
        property.slice(0, index) + propertyValue + property.slice(index + 2);
    }
    return convertedPropertyName;
  };

export {cssToInline};