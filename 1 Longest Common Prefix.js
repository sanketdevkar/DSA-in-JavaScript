/*Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

 

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
 

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters if it is non-empty.*/


var longestCommonPrefix = function(strs) {

    // If the array is empty, return empty string
    if (strs.length === 0) return "";

    // Take the first string as the initial prefix
    let prefix = strs[0];

    // Loop through the remaining strings
    for (let i = 1; i < strs.length; i++) {

        // Check if the current string starts with the prefix
        // If not, shorten the prefix
        while (strs[i].indexOf(prefix) !== 0) {

            // Remove the last character from prefix
            prefix = prefix.slice(0, -1);

            // If prefix becomes empty, no common prefix exists
            if (prefix === "") return "";
        }
    }

    // Return the final common prefix
    return prefix;
};

// Input array of strings
let strs = ["apple","app","application"];

// Call the function and print result
console.log(longestCommonPrefix(strs));
