import tiktoken from 'tiktoken';

export const countTokens = (messages, model) => {
  const encoding = tiktoken.encoding_for_model(model);
  let tokenCount = 0;

  for (const message of messages) {
    tokenCount += encoding.encode(message.content).length;
    tokenCount += 4;
  }

  return tokenCount;
};

export const countContentTokens = (content, model) => {
  const messages = [
    {
      role: 'system',
      content: `Test`,
    },
    {
      role: 'user',
      content: `Test`,
    },
    {
      role: 'assistant',
      content: JSON.stringify(content),
    },
  ];

  return countTokens(messages, model);
}

export const removeEmptyArrays = (obj) => {
  if (Array.isArray(obj)) {
    // Filter out empty arrays and clean nested arrays
    return obj.map(removeEmptyArrays).filter(item => !(Array.isArray(item) && item.length === 0));
  } else if (typeof obj === "object" && obj !== null) {
    // Recursively clean nested objects
    for (let key in obj) {
      obj[key] = removeEmptyArrays(obj[key]);

      // Remove empty arrays after recursion
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      }
    }
  }
  return obj;
}

export const removeNullValues = (obj) => {
  if (Array.isArray(obj)) {
    // Clean arrays by recursively processing elements
    return obj.map(removeNullValues).filter(item => item !== null);
  } else if (typeof obj === "object" && obj !== null) {
    // Recursively process object properties
    for (let key in obj) {
      obj[key] = removeNullValues(obj[key]);

      // Delete key if the value is null
      if (obj[key] === null) {
        delete obj[key];
      }
    }
  }
  return obj;
}

export const removeZeroValues = (obj) => {
  // Check if the input is an object or an array
  if (Array.isArray(obj)) {
    // If it's an array, iterate through each item
    return obj.map(item => removeZeroValues(item)).filter(item => item !== 0 && item !== undefined && item !== null);
  } else if (typeof obj === 'object' && obj !== null) {
    // If it's an object, iterate through its keys
    let newObj = {};

    // Loop through each key of the object
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        // Recursively remove zero values from nested objects/arrays
        const cleanedValue = removeZeroValues(value);

        // Only add to the new object if the value is not 0, undefined, or null
        if (cleanedValue !== 0 && cleanedValue !== undefined && cleanedValue !== null) {
          newObj[key] = cleanedValue;
        }
      }
    }

    return newObj;
  }

  // If it's not an object or array, return the value itself (base case)
  return obj;
}

export const removeEmptyObjects = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj; // Return non-objects as is

  // Recursively process each key
  Object.keys(obj).forEach(key => {
    obj[key] = removeEmptyObjects(obj[key]); // Recursively clean nested objects

    // If the cleaned value is an empty object, delete the key
    if (typeof obj[key] === "object" && obj[key] !== null && Object.keys(obj[key]).length === 0) {
      delete obj[key];
    }
  });

  return obj;
}
