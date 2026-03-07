/*Given a string s, find the length of the longest substring without duplicate characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
 
*/

var lengthOfLongestSubstring = function(s) {

    let set = new Set();   
    // Set will store characters of current substring (no duplicates)

    let left = 0;          
    // Left pointer of sliding window

    let maxLength = 0;     
    // Store maximum substring length found

    for (let right = 0; right < s.length; right++) {
        // Right pointer moves through the string

        while (set.has(s[right])) {
            // If character already exists → duplicate found

            set.delete(s[left]); 
            // Remove left character from set

            left++;              
            // Move left pointer forward
        }

        set.add(s[right]);       
        // Add current character to set

        maxLength = Math.max(maxLength, right - left + 1);
        // Calculate window length and update maxLength
    }

    return maxLength;
    // Return longest substring length
};
let s="abcabcbb";
console.log(lengthOfLongestSubstring(s));
