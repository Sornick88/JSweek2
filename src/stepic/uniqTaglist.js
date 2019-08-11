const input = [
  "web",
  "coursera",
  "JavaScript",
  "Coursera",
  "script",
  "programming"
];

function uniqTagList(tagList) {
  //if (tagList.length < 1) return "";
  let normTags = tagList.map(tag => tag.toLowerCase());
  let uniqTags = Array.from(new Set(normTags)).join(", ");
  return uniqTags; //Object.keys(normTags);
}

console.log(uniqTagList(input));
