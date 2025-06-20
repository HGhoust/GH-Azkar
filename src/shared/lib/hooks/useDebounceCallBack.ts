import { useCallback, useRef } from 'react'

export function useDebounceCallBack<T extends (...args: any[]) => void>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	const timeOutRef = useRef<NodeJS.Timeout | null>(null)

	const debounce = useCallback(
		(...args: Parameters<T>) => {
			if (timeOutRef.current) {
				clearTimeout(timeOutRef.current)
			}

			timeOutRef.current = setTimeout(() => {
				func(...args)
				timeOutRef.current = null
			}, wait)
		},
		[func, wait]
	)
	return debounce
}
