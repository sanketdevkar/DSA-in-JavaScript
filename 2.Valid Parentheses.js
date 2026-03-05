/*Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true

Example 5:

Input: s = "([)]"

Output: false

 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.*/
var isValid = function(s) {

    // Create an empty stack to store opening brackets
    let stack = [];

    // Object to store matching bracket pairs
    // Key = closing bracket
    // Value = corresponding opening bracket
    let map = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    // Loop through each character of the string
    for (let char of s) {

        // Check if the character is a closing bracket
        if (char in map) {

            // Remove the last opening bracket from the stack
            let top = stack.pop();

            // Check if popped bracket matches the expected opening bracket
            if (top !== map[char]) {

                // If not matching, the string is invalid
                return false;
            }

        } else {

            // If the character is an opening bracket, push it into the stack
            stack.push(char);
        }
    }

    // If stack is empty, all brackets were matched correctly
    // If not empty, some brackets were not closed
    return stack.length === 0;
};

// Test cases
console.log(isValid("()[]{}")); // true
console.log(isValid("([)]")); // false
console.log(isValid("{[]}")); // true
console.log(isValid("(")); // false
