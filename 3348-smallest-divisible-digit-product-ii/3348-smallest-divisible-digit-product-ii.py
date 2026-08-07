class Solution:
    def smallestNumber(self, num: str, t: int) -> str:
        # Step 1: Prime factorize t into 2, 3, 5, 7
        req = {2: 0, 3: 0, 5: 0, 7: 0}
        temp_t = t
        for p in (2, 3, 5, 7):
            while temp_t % p == 0:
                req[p] += 1
                temp_t //= p
        
        if temp_t > 1:
            return "-1"

        def get_factors(d: int):
            """Returns (c2, c3, c5, c7) for a digit d in 1..9."""
            c2 = c3 = c5 = c7 = 0
            while d % 2 == 0: c2 += 1; d //= 2
            while d % 3 == 0: c3 += 1; d //= 3
            if d == 5: c5 = 1
            if d == 7: c7 = 1
            return c2, c3, c5, c7

        def min_digits(r2: int, r3: int, r5: int, r7: int) -> int:
            """Minimum number of digits needed to supply at least (r2, r3, r5, r7)."""
            r2, r3, r5, r7 = max(0, r2), max(0, r3), max(0, r5), max(0, r7)
            d23 = r2 // 3 + r3 // 2
            rem2, rem3 = r2 % 3, r3 % 2
            if rem2 == 0 and rem3 == 0:
                d23 += 0
            elif rem2 == 2 and rem3 == 1:
                d23 += 2
            else:
                d23 += 1
            return d23 + r5 + r7

        def fill_suffix(length: int, r2: int, r3: int, r5: int, r7: int) -> str:
            """Greedily constructs the smallest zero-free string of given length."""
            res = []
            for i in range(length):
                rem_len = length - 1 - i
                for d in range(1, 10):
                    f2, f3, f5, f7 = get_factors(d)
                    if min_digits(r2 - f2, r3 - f3, r5 - f5, r7 - f7) <= rem_len:
                        res.append(str(d))
                        r2, r3, r5, r7 = r2 - f2, r3 - f3, r5 - f5, r7 - f7
                        break
            return "".join(res)

        N = len(num)
        first_zero = num.find('0')
        if first_zero == -1:
            first_zero = N

        # Calculate prefix factors up to each position
        pref_factors = [(0, 0, 0, 0)]
        for ch in num:
            d = int(ch)
            if d == 0:
                break
            f2, f3, f5, f7 = get_factors(d)
            p2, p3, p5, p7 = pref_factors[-1]
            pref_factors.append((p2 + f2, p3 + f3, p5 + f5, p7 + f7))

        # Check if num itself is valid
        if first_zero == N:
            p2, p3, p5, p7 = pref_factors[N]
            if min_digits(req[2] - p2, req[3] - p3, req[5] - p5, req[7] - p7) == 0:
                return num

        # Try matching prefix of length p (from min(N-1, first_zero) down to 0)
        for p in range(min(N - 1, first_zero), -1, -1):
            p2, p3, p5, p7 = pref_factors[p]
            start_digit = int(num[p]) + 1
            
            for d in range(start_digit, 10):
                f2, f3, f5, f7 = get_factors(d)
                r2, r3, r5, r7 = req[2] - p2 - f2, req[3] - p3 - f3, req[5] - p5 - f5, req[7] - p7 - f7
                rem_len = N - 1 - p
                
                if min_digits(r2, r3, r5, r7) <= rem_len:
                    prefix_str = num[:p] + str(d)
                    suffix_str = fill_suffix(rem_len, r2, r3, r5, r7)
                    return prefix_str + suffix_str

        # If no number of length N works, construct smallest number of length > N
        min_len_req = min_digits(req[2], req[3], req[5], req[7])
        target_len = max(N + 1, min_len_req)
        return fill_suffix(target_len, req[2], req[3], req[5], req[7])