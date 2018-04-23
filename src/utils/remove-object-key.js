const removeObjectKey = (object, key) => {
  let copyObject = { ...object };

  delete copyObject[key];

  return copyObject;
}

export default removeObjectKey;
