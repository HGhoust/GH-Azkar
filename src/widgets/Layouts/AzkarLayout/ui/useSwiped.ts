import { useSwipeable } from 'react-swipeable'
import { TDirection } from './azkarLayout.types'

export function useSwiped({
	currentParamsId,
	filteredLength,
	debounceNavigate,
	pathName,
	setSwiped,
}: {
	currentParamsId: number
	filteredLength: number
	pathName: string
	debounceNavigate: (path: string) => void
	setSwiped: (direction: TDirection) => void
}) {
	const onSwiped = (direction: TDirection, requisition: boolean) => {
		if (requisition) {
			setSwiped(direction)
			debounceNavigate(
				`/${pathName}/${
					direction === 'right' ? currentParamsId - 1 : currentParamsId + 1
				}`
			)
		}
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => onSwiped('left', currentParamsId < filteredLength - 1),
		onSwipedRight: () => onSwiped('right', currentParamsId > 0),
		trackTouch: true,
		trackMouse: true,
	})

	return { handlers }
}
