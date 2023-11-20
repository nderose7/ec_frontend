// utils/parseIngredients.js
export function parseDashesToHTML(ingredientListString) {
  //console.log('Received in parseDashesToHTML:', ingredientListString);

  if (!ingredientListString) {
    console.log('ingredientListString is null or undefined');
    return '';
  }

  // Split the string by "-" while filtering out empty entries and trimming whitespace
  const ingredients = ingredientListString
    .split(/\s-\s|^-|-\s|\s-$/)
    .filter((ingredient) => ingredient.trim() !== '')
    .map((ingredient) => ingredient.trim());

  // Create list items and join them into a single string
  return ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join('');
}

// utils/parseInstructions.js
export function parseNumbersToHTML(instructions) {
  // Split the instructions by the number followed by a period and a space "1. "
  // Filter any empty strings from the array result due to the split
  const steps = instructions.split(/(\d+\.\s)/).filter(Boolean);

  let html = '<ol>';
  for (let i = 1; i < steps.length; i += 2) { // Increment by 2 as every even index is a number.
    if (steps[i - 1].match(/\d+\.$/)) {
      html += `<li>${steps[i].trim()}</li>`; // Trim each step and wrap it in <li> tags
    } else {
      // This handles the case where the first element in the array is not a number which should be the instruction part.
      html += `<li>${steps[i - 1].trim() + ' ' + steps[i].trim()}</li>`;
    }
  }
  html += '</ol>';
  return html;
}
