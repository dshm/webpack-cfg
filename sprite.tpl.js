const template = sprite => {
  const lines = sprite.split("\n").filter(item => item.trim().length);
  const lastIndentLength = /^\s*/.exec(lines[lines.length - 1])[0].length;
  return sprite
    .split("\n")
    .map(line => line.slice(lastIndentLength))
    .join("\n");
};

const defaultFormat = data => {
  const imageURL = data.sprites[0].image;

  const sharedSelector = data.sprites
    .map(sprite => `.icon-${sprite.name}`)
    .join(", ");

  const shared = template(`
    ${sharedSelector} {
      background: url(${imageURL})
    }
  `);

  const perImage = data.sprites
    .map(sprite =>
      template(`
        .icon-${sprite.name} {
          width: ${sprite.width}px;
          height: ${sprite.height}px;
          background-position: ${sprite.offset_x}px ${sprite.offset_y}px;
        }
      `)
    )
    .join("");

  return `${shared}\n${perImage}`;
};

const retinaFormat = data => {
  const imageURL = data.sprites[0].image;

  const sharedSelector = data.sprites
    .map(sprite => `.icon-${sprite.name}`)
    .join(", ");

  const shared = template(`
    ${sharedSelector} {
      background-image: url(${imageURL});
    }
  `);

  const perImage = data.sprites
    .map(sprite => {
      return template(`
        .icon-${sprite.name} {
          background-position: ${sprite.offset_x}px ${sprite.offset_y}px;
          width: ${sprite.width}px;
          height: ${sprite.height}px;
        }
      `);
    })
    .join("");

  return `${shared}\n${template(`
        @media (-webkit-min-device-pixel-ratio: 2),
                (min-resolution: 192dpi) {
            ${sharedSelector} {
              background-image: url(${data.retina_spritesheet.image});
              background-size: ${data.spritesheet.width}px ${data.spritesheet.height}px;
            }
        }
      `)}\n${perImage}`;
};

module.exports = { defaultFormat, retinaFormat };
