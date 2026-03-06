  /*You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 

Example 1:


Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
Example 2:

Input: l1 = [0], l2 = [0]
Output: [0]
Example 3:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
 

Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.*/
/**
 * Definition for singly-linked list.
 * This function creates a node of a linked list.
 */
function ListNode(val, next) {
    // If value is undefined set it to 0
    this.val = (val === undefined ? 0 : val)

    // If next node is undefined set it to null
    this.next = (next === undefined ? null : next)
}

/**
 * Function to add two linked list numbers
 * l1 -> first linked list
 * l2 -> second linked list
 */
var addTwoNumbers = function(l1, l2) {

    // Create a dummy node to start the result list
    let dummy = new ListNode(0);

    // curr pointer will move and build the result list
    let curr = dummy;

    // carry stores extra value when sum > 9
    let carry = 0;

    // Loop until l1, l2 and carry all become empty
    while (l1 || l2 || carry) {

        // Calculate sum of current digits and carry
        let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;

        // Update carry value
        // Example: if sum = 15 then carry = 1
        carry = Math.floor(sum / 10);

        // Create a new node with last digit of sum
        // Example: 15 % 10 = 5
        curr.next = new ListNode(sum % 10);

        // Move curr to next node
        curr = curr.next;

        // Move l1 to next node if it exists
        if (l1) l1 = l1.next;

        // Move l2 to next node if it exists
        if (l2) l2 = l2.next;
    }

    // Return the result list (skip dummy node)
    return dummy.next;
};

// Creating Linked List l1 = [2,4,3]
let l1 = new ListNode(2);
l1.next = new ListNode(4);
l1.next.next = new ListNode(3);

// Creating Linked List l2 = [5,6,4]
let l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);

// Call the function
let result = addTwoNumbers(l1, l2);

// Print the result
while(result){
    console.log(result.val);
    result = result.next;
}
