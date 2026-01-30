/**
 * 24. Swap Nodes in Pairs
 * https://leetcode.com/problems/swap-nodes-in-pairs/description/
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  const dummy = new ListNode(0);
  dummy.next = head;

  let prev = dummy;

  while (prev.next && prev.next.next) {
    const first = prev.next;
    const second = first.next;

    prev.next = second;
    first.next = second.next;
    second.next = first;

    prev = first;
  }

  return dummy.next;
};
