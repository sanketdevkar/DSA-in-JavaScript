/*Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 

Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {

    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }

    let m = nums1.length;
    let n = nums2.length;

    let left = 0;
    let right = m;

    while (left <= right) {

        // Partition nums1
        let partition1 = Math.floor((left + right) / 2);

        // Partition nums2
        let partition2 = Math.floor((m + n + 1) / 2) - partition1;

        // Edge values
        let maxLeft1 = (partition1 === 0) ? -Infinity : nums1[partition1 - 1];
        let minRight1 = (partition1 === m) ? Infinity : nums1[partition1];

        let maxLeft2 = (partition2 === 0) ? -Infinity : nums2[partition2 - 1];
        let minRight2 = (partition2 === n) ? Infinity : nums2[partition2];

        // Correct partition found
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {

            // If total length is even
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) +
                        Math.min(minRight1, minRight2)) / 2;
            } 
            // If odd
            else {
                return Math.max(maxLeft1, maxLeft2);
            }
        }

        // Move binary search
        else if (maxLeft1 > minRight2) {
            right = partition1 - 1;
        } else {
            left = partition1 + 1;
        }
    }
};

let nums1 = [1,3]
let nums2 = [2]
console.log(findMedianSortedArrays(nums1, nums2));
