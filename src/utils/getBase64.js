const getBase64 = img => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    try {
      reader.readAsDataURL(img);
      reader.onloadend = () => res(reader.result);
    } catch (e) {
      reader.onerror = e => rej(e);
    }
  });
}

export default getBase64;
