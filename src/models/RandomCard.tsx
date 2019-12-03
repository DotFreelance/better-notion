import CardModel from "models/CardModel";
import CardTypes from "models/CardTypes";

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

function randomArrayItem<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

const randomTitles = [
  "A Porky Surprise",
  "Cards, Cards, Cards!",
  "Rustlin' One Up",
  "Put It Together Right Now"
];

const randomContent = [
  "Aliquam convallis mauris urna, ac consectetur nibh consectetur vel. Suspendisse pellentesque fermentum nisl, ut imperdiet ante posuere ut. Suspendisse sed tristique odio, nec molestie eros. Vestibulum ac leo in libero ultricies pretium vel at velit. Ut egestas non ipsum in accumsan. Nullam sit amet rutrum tellus. Nam ligula lorem, vulputate at ex sed, maximus scelerisque nisi.",
  "Donec dapibus, diam sit amet aliquam porttitor, augue purus fringilla sapien, vel rhoncus quam quam quis ipsum. Praesent maximus eu lorem eget sodales. Integer dapibus feugiat tincidunt. Praesent dui est, cursus quis nisl eget, vehicula ullamcorper nibh.",
  "Porchetta chuck boudin, landjaeger bacon jerky bresaola andouille ham kielbasa cupim pork chop meatball swine. Pork chop chicken bacon, pork meatball kevin picanha. Shoulder jowl boudin bresaola andouille capicola.",
  "Guards! Bring me the forms I need to fill out to have her taken away! Oh Leela! You're the only person I could turn to; you're the only person who ever loved me. Yep, I remember. They came in last at the Olympics, then retired to promote alcoholic beverages!",
  "Well, thanks to the Internet, I'm now bored with sex. Is there a place on the web that panders to my lust for violence? For example, if you killed your grandfather, you'd cease to exist! Eeeee! Now say 'nuclear wessels'!"
];

const randomWebsites = [
  "https://www.typescriptlang.org/",
  "https://theoatmeal.com/",
  "https://www.theatlantic.com/technology/",
  "https://www.nationalgeographic.com/"
];

const randomImageUrls = [
  "https://www.fillmurray.com/600/500",
  "https://www.placecage.com/600/500",
  "https://www.fillmurray.com/600/1000",
  "https://stevensegallery.com/600/500",
  "https://www.placecage.com/600/1000",
  "https://www.fillmurray.com/1200/400"
];

export const RandomCard = (): CardModel => {
  const randomCardType = randomEnum(CardTypes);
  return {
    title: randomArrayItem(randomTitles),
    url:
      randomCardType === CardTypes.Image
        ? randomArrayItem(randomImageUrls)
        : randomArrayItem(randomWebsites),
    type: randomCardType,
    content: randomArrayItem(randomContent)
  };
};

export default RandomCard;
