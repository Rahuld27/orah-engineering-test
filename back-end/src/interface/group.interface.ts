export interface CreateGroupInput {
    name: string,
    number_of_weeks: number,
    roll_states: "unmark" | "present" | "absent" | "late",
    incidents: number,
    ltmt: "<" | ">"
}

export interface UpdateGroupInput {
    id: number,
    name: string,
    number_of_weeks: number,
    roll_states: "unmark" | "present" | "absent" | "late",
    incidents: number,
    ltmt: "<" | ">"
}