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
        await sleep(sleepTime * 10);
    }
}


writeLoop();