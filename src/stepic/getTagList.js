const input = "Прохожу курс на #coursera по #javascript ";

/**
 * @param {String} tweet
 * @returns {String[]}
 */

function getTagList(tweet) {
  return typeof tweet === "string"
    ? tweet
        .split(" ")
        .filter(word => word[0] === "#" && word.length > 1)
        .map(word => word.replace("#", ""))
    : [];
  /*let hashedTags = tweet
    .split(" ")
    .filter(word => word[0] === "#")
    .map(word => word.replace("#", ""))
    .filter(word => word.length > 0);
  return hashedTags;*/
}

console.log(getTagList(input));
