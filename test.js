function sumIntervals(intervals) {
    const sorted_intervals = intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1])

    const merged = [sorted_intervals[0]]

    let previous_start = 0, previous_end = 0
    for (let i = 1 ; i < sorted_intervals.length ; i ++) {
       let previous_start = merged.at(-1)[0], previous_end = merged.at(-1)[1]
       let current_start = sorted_intervals[i][0], current_end = sorted_intervals[i][1]
       if (current_start <= previous_end) { /** expand interval */
         merged.splice(-1, 1, [previous_start, Math.max(previous_end, current_end)])
       }
       else { /** start new interval */
        merged.push(sorted_intervals[i])
       }
    }
    return merged.reduce((acc, curr) => acc += curr[1] - curr[0], 0)
}

                // Input:

                // myl = [(0, 2), (3, 6), (7, 7), (9, 12)]
                // interval = (1, 8)

                // Step mentally:

                // (1,8) overlaps:
                // (0,2)
                // (3,6)
                // (7,7)

                // So everything from 0 to 8 becomes one block:

                // Result:

                // [(0, 8), (9, 12)]




