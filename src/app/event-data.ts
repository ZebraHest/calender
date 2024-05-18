export interface EventData {
    id: number,
    title: string,
    description: string,
    startTime: string,
    endTime: string,
    isFlexible: boolean,
    duration: number,
    isRepeating: boolean,
    startDateRepeating: string,
    endDateRepeating: string,
    userId: string,
    repeatDays: string[]
}
