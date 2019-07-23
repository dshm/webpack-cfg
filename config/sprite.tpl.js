const individualTemplate = item =>
  `
.icon-${item.name} {
  background-position: ${item.offset_x}px ${item.offset_y}px;
  width: ${item.width}px;
  height: ${item.height}px;
}
  `;

const retinaTemplate = (data, commonSelectors) =>
  `
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  ${commonSelectors} {
    background-image: url("${data.retina_spritesheet.image}");
    background-size: ${data.spritesheet.width}px ${data.spritesheet.height}px;
  }
}
  `;

const spriteTPL = data => {
  const imageURL = data.sprites[0].image;

  const commonSelectorsArray = data.sprites.map(
    sprite => `.icon-${sprite.name}`
  );

  const commonSelectors = commonSelectorsArray.join(", ");

  const individualItemsArray = data.sprites.map(item => {
    return individualTemplate(item);
  });

  const individualItems = individualItemsArray.join("");

  return `
${commonSelectors} {
  background-image: url("${imageURL}");
}
${individualItems}
${retinaTemplate(data, commonSelectors)}
`;
};

module.exports = spriteTPL;
