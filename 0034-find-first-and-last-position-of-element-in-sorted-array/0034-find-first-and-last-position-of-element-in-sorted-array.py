class Solution:

  def searchRange(self, nums: list[int], target: int) -> list[int]:
    def findBound(isFirst: bool) -> int:
      left, right = 0, len(nums) - 1
      bound = -1

      while left <= right:
        mid = (left + right) // 2

        if nums[mid] == target:
          bound = mid
          if isFirst:
            right = mid - 1  # Keep searching towards the left
          else:
            left = mid + 1  # Keep searching towards the right
        elif nums[mid] < target:
          left = mid + 1
        else:
          right = mid - 1

      return bound

    return [findBound(True), findBound(False)]