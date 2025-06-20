export type timeOfDay = 'morning' | 'evening' | 'bed'

export type TAzkarName = 'Dua' | 'Zikr' | (string & {})

export interface IAzkar {
	name: TAzkarName
	text: string
	time: timeOfDay[]
	count: number
	id: number
}
