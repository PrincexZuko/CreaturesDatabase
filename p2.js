
// Declare variables
let currentCreatureIndex;
let creatures;

// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// URL point to a json file
const url = "https://gist.githubusercontent.com/sandeep728/c7402151ee87f3b89bd272c97b8e6b37/raw/c934af6afe49f0aa66a61a8dc49c3d44fa95978a/london-cards";

// call open method to open a new connection
xhr.open('GET', url);

// Add a method to handle the response
xhr.onload = function() {
  // Check if the status is successful (200)
  if (xhr.status === 200) {
    // Parse the response text into a JSON object
    const data = JSON.parse(xhr.responseText);
    const creatures = data.creatures;

    // Set up event listener for the "next" button
    document.getElementById('next-button').addEventListener('click', () => {
      // increment the current creature index
      currentCreatureIndex++;
      // Check if the index is within the bounds of the creatures array
      if (currentCreatureIndex >= creatures.length) {
        currentCreatureIndex = creatures.length - 1;
      }
      // Display the creature with the updated index
      displayCreature(creatures[currentCreatureIndex]);
    });

    // Set up event listener for the "previous" button
    document.getElementById('previous-button').addEventListener('click', () => {
      // decrement the current creature index
      currentCreatureIndex--;
      // Check if the index is within the bounds of the creatures array
      if (currentCreatureIndex < 0) {
        currentCreatureIndex = 0;
      }
      // Display the creature with the updated index
      displayCreature(creatures[currentCreatureIndex]);
    });

    // Set up event listener for the search form submission
    document.getElementById('search-form').addEventListener('submit', event => {
      event.preventDefault();
      // Get the rank value from the input field
      const rank = parseInt(document.getElementById('rank-search').value);
      // Search for the creature with the matching rank in the creatures array
      const creature = creatures.find(c => c.rank === rank);
      if (creature) {
        // Update the current creature index and display the creature
        currentCreatureIndex = creatures.indexOf(creature);
        displayCreature(creature);
      } else {
        alert(`Sorry but, The Creature with rank ${rank} is not found.`);
      }
    });

    // Initialize the first creature
    currentCreatureIndex = 0;
    displayCreature(creatures[currentCreatureIndex]);
  } else {
    console.error('Request failed.  Returned status of ' + xhr.status);
  }
};

// call send method to send the request
xhr.send();

//steps
// figure out how to handle the previous button

// For search logic, same thing as above. We add event on search button
// Get rank from the input
// Search the creatures array for the creature with the rank
// Populate the HTML with the creature
// Update the current creature index

// To disable the next and previous buttons when there are no more creatures. keep track of the current creature index.
// If the current creature index is 0, disable the previous button, if the current creature index is equal to length of creatures array, disable the next button.

// Display the given creature in the HTML
function displayCreature(creature) {
  document.getElementById('name').innerHTML = creature.name;
  document.getElementById('rank').innerHTML = `Rank: ${creature.rank}`;
  document.getElementById('attack').innerHTML = `Attack: ${creature.attack}`;
  document.getElementById('defense').innerHTML = `Defense: ${creature.defense}`;
  document.getElementById('health').innerHTML = `Health: ${creature.health}`;
  document.getElementById('feelings').innerHTML = `Feelings: ${creature.feelings}`;
  toggleNextButton();
}

// Disable the "previous" button if at the beginning of the creatures array
function togglePreviousButton() {
  const button = document.getElementById('previous-button');
  button.disabled = (currentCreatureIndex === 0);
}

// Disable the "next" button if at the end of the creatures array
function toggleNextButton() {
  const button = document.getElementById('next-button');
  button.disabled = (currentCreatureIndex === creatures.length - 1);
}

