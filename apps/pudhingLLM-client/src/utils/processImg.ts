const processImg = (img: string) => {
    return img ? `data:image/jpeg;base64,${img}` : '';
};
export {
    processImg,
};