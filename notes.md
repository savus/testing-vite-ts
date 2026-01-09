BUG - Phone Input on Form:

- Phone inputs would switch focus to next and previous input fields when arrow keys or space bar, or would interfere with the functionality of the tab key were pressed
- Phone inputs would be unresponsive if input had no characters and user typed delete key

SOLUTION - Set phone onchange handler to work like a react state hook by updating all three fields whenever a key is typed. Created an array of restrictedKeys and listed all keys that I want to be prevented from triggering the focus-switch effect, then set the logic to include that the restrictedKeys list must not contain the name of the key pressed before running the code.

BUG - local image paths would cause mime/type error when attempting to import them as a variable in javascript document.

SOLUTION - instead of importing the path using the import <variable name> from "..file/path", initializing variables with the path name using an equals sign works just fine
ex: const image1 = "../assets/images/image-1.jpg"

BUG - navbarClickHandler type declaration for event object as e: MouseEvent causing no call overload error.

SOLUTION - use e: Event instead

BUG - Typescript error when trying to populate portfolioGrid with cards and then assign the completed node list to variable

SOLUTION - type cast node list as type: NodeListOf<HTMLDivElement>

BREAKTHROUGH - to perform a task like constructing and populating portfolio cards from a local list of data and storing that nodelist in a variable once it's finished constructing, use an async function that builds the HTML and returns the nodelist, and then set the variable to await ex: const porfolioCards = await func()

TASK: - refactor code into component-like sections and clean up abstractions

- clean up portfolio.ts functions


BUG - When porfolio grid was changed to carousel mode after either the nav links were clicked, or when the search input had been typed in, several cards would not show up.

SOLUTION - The portfolio cards are directly related to the nav links via an HTML data-filter attribute, and the center card in the carousel that shows up is given its css through the .active class, which gets removed when a nav link is clicked, or when the search bar is typed into. The solution was to make the carousel's main card use .current as its css class, and to make sure that when the portfolio changes modes back and forth from gallery to carousel and vice-versa the cards are all reset to display: block;. 

function sleep(ms) => new Promise((resolve) => setTimeout(resolve, ms));

let sleepTime = 100;
let curPhraseIndex = 0;

const writeLoop = async () => {
while (true) {
let curWord = phrases[curPhraseIndex];
for (let i = 0; i < curWord.length; i++) {
el.innerText = curWord.substring(0, i + 1);
await sleep(sleepTime);
}
await sleep(sleepTime \* 10);
}
}

writeLoop();
